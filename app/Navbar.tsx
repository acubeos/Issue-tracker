import Link from "next/link"
import React from "react"
import { FaBug } from "react-icons/fa"

const Navbar = () => {
	const links = [
		{ label: "Dashboard", href: "/" },
		{ label: "Issues", href: "/issues" },
	]

	return (
		<nav className='flex space-x-6 h-16 items-center border-b mb-6 px-4'>
			<Link href='/'>
				<FaBug />
			</Link>

			<ul className='flex space-x-6'>
				{links.map((link) => (
					<li>
						<Link
							className='text-zinc-500 hover:text-zinc-900 transition-colors'
							href={link.href}
						>
							{link.label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default Navbar
