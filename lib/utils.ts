import { Prisma } from '@prisma/client'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export type AuthUser = Prisma.UserGetPayload<{}>

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
