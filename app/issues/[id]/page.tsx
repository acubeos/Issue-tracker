import React from "react"
import prisma from "@/prisma/client"
import { notFound } from "next/navigation"
import { Card, Flex, Heading, Text } from "@radix-ui/themes"
import StatusBadge from "@/app/component/StatusBadge"

interface Props {
	params: { id: string }
}

const page = async ({ params: { id } }: Props) => {
	const issue = await prisma.issue.findUnique({
		where: { id: parseInt(id) },
	})

	if (!issue) notFound()

	return (
		<div>
			<Heading>{issue.title}</Heading>
			<Flex gap={"3"} my={"3"}>
				<StatusBadge status={issue.status} />
				<Text>{issue.createdAt.toDateString()}</Text>
			</Flex>
			<Card style={{ maxWidth: 450 }}>{issue.description}</Card>
		</div>
	)
}

export default page
