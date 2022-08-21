import { Route, Switch } from "react-router-dom"
import { registerRejectedPromise } from "../../topLevelErrorHandler"
import { DevRouterPage } from "../dev/DevRouter"
import Judging from "../judging/Judging"
import Scribe from "../judging/roles/Scribe"
import Login from "../login/Login"
import Score from "../score/Score"
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
	},
	score: {
		root: "/score"
	}
}

const Router = () => {
	registerRejectedPromise()

	return (
		<Switch>
			<Route path={routes.dev.root} component={DevRouterPage} />
			<Route path={routes.judging.root} component={Judging} />
			<Route path={routes.login.root} component={Login} />
			<Route path={routes.upload.root} component={Upload} />
			<Route exact path={routes.scribe.root} component={Scribe} />
			<Route path={routes.score.root} component={Score} />
		</Switch>
	)
}
export default Router
