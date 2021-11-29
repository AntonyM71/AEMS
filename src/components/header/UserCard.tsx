import { Avatar, Button, Grid } from "@material-ui/core"
import Link from "@material-ui/core/Link"
import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { useRecoilValue, useResetRecoilState } from "recoil"
import {
	currentJwt,
	currentToken,
	currentTokenExpiry,
	currentUser
} from "../../recoil/atoms/auth"
import { routes } from "../routes/Router"

export const UserCard = () => {
	const currentUserName = useRecoilValue(currentUser)

	const handleLogout = () => {
		useResetRecoilState(currentUser)
		useResetRecoilState(currentToken)
		useResetRecoilState(currentTokenExpiry)
		useResetRecoilState(currentJwt)
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
				<Avatar>{getUserInitials(currentUserName)}</Avatar>
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

const getUserInitials = (name: string): string => {
	const names: string[] = name.split(" ")

	return names[0][0] + names.slice(-1)[0][0]
}
