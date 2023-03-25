import Brightness4Icon from "@mui/icons-material/Brightness4"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Link from "@mui/material/Link"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { useDispatch, useSelector } from "react-redux"
import { Link as RouterLink } from "react-router-dom"
import darkLogo from "../../images/THFLogoBlackOrange.png"
import lightLogo from "../../images/THFLogoWhiteOrange.png"
import { getPreferDark, updatePreferDark } from "../../redux/atoms/utilities"
import { routes } from "../routes/Router"
const Header = () => {
	const env = "development"
	const dispatch = useDispatch()
	const preferDark = useSelector(getPreferDark)

	return (
		<AppBar position="sticky" color="default" elevation={0}>
			<Toolbar variant="dense">
				<Box display="flex">
					<img
						src={preferDark ? lightLogo : darkLogo}
						alt="Hurley Foundation Events Logo"
						style={{ height: "40px", justifyContent: "center" }}
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
										to={routes.scoreSheetBuilder.root}
										color="inherit"
									>
										Scoresheet Builder
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
				{/* <UserCard /> */}
			</Toolbar>
		</AppBar>
	)
}
export const DarkModeButton = () => {
	const dispatch = useDispatch()
	const preferDark = useSelector(getPreferDark)
	const handleDarkModePress = () => {
		setPreferDark(!preferDark)
	}
	const setPreferDark = (newPreferDark: boolean) =>
		dispatch(updatePreferDark(newPreferDark))

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
