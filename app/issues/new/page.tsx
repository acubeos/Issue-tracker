"use client"
import { Button, Callout, TextField } from "@radix-ui/themes"
import { InfoCircledIcon } from "@radix-ui/react-icons"

import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import { useForm, Controller } from "react-hook-form"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface IssueForm {
	title: string
	description: string
}

const NewPage = () => {
	const { register, control, handleSubmit } = useForm<IssueForm>()
	const router = useRouter()
	const [error, setError] = useState("")

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
				className='space-y-3'
				onSubmit={handleSubmit(async (data) => {
					try {
						await axios.post("/api/issues", data)
						router.push("/issues")
					} catch (error) {
						setError("An unexpected error has occured.")
					}
				})}
			>
				<TextField.Root>
					<TextField.Input placeholder='Title' {...register("title")} />
				</TextField.Root>
				<Controller
					name='description'
					control={control}
					render={({ field }) => (
						<SimpleMDE placeholder='Description' {...field} />
					)}
				/>
				<Button>Submit New Issue</Button>
			</form>
		</div>
	)
}

export default NewPage
