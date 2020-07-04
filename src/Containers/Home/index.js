import React, { Fragment } from "react"
import { useQuery } from "@apollo/react-hooks"
import { TODOS_QUERY } from "Graphql/QueryTodo"
import { Stack, DefaultPalette } from "@fluentui/react"
import AddTodo from "Components/AddTodo"
import TodoList from "Components/TodoList"
const sidebar = {
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
const body = {
	root: {
		alignItems: "start",
		background: DefaultPalette.neutralLight,
		display: "flex",
		justifyContent: "flex-start",
		overflow: "hidden",
		marginLeft: "300px !important",
		padding: "16px 24px",
	},
}

// Tokens definition
const outerStackTokens = { childrenGap: 5 }
const innerStackTokens = {
	childrenGap: 5,
	padding: 0,
}
const Home = () => {
	const { loading, error, data: { todos: { data = [] } = {} } = {}, fetchMore } = useQuery(TODOS_QUERY, {
		variables: { size: 100 },
	})
	console.log(data)
	return (
		<Fragment>
			<Stack horizontal tokens={innerStackTokens}>
				<Stack grow styles={sidebar}>
					<Stack verticalAlign="start">
						<h1>Todo App using Fluent UI & React</h1>
						<AddTodo />
					</Stack>
				</Stack>
				<Stack grow styles={body}>
					<Stack verticalAlign="start">
						{loading && "Loading..."}
						{error && "Something went wrong"}
						{data.length && <TodoList data={data} />}
					</Stack>
				</Stack>
			</Stack>
		</Fragment>
	)
}

export default Home
