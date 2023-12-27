"use client"
import { Issue, User } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Skeleton from "react-loading-skeleton"

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
	const {
		data: users,
		isLoading,
		error,
	} = useQuery<User[]>({
		queryKey: ["user"],
		queryFn: () => axios.get("/api/user").then((res) => res.data),
		staleTime: 60 * 1000,
		retry: 3,
	})

	if (error) return null

	if (isLoading) return <Skeleton />
	return (
		<Select.Root
			defaultValue={issue.assignedToUserId || " "}
			onValueChange={(userId) =>
				axios.patch("/api/issues/" + issue.id, {
					userId,
				})
			}
		>
			<Select.Trigger placeholder='Assigned...' />
			<Select.Content>
				<Select.Group>
					<Select.Label>Suggestions</Select.Label>
					<Select.Item value=' '>Unassigned</Select.Item>
					{users?.map((user) => (
						<Select.Item key={user.id} value={user.id}>
							{user.name}
						</Select.Item>
					))}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	)
}

export default AssigneeSelect
