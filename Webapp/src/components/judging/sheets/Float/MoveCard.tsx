import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import React from "react"

import { MovePropsType } from "./Interfaces"

export const MoveCard = React.memo((props: MovePropsType) => {

	if (props.move.direction === "LR") {
		return (
			<Paper >
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
								data-testid={"button-" + props.move.id + "-l"}
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
								data-testid={"button-" + props.move.id + "-r"}
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
			<Paper >
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
								data-testid={"button-" + props.move.id + "-f"}
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
								data-testid={"button-" + props.move.id + "-b"}
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
			<Paper >
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
								data-testid={"button-" + props.move.id + "-lf"}
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
								data-testid={"button-" + props.move.id + "-rb"}
							>
								R/B
							</Button>
						</Grid>
					</Grid>
				</div>
			</Paper>
		)
	} else {
		return (
			<Paper >
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
								data-testid={"button-" + props.move.id + "-a"}
							>
								Any
							</Button>
						</Grid>
					</Grid>
				</div>
			</Paper>
		)
	}
})
