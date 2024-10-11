import { GlobalToaster } from '@/components/global-toaster'
import { MOCK_APP_DESC, MOCK_APP_NAME } from '@/lib/constants'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Suspense } from 'react'
import './globals.css'

// Import to verify environment variables are set
import '@/lib/env'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export const metadata: Metadata = {
	title: MOCK_APP_NAME,
	description: MOCK_APP_DESC,
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				{children}
				<Suspense>
					<GlobalToaster />
				</Suspense>
			</body>
		</html>
	)
}
