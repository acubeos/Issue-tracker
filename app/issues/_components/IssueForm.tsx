"use client"
import { Button, Callout, Text, TextField } from "@radix-ui/themes"
import { InfoCircledIcon } from "@radix-ui/react-icons"
import dynamic from "next/dynamic"
// import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import { useForm, Controller } from "react-hook-form"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { issueSchema } from "@/app/validationSchema"
import { z } from "zod"
import ErrorMessage from "@/app/component/ErrorMessage"
import ElementSpinner from "@/app/component/ElementSpinner"
import { Issue } from "@prisma/client"

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
	ssr: false,
})

type IssueFormData = z.infer<typeof issueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {
	const {
		register,
		control,
		handleSubmit,

		formState: { errors },
	} = useForm<IssueFormData>({
		resolver: zodResolver(issueSchema),
	})
	const router = useRouter()
	const [error, setError] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)

	const onSubmit = handleSubmit(async (data) => {
		try {
			setIsSubmitting(true)
			if (issue) await axios.patch("/api/issues/" + issue.id, data)
			else await axios.post("/api/issues", data)
			router.push("/issues")
			router.refresh()
		} catch (error) {
			setIsSubmitting(false)
			setError("An unexpected error has occured.")
		}
	})

	return (
		<div className='max-w-xl'>
			{error && (
				<Callout.Root className='mb-3'>
					<Callout.Icon>
						<InfoCircledIcon />
					</Callout.Icon>
					<Callout.Text color='red'>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form className='space-y-2' onSubmit={onSubmit}>
				<TextField.Root>
					<TextField.Input
						defaultValue={issue?.title}
						placeholder='Title'
						{...register("title")}
					/>
				</TextField.Root>
				{<ErrorMessage>{errors.title?.message}</ErrorMessage>}
				<Controller
					name='description'
					defaultValue={issue?.description}
					control={control}
					render={({ field }) => (
						<SimpleMDE placeholder='Description' {...field} />
					)}
				/>
				{<ErrorMessage>{errors.description?.message}</ErrorMessage>}
				<Button disabled={isSubmitting}>
					{issue ? "Update Issue" : "Submit New Issue"}{" "}
					{isSubmitting && <ElementSpinner />}
				</Button>
			</form>
		</div>
	)
}

export default IssueForm
