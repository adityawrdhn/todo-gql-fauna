import React, { useMemo, useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import { TODOS_QUERY } from "Gql/QueryTodo"
import { Stack, DefaultPalette, IconButton } from "@fluentui/react"
import AddTodo from "Components/AddTodo"
import TodoList from "Components/TodoList"
import { useDispatch } from "react-redux"
import { alertActions } from "Store/Action"
import LoadingPage from "Components/LoadingPage"

const Home = () => {
	const dispatch = useDispatch()
	const { loading, data: { todos: { data = [] } = {} } = {} } = useQuery(TODOS_QUERY, {
		variables: { size: 200 },
		onError(error) {
			dispatch(alertActions.openAlert(error))
		},
	})
	const [sidebarOpen, setSidebarOpen] = useState(true)
	const sidebarStyles = useMemo(
		() => ({
			root: {
				alignItems: "start",
				background: DefaultPalette.white,
				display: "flex",
				width: 300,
				overflow: "hidden",
				padding: 16,
				position: "fixed",
				height: "100vh",
				marginLeft: sidebarOpen ? "0px !important" : "-300px !important",
				transition: "margin-left 0.35s ease",
			},
		}),
		[sidebarOpen]
	)
	const bodyStyles = useMemo(
		() => ({
			root: {
				alignItems: "start",
				background: DefaultPalette.neutralLight,
				display: "flex",
				justifyContent: "flex-start",
				overflow: "hidden",
				padding: "16px 24px",
				width: "100%",
				minHeight: "100vh",
				marginLeft: sidebarOpen ? "300px !important" : "60px !important",
				transition: "margin-left 0.35s ease",
			},
		}),
		[sidebarOpen]
	)
	const iconToggleStyle = useMemo(
		() => ({
			root: {
				position: sidebarOpen ? "relative" : "fixed",
				marginLeft: sidebarOpen ? "0px !important" : "300px !important",
				backgroundColor: "transparent",
			},
		}),
		[sidebarOpen]
	)

	return (
		<Stack horizontal>
			<Stack styles={sidebarStyles}>
				<Stack verticalAlign="start">
					<Stack horizontal tokens={{ childrenGap: 24 }}>
						<h2>Todos App using React, GraphQL, and Fluent-UI</h2>
						<IconButton
							iconProps={{ iconName: "List", style: { fontSize: 28 } }}
							title="Toggle"
							ariaLabel="Toggle"
							styles={iconToggleStyle}
							onClick={() => setSidebarOpen(!sidebarOpen)}
						/>
					</Stack>
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
