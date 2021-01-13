import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import Style from "./Style";

function DevRouter(){
    const { path, url } = useRouteMatch();

    return (
        <Switch>
          <Route path={`${path}/style`} component={Style} />
        </Switch>
    )
}

export default DevRouter