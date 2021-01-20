import { Paper, Typography, Grid, Button } from "@material-ui/core"
import React from "react"
import { MovePropsType } from "./Interfaces"

export const Move = (props: MovePropsType) => {
	if (props.move.direction === "LR") {
		return (
			<Paper>
				<Typography align="center">{props.move.name}</Typography>
				<div className="moveButton">
					<Grid container spacing={1} alignItems="stretch">
						<Grid item xs={6}>
							<Button
								variant="contained"
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
			<Paper>
				<Typography align="center">{props.move.name}</Typography>
				<div className="moveButton">
					<Grid container spacing={1}>
						<Grid item xs={6}>
							<Button
								variant="contained"
								fullWidth
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
			<Paper>
				<Typography align="center">{props.move.name}</Typography>
				<div className="moveButton">
					<Grid container spacing={1}>
						<Grid item xs={6}>
							<Button
								variant="contained"
								fullWidth
								color="primary"
								onClick={() =>
									props.addScoredMove(props.move.id, "LF")
								}
							>
								L or F
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button
								variant="contained"
								fullWidth
								color="secondary"
								onClick={() =>
									props.addScoredMove(props.move.id, "RB")
								}
							>
								R or B
							</Button>
						</Grid>
					</Grid>
				</div>
			</Paper>
		)
	} else if (props.move.direction === "SINGLE") {
		return (
			<Paper>
				<Typography align="center">{props.move.name}</Typography>
				<div className="moveButton">
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<Button
								variant="contained"
								fullWidth
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
}
