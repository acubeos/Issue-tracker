import prisma from "@/prisma/client"
import { Box, Grid } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import EditIssueButton from "./EditIssueButton"
import IssueDetails from "./IssueDetails"

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
				<IssueDetails issue={issue} />
			</Box>
			<Box>
				<EditIssueButton issueId={issue.id} />
			</Box>
		</Grid>
	)
}

export default page