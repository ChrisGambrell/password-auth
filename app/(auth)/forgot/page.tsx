import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ClientPage } from './client'

export default function ForgotPage() {
	return (
		<>
			<Link className={cn(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md:top-8')} href='/login'>
				Login
			</Link>
			<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
				<div className='flex flex-col space-y-2 text-center'>
					<h1 className='text-2xl font-semibold tracking-tight'>Forgot your password?</h1>
					<p className='text-sm text-muted-foreground'>Enter your email below to get a magic link.</p>
				</div>
				<ClientPage />
			</div>
		</>
	)
}
