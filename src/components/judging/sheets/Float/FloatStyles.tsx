import makeStyles from "@material-ui/core/styles/makeStyles"

export const useFloatStyles = makeStyles((theme) => ({
	root: {
		height: "100vh"
	},
	paper: {
		padding: theme.spacing(4, 4),
		display: "flex",
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
	}
}))
