'use client'

import { updatePassword } from '@/actions/user'
import { ActionButton } from '@/components/action-button'
import { FormInput } from '@/components/form-input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useRef } from 'react'
import { useFormState } from 'react-dom'

export default function SecurityPage() {
	const ref = useRef<HTMLFormElement>(null)
	const [state, action] = useFormState(updatePassword, null)

	useEffect(() => {
		if (state === undefined) ref.current?.reset()
	}, [state])

	return (
		<div className='grid gap-6'>
			<form action={action} ref={ref}>
				<Card>
					<CardHeader>
						<CardTitle>Your password</CardTitle>
						<CardDescription>Your credentials for logging in.</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='grid gap-2'>
							<FormInput name='password' placeholder='New password' type='password' error={state?.errors?.password} />
							<FormInput
								name='confirmPassword'
								placeholder='Confirm password'
								type='password'
								error={state?.errors?.confirmPassword}
							/>
						</div>
					</CardContent>
					<CardFooter className='border-t px-6 py-4'>
						<ActionButton>Save</ActionButton>
					</CardFooter>
				</Card>
			</form>
		</div>
	)
}
