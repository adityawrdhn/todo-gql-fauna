import React from "react"
import ReactDOM from "react-dom"
import { ApolloProvider } from "@apollo/react-hooks"
import { Fabric, initializeIcons } from "@fluentui/react"
import { Provider } from "react-redux"
import client from "./Graphql"
import App from "./App"
import store from "Store"
import './index.css'
import * as serviceWorker from "./serviceWorker"

initializeIcons()
ReactDOM.render(
	<Fabric>
		<ApolloProvider client={client}>
			<Provider store={store}>
				<App />
			</Provider>
		</ApolloProvider>
	</Fabric>,
	document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
