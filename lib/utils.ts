import { Prisma } from '@prisma/client'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export type AuthUser = Prisma.UserGetPayload<{ include: { subscriptions: { include: { price: { include: { product: true } } } } } }>

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
