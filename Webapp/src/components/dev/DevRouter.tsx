import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import {
	Link as RouterLink,
	Route,
	Switch,
	useRouteMatch
} from "react-router-dom"

import { SandpitPage } from "./sandpit"
import Style from "./Style"

export const DevRouterPage = () => (
	<Grid container alignItems="stretch">
		<Grid item xs={2}>
			<Paper>
				<DevLinks />
			</Paper>
		</Grid>
		<Grid item xs={10}>
			<Paper>
				<DevRouter />
			</Paper>
		</Grid>
	</Grid>
)
const DevRouter = () => {
	const { path } = useRouteMatch()

	return (
		<Switch>
			<Route path={`${path}/style`} component={Style} />
			<Route path={`${path}/sandpit`} component={SandpitPage} />
		</Switch>
	)
}

const DevLinks = () => (
	<>
		<Link component={RouterLink} to="/dev/style" color="inherit">
			<Button>Style Guide</Button>
		</Link>
		<Link component={RouterLink} to="/dev/sandpit" color="inherit">
			<Button>Sandpit</Button>
		</Link>
	</>
)
