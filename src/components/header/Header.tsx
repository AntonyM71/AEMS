import AppBar from "@material-ui/core/AppBar"
import IconButton from "@material-ui/core/IconButton"
import Link from "@material-ui/core/Link"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Brightness4Icon from "@material-ui/icons/Brightness4"
import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { useRecoilState } from "recoil"
import conf from "../../config"
import logo from "../../images/THFLogoWhiteOrange.png"
import { preferDarkState } from "../../recoil/atoms/utilities"
import { routes } from "../routes/Router"
import { UserCard } from "./UserCard"
const Header = () => {
	const env = conf.get("env")

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
									to={routes.score.root}
									color="inherit"
								>
									Score
								</Link>
							</Typography>
						</ListItemText>
						{env === "development" ? (
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
						) : null}
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
						<UserCard />
					</ListItem>
				</List>
			</Toolbar>
		</AppBar>
	)
}

export const DarkModeButton = () => {
	const [preferDark, setPreferDark] = useRecoilState(preferDarkState)
	const handleDarkModePress = () => {
		setPreferDark(!preferDark)
	}

	return (
		<IconButton
			color="default"
			data-testid="darkModeButton"
			onClick={handleDarkModePress}
		>
			<Brightness4Icon />
		</IconButton>
	)
}

export default Header
