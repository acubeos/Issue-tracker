import { z } from "zod"

export const issueSchema = z.object({
	title: z
		.string()
		.min(3, { message: "Title must contain at least 3 characters" })
		.max(250, { message: "Title must not exceed 250 characters" }),
	description: z.string().min(1),
})
