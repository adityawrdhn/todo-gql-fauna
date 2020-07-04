import React, { useState } from "react"
import { Stack, TextField, PrimaryButton } from "@fluentui/react"
import { useMutation } from "@apollo/react-hooks"
import { ADD_TODO_MUTATION } from "Graphql/MutationTodo"
import { TODOS_QUERY } from "Graphql/QueryTodo"

const AddTodo = () => {
	const [formData, setFormData] = useState({ title: "", description: "" })
	const { title, description } = formData

	const handleChange = ({ target: { value, name } }) => {
		setFormData({ ...formData, [name]: value })
	}
	const [addTodo] = useMutation(ADD_TODO_MUTATION, {
		onError(error) {
			console.log(error)
		},
		update(cache, { data: { createTodo } }) {
			let { todos } = cache.readQuery({ query: TODOS_QUERY, variables: { size: 100 } })
			const data = [...todos.data, createTodo]
			cache.writeQuery({
				variables: { size: 100 },
				query: TODOS_QUERY,
				data: { todos: { ...todos, data } },
			})
		},
	})
	const handleSubmit = (e) => {
		e.preventDefault()
		const body = {
			title,
			description,
			completed: false,
			created: Math.floor(new Date()).toString(),
		}
		addTodo({ variables: { data: body } })
	}

	return (
		<Stack column tokens={{ childrenGap: 16 }}>
			<TextField label="Title" placeholder="Title" name="title" value={title} onChange={handleChange} />
			<TextField
				label="Description"
				multiline
				rows={3}
				name="description"
				placeholder="Description"
				value={description}
				onChange={handleChange}
			/>
			<PrimaryButton onClick={handleSubmit}>Add New Todo</PrimaryButton>
		</Stack>
	)
}

export default AddTodo
