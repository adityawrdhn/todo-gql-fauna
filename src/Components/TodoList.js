import React, { useState } from "react"
import { Stack, Label, Text, DefaultPalette, FontWeights } from "@fluentui/react"
import { useMutation } from "@apollo/react-hooks"
import { UPDATE_TODO_MUTATION, DELETE_TODO_MUTATION } from "Graphql/MutationTodo"
import { TODOS_QUERY } from "Graphql/QueryTodo"
import TodoItem from "./TodoItem"
import { useDispatch } from "react-redux"
import { alertActions } from "Store/Action"

const innerStackTokens = {
	childrenGap: 24,
	width: "100%",
}
const titleTextStyles = {
	root: {
		color: DefaultPalette.black,
		fontWeight: FontWeights.semibold,
		fontSize: 24,
	},
}
const rowStyles = {
	root: {
		width: "100%",
	},
}
const colStyles = {
	root: {
		width: "100%",
		background: DefaultPalette.neutralLighter,
		padding: 16,
	},
}
const TodoList = ({ data }) => {
	const [loadingId, setLoadingId] = useState("")
	const dispatch = useDispatch()
	const [updateTodo, { loading: updateLoading }] = useMutation(UPDATE_TODO_MUTATION, {
		onError(error) {
			dispatch(alertActions.openAlert(error))
		},
		update(cache, { data: { updateTodo } }) {
			if (updateTodo) {
				let { todos } = cache.readQuery({ query: TODOS_QUERY, variables: { size: 200 } })
				const index = todos.data.findIndex(({ _id }) => _id === updateTodo._id)
				if (index > -1) {
					todos.data[index] = updateTodo
				}
				cache.writeQuery({
					query: TODOS_QUERY,
					data: { todos: { ...todos } },
				})
			}
		},
		onCompleted() {
			setLoadingId("")
		},
	})
	const [deleteTodo, { loading: deleteLoading }] = useMutation(DELETE_TODO_MUTATION, {
		onError(error) {
			dispatch(alertActions.openAlert(error))
		},
		update(cache, { data: { deleteTodo } }) {
			if (deleteTodo) {
				let { todos } = cache.readQuery({ query: TODOS_QUERY, variables: { size: 200 } })
				const index = todos.data.findIndex(({ _id }) => _id === deleteTodo._id)
				if (index > -1) {
					todos.data.splice(index, 1)
				}
				const data = [...todos.data]
				cache.writeQuery({
					query: TODOS_QUERY,
					data: { todos: { ...todos, data } },
				})
			}
		},
		onCompleted() {
			setLoadingId("")
		},
	})
	return (
		<Stack horizontal tokens={innerStackTokens} styles={rowStyles}>
			<Stack grow={1} styles={colStyles}>
				<Text styles={titleTextStyles}>Todos</Text>
				<hr />
				{data.filter((key) => !key.completed).length > 0 ? (
					data
						.filter((key) => !key.completed)
						.map(({ _id, title, description, created, completed }, index) => (
							<TodoItem
								todo={{ _id, title, description, created, completed }}
								key={index}
								onComplete={() => {
									setLoadingId(_id)
									updateTodo({
										variables: {
											id: _id,
											data: { title, description, created, completed: !completed },
										},
									})
								}}
								onDelete={() => {
									setLoadingId(_id)
									deleteTodo({ variables: { id: _id } })
								}}
								updateLoading={loadingId === _id && updateLoading}
								deleteLoading={loadingId === _id && deleteLoading}
							/>
						))
				) : (
					<Label>You have no active todo</Label>
				)}
			</Stack>
			<Stack grow={1} styles={colStyles}>
				<Text styles={titleTextStyles}>Complete</Text>
				<hr />
				{data.filter((key) => key.completed).length > 0 ? (
					data
						.filter((key) => key.completed)
						.map(({ _id, title, description, created, completed }, index) => (
							<TodoItem
								todo={{ _id, title, description, created, completed }}
								key={index}
								onComplete={() => {
									setLoadingId(_id)
									updateTodo({
										variables: {
											id: _id,
											data: { title, description, created, completed: !completed },
										},
									})
								}}
								onDelete={() => {
									setLoadingId(_id)
									deleteTodo({ variables: { id: _id } })
								}}
								updateLoading={loadingId === _id && updateLoading}
								deleteLoading={loadingId === _id && deleteLoading}
							/>
						))
				) : (
					<Label>You have no completed todo</Label>
				)}
			</Stack>
		</Stack>
	)
}

export default TodoList
