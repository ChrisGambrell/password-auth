import { CommandIcon, HomeIcon, LineChartIcon, LucideIcon, PackageIcon, SettingsIcon, ShoppingCartIcon, Users2Icon } from 'lucide-react'

// TODO: Real app name and icon
export const MOCK_APP_ICON = CommandIcon
export const MOCK_APP_NAME = 'Acme Inc'
export const MOCK_APP_DESC = 'A mock app with authentication'

// TODO: Real nav links
export const MOCK_NAV_LINKS: { exact?: boolean; href: string; icon: LucideIcon; label: string }[][] = [
	[
		{ href: '/', exact: true, icon: HomeIcon, label: 'Dashboard' },
		{ href: '/orders', icon: ShoppingCartIcon, label: 'Orders' },
		{ href: '/products', icon: PackageIcon, label: 'Products' },
		{ href: '/customers', icon: Users2Icon, label: 'Customers' },
		{ href: '/analytics', icon: LineChartIcon, label: 'Analytics' },
	],
	[{ href: '/settings', icon: SettingsIcon, label: 'Settings' }],
]

// TODO: Real terms data
export const MOCK_TERMS = {
	arbitration: 'Arbitration',
	email: 'me@example.com',
	jurisdiction: 'California',
	mailingAddress: '1234 Main St, Anytown, USA',
	minimumAge: 13,
	phone: '(555) 123-4567',
}

// TODO: Real testimonial
export const MOCK_TESTIMONIAL = {
	name: 'Sofia Davis',
	quote: 'This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before.',
}

export const PLACEHOLDER_IMAGE = 'https://ui.shadcn.com/placeholder.svg'
