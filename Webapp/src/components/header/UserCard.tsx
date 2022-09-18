import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import { Link as RouterLink } from "react-router-dom"
import { useRecoilValue, useResetRecoilState } from "recoil"
import {
	currentToken,
	currentTokenExpiry,
	currentUser,
	currentUserInitials,
	refreshToken
} from "../../recoil/atoms/auth"
import { routes } from "../routes/Router"

export const UserCard = () => {
	const userInitials = useRecoilValue(currentUserInitials)

	const currentUserName = useRecoilValue(currentUser)
	const resetUser = useResetRecoilState(currentUser)
	const resetToken = useResetRecoilState(currentToken)
	const resetTokenExpiry = useResetRecoilState(currentTokenExpiry)
	const resetUserInitials = useResetRecoilState(currentUserInitials)
	const resetRefreshToken = useResetRecoilState(refreshToken)

	const handleLogout = () => {
		resetUser()
		resetToken()
		resetTokenExpiry()
		resetUserInitials()
		resetRefreshToken()
		// localStorage.clear()
	}

	if (!currentUserName) {
		return (
			<Grid
				container
				direction="row"
				justifyContent="flex-end"
				alignItems="baseline"
				spacing={0}
			>
				<Grid item xs={2}>
					<Avatar>?</Avatar>
				</Grid>
				<Grid item xs={5}>
					<Link
						component={RouterLink}
						to={routes.login.root}
						color="inherit"
					>
						<h4>Log In</h4>
					</Link>
				</Grid>
			</Grid>
		)
	}

	return (
		<Grid
			container
			direction="row"
			justifyContent="flex-end"
			alignItems="baseline"
		>
			<Grid item xs={2}>
				<Avatar style={{ marginTop: "0px" }}>{userInitials}</Avatar>
			</Grid>
			<Grid item xs={3} alignItems="center">
				<h4 style={{ marginTop: "0px" }}>{currentUserName}</h4>
			</Grid>
			<Grid item xs={2}>
				<Button onClick={handleLogout}>
					<h4>Log Out</h4>
				</Button>
			</Grid>
		</Grid>
	)
}
