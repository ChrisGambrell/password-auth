import { auth } from '@/lib/auth'
import { LayoutProps } from '@cgambrell/utils'
import { MobileNav } from './components/mobile-nav'
import { Search } from './components/search'
import { SideNav } from './components/side-nav'
import { UserMenu } from './components/user-menu'

export default async function ProtectedLayout({ children }: LayoutProps) {
	await auth()

	return (
		<div className='flex min-h-screen w-full flex-col bg-muted/40'>
			<SideNav />
			<div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
				<header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
					<MobileNav />
					<Search />
					<UserMenu />
				</header>
				<main className='flex-1 p-4 sm:px-6 sm:py-0'>{children}</main>
			</div>
		</div>
	)
}
