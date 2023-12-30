import { Table } from "@radix-ui/themes"
import React from "react"
import prisma from "@/prisma/client"
import StatusBadge from "../../component/StatusBadge"
import IssueAction from "./IssueAction"
import Link from "../../component/Link"
import { Issue, Status } from "@prisma/client"
import NextLink from "next/link"
import { ArrowUpIcon } from "@radix-ui/react-icons"
interface Props {
	searchParams: { status: Status; orderBy: keyof Issue }
}

const page = async ({ searchParams }: Props) => {
	const statuses = Object.values(Status)
	const status = statuses.includes(searchParams.status)
		? searchParams.status
		: undefined

	const column: { label: string; value: keyof Issue; className?: string }[] = [
		{ label: "Issue", value: "title" },
		{ label: "Status", value: "status", className: "hidden md:table-cell" },
		{
			label: "Created",
			value: "createdAt",
			className: "hidden md:table-cell",
		},
	]

	const issues = await prisma.issue.findMany({
		where: {
			status,
		},
	})

	return (
		<div>
			<IssueAction />
			<Table.Root variant='surface'>
				<Table.Header>
					<Table.Row>
						{column.map((column) => (
							<Table.ColumnHeaderCell key={column.value}>
								<NextLink
									href={{
										query: { ...searchParams, orderBy: column.value },
									}}
								>
									{column.label}
								</NextLink>
								{column.value === searchParams.orderBy && (
									<ArrowUpIcon className='inline' />
								)}
							</Table.ColumnHeaderCell>
						))}
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{issues.map((issue) => (
						<Table.Row key={issue.id}>
							<Table.RowHeaderCell>
								<Link href={`/issues/${issue.id}`}>{issue.title}</Link>
								<div className='block md:hidden'>
									<StatusBadge status={issue.status} />
								</div>
							</Table.RowHeaderCell>
							<Table.Cell className='hidden md:table-cell'>
								<StatusBadge status={issue.status} />
							</Table.Cell>
							<Table.Cell className='hidden md:table-cell'>
								{issue.createdAt.toDateString()}
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</div>
	)
}

export default page
