import { auth } from '@/lib/auth'
import prisma from '@/lib/db'
import { ClientPage } from './client'

export default async function SettingsPage() {
	const user = await auth()
	const prices = await prisma.price.findMany({ where: { active: true, product: { active: true } }, include: { product: true } })

	return <ClientPage prices={prices} user={user} />
}
