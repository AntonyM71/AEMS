import { useRouteMatch, Switch, Route } from "react-router-dom";
import Style from "./Style";

function DevRouter(){
    const { path } = useRouteMatch();

    return (
        <Switch>
          <Route path={`${path}/style`} component={Style} />
        </Switch>
    )
}

export default DevRouter