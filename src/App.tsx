import { Container } from "@material-ui/core"
import { BrowserRouter } from "react-router-dom"
import { RecoilRoot } from "recoil"
import Header from "./components/header/Header"
import Router from "./components/routes/Router"
import Theme from "./components/Theme"

const App = () => (
	<RecoilRoot>
		<BrowserRouter>
			<Theme>
				<Header />
				<Container maxWidth={false}>
					<Router />
				</Container>
			</Theme>
		</BrowserRouter>
	</RecoilRoot>
)

export default App
