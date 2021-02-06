import { Route, Switch } from "react-router-dom"
import DevRouter from "../dev/DevRouter"
import Judging from "../judging/Judging"
import Scribe from "../judging/roles/Scribe"
import Login from "../login/Login"
import Upload from "../upload/Upload"
export const routes = {
	dev: {
		root: "/dev"
	},
	judging: {
		root: "/judging"
	},
	login: {
		root: "/login"
	},
	upload: {
		root: "/upload"
	},
	scribe: {
		root: "/scribe/:scribe"
	}
}

const Router = () => (
	<Switch>
		<Route path={routes.dev.root} component={DevRouter} />
		<Route path={routes.judging.root} component={Judging} />
		<Route path={routes.login.root} component={Login} />
		<Route path={routes.upload.root} component={Upload} />
		<Route exact path={routes.scribe.root} component={Scribe} />
	</Switch>
)

export default Router
