'use client'

import { Loader2Icon } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { cn } from '../lib/utils'
import { Button, ButtonProps } from './ui/button'

export function ActionButton({ children, className, disabled, loading, ...props }: ButtonProps & { loading?: boolean }) {
	const { pending } = useFormStatus()

	return (
		<Button className={cn('relative', className)} disabled={disabled || loading || pending} type='submit' {...props}>
			<span className={cn('flex items-center', { invisible: loading || pending })}>{children}</span>
			{(loading || pending) && (
				<div className='absolute m-auto'>
					<Loader2Icon className='size-5 animate-spin' />
				</div>
			)}
		</Button>
	)
}
