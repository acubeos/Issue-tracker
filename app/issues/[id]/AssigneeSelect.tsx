"use client"

import { Issue, User } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import Skeleton from "react-loading-skeleton"

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
	const { data: users, isLoading, error } = useUsers()

	if (error) return null

	if (isLoading) return <Skeleton />

	const assignedIssue = (userId: string) =>
		axios
			.patch(`/api/issues/${issue.id}`, {
				assignedToUserId: userId || null,
			})
			.catch(() => {
				toast.error("Changes could not be saved.")
			})
	return (
		<>
			<Select.Root
				onValueChange={assignedIssue}
				defaultValue={issue.assignedToUserId || ""}
			>
				<Select.Trigger placeholder='Assign...' />
				<Select.Content>
					<Select.Group>
						<Select.Label>Suggestions</Select.Label>
						<Select.Item value={" "}>Unassigned</Select.Item>
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
const useUsers = () =>
	useQuery<User[]>({
		queryKey: ["user"],
		queryFn: () => axios.get("/api/user").then((res) => res.data),
		staleTime: 24 * 60 * 60 * 1000,
		retry: 3,
	})

export default AssigneeSelect
