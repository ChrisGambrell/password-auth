'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { MOCK_NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

export function NavItem({ exact = false, href, icon: Icon, label }: (typeof MOCK_NAV_LINKS)[number][number]) {
	const pathname = usePathname()
	const isActive = useMemo(() => (exact ? pathname === href : pathname.startsWith(href)), [exact, href, pathname])

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Link
						className={cn(
							'flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8',
							isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
						)}
						href={href}>
						<Icon className='h-5 w-5' />
						<span className='sr-only'>{label}</span>
					</Link>
				</TooltipTrigger>
				<TooltipContent side='right'>{label}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export function MobileNavItem({ exact = false, href, icon: Icon, label }: (typeof MOCK_NAV_LINKS)[number][number]) {
	const pathname = usePathname()
	const isActive = useMemo(() => (exact ? pathname === href : pathname.startsWith(href)), [exact, href, pathname])

	return (
		<Link
			className={cn('flex items-center gap-4 px-2.5', isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground')}
			href={href}>
			<Icon className='h-5 w-5' />
			{label}
		</Link>
	)
}
