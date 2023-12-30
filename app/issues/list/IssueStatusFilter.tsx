"use client"
import { Status } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import React from "react"

const status: { label: string; value?: Status }[] = [
	{ label: "All" },
	{ label: "Open", value: "OPEN" },
	{ label: "Closed", value: "CLOSED" },
	{ label: "In Progress", value: "IN_PROGRESS" },
]

const IssueStatusFilter = () => {
	return (
		<>
			<Select.Root
			// onValueChange={assignedIssue}
			// defaultValue={}
			>
				<Select.Trigger placeholder='Filter by status...' />
				<Select.Content>
					{/* <Select.Group> */}
					{/* <Select.Label>Suggestions</Select.Label> */}
					{status.map((s) => (
						<Select.Item key={s.value} value={s.value || " "}>
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
