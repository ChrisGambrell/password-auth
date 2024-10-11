import { faker } from '@faker-js/faker'
import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const NUM_USERS = 5

async function main() {
	await prisma.user.deleteMany()

	const users: Prisma.UserCreateInput[] = new Array(NUM_USERS).fill(null).map(() => {
		const firstName = faker.person.firstName()
		const lastName = faker.person.lastName()
		return { createdAt: faker.date.recent(), name: `${firstName} ${lastName}`, email: faker.internet.email({ firstName, lastName }) }
	})

	await prisma.user.createMany({ data: users })
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
