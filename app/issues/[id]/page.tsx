import React from "react"
import prisma from "@/prisma/client"
import { notFound } from "next/navigation"
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes"
import StatusBadge from "@/app/component/StatusBadge"
import ReactMarkdown from "react-markdown"
import { Pencil2Icon } from "@radix-ui/react-icons"
import Link from "next/link"

interface Props {
	params: { id: string }
}

const page = async ({ params: { id } }: Props) => {
	const issue = await prisma.issue.findUnique({
		where: { id: parseInt(id) },
	})

	if (!issue) notFound()

	return (
		<Grid columns={{ initial: "1", md: "2" }} gap='3'>
			<Box>
				<Heading>{issue.title}</Heading>
				<Flex gap={"3"} my={"3"}>
					<StatusBadge status={issue.status} />
					<Text>{issue.createdAt.toDateString()}</Text>
				</Flex>
				<Card className='prose' mt='4'>
					<ReactMarkdown>{issue.description}</ReactMarkdown>
				</Card>
			</Box>
			<Box>
				<Button>
					<Pencil2Icon />
					<Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
				</Button>
			</Box>
		</Grid>
	)
}

export default page
