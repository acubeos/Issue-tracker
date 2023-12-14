"use client"
import { Button, Callout, Text, TextField } from "@radix-ui/themes"
import { InfoCircledIcon } from "@radix-ui/react-icons"

import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import { useForm, Controller } from "react-hook-form"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { createIssueSchema } from "@/app/validationSchema"
import { z } from "zod"
import ErrorMessage from "@/app/component/ErrorMessage"
import ElementSpinner from "@/app/component/ElementSpinner"

type IssueForm = z.infer<typeof createIssueSchema>

const NewPage = () => {
	const {
		register,
		control,
		handleSubmit,

		formState: { errors },
	} = useForm<IssueForm>({
		resolver: zodResolver(createIssueSchema),
	})
	const router = useRouter()
	const [error, setError] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)

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
			<form
				className='space-y-2'
				onSubmit={handleSubmit(async (data) => {
					try {
						setIsSubmitting(true)
						await axios.post("/api/issues", data)
						router.push("/issues")
					} catch (error) {
						setIsSubmitting(false)
						setError("An unexpected error has occured.")
					}
				})}
			>
				<TextField.Root>
					<TextField.Input placeholder='Title' {...register("title")} />
				</TextField.Root>
				{<ErrorMessage>{errors.title?.message}</ErrorMessage>}
				<Controller
					name='description'
					control={control}
					render={({ field }) => (
						<SimpleMDE placeholder='Description' {...field} />
					)}
				/>
				{<ErrorMessage>{errors.description?.message}</ErrorMessage>}
				<Button disabled={isSubmitting}>
					Submit New Issue {isSubmitting && <ElementSpinner />}
				</Button>
			</form>
		</div>
	)
}

export default NewPage
