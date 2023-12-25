import { Table } from "@radix-ui/themes"
import React from "react"
import prisma from "@/prisma/client"
import StatusBadge from "../../component/StatusBadge"
import IssueAction from "./IssueAction"
import Link from "../../component/Link"

const page = async () => {
	const issues = await prisma.issue.findMany()

	return (
		<div>
			<IssueAction />
			<Table.Root variant='surface'>
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className='hidden md:table-cell'>
							Status
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className='hidden md:table-cell'>
							Created
						</Table.ColumnHeaderCell>
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