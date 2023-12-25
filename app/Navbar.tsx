"use client"
import classnames from "classnames"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import { FaBug } from "react-icons/fa"
import { useSession } from "next-auth/react"
import { Box } from "@radix-ui/themes"

const Navbar = () => {
	const links = [
		{ label: "Dashboard", href: "/" },
		{ label: "Issues", href: "/issues/list" },
	]

	const { status, data: session } = useSession()
	const pathName = usePathname()
	return (
		<nav className='flex space-x-6 h-16 items-center border-b mb-6 px-4'>
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
			<Box>
				{status === "authenticated" && (
					<Link href='/api/auth/signout'>Sign out</Link>
				)}
				{status === "unauthenticated" && (
					<Link href='/api/auth/signin'>Sign in</Link>
				)}
			</Box>
		</nav>
	)
}

export default Navbar
