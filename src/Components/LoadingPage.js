import React from "react"
import { Stack, Spinner, SpinnerSize, DefaultPalette } from "@fluentui/react"
const loadingStyles = {
	root: {
		alignItems: "center",
		background: DefaultPalette.neutralLight,
		display: "flex",
		justifyContent: "center",
		overflow: "hidden",
		width: "100%",
		minHeight: "100vh",
	},
}

const LoadingPage = () => (
	<Stack styles={loadingStyles}>
		<Spinner size={SpinnerSize.large} label="Loading..."/>
	</Stack>
)

export default LoadingPage
