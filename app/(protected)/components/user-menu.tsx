import { logout } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User2Icon } from 'lucide-react'
import Link from 'next/link'

export function UserMenu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='icon' className='overflow-hidden rounded-full'>
					<User2Icon className='size-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<Link href='/settings'>
					<DropdownMenuItem>Settings</DropdownMenuItem>
				</Link>
				<Link href='/plans'>
					<DropdownMenuItem>Plans</DropdownMenuItem>
				</Link>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<form action={logout}>
						<button className='w-full text-left' type='submit'>
							Logout
						</button>
					</form>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
