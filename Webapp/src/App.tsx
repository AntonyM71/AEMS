import Container from "@mui/material/Container/Container"
import React from "react"
import { Toaster } from "react-hot-toast"
import { BrowserRouter } from "react-router-dom"
import { RecoilRoot } from "recoil"
import RecoilNexus from "recoil-nexus"
import { Provider } from "react-redux"
import Header from "./components/header/Header"
import Router from "./components/routes/Router"
import Theme from "./components/Theme"
import { store } from "./recoil/store"
const App = () => (

	<RecoilRoot>

		<RecoilNexus />
		<BrowserRouter>
			<Theme>
				<Header />
				<Toaster />
				<Container maxWidth={false}>
					<Router />
				</Container>
			</Theme>
		</BrowserRouter>

		</RecoilRoot>

)

const WrappedApp = () => {
	<Provider store={store} >
	<App />
		</Provider>
}

export default WrappedApp
