import { Button } from "@material-ui/core"
import Link from "@material-ui/core/Link"
import Paper from "@material-ui/core/Paper"
import React from "react"
import {
	Link as RouterLink,
	Route,
	Switch,
	useRouteMatch
} from "react-router-dom"
import { useStyles } from "../../style/Styles"
import { SandpitPage } from "./sandpit"
import Style from "./Style"

export const DevRouterPage = () => {
	const classes = useStyles()

	return (
		<Paper className={classes.paper}>
			<DevRouter />

			<Link component={RouterLink} to="/dev/style" color="inherit">
				<Button>Style Guide</Button>
			</Link>
			<Link component={RouterLink} to="/dev/sandpit" color="inherit">
				<Button>Sandpit</Button>
			</Link>
		</Paper>
	)
}
const DevRouter = () => {
	const { path } = useRouteMatch()

	return (
		<Switch>
			<Route path={`${path}/style`} component={Style} />
			<Route path={`${path}/sandpit`} component={SandpitPage} />
		</Switch>
	)
}
