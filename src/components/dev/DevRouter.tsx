import { Route, Switch, useRouteMatch } from "react-router-dom"
import Style from "./Style"

const DevRouter = () => {
	const { path } = useRouteMatch()

	return (
		<Switch>
			<Route path={`${path}/style`} component={Style} />
		</Switch>
	)
}

export default DevRouter
