import { auth, isSubscribed } from '@/lib/auth'
import { LayoutProps } from '@cgambrell/utils'

export default async function SubscribedLayout({ children }: LayoutProps) {
	const user = await auth()
	const subscribed = await isSubscribed(user)

	if (!subscribed) throw new Error('User is not subscribed')
	return children
}
