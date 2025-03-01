import Brightness4Icon from "@mui/icons-material/Brightness4"
import AppBar from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
import Link from "@mui/material/Link"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Stack from "@mui/material/Stack"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Image from "next/image"
import RouterLink from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { getUserRole } from "../../redux/atoms/scoring"
import { getPreferDark, updatePreferDark } from "../../redux/atoms/utilities"
const Header = () => {
	const userRole = useSelector(getUserRole)

	return (
		<AppBar position="sticky" color={"default"} elevation={0}>
			<Toolbar variant="dense">
				<Stack
					direction="row"
					spacing={2}
					sx={{
						justifyContent: "space-between",
						alignItems: "center"
					}}
					width="100%"
				>
					<RouterLink href="/">
						<Image
							src="/images/icon.png"
							alt="Hurley Foundation Events Logo"
							height="30"
							width="30"
						/>
					</RouterLink>

					<LinkList />

					<Typography variant="h5">{userRole}</Typography>

					<DarkModeButton />
				</Stack>
			</Toolbar>
		</AppBar>
	)
}

const LinkList = () => (
	<List component="nav" dense sx={{ paddingY: 0 }}>
		<ListItem component="div">
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
						href={"/Score"}
						color="inherit"
					>
						Results
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
						href={"/Admin"}
						color="inherit"
					>
						Admin
					</Link>
				</Typography>
			</ListItemText>
		</ListItem>
	</List>
)
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
