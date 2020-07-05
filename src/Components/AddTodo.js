import React, { useState } from "react"
import { Stack, TextField, PrimaryButton, Icon, Spinner, SpinnerSize } from "@fluentui/react"
import { useMutation } from "@apollo/react-hooks"
import { ADD_TODO_MUTATION } from "Graphql/MutationTodo"
import { TODOS_QUERY } from "Graphql/QueryTodo"
import { useDispatch } from "react-redux"
import { alertActions } from "Store/Action"

const buttonWidgetStyles = {
	root: {
		fontSize: 16,
		marginRight: 4,
	},
}
const AddTodo = () => {
	const [formData, setFormData] = useState({ title: "", description: "" })
	const { title, description } = formData
	const dispatch = useDispatch()
	const handleChange = ({ target: { value, name } }) => {
		setFormData({ ...formData, [name]: value })
	}
	const [addTodo, { loading }] = useMutation(ADD_TODO_MUTATION, {
		onError(error) {
			dispatch(alertActions.openAlert(error))
		},
		update(cache, { data: { createTodo } }) {
			let { todos } = cache.readQuery({ query: TODOS_QUERY, variables: { size: 200 } })
			const data = [...todos.data, createTodo]
			cache.writeQuery({
				variables: { size: 200 },
				query: TODOS_QUERY,
				data: { todos: { ...todos, data } },
			})
			setFormData({ title: "", description: "" })
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
		<form onSubmit={handleSubmit}>
			<Stack tokens={{ childrenGap: 16 }}>
				<TextField label="Title" placeholder="Title" name="title" value={title} onChange={handleChange} required/>
				<TextField
					label="Description"
					multiline
					rows={3}
					name="description"
					placeholder="Description"
					autoAdjustHeight
					value={description}
					onChange={handleChange}
					resizable={false}
				/>
				{loading && (
					<PrimaryButton type="button">
						<Spinner size={SpinnerSize.small} styles={buttonWidgetStyles} />
						Loading
					</PrimaryButton>
				)}
				{!loading && (
					<PrimaryButton type="submit">
						<Icon iconName="Add" styles={buttonWidgetStyles} />
						Add New Todo
					</PrimaryButton>
				)}
			</Stack>
		</form>
	)
}

export default AddTodo
