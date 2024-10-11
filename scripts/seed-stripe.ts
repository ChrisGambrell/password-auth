import { Prisma, PrismaClient } from '@prisma/client'
import Stripe from 'stripe'

const prisma = new PrismaClient()

const TRIAL_PERIOD_DAYS = 0
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-09-30.acacia' })

const upsertProductRecord = async (product: Stripe.Product) => {
	const productData: Prisma.ProductCreateInput = {
		id: product.id,
		active: product.active,
		name: product.name,
		description: product.description ?? null,
		image: product.images?.[0] ?? null,
		metadata: product.metadata,
		features: product.marketing_features.map((feature) => feature.name) as string[],
	}

	await prisma.product.upsert({ where: { id: product.id }, create: productData, update: productData })
	console.log(`Product inserted/updated: ${product.id}`)
}

const upsertPriceRecord = async (price: Stripe.Price) => {
	const priceData: Prisma.PriceCreateInput = {
		id: price.id,
		product: { connect: { id: typeof price.product === 'string' ? price.product : '' } },
		active: price.active,
		currency: price.currency,
		type: price.type,
		unit_amount: price.unit_amount ?? null,
		interval: price.recurring?.interval ?? null,
		interval_count: price.recurring?.interval_count ?? null,
		trial_period_days: price.recurring?.trial_period_days ?? TRIAL_PERIOD_DAYS,
	}

	await prisma.price.upsert({ where: { id: price.id }, create: priceData, update: priceData })
	console.log(`Price inserted/updated: ${price.id}`)
}

async function retrieveStripeProducts() {
	const products = await stripe.products.list()
	return products.data
}

async function retrieveStripePrices() {
	const prices = await stripe.prices.list()
	return prices.data
}

async function main() {
	const products = await retrieveStripeProducts()
	await Promise.all(products.map((product) => upsertProductRecord(product)))

	const prices = await retrieveStripePrices()
	await Promise.all(prices.map((price) => upsertPriceRecord(price)))
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
