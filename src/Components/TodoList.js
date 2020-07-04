import React from "react"
import { Stack, Label, Text, DefaultPalette, FontWeights } from "@fluentui/react"
import { useMutation } from "@apollo/react-hooks"
import { UPDATE_TODO_MUTATION, DELETE_TODO_MUTATION } from "Graphql/MutationTodo"
import { TODOS_QUERY } from "Graphql/QueryTodo"
import TodoItem from "./TodoItem"
const innerStackTokens = {
	childrenGap: 24,
}
const titleTextStyles = {
	root: {
		color: DefaultPalette.black,
		fontWeight: FontWeights.semibold,
		fontSize: 24,
	},
}
const TodoList = ({ data }) => {
	const [updateTodo] = useMutation(UPDATE_TODO_MUTATION, {
		onError(error) {
			console.log(error)
		},
		update(cache, { data: { updateTodo } }) {
			let { todos } = cache.readQuery({ query: TODOS_QUERY, variables: { size: 100 } })
			const index = todos.data.findIndex(({ _id }) => _id === updateTodo._id)
			if (index > -1) {
				todos.data[index] = updateTodo
			}
			cache.writeQuery({
				query: TODOS_QUERY,
				data: { todos: { ...todos } },
			})
		},
	})
	const [deleteTodo] = useMutation(DELETE_TODO_MUTATION, {
		onError(error) {
			console.log(error)
		},
		update(cache, { data: { deleteTodo } }) {
			let { todos } = cache.readQuery({ query: TODOS_QUERY, variables: { size: 100 } })
			const index = todos.data.findIndex(({ _id }) => _id === deleteTodo._id)
			if (index > -1) {
				todos.data.splice(index, 1)
			}
			const data = [...todos.data]
			cache.writeQuery({
				query: TODOS_QUERY,
				data: { todos: { ...todos, data } },
			})
		},
	})
	return (
		<Stack horizontal tokens={innerStackTokens}>
			<Stack.Item grow={1}>
				<Text styles={titleTextStyles}>Todos</Text>
				{data.filter((key) => !key.completed).length > 0 ? (
					data
						.filter((key) => !key.completed)
						.map(({ _id, title, description, created, completed }, index) => (
							<TodoItem
								todo={{ _id, title, description, created, completed }}
								key={index}
								onComplete={() =>
									updateTodo({
										variables: {
											id: _id,
											data: { title, description, created, completed: !completed },
										},
									})
								}
								onDelete={() => deleteTodo({ variables: { id: _id } })}
							/>
						))
				) : (
					<Label>Todo list is empty...</Label>
				)}
			</Stack.Item>
			<Stack.Item grow={1}>
				<Text styles={titleTextStyles}>Complete</Text>
				{data.filter((key) => key.completed).length > 0 ? (
					data
						.filter((key) => key.completed)
						.map(({ _id, title, description, created, completed }, index) => (
							<TodoItem
								todo={{ _id, title, description, created, completed }}
								key={index}
								onComplete={() =>
									updateTodo({
										variables: {
											id: _id,
											data: { title, description, created, completed: !completed },
										},
									})
								}
								onDelete={() => deleteTodo({ variables: { id: _id } })}
							/>
						))
				) : (
					<Label>Todo list is empty...</Label>
				)}
			</Stack.Item>
		</Stack>
	)
}

export default TodoList
