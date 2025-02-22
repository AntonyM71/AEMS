import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import React, { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import {
	getScoredMoves,
	updateCurrentMove,
	updateScoredMoves
} from "../../../redux/atoms/scoring"
import { aemsApi } from "../../../redux/services/aemsApi"
import {
	MovePropsType,
	addScoredMoveType,
	directionType,
	scoredMovesType
} from "./Interfaces"

const { usePrefetch } = aemsApi

export const MoveCard = React.memo((props: MovePropsType) => {
	const prefetchAvailableMoves = usePrefetch("getManyAvailablemovesGet")
	const prefetchAvailableBonuses = usePrefetch("getManyAvailablebonusesGet")
	const dispatch = useDispatch()
	const setScoredMoves = (newMoves: scoredMovesType[]) =>
		dispatch(updateScoredMoves(newMoves))
	const setCurrentMove = (newMove: string) =>
		dispatch(updateCurrentMove(newMove))
	useEffect(() => {
		try {
			prefetchAvailableMoves({
				idListComparisonOperator: "Equal",
				idList: [props.move.id]
			})
			prefetchAvailableBonuses({
				moveIdListComparisonOperator: "Equal",
				moveIdList: [props.move.id]
			})
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (err) {
			// It doesn't matter if this fails, as the data will be when the scoredmovecard mounts
		}
	}, [])
	const scoredMovesList = useSelector(getScoredMoves)

	const addScoredMove: addScoredMoveType = (
		id: string,
		direction: directionType
	) => {
		const newMoveId = uuidv4()
		const newScoredMoves: scoredMovesType[] = [
			...scoredMovesList,
			{
				id: newMoveId,

				moveId: id,
				direction
			}
		]

		setScoredMoves(newScoredMoves)
		setCurrentMove(newMoveId)
	}
	if (props.move.direction === "LR") {
		return (
			<Paper>
				<Typography align="center">{props.move.name}</Typography>
				<div className="moveButton">
					<Grid container alignItems="stretch">
						<Grid sx={{ padding: "4px" }} size={6}>
							<Button
								variant="contained"
								aria-label={"button1"}
								fullWidth
								disabled={props.isRunLocked}
								color="primary"
								onClick={() =>
									addScoredMove(props.move.id, "L")
								}
								data-testid={"button-" + props.move.id + "-l"}
							>
								L
							</Button>
						</Grid>
						<Grid sx={{ padding: "4px" }} size={6}>
							<Button
								variant="contained"
								fullWidth
								aria-label={"button2"}
								disabled={props.isRunLocked}
								color="secondary"
								onClick={() =>
									addScoredMove(props.move.id, "R")
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
			<Paper>
				<Typography align="center">{props.move.name}</Typography>
				<div className="moveButton">
					<Grid container>
						<Grid sx={{ padding: "4px" }} size={6}>
							<Button
								variant="contained"
								fullWidth
								aria-label={"button1"}
								disabled={props.isRunLocked}
								color="primary"
								onClick={() =>
									addScoredMove(props.move.id, "F")
								}
								data-testid={"button-" + props.move.id + "-f"}
							>
								F
							</Button>
						</Grid>
						<Grid sx={{ padding: "4px" }} size={6}>
							<Button
								variant="contained"
								fullWidth
								aria-label={"button2"}
								disabled={props.isRunLocked}
								color="secondary"
								onClick={() =>
									addScoredMove(props.move.id, "B")
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
	} else if (props.move.direction === "S") {
		return (
			<Paper>
				<Typography align="center">{props.move.name}</Typography>
				<div className="moveButton">
					<Grid container justifyContent="center">
						<Grid sx={{ padding: "4px" }} size={6}>
							<Button
								variant="contained"
								fullWidth
								aria-label={"button1"}
								disabled={props.isRunLocked}
								color="primary"
								onClick={() =>
									addScoredMove(props.move.id, "S")
								}
								data-testid={"button-" + props.move.id + "-lf"}
							>
								Single
							</Button>
						</Grid>
					</Grid>
				</div>
			</Paper>
		)
	}

	return <></>
})
