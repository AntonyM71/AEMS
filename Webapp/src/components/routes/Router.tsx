import { Route, Switch } from "react-router-dom"
import { registerRejectedPromise } from "../../topLevelErrorHandler"
import ScoresheetBuilderPage from "../ScoresheetBuilder/ScoresheetBuilderPage"
import { DevRouterPage } from "../dev/DevRouter"
import Judging from "../judging/Judging"
import Scribe from "../judging/roles/Scribe"
import Score from "../score/Score"

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
	scoreSheetBuilder: {
		root: "/scoresheetBuilder"
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
			<Route
				path={routes.scoreSheetBuilder.root}
				component={ScoresheetBuilderPage}
			/>
			<Route exact path={routes.scribe.root} component={Scribe} />
			<Route path={routes.score.root} component={Score} />
		</Switch>
	)
}
export default Router
