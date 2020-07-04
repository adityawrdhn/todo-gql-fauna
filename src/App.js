import React, { lazy, Suspense } from "react"
import LoadingPage from "Components/LoadingPage"
const Home = lazy(() => import("./Containers/Home"))
const AlertModal = lazy(() => import("./Components/AlertModal"))
const App = () => {
	return (
		<Suspense fallback={<LoadingPage />}>
			<Home />
			<AlertModal />
		</Suspense>
	)
}

export default App
