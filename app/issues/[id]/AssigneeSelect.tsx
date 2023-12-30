"use client"

import { Issue, User } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Skeleton from "react-loading-skeleton"
import toast, { Toaster } from "react-hot-toast"

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
	const {
		data: users,
		isLoading,
		error,
	} = useQuery<User[]>({
		queryKey: ["user"],
		queryFn: () => axios.get("/api/user").then((res) => res.data),
	})

	if (error) return null

	if (isLoading) return <Skeleton />
	return (
		<>
			<Select.Root
				onValueChange={(userId) =>
					axios
						.patch(`/api/issues/${issue.id}`, {
							assignedToUserId: userId || null,
						})
						.catch(() => {
							toast.error("Changes could not be saved.")
						})
				}
				defaultValue={issue.assignedToUserId || ""}
			>
				<Select.Trigger placeholder='Assign...' />
				<Select.Content>
					<Select.Group>
						<Select.Label>Suggestions</Select.Label>
						<Select.Item value={null}>Unassigned</Select.Item>
						{users?.map((user) => (
							<Select.Item key={user.id} value={user.id}>
								{user.name}
							</Select.Item>
						))}
					</Select.Group>
				</Select.Content>
			</Select.Root>
			<Toaster />
		</>
	)
}

export default AssigneeSelect
