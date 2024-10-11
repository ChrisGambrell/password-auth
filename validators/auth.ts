import { z } from 'zod'

export const loginSchema = z.object({
	email: z.string({ required_error: 'Email is required' }).min(1, { message: 'Email is required' }).email({ message: 'Invalid email' }),
	password: z.string({ required_error: 'Password is required' }).min(1, { message: 'Password is required' }),
})

export const registerSchema = z
	.object({
		firstName: z.string({ required_error: 'First name is required' }).min(1, { message: 'First name is required' }),
		lastName: z.string({ required_error: 'Last name is required' }).min(1, { message: 'Last name is required' }),
		email: z
			.string({ required_error: 'Email is required' })
			.min(1, { message: 'Email is required' })
			.email({ message: 'Invalid email' }),
		password: z.string({ required_error: 'Password is required' }).min(8, { message: 'Password must be at least 8 characters' }),
		confirmPassword: z.string({ required_error: 'Password confirmation is required' }),
	})
	.refine(({ password, confirmPassword }) => password === confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})

export const verifyEmailSchema = z.object({
	email: z.string({ required_error: 'Email is required' }).min(1, { message: 'Email is required' }).email({ message: 'Invalid email' }),
})
