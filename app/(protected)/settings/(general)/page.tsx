import { auth } from '@/lib/auth'
import { ClientPage } from './client'

export default async function SettingsPage() {
	const user = await auth()
	return <ClientPage user={user} />
}
