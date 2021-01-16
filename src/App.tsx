import { Container } from "@material-ui/core";
import Router from "./components/routes/Router";
import { BrowserRouter } from "react-router-dom";
import Theme from "./components/Theme";
import Header from "./components/header/Header";
import { RecoilRoot } from "recoil";

const App = ()=> (
  <RecoilRoot>
    <BrowserRouter>
      <Theme>
        <Header />
        <Container>
          <Router />
        </Container>
      </Theme>
    </BrowserRouter>
  </RecoilRoot>

);

export default App;
