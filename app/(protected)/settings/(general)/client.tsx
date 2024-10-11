'use client'

import { updateName } from '@/actions/user'
import { ActionButton } from '@/components/action-button'
import { FormInput } from '@/components/form-input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AuthUser } from '@/lib/utils'
import { useFormState } from 'react-dom'

export function ClientPage({ user }: { user: AuthUser }) {
	const [state, action] = useFormState(updateName, null)

	return (
		<div className='grid gap-6'>
			<form action={action}>
				<Card>
					<CardHeader>
						<CardTitle>Your name</CardTitle>
						<CardDescription>The name you use to identify yourself.</CardDescription>
					</CardHeader>
					<CardContent>
						<FormInput name='name' placeholder={user.name ?? ''} defaultValue={user.name ?? ''} error={state?.errors?.name} />
					</CardContent>
					<CardFooter className='border-t px-6 py-4'>
						<ActionButton>Save</ActionButton>
					</CardFooter>
				</Card>
			</form>
		</div>
	)
}
