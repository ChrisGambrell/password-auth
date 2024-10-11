import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'avatars.githubusercontent.com',
			},
			{
				hostname: 'lh3.googleusercontent.com',
			},
		],
	},
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX()
export default withMDX(nextConfig)
