import { z } from "zod"

export const issueSchema = z.object({
	title: z
		.string()
		.min(3, { message: "Title must contain at least 3 characters" })
		.max(255, { message: "Title must not exceed 250 characters" }),
	description: z.string().min(1).max(65535),
})

export const patchIssueSchema = z.object({
	title: z
		.string()
		.min(3, { message: "Title must contain at least 3 characters" })
		.max(255, { message: "Title must not exceed 250 characters" })
		.optional(),
	description: z.string().min(1).max(65535).optional(),
	assignedToUserId: z
		.string()
		.min(1, { message: "AssignedToUserId is required" })
		.max(255, { message: "AssignedToUserId must not exceed 250 characters" })
		.optional()
		.nullable(),
})
