import React, { lazy, Suspense, Fragment } from "react"
// import logo from "./logo.svg"
import "./App.css"
const Home = lazy(() => import("./Containers/Home"))
const App = () => {
    return (
        <Suspense fallback={<Fragment>Loading...</Fragment>}>
            <Home />
        </Suspense>
    )
}

export default App
