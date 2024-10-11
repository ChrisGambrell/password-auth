import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'
import Link from 'next/link'
import { ClientPage } from './client'

export const metadata: Metadata = {
	title: 'Register',
	description: 'Create an account',
}

export default function RegisterPage() {
	return (
		<>
			<Link className={cn(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md:top-8')} href='/login'>
				Login
			</Link>
			<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
				<div className='flex flex-col space-y-2 text-center'>
					<h1 className='text-2xl font-semibold tracking-tight'>Create an account</h1>
					<p className='text-sm text-muted-foreground'>Enter your email below to create your account</p>
				</div>
				<ClientPage />
				<p className='px-8 text-center text-sm text-muted-foreground'>
					By clicking continue, you agree to our{' '}
					<Link className='underline underline-offset-4 hover:text-primary' href='/terms'>
						Terms of Service
					</Link>{' '}
					and{' '}
					<Link className='underline underline-offset-4 hover:text-primary' href='/privacy'>
						Privacy Policy
					</Link>
					.
				</p>
			</div>
		</>
	)
}
