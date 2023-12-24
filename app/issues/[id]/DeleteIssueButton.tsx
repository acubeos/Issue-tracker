"use client"
import ElementSpinner from "@/app/component/ElementSpinner"
import { AlertDialog, Button, Flex } from "@radix-ui/themes"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
	const router = useRouter()
	const [error, setError] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)

	const issueDelete = async () => {
		try {
			setIsDeleting(true)
			await axios.delete("/api/issues/" + issueId)
			router.push("/issues/list")
			router.refresh()
		} catch (error) {
			setError(true)
			setIsDeleting(false)
		}
	}

	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button color='red' disabled={isDeleting}>
						Delete Issue{isDeleting && <ElementSpinner />}
					</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content style={{ maxWidth: 450 }}>
					<AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
					<AlertDialog.Description size='2'>
						Are you sure you want to delete this issue?
					</AlertDialog.Description>

					<Flex gap='3' mt='4' justify='end'>
						<AlertDialog.Cancel>
							<Button variant='soft' color='gray'>
								Cancel
							</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action>
							<Button variant='solid' color='red' onClick={issueDelete}>
								Delete
							</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>

			<AlertDialog.Root open={error}>
				<AlertDialog.Content style={{ maxWidth: 450 }}>
					<AlertDialog.Title color='red'>Error</AlertDialog.Title>
					<AlertDialog.Description size='2'>
						This issue could not be detected.
					</AlertDialog.Description>
					<AlertDialog.Action>
						<Button
							mt='4'
							variant='soft'
							color='gray'
							onClick={() => setError(false)}
						>
							OK
						</Button>
					</AlertDialog.Action>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</>
	)
}

export default DeleteIssueButton
