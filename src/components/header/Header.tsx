import {
	Toolbar,
	AppBar,
	Typography,
	Link,
	List,
	ListItem,
	ListItemText
} from "@material-ui/core"
import logo from "../../images/THFLogoWhiteOrange.png"
import { Link as RouterLink } from "react-router-dom"
import { routes } from "../routes/Router"
import { useRecoilState } from "recoil"
import { preferDarkState } from "../../atoms"
import Brightness4Icon from "@material-ui/icons/Brightness4"
import IconButton from "@material-ui/core/IconButton"

const Header = () => {
	const [preferDark, setPreferDark] = useRecoilState(preferDarkState)
	const handleDarkModePress = () => {
		setPreferDark(!preferDark)
	}

	return (
		<AppBar position="static" color="default" elevation={0}>
			<Toolbar>
				<img
					src={logo}
					alt="Hurley Foundation Events Logo"
					style={{ height: "70px" }}
				></img>
				<List component="nav">
					<ListItem component="div">
						<ListItemText inset>
							<Typography color="textPrimary" variant="body1">
								<Link
									component={RouterLink}
									to="/"
									color="inherit"
								>
									Home
								</Link>
							</Typography>
						</ListItemText>
						<ListItemText inset>
							<Typography color="textPrimary" variant="body1">
								<Link
									component={RouterLink}
									to={routes.judging.root}
									color="inherit"
								>
									Judging
								</Link>
							</Typography>
						</ListItemText>
						<ListItemText inset>
							<Typography color="textPrimary" variant="body1">
								<Link
									component={RouterLink}
									to={routes.upload.root}
									color="inherit"
								>
									Upload
								</Link>
							</Typography>
						</ListItemText>
						<ListItemText inset>
							<Typography color="textPrimary" variant="body1">
								<Link
									component={RouterLink}
									to={routes.dev.root}
									color="inherit"
								>
									Dev
								</Link>
							</Typography>
						</ListItemText>
						<ListItemText inset>
							<Typography color="textPrimary" variant="body1">
								<Link
									component={RouterLink}
									to={routes.login.root}
									color="inherit"
								>
									Login
								</Link>
							</Typography>
						</ListItemText>
						<ListItemText inset>
							<IconButton
								color="default"
								onClick={handleDarkModePress}
							>
								<Brightness4Icon />
							</IconButton>
						</ListItemText>
					</ListItem>
				</List>
			</Toolbar>
		</AppBar>
	)
}

export default Header
