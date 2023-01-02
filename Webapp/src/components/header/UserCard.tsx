import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import toast from "react-hot-toast"
import { Link as RouterLink } from "react-router-dom"

import { routes } from "../routes/Router"

export const UserCard = () => {
	const currentUserName = ""
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
				<Avatar style={{ marginTop: "0px" }}>{"TU"}</Avatar>
			</Grid>
			<Grid item xs={3} alignItems="center">
				<h4 style={{ marginTop: "0px" }}>{"Test User"}</h4>
			</Grid>
			<Grid item xs={2}>
				<Button onClick={() => toast.success("Logged Out")}>
					<h4>Log Out</h4>
				</Button>
			</Grid>
		</Grid>
	)
}
