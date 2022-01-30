import Avatar from "@material-ui/core/Avatar"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import Paper from "@material-ui/core/Paper"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import React from "react"
import { useHistory } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import {
	currentToken,
	currentTokenExpiry,
	currentUser,
	currentUserInitials,
	refreshToken
} from "../../recoil/atoms/auth"
import { getUserToken } from "../../services/api"
import { useStyles } from "../../style/Styles"

const Copyright = () => (
	<Typography variant="body2" color="textSecondary" align="center">
		{"Copyright © "}
		<Link color="inherit" href="https://material-ui.com/">
			Hurley Foundation
		</Link>{" "}
		{new Date().getFullYear()}
		{"."}
	</Typography>
)

export default () => {
	const classes = useStyles()

	const [username, setUsername] = React.useState("")
	const [password, setPassword] = React.useState("")

	const setRecoilUsername = useSetRecoilState(currentUser)
	const setUserInitial = useSetRecoilState(currentUserInitials)
	const setCurrentToken = useSetRecoilState(currentToken)
	const setCurrentTokenExpiry = useSetRecoilState(currentTokenExpiry)
	const setRefreshToken = useSetRecoilState(refreshToken)
	const history = useHistory()

	const handleSignIn = async () => {
		const currentTimestamp = Date.now()

		const response = await getUserToken(username, password)

		// Add useful info to the store
		setRecoilUsername(response.data.user.fullName)
		setUserInitial(response.data.user.initials)
		setCurrentToken(response.data.access_token)
		setCurrentTokenExpiry(
			response.data.expires_in * 1000 + currentTimestamp - 10
		)
		setRefreshToken(response.data.refresh_token)

		// redirect to home

		history.push("/")
	}

	return (
		<Grid container component="main" className={classes.root}>
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid
				item
				xs={12}
				sm={8}
				md={5}
				component={Paper}
				elevation={6}
				square
			>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							inputProps={{ "data-testid": "input-login-email" }}
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							onChange={(event) =>
								setUsername(event.target.value)
							}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							inputProps={{
								"data-testid": "input-login-password"
							}}
							label="Password"
							type="password"
							onChange={(event) =>
								setPassword(event.target.value)
							}
							autoComplete="current-password"
						/>
						<Button
							fullWidth
							variant="contained"
							color="primary"
							data-testid="input-login-submit"
							disabled={!(username && password) ? true : false}
							className={classes.submit}
							onClick={handleSignIn}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
						</Grid>
						<Box mt={5}>
							<Copyright />
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	)
}
