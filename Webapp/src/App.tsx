import Container from "@mui/material/Container/Container"
import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import Header from "./components/header/Header"
import Router from "./components/routes/Router"
import Theme from "./components/Theme"
import { setupStore } from "./recoil/store"
const store = setupStore()
const App = () => (
	<BrowserRouter>
		<Theme>
			<Header />
			<Toaster />
			<Container maxWidth={false}>
				<Router />
			</Container>
		</Theme>
	</BrowserRouter>
)

const WrappedApp = () => (
	<Provider store={store}>
		<App />
	</Provider>
)

export default WrappedApp
