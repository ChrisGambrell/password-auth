'use client'

import { checkoutWithStripe, createStripePortal } from '@/actions/stripe'
import { updateName } from '@/actions/user'
import { ActionButton } from '@/components/action-button'
import { FormInput } from '@/components/form-input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getStripe } from '@/lib/stripe/client'
import { AuthUser } from '@/lib/utils'
import { getErrorRedirect } from '@cgambrell/utils'
import { Price, Prisma } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { useFormState } from 'react-dom'

export function ClientPage({ prices, user }: { prices: Prisma.PriceGetPayload<{ include: { product: true } }>[]; user: AuthUser }) {
	const router = useRouter()
	const [interval, setInterval] = useState<string>('month')
	const [loading, setLoading] = useState(false)
	const [state, action] = useFormState(updateName, null)

	async function handleCheckout(priceId: Price['id'], e: FormEvent) {
		e.preventDefault()
		setLoading(true)

		const res = await checkoutWithStripe(priceId, '/settings')
		if (res.errorRedirect) return router.push(res.errorRedirect)
		else if (!res.sessionId) return router.push(getErrorRedirect('/settings', 'Unable to create checkout session.'))

		const stripe = await getStripe()
		stripe?.redirectToCheckout({ sessionId: res.sessionId })
	}

	return (
		<div className='grid gap-6'>
			<Card>
				<CardHeader>
					<CardTitle>Your plan</CardTitle>
					<CardDescription>
						{user.subscriptions.length > 0 ? (
							<>
								You are subscribed to the{' '}
								<span className='font-bold underline'>{user.subscriptions[0].price?.product?.name}</span> plan.
							</>
						) : (
							'You are not currently subscribed to any plan.'
						)}
					</CardDescription>
				</CardHeader>
				{user.subscriptions.length === 0 ? (
					<CardContent>
						<div className='grid gap-8'>
							<Separator />
							<Tabs value={interval} onValueChange={setInterval}>
								<div className='flex justify-center'>
									<TabsList>
										<TabsTrigger value='month'>Monthly</TabsTrigger>
										<TabsTrigger value='year'>Yearly</TabsTrigger>
									</TabsList>
								</div>
								<div className='mt-4 grid grid-cols-3 gap-4'>
									{prices
										.filter((price) => price.interval === interval)
										.map((price) => (
											<Card key={price.id}>
												<CardHeader>
													<CardTitle>{price.product?.name}</CardTitle>
													<CardDescription>
														${Number(price.unit_amount) / 100} / {price.interval}
													</CardDescription>
												</CardHeader>
												<CardContent>
													<ul className='list-disc pl-4'>
														{price.product?.features.map((feature) => (
															<li key={feature}>{feature}</li>
														))}
													</ul>
												</CardContent>
												<CardFooter>
													<form onSubmit={handleCheckout.bind(null, price.id)}>
														<ActionButton className='w-full' loading={loading}>
															Subscribe
														</ActionButton>
													</form>
												</CardFooter>
											</Card>
										))}
								</div>
							</Tabs>
						</div>
					</CardContent>
				) : (
					<CardFooter className='border-t px-6 py-4'>
						<form action={createStripePortal.bind(null, '/settings')}>
							<ActionButton>Manage subscription</ActionButton>
						</form>
					</CardFooter>
				)}
			</Card>
			<form action={action}>
				<Card>
					<CardHeader>
						<CardTitle>Your name</CardTitle>
						<CardDescription>The name you use to identify yourself.</CardDescription>
					</CardHeader>
					<CardContent>
						<FormInput name='name' placeholder={user.name ?? ''} defaultValue={user.name ?? ''} error={state?.errors?.name} />
					</CardContent>
					<CardFooter className='border-t px-6 py-4'>
						<ActionButton>Save</ActionButton>
					</CardFooter>
				</Card>
			</form>
		</div>
	)
}
