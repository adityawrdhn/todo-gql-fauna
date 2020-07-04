import React from "react"
import { useQuery } from "@apollo/react-hooks"
import { TODOS_QUERY } from "Graphql/QueryTodo"
import { Stack, DefaultPalette } from "@fluentui/react"
import AddTodo from "Components/AddTodo"
import TodoList from "Components/TodoList"
import { useDispatch } from "react-redux"
import { alertActions } from "Store/Action"
import LoadingPage from "Components/LoadingPage"
const sidebarStyles = {
	root: {
		alignItems: "start",
		background: DefaultPalette.white,
		display: "flex",
		width: 300,
		overflow: "hidden",
		padding: 16,
		position: "fixed",
		height: "100vh",
	},
}
const bodyStyles = {
	root: {
		alignItems: "start",
		background: DefaultPalette.neutralLight,
		display: "flex",
		justifyContent: "flex-start",
		overflow: "hidden",
		marginLeft: "300px !important",
		padding: "16px 24px",
		width: "100%",
		minHeight: "100vh",
	},
}

const Home = () => {
	const dispatch = useDispatch()
	const { loading, data: { todos: { data = [] } = {} } = {} } = useQuery(TODOS_QUERY, {
		variables: { size: 200 },
		onError(error) {
			dispatch(alertActions.openAlert(error))
		},
	})
	return (
		<Stack horizontal>
			<Stack styles={sidebarStyles}>
				<Stack verticalAlign="start">
					<h2>Todo App using React, GraphQL, and Fluent-UI</h2>
					<AddTodo />
				</Stack>
			</Stack>
			<Stack styles={bodyStyles}>
				{loading && <LoadingPage />}
				{data && data.length && <TodoList data={data} />}
			</Stack>
		</Stack>
	)
}

export default Home
