'use client'

import { DataTableColumnHeader } from '@/components/data-table/column-header'
import { PLACEHOLDER_IMAGE } from '@/lib/constants'
import { User } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'

export const columns: ColumnDef<User>[] = [
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
		meta: { className: 'hidden md:table-cell' },
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Created at' />,
		cell: ({ getValue }) => getValue<User['createdAt']>().toLocaleString(),
	},
]
