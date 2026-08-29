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
import { MovePropsType, addScoredMoveType, scoredMovesType } from "./Interfaces"

const { usePrefetch } = aemsApi

// Compact so large scoresheets (e.g. ICF2026) fit on a tablet without overflowing.
const directionButtons = {
	LR: [
		{ label: "L", dir: "L", tid: "l" },
		{ label: "R", dir: "R", tid: "r" }
	],
	FB: [
		{ label: "F", dir: "F", tid: "f" },
		{ label: "B", dir: "B", tid: "b" }
	],
	S: [{ label: "Single", dir: "S", tid: "lf" }]
} as const

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

	const addScoredMove: addScoredMoveType = (id, direction) => {
		const newMoveId = uuidv4()
		setScoredMoves([
			...scoredMovesList,
			{ id: newMoveId, moveId: id, direction }
		])
		setCurrentMove(newMoveId)
	}

	return (
		<Paper>
			<Typography
				align="center"
				sx={{
					fontSize: "0.85rem",
					lineHeight: 1.25,
					fontWeight: 500,
					py: "4px"
				}}
			>
				{props.move.name}
			</Typography>
			<div className="moveButton">
				<Grid container alignItems="stretch" justifyContent="center">
					{directionButtons[props.move.direction].map(
						({ label, dir, tid }, i) => (
							<Grid key={tid} sx={{ padding: "2px" }} size={6}>
								<Button
									variant="contained"
									size="small"
									fullWidth
									aria-label={`button${i + 1}`}
									disabled={props.isRunLocked}
									color={i === 0 ? "primary" : "secondary"}
									onClick={() =>
										addScoredMove(props.move.id, dir)
									}
									sx={{
										minWidth: 0,
										py: "4px",
										px: "6px",
										fontSize: "0.9rem",
										lineHeight: 1.4
									}}
									data-testid={`button-${props.move.id}-${tid}`}
								>
									{label}
								</Button>
							</Grid>
						)
					)}
				</Grid>
			</div>
		</Paper>
	)
})
