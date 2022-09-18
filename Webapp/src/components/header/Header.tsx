import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box/Box"
import IconButton from "@mui/material/IconButton"
import Link from "@mui/material/Link"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import conf from "../../config"
import darkLogo from "../../images/THFLogoBlackOrange.png"
import lightLogo from "../../images/THFLogoWhiteOrange.png"
import { preferDarkState } from "../../recoil/atoms/utilities"

import { routes } from "../routes/Router"
import { UserCard } from "./UserCard"
const Header = () => {
	const env = conf.get("env")
	const preferDark = useRecoilValue(preferDarkState)


	return (
		<AppBar position="sticky" color="default" elevation={0}>
			<Toolbar variant="dense" >
				<Box display="flex" flexGrow={1} >
					<img
						src={preferDark ? lightLogo : darkLogo}
						alt="Hurley Foundation Events Logo"
						style={{ height: "40px" }}
					></img>

					<List component="nav"
				>
						<ListItem
							component="div"

						>
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
									<Typography
										color="textPrimary"
										variant="body1"
									>
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
								<DarkModeButton />
							</ListItemText>
						</ListItem>
					</List>
				</Box>
				<UserCard />
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
