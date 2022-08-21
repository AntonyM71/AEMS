import Container from "@material-ui/core/Container/Container"
import React from "react"
import { Toaster } from "react-hot-toast"
import { BrowserRouter } from "react-router-dom"
import { RecoilRoot } from "recoil"
import RecoilNexus from "recoil-nexus"
import Header from "./components/header/Header"
import Router from "./components/routes/Router"
import Theme from "./components/Theme"
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
export default App
