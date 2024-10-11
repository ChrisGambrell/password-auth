import { MOCK_APP_ICON, MOCK_APP_NAME, MOCK_TESTIMONIAL, PLACEHOLDER_IMAGE } from '@/lib/constants'
import { LayoutProps } from '@cgambrell/utils'
import Image from 'next/image'

export default function AuthLayout({ children }: LayoutProps) {
	return (
		<div className='relative flex-col items-center justify-center grid lg:max-w-none lg:h-screen lg:grid-cols-2 lg:px-0'>
			<div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
				<div className='absolute inset-0'>
					<Image className='w-full h-full object-cover' src={PLACEHOLDER_IMAGE} alt='auth-feature' width={1000} height={1000} />
				</div>
				<div className='relative z-20 flex items-center text-lg font-medium'>
					<MOCK_APP_ICON className='mr-2 h-6 w-6' />
					<span>{MOCK_APP_NAME}</span>
				</div>
				<div className='relative z-20 mt-auto'>
					<blockquote className='space-y-2'>
						<p className='text-lg'>&ldquo;{MOCK_TESTIMONIAL.quote}&rdquo;</p>
						<footer className='text-sm'>{MOCK_TESTIMONIAL.name}</footer>
					</blockquote>
				</div>
			</div>
			<div className='px-4 pt-24 lg:p-8'>{children}</div>
		</div>
	)
}
