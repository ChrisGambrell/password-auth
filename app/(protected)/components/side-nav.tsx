'use client'

import { MOCK_APP_ICON, MOCK_APP_NAME, MOCK_NAV_LINKS } from '@/lib/constants'
import Link from 'next/link'
import { NavItem } from './nav-item'

export function SideNav() {
	return (
		<aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
			<nav className='flex flex-col items-center gap-4 px-2 py-4'>
				<Link
					href='/'
					className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'>
					<MOCK_APP_ICON className='h-4 w-4 transition-all group-hover:scale-110' />
					<span className='sr-only'>{MOCK_APP_NAME}</span>
				</Link>
				{MOCK_NAV_LINKS[0].map((link) => (
					<NavItem key={link.href} {...link} />
				))}
			</nav>
			<nav className='mt-auto flex flex-col items-center gap-4 px-2 py-4'>
				{MOCK_NAV_LINKS[1].map((link) => (
					<NavItem key={link.href} {...link} />
				))}
			</nav>
		</aside>
	)
}
