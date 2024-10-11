'use server'

import prisma from '@/lib/db'
import { registerSchema } from '@/validators/auth'
import { getErrorRedirect, getSuccessRedirect, parseFormData } from '@cgambrell/utils'
import { Prisma } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'

export async function register(_prevState: unknown, formData: FormData) {
	const { data, errors } = parseFormData(formData, registerSchema)
	if (errors) return { errors }

	try {
		const passwordHash = await bcrypt.hash(data.password, 10)
		await prisma.user.create({ data: { name: `${data.firstName} ${data.lastName}`, email: data.email, passwordHash } })
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002')
			return { errors: { email: ['User already exists with that email'] } }
		else if (error instanceof AuthError) redirect(getErrorRedirect('/register', error.cause?.err?.message))
		throw error
	}

	redirect(getSuccessRedirect('/login', 'Account created, please login'))
}
