import { Toolbar, AppBar, Typography, Link, Button, List, ListItem, ListItemText } from '@material-ui/core';
import logo from "../../images/THFLogoWhiteOrange.png"
import { Link as RouterLink } from "react-router-dom"
import { routes } from "../routes/Router"

function Header() {
  return <AppBar position="static" color="default" elevation={0}>
    <Toolbar>
      <img src={logo} alt="Hurley Foundation Events Logo" style={{ height: "70px" }}></img>
      <List component="nav">
        <ListItem component="div">
          <ListItemText inset>
            <Typography color="inherit" variant="body1">
              <Link component={RouterLink} to="/">Home</Link>
            </Typography>
          </ListItemText>
          <ListItemText inset>
            <Typography color="inherit" variant="body1">
              <Link component={RouterLink} to={routes.score.root}>Score</Link>
            </Typography>
          </ListItemText>
          <ListItemText inset>
            <Typography color="inherit" variant="body1">
              <Link component={RouterLink} to={routes.upload.root}>Upload</Link>
            </Typography>
          </ListItemText>
          <ListItemText inset>
            <Typography color="inherit" variant="body1">
              <Link component={RouterLink} to={routes.dev.root}>Dev</Link>
            </Typography>
          </ListItemText>
        </ListItem >
      </List>
      <Button color="primary" variant="outlined">
        Login
    </Button>
    </Toolbar>
  </AppBar>
}

export default Header