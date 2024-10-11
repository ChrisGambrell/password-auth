'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/db'
import { updateNameSchema, updatePasswordSchema } from '@/validators/user'
import { getSuccessRedirect, parseFormData } from '@cgambrell/utils'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

export async function updateName(_prevState: unknown, formData: FormData) {
	const { data, errors } = parseFormData(formData, updateNameSchema)
	if (errors) return { errors }

	const user = await auth()
	await prisma.user.update({ where: { id: user.id }, data: { name: data.name } })

	redirect(getSuccessRedirect('/settings', 'User updated'))
}

export async function updatePassword(_prevState: unknown, formData: FormData) {
	const { data, errors } = parseFormData(formData, updatePasswordSchema)
	if (errors) return { errors }

	const user = await auth()
	const passwordHash = await bcrypt.hash(data.password, 10)
	await prisma.user.update({ where: { id: user.id }, data: { passwordHash } })

	redirect(getSuccessRedirect('/settings/security', 'Password updated'))
}
