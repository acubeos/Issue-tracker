"use client"
import classnames from "classnames"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import { FaBug } from "react-icons/fa"
import { useSession } from "next-auth/react"
import {
	Avatar,
	Box,
	Container,
	DropdownMenu,
	Flex,
	Text,
} from "@radix-ui/themes"

const Navbar = () => {
	const links = [
		{ label: "Dashboard", href: "/" },
		{ label: "Issues", href: "/issues/list" },
	]

	const { status, data: session } = useSession()
	const pathName = usePathname()
	return (
		<nav className='py-3 items-center border-b mb-6 px-4'>
			<Container>
				<Flex justify='between'>
					<Flex align='center' gap='3'>
						<Link href='/'>
							<FaBug />
						</Link>
						<ul className='flex space-x-6'>
							{links.map((link) => (
								<li key={link.href}>
									<Link
										className={classnames({
											"text-zinc-900": link.href === pathName,
											"text-zinc-500": link.href !== pathName,
											"hover:text-zinc-800 transition-colors": true,
										})}
										href={link.href}
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</Flex>
					<Box>
						{status === "authenticated" && (
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									<Avatar
										className='cursor-pointer'
										src={session.user!.image!}
										fallback='?'
										size='2'
										radius='full'
									/>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content>
									<DropdownMenu.Label>
										<Text size='2'>{session.user!.email}</Text>
									</DropdownMenu.Label>
									<DropdownMenu.Item>
										<Link href='/api/auth/signout'>Sign out</Link>
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						)}
						{status === "unauthenticated" && (
							<Link href='/api/auth/signin'>Login</Link>
						)}
					</Box>
				</Flex>
			</Container>
		</nav>
	)
}

export default Navbar
