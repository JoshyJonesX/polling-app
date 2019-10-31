import React from "react";
import { Provider } from "react-redux"
import{ configureStore } from "./store"
import { BrowserRouter as Router } from "react-router-dom"
import { Layout } from "./containers"

const store = configureStore()

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout />
        </Router>
    </Provider>
)

export default App
