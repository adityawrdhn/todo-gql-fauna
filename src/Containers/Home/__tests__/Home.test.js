import React from "react"
import { render } from "@testing-library/react"
import Home from ".."
import { Provider } from "react-redux"
import store from "Store"
import { ApolloProvider } from "@apollo/react-hooks"
import client from "Gql"

const Setup = () => {
	const setup = render(
		<ApolloProvider client={client}>
			<Provider store={store}>
				<Home />
			</Provider>
		</ApolloProvider>
	)
	return setup
}
test("Render Homepage Title", () => {
	const { getByText } = Setup()
	const title = getByText(/Todos App/i)
	expect(title).toBeInTheDocument()
})
