import { Avatar, Button, Grid } from "@material-ui/core"
import Link from "@material-ui/core/Link"
import React from "react"
import { Link as RouterLink } from "react-router-dom"
import {
	useRecoilState,
	useRecoilValue,
	useResetRecoilState,
	useSetRecoilState
} from "recoil"
import {
	currentToken,
	currentTokenExpiry,
	currentUser,
	currentUserInitials,
	refreshToken
} from "../../recoil/atoms/auth"
import { routes } from "../routes/Router"

export const UserCard = () => {
	const setUser = useSetRecoilState(currentUser)
	const setToken = useSetRecoilState(currentToken)
	const setTokenExpiry = useSetRecoilState(currentTokenExpiry)
	const [userInitials, setUserInitials] = useRecoilState(currentUserInitials)
	const setRefreshToken = useSetRecoilState(refreshToken)
	// Rehydrate recoil auth state from local storage on mount
	React.useEffect(() => {
		const expiryTimeString = localStorage.getItem("userAccessTokenExpiry")
		const expiryTime = expiryTimeString ? parseInt(expiryTimeString) : null
		setUser(localStorage.getItem("userName") || "")
		setToken(localStorage.getItem("userAccessToken") || "")
		setTokenExpiry(expiryTime || 0)
		setUserInitials(localStorage.getItem("userInitial") || "")
		setRefreshToken(localStorage.getItem("userRefreshToken") || "")
	})

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
		localStorage.clear()
	}

	if (!currentUserName) {
		return (
			<Grid
				container
				direction="row"
				justify="flex-end"
				alignItems="baseline"
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
						<h4>Not Logged In</h4>
					</Link>
				</Grid>
			</Grid>
		)
	}

	return (
		<Grid
			container
			direction="row"
			justify="flex-end"
			alignItems="baseline"
		>
			<Grid item xs={2}>
				<Avatar>{userInitials}</Avatar>
			</Grid>
			<Grid item xs={3} alignItems="center">
				<h4>{currentUserName}</h4>
			</Grid>
			<Grid item xs={2}>
				<Button onClick={handleLogout}>
					<h4>Log Out</h4>
				</Button>
			</Grid>
		</Grid>
	)
}
