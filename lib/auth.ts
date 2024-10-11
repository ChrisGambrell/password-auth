import NextAuth, { NextAuthConfig } from 'next-auth'

export const authConfig = {
	callbacks: {
		authorized: ({ auth, request: { nextUrl } }) => {
			const allowedPages = ['/forgot', '/login', '/privacy', '/register', '/terms']
			const isAuthed = !!auth?.user
			const isAuthRoute = allowedPages.some((page) => nextUrl.pathname.startsWith(page))

			if (!isAuthRoute) {
				if (isAuthed) return true
				return false
			} else if (isAuthed) return Response.redirect(new URL('/', nextUrl))
			return true
		},
	},
	pages: { signIn: '/login' },
	providers: [],
} satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)
