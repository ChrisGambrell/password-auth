import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import prisma from '@/lib/db'
import { getSearchParam, ServerProps } from '@cgambrell/utils'
import { FileIcon, ListFilterIcon, PlusCircleIcon } from 'lucide-react'
import { Metadata } from 'next'
import { columns } from './columns'

export const metadata: Metadata = {
	title: 'Users',
	description: 'Manage your users and view their linked accounts.',
}

export default async function RootPage({ searchParams }: ServerProps) {
	const q = getSearchParam(searchParams, 'q') ?? ''
	const users = await prisma.user.findMany({
		where: { OR: [{ email: { contains: q, mode: 'insensitive' } }, { name: { contains: q, mode: 'insensitive' } }] },
		include: { accounts: true },
	})

	return (
		<div className='grid items-start gap-4 md:gap-8'>
			<Tabs defaultValue='all'>
				<div className='flex items-center'>
					<TabsList>
						<TabsTrigger value='all'>All</TabsTrigger>
						<TabsTrigger value='active'>Active</TabsTrigger>
						<TabsTrigger value='draft'>Draft</TabsTrigger>
						<TabsTrigger value='archived' className='hidden sm:flex'>
							Archived
						</TabsTrigger>
					</TabsList>
					<div className='ml-auto flex items-center gap-2'>
						<Button variant='outline' size='sm' className='h-7 gap-1'>
							<ListFilterIcon className='h-3.5 w-3.5' />
							<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Filter</span>
						</Button>
						<Button size='sm' variant='outline' className='h-7 gap-1'>
							<FileIcon className='h-3.5 w-3.5' />
							<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Export</span>
						</Button>
						<Button size='sm' className='h-7 gap-1'>
							<PlusCircleIcon className='h-3.5 w-3.5' />
							<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Add Product</span>
						</Button>
					</div>
				</div>
				<TabsContent value='all'>
					<Card>
						<CardHeader>
							<CardTitle>Users</CardTitle>
							<CardDescription>Manage your users and view their linked accounts.</CardDescription>
						</CardHeader>
						<CardContent>
							<DataTable columns={columns} data={users} defaultState={{ sorting: [{ id: 'createdAt', desc: true }] }} />
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
