"use client"
import { Status } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import { useRouter, useSearchParams } from "next/navigation"
import React from "react"

const status: { label: string; value?: Status }[] = [
	{ label: "All" },
	{ label: "Open", value: "OPEN" },
	{ label: "Closed", value: "CLOSED" },
	{ label: "In Progress", value: "IN_PROGRESS" },
]

const IssueStatusFilter = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	return (
		<>
			<Select.Root
				onValueChange={(status) => {
					const params = new URLSearchParams()
					if (status) params.append("status", status)
					if (searchParams.get("orderBy"))
						params.append("orderBy", searchParams.get("orderBy")!)

					const query = params.size ? "?" + params.toString() : ""
					router.push("/issues/list" + query)
				}}
				defaultValue={searchParams.get("status") || ""}
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
