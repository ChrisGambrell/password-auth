'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { MOCK_APP_ICON, MOCK_APP_NAME, MOCK_NAV_LINKS } from '@/lib/constants'
import { PanelLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { MobileNavItem } from './nav-item'

export function MobileNav({ subscribed }: { subscribed: boolean }) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size='icon' variant='outline' className='sm:hidden'>
					<PanelLeftIcon className='h-5 w-5' />
					<span className='sr-only'>Toggle Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side='left' className='sm:max-w-xs'>
				<nav className='grid gap-6 text-lg font-medium'>
					<Link
						href='/'
						className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'>
						<MOCK_APP_ICON className='h-5 w-5 transition-all group-hover:scale-110' />
						<span className='sr-only'>{MOCK_APP_NAME}</span>
					</Link>
					{MOCK_NAV_LINKS.flat()
						.filter((link) => !link.subscription || (link.subscription && subscribed))
						.map((link) => (
							<MobileNavItem key={link.href} {...link} />
						))}
				</nav>
			</SheetContent>
		</Sheet>
	)
}
