import {
	AppBar,
	Link,
	List,
	ListItem,
	ListItemText,
	Toolbar,
	Typography
} from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import Brightness4Icon from "@material-ui/icons/Brightness4"
import { Link as RouterLink } from "react-router-dom"
import { useRecoilState } from "recoil"
import { preferDarkState } from "../../atoms"
import logo from "../../images/THFLogoWhiteOrange.png"
import { routes } from "../routes/Router"

const Header = () => (
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
							<Link component={RouterLink} to="/" color="inherit">
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
						<DarkModeButton />
					</ListItemText>
				</ListItem>
			</List>
		</Toolbar>
	</AppBar>
)

export const DarkModeButton = () => {
	const [preferDark, setPreferDark] = useRecoilState(preferDarkState)
	const handleDarkModePress = () => {
		setPreferDark(!preferDark)
	}

	return (
		<IconButton
			color="default"
			aria-label={"darkModeButton"}
			onClick={handleDarkModePress}
		>
			<Brightness4Icon />
		</IconButton>
	)
}

export default Header
