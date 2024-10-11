'use client'

import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export function Search() {
	const router = useRouter()
	const [value, setValue] = useState('')

	const debounced = useDebouncedCallback((value) => {
		router.push(`?q=${value}`)
	}, 500)

	return (
		<div className='relative ml-auto flex-1 md:grow-0'>
			<SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
			<Input
				type='search'
				placeholder='Search...'
				className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]'
				value={value}
				onChange={(e) => {
					setValue(e.target.value)
					debounced(e.target.value)
				}}
			/>
		</div>
	)
}
