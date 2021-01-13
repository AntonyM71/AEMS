import React from "react"
import { Switch, Route } from "react-router-dom"
import DevRouter from "../dev/DevRouter"
import Login from "../login/Login"
import Score from "../score/Score"
import Upload from "../upload/Upload"

function Router(){
    return (
        <Switch>
          <Route path="/dev" component={DevRouter} />
          <Route path="/score" component={Score} />
          <Route path="/login" component={Login} />
          <Route path="/upload" component={Upload} />
        </Switch>
    )
}

export default Router