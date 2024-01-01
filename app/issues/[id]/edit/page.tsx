import React from "react"
import IssueForm from "../../_components/IssueForm"
import prisma from "@/prisma/client"
import { notFound } from "next/navigation"

interface Props {
	params: { id: string }
}

const EditIssuePage = async ({ params: { id } }: Props) => {
	const issue = await prisma.issue.findUnique({
		where: { id: parseInt(id) },
	})

	if (!issue) notFound()

	return <IssueForm issue={issue} />
}

export async function generateMetadata({ params }: Props) {
	const issue = await prisma.issue.findUnique({
		where: { id: parseInt(params.id) },
	})
	return {
		title: issue?.title,
		description: `Details of issue ${issue?.id}`,
	}
}

export default EditIssuePage
