import Container from "@material-ui/core/Container/Container"
import React from "react"
import { BrowserRouter } from "react-router-dom"
import { ToastProvider } from "react-toast-notifications"
import { RecoilRoot } from "recoil"
import Header from "./components/header/Header"
import Router from "./components/routes/Router"
import Theme from "./components/Theme"

const App = () => (
	<RecoilRoot>
		<BrowserRouter>
			<Theme>
				<ToastProvider autoDismiss autoDismissTimeout={3000}>
					<Header />
					<Container maxWidth={false}>
						<Router />
					</Container>
				</ToastProvider>
			</Theme>
		</BrowserRouter>
	</RecoilRoot>
)
export default App
