'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

export function SettingsLink({ exact = false, href, label }: { exact?: boolean; href: string; label: string }) {
	const pathname = usePathname()
	const isActive = useMemo(() => (exact ? pathname === href : pathname.startsWith(href)), [exact, href, pathname])

	return (
		<Link href={href} className={cn(isActive && 'font-semibold text-primary')}>
			{label}
		</Link>
	)
}
