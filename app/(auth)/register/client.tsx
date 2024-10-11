'use client'

import { register } from '@/actions/auth'
import { ActionButton } from '@/components/action-button'
import { FormInput } from '@/components/form-input'
import { useFormState } from 'react-dom'

export function ClientPage() {
	const [state, action] = useFormState(register, null)

	return (
		<form action={action} className='grid gap-y-4 gap-x-2 grid-cols-2'>
			<FormInput label='First name' name='firstName' placeholder='Max' error={state?.errors.firstName} />
			<FormInput label='Last name' name='lastName' placeholder='Robinson' error={state?.errors.lastName} />
			<FormInput
				className='col-span-full'
				label='Email address'
				name='email'
				placeholder='name@example.com'
				type='email'
				error={state?.errors.email}
			/>
			<FormInput label='Password' name='password' type='password' error={state?.errors.password} />
			<FormInput label='Confirm password' name='confirmPassword' type='password' error={state?.errors.confirmPassword} />
			<ActionButton className='col-span-full'>Create account with email</ActionButton>
		</form>
	)
}
