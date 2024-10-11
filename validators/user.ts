import { z } from 'zod'

export const updateNameSchema = z.object({
	name: z.string({ required_error: 'Name is required' }).min(1, { message: 'Name is required' }),
})

export const updatePasswordSchema = z
	.object({
		password: z.string({ required_error: 'Password is required' }).min(8, { message: 'Password must be at least 8 characters' }),
		confirmPassword: z.string({ required_error: 'Password confirmation is required' }),
	})
	.refine(({ password, confirmPassword }) => password === confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})
