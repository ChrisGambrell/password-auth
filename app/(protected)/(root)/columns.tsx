'use client'

import { DataTableColumnHeader } from '@/components/data-table/column-header'
import { PLACEHOLDER_IMAGE } from '@/lib/constants'
import { Prisma, User } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'

type ColType = Prisma.UserGetPayload<{ include: { accounts: true; subscriptions: { include: { price: { include: { product: true } } } } } }>

export const columns: ColumnDef<ColType>[] = [
	{
		accessorKey: 'image',
		header: () => <span className='sr-only'>Image</span>,
		cell: ({ getValue }) => (
			<Image
				className='aspect-square rounded-md object-cover'
				src={getValue<User['image']>() ?? PLACEHOLDER_IMAGE}
				alt='Product image'
				height='64'
				width='64'
			/>
		),
		meta: { className: 'hidden sm:table-cell w-[100px]' },
	},
	{
		accessorKey: 'name',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
		cell: ({ getValue }) => <span className='font-medium'>{getValue<User['name']>()}</span>,
	},
	{
		accessorKey: 'email',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Email address' />,
		meta: { className: 'hidden lg:table-cell' },
	},
	{
		accessorKey: 'accounts',
		filterFn: (row, _, value) => row.original.accounts.some((account) => value.includes(account.provider)),
		header: ({ column }) => <DataTableColumnHeader column={column} title='Linked accounts' />,
		cell: ({ getValue }) => (
			<span>
				{getValue<ColType['accounts']>().length > 0
					? getValue<ColType['accounts']>()
							.map((account) => account.provider)
							.join(', ')
					: '-'}
			</span>
		),
		meta: { className: 'hidden lg:table-cell' },
	},
	{
		accessorKey: 'subscriptions',
		filterFn: (row, _, value) => row.original.subscriptions.some((s) => value.includes(s.price?.product?.name ?? '')),
		header: ({ column }) => <DataTableColumnHeader column={column} title='Subscription' />,
		cell: ({ getValue }) => <span className='font-medium'>{getValue<ColType['subscriptions']>()[0]?.price?.product?.name ?? '-'}</span>,
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Created at' />,
		cell: ({ getValue }) => getValue<User['createdAt']>().toLocaleString(),
		meta: { className: 'hidden sm:table-cell' },
	},
]
