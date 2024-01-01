import React from "react"
import prisma from "@/prisma/client"
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes"
import StatusBadge from "./component/StatusBadge"
import Link from "next/link"

const LatestIssues = async () => {
	const issues = await prisma.issue.findMany({
		orderBy: { createdAt: "desc" },
		take: 5,
		include: { assignedToUser: true },
	})

	return (
		<Card>
			<Heading size='4' mb='4'>
				Lastest Issues
			</Heading>
			<Table.Root>
				<Table.Body>
					{issues.map((issue) => (
						<Table.Row key={issue.id}>
							<Table.Cell>
								<Flex justify='between'>
									<Flex direction='column' align='start' gap='2'>
										<Link href={`/issues/${issue.id}`}>{issue.title}</Link>
										<StatusBadge status={issue.status} />
									</Flex>
									{issue.assignedToUser && (
										<Avatar
											radius='full'
											size='2'
											fallback='?'
											src={issue.assignedToUser.image!}
										/>
									)}
								</Flex>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</Card>
	)
}

export default LatestIssues
