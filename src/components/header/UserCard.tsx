import { Button } from "@material-ui/core"
import Link from "@material-ui/core/Link"
import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { useRecoilState, useResetRecoilState } from "recoil"
import {
	currentJwt,
	currentToken,
	currentTokenExpiry,
	currentUser
} from "../../recoil/atoms/auth"
import { routes } from "../routes/Router"

export const UserCard = () => {
	const currentUserName = useRecoilState(currentUser)

	const handleLogout = () => {
		useResetRecoilState(currentUser)
		useResetRecoilState(currentToken)
		useResetRecoilState(currentTokenExpiry)
		useResetRecoilState(currentJwt)
	}
	if (!currentUserName) {
		return (
			<div>
				<div>
					<h4>Not logged in</h4>
				</div>
				<div>
					{" "}
					<Link
						component={RouterLink}
						to={routes.login.root}
						color="inherit"
					>
						Login
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div>
			<h4>currentUserName</h4>
			<Button onClick={handleLogout}>Log Out</Button>
		</div>
	)
}
