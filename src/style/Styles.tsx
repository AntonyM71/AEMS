import makeStyles from "@material-ui/core/styles/makeStyles"

export const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh"
	},
	paper: {
		padding: theme.spacing(4, 4),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	marginPaper: {
		padding: theme.spacing(4, 4),
		margin: theme.spacing(2),
		display: "flex",
		height: "84vh",
		flexDirection: "column",
		alignItems: "center"
	},
	main: {
		borderTop: theme.spacing(2),
		padding: theme.spacing(2, 2)
	},
	headerPaper: {
		padding: theme.spacing(2, 2),
		borderTop: theme.spacing(2),
		borderBottom: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	paperBox: {
		padding: theme.spacing(1, 1),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	moveBox: {
		padding: theme.spacing(0.5, 0.5)
	},
	image: {
		backgroundImage: "url(/images/HurleyClassic2018/IMGP6327.png)",
		backgroundRepeat: "no-repeat",
		backgroundColor:
			theme.palette.type === "light"
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: "cover",
		backgroundPosition: "center"
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}))
