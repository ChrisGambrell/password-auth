'use client'

import { verifyEmail } from '@/actions/auth'
import { ActionButton } from '@/components/action-button'
import { FormInput } from '@/components/form-input'
import { useFormState } from 'react-dom'

export function ClientPage() {
	const [state, action] = useFormState(verifyEmail, null)

	return (
		<form action={action} className='grid gap-4'>
			<FormInput label='Email address' name='email' placeholder='name@example.com' type='email' error={state?.errors.email} />
			<ActionButton>Send magic link</ActionButton>
		</form>
	)
}
