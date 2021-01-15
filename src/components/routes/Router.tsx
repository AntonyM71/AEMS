import { Switch, Route } from "react-router-dom";
import DevRouter from "../dev/DevRouter";
import Login from "../login/Login";
import Score from "../score/Score";
import Upload from "../upload/Upload";

export const routes = {
  dev: {
    root: "/dev"
  },
  score: {
    root: "/score"
  },
  login: {
    root: "/login"
  },
  upload: {
    root: "/upload"
  }
};

const Router = () => (
  <Switch>
    <Route path={routes.dev.root} component={DevRouter} />
    <Route path={routes.score.root} component={Score} />
    <Route path={routes.login.root} component={Login} />
    <Route path={routes.upload.root} component={Upload} />
  </Switch>
);

export default Router;
