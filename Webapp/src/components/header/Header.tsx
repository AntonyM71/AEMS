import Brightness4Icon from "@mui/icons-material/Brightness4"
import AppBar from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
import Link from "@mui/material/Link"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { useDispatch, useSelector } from "react-redux"
// import { Link as RouterLink } from "react-router-dom"
import RouterLink from "next/link"
// import darkLogo from "../../../public/images/images/THFLogoBlackOrange.png"
// import lightLogo from "../../../public/images/images/THFLogoWhiteOrange.png"
import { getPreferDark, updatePreferDark } from "../../redux/atoms/utilities"

const Header = () => {
	const env = "development"
	const dispatch = useDispatch()
	const preferDark = useSelector(getPreferDark)

	return (
		<AppBar position="sticky" color="default" elevation={0}>
			<Toolbar variant="dense">
				<img
					src={
						preferDark
							? "/images/THFLogoWhiteOrange.png"
							: "/images/THFLogoBlackOrange.png"
					}
					alt="Hurley Foundation Events Logo"
					style={{
						height: "40px",
						justifyContent: "center"
					}}
				></img>

				<List component="nav">
					<ListItem component="div">
						<ListItemText inset>
							<Typography color="textPrimary" variant="body1">
								<Link
									component={RouterLink}
									href="/"
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
									href={"/Judging"}
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
									href={"/ScoresheetBuilder"}
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
									href={"/Score"}
									color="inherit"
								>
									Score
								</Link>
							</Typography>
						</ListItemText>
						<ListItemText inset>
							<DarkModeButton />
						</ListItemText>
					</ListItem>
				</List>

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
