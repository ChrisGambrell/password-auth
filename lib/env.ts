import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	server: {
		AUTH_SECRET: z.string().min(1),

		AUTH_RESEND_KEY: z.string().min(1),
		AUTH_RESEND_EMAIL: z.string().email(),

		DATABASE_URL: z.string().url(),
	},
	client: { NEXT_PUBLIC_SITE_URL: z.string().url() },
	runtimeEnv: {
		AUTH_SECRET: process.env.AUTH_SECRET,

		AUTH_RESEND_KEY: process.env.AUTH_RESEND_KEY,
		AUTH_RESEND_EMAIL: process.env.AUTH_RESEND_EMAIL,

		DATABASE_URL: process.env.DATABASE_URL,

		NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
	},
})
