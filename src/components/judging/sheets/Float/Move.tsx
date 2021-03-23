import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import React from "react"
import { useStyles } from "../../../../style/Styles"
import { MovePropsType } from "./Interfaces"

export const Move = React.memo((props: MovePropsType) => {
	const classes = useStyles()
	if (props.move.direction === "LR") {
		return (
			<Paper className={classes.moveBox}>
				<Typography align="center">{props.move.name}</Typography>
				<div className="moveButton">
					<Grid container spacing={1} alignItems="stretch">
						<Grid item xs={6}>
							<Button
								variant="contained"
								aria-label={"button1"}
								fullWidth
								color="primary"
								onClick={() =>
									props.addScoredMove(props.move.id, "L")
								}
							>
								L
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button
								variant="contained"
								fullWidth
								aria-label={"button2"}
								color="secondary"
								onClick={() =>
									props.addScoredMove(props.move.id, "R")
								}
							>
								R
							</Button>
						</Grid>
					</Grid>
				</div>
			</Paper>
		)
	} else if (props.move.direction === "FB") {
		return (
			<Paper className={classes.moveBox}>
				<Typography align="center">{props.move.name}</Typography>
				<div className="moveButton">
					<Grid container spacing={1}>
						<Grid item xs={6}>
							<Button
								variant="contained"
								fullWidth
								aria-label={"button1"}
								color="primary"
								onClick={() =>
									props.addScoredMove(props.move.id, "F")
								}
							>
								F
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button
								variant="contained"
								fullWidth
								aria-label={"button2"}
								color="secondary"
								onClick={() =>
									props.addScoredMove(props.move.id, "B")
								}
							>
								B
							</Button>
						</Grid>
					</Grid>
				</div>
			</Paper>
		)
	} else if (props.move.direction === "LRFB") {
		return (
			<Paper className={classes.moveBox}>
				<Typography align="center">{props.move.name}</Typography>
				<div className="moveButton">
					<Grid container spacing={1}>
						<Grid item xs={6}>
							<Button
								variant="contained"
								fullWidth
								aria-label={"button1"}
								color="primary"
								onClick={() =>
									props.addScoredMove(props.move.id, "LF")
								}
							>
								L/F
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button
								variant="contained"
								fullWidth
								aria-label={"button2"}
								color="secondary"
								onClick={() =>
									props.addScoredMove(props.move.id, "RB")
								}
							>
								R/B
							</Button>
						</Grid>
					</Grid>
				</div>
			</Paper>
		)
	} else if (props.move.direction === "SINGLE") {
		return (
			<Paper className={classes.moveBox}>
				<Typography align="center">{props.move.name}</Typography>
				<div className="moveButton">
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<Button
								variant="contained"
								fullWidth
								aria-label={"button1"}
								color="primary"
								onClick={() =>
									props.addScoredMove(props.move.id, "A")
								}
							>
								Any
							</Button>
						</Grid>
					</Grid>
				</div>
			</Paper>
		)
	} else {
		return <div>Unknown Move</div>
	}
})
