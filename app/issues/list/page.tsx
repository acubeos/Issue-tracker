import Pagination from "@/app/component/Pagination"
import prisma from "@/prisma/client"
import { Status } from "@prisma/client"
import { Flex } from "@radix-ui/themes"
import IssueAction from "./IssueAction"
import IssueTable, { IssueQuery, columnNames } from "./IssueTable"
interface Props {
	searchParams: IssueQuery
}

const page = async ({ searchParams }: Props) => {
	const orderBy = columnNames.includes(searchParams.orderBy)
		? { [searchParams.orderBy]: "asc" }
		: undefined

	const statuses = Object.values(Status)
	const status = statuses.includes(searchParams.status)
		? searchParams.status
		: undefined
	const where = { status }

	const page = parseInt(searchParams.page) || 1
	const pageSize = 10

	const issues = await prisma.issue.findMany({
		where,
		orderBy,
		skip: (page - 1) * pageSize,
		take: pageSize,
	})

	const issueCount = await prisma.issue.count({
		where,
	})

	return (
		<Flex direction='column' gap='3'>
			<IssueAction />
			<IssueTable searchParams={searchParams} issues={issues} />
			<Pagination
				pageSize={pageSize}
				currentPage={page}
				itemCount={issueCount}
			/>
		</Flex>
	)
}

export default page
