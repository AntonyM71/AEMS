import React, { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import Button from "@material-ui/core/Button"
import { Grid, makeStyles, Typography } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import ScoredMove from "./ScoredMove"
import { moves, bonuses } from "./demoMoves"
import { Bonus } from "./Bonus"
import {
	stateType,
	addScoredMoveType,
	directionType,
	scoredMovesType,
	removeScoredMoveType,
	addScoredBonusType,
	movesType
} from "./Interfaces"
import { Move } from "./Move"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
	paperBox: {
		padding: theme.spacing(1, 1),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	moveBox: {
		padding: theme.spacing(0.5, 0.5),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	}
}))
const Float = () => {
	const classes = useFloatStyles()
	const state: stateType = localStorage.getItem("AEMS-RUN-STATE")
		? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		  JSON.parse(localStorage.getItem("AEMS-RUN-STATE")!)
		: {
				currentMoveId: null,
				scoredMoves: [],
				scores: {
					heat: 0,
					run: 0
				}
		  }

	const [original, setOriginal] = useState(state)
	const setState = (newState: stateType) => {
		setOriginal(newState)
	}

	const addScoredMove: addScoredMoveType = (
		id: string,
		direction: directionType
	) => {
		// eslint-disable-next-line no-console
		console.log("Move", id, direction)
		const newMoveId = uuidv4()
		const newScoredMoves: scoredMovesType[] = [
			...original.scoredMoves,
			{
				id: newMoveId,
				timestamp: new Date(),
				moveId: id,
				direction,
				bonuses: [],
				status: "active"
			}
		]

		const newRunScore = calculateRunScore(newScoredMoves)
		const newHeatScore = calculateHeatScore(newRunScore)

		setState({
			...original,
			currentMoveId: newMoveId,
			scoredMoves: newScoredMoves,
			scores: {
				heat: newHeatScore,
				run: newRunScore
			}
		})
	}
	const removeScoredMove: removeScoredMoveType = (id: string) => {
		// eslint-disable-next-line no-console
		console.log("Removing Move", id)
		const newMoveId = uuidv4()
		const newScoredMoves: scoredMovesType[] = original.scoredMoves.filter(
			(scoredMove: scoredMovesType) => scoredMove.id !== id
		)

		const newRunScore = calculateRunScore(newScoredMoves)
		const newHeatScore = calculateHeatScore(newRunScore)

		setState({ ...original, scoredMoves: newScoredMoves })
	}

	const addScoredBonus: addScoredBonusType = (moveId: string, id: string) => {
		// eslint-disable-next-line no-console
		console.log("Bonus", moveId, id)

		const addToMove = moveId || original.currentMoveId
		const scoredMovesFiltered = original.scoredMoves.filter(
			(sm) => sm.id === addToMove
		)
		if (scoredMovesFiltered.length === 1) {
			const currentMove = scoredMovesFiltered[0]
			// eslint-disable-next-line no-console
			console.log(currentMove)
			const currentBonusesFiltered = currentMove.bonuses.filter(
				(b) => b.id === moveId
			)
			if (currentBonusesFiltered.length === 0) {
				// Only add it if it doesn't exist
				currentMove.bonuses.push({
					id: uuidv4(),
					timestamp: new Date(),
					bonusId: id
				})
				// eslint-disable-next-line no-console
				console.log(currentMove)
				const newState = {
					scoredMoves: [...original.scoredMoves],
					currentMoveId: original.currentMoveId,
					scores: {
						heat: Math.floor(Math.random() * 1000),
						run: Math.floor(Math.random() * 1000)
					}
				}

				setState(newState)
			} else {
				// eslint-disable-next-line no-console
				console.log("Bonus already exists")
			}
		}
	}
	// TODO: This function doens't handle bonuses yet
	function calculateRunScore(scoredMoves: scoredMovesType[]) {
		const alreadyScoredMoves: string[] = []

		return scoredMoves.reduce((score, scoredMove) => {
			const filteredMoves: movesType[] = moves.filter(
				(move) => move.id === scoredMove.moveId
			)
			if (filteredMoves.length === 1) {
				const scoredMoveObject = filteredMoves[0]
				// eslint-disable-next-line no-console
				console.log(alreadyScoredMoves)
				if (
					alreadyScoredMoves.includes(
						scoredMove.moveId + "|" + scoredMove.direction
					)
				) {
					// eslint-disable-next-line no-console
					console.log(
						"Move " + scoredMoveObject.name + " already scored"
					)
				} else {
					if (scoredMoveObject.score[scoredMove.direction]) {
						score += scoredMoveObject.score[scoredMove.direction]
						alreadyScoredMoves.push(
							scoredMove.moveId + "|" + scoredMove.direction
						)
					}
				}
			}

			return score
		}, 0)
	}

	const calculateHeatScore = (runScore: number): number => runScore

	function clearRun() {
		setState({
			currentMoveId: "",
			scoredMoves: [],
			scores: {
				heat: 0,
				run: 0
			}
		})
	}

	return (
		<Grid container spacing={3}>
			<Grid item xs={9}>
				<Paper className={classes.paper}>
					<Grid container spacing={2}>
						{moves.map((move) => (
							<Grid item xs={2}>
								<Move
									key={move.id}
									move={move}
									addScoredMove={addScoredMove}
									addScoredBonus={addScoredBonus}
								/>
							</Grid>
						))}
						<Grid item xs={12}>
							<Paper className={classes.paperBox}>
								<Typography>
									Bonuses for {original.currentMoveId}
								</Typography>
								<Grid
									container
									spacing={2}
									justify="space-between"
									alignItems="stretch"
								>
									{bonuses.map((bonus) => (
										<Grid item xs={2} alignItems="stretch">
											<Bonus
												key={bonus.id}
												bonus={bonus}
												addScoredMove={addScoredMove}
												addScoredBonus={addScoredBonus}
											/>
										</Grid>
									))}
								</Grid>
							</Paper>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
			<Grid item xs={3}>
				<Paper className={classes.paper}>
					<Grid
						container
						spacing={2}
						alignItems="stretch"
						direction="column"
					>
						<Grid item xs={12}>
							<Paper className={classes.paperBox}>
								<h3>Run Score</h3>
								<div className="score" id="runScore">
									{original.scores.run}
								</div>
							</Paper>
						</Grid>
						<Grid item xs={12}>
							<Paper className={classes.paperBox}>
								<h3>Heat Score</h3>
								<div className="score" id="heatScore">
									{original.scores.heat}
								</div>
							</Paper>
						</Grid>
						<Grid item xs={12}>
							<h3>Move Listing</h3>
							<Button
								onClick={clearRun}
								variant="contained"
								fullWidth
							>
								Clear Run
							</Button>
							<Grid
								container
								spacing={3}
								alignItems="stretch"
								direction="column"
							>
								{original.scoredMoves.map(
									(
										scoredMove: scoredMovesType,
										index: number
									) => (
										<Grid item xs={12}>
											<Paper>
												<ScoredMove
													key={scoredMove.id}
													scoredMove={scoredMove}
													scoredMoveIndex={index}
													removeScoredMove={
														removeScoredMove
													}
													addScoredMove={
														addScoredMove
													}
													addScoredBonus={
														addScoredBonus
													}
												/>
											</Paper>
										</Grid>
									)
								)}
							</Grid>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	)
}

export default Float
