import { LayoutProps } from '@cgambrell/utils'
import { SettingsLink } from './components/settings-link'

const links = [
	{ href: '/settings', exact: true, label: 'General' },
	{ href: '/settings/security', label: 'Security' },
]

export default function SettingLayout({ children }: LayoutProps) {
	return (
		<div className='flex flex-col gap-4 md:gap-8'>
			<div className='mx-auto grid w-full max-w-6xl gap-2'>
				<h1 className='text-3xl font-semibold'>Settings</h1>
			</div>
			<div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
				<nav className='grid gap-4 text-sm text-muted-foreground'>
					{links.map((link) => (
						<SettingsLink key={link.href} {...link} />
					))}
				</nav>
				<main>{children}</main>
			</div>
		</div>
	)
}
