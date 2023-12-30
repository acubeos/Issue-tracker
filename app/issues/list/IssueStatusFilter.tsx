"use client"
import { Status } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import { useRouter } from "next/navigation"
import React from "react"

const status: { label: string; value?: Status }[] = [
	{ label: "All" },
	{ label: "Open", value: "OPEN" },
	{ label: "Closed", value: "CLOSED" },
	{ label: "In Progress", value: "IN_PROGRESS" },
]

const IssueStatusFilter = () => {
	const router = useRouter()
	return (
		<>
			<Select.Root
				onValueChange={(status) => {
					const query = status ? `?status=${status}` : ""
					router.push("/issues/list" + query)
				}}
				// defaultValue={}
			>
				<Select.Trigger placeholder='Filter by status...' />
				<Select.Content>
					{/* <Select.Group> */}
					{/* <Select.Label>Suggestions</Select.Label> */}
					{status.map((s) => (
						<Select.Item key={s.value} value={s.value || null}>
							{s.label}
						</Select.Item>
					))}
					{/* </Select.Group> */}
				</Select.Content>
			</Select.Root>
		</>
	)
}

export default IssueStatusFilter
