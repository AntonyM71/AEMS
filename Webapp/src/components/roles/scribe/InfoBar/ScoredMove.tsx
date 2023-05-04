import Chip from "@mui/material/Chip"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSelectedHeat } from "../../../../redux/atoms/competitions"
import {
	getCurrentPaddlerIndex,
	getScoredBonuses,
	getScoredMoves,
	updateScoredBonuses,
	updateScoredMoves
} from "../../../../redux/atoms/scoring"
import {
	useGetManyAthleteheatGetQuery,
	useGetManyAvailablebonusesGetQuery,
	useGetManyAvailablemovesGetQuery
} from "../../../../redux/services/aemsApi"
import { BonusChip } from "../BonusChip"
import {
	removeScoredMoveType,
	scoredBonusType,
	scoredMovesType
} from "../Interfaces"

interface ScoredMovePropsType {
	scoredMove: scoredMovesType
}

const ScoredMove = React.memo((props: ScoredMovePropsType) => {
	const dispatch = useDispatch()
	const selectedHeat = useSelector(getSelectedHeat)
	const currentPaddlerIndex = useSelector(getCurrentPaddlerIndex)
	const scoredMovesList = useSelector(getScoredMoves)

	const athletes = useGetManyAthleteheatGetQuery({
		heatIdListComparisonOperator: "Equal",
		heatIdList: [selectedHeat],
		joinForeignTable: ["athlete"]
	})
	const scoredBonuses = useSelector(getScoredBonuses)
	const scoredMoveBonuses = scoredBonuses.filter(
		(b) => b.moveId === props.scoredMove.id
	)

	const updateScoredMoveBonuses = (newMoveBonuses: scoredBonusType[]) => {
		const otherMoveBonuses = scoredBonuses.filter(
			(b) => b.moveId !== props.scoredMove.id
		)

		const newBonusList = [...otherMoveBonuses, ...newMoveBonuses]
		dispatch(updateScoredBonuses(newBonusList))
	}
	const removeScoredMove: removeScoredMoveType = (id: string) => {
		const newScoredMoves: scoredMovesType[] = scoredMovesList.filter(
			(scoredMove: scoredMovesType) => scoredMove.id !== id
		)
		dispatch(updateScoredMoves(newScoredMoves))
		updateScoredMoveBonuses([])
	}

	const scoresheetId = athletes.data
		? athletes.data[currentPaddlerIndex].scoresheet!
		: ""
	const availableMovesList = useGetManyAvailablemovesGetQuery({
		sheetIdListComparisonOperator: "Equal",
		sheetIdList: [scoresheetId]
	})
	const bonusList = useGetManyAvailablebonusesGetQuery({
		sheetIdListComparisonOperator: "Equal",
		sheetIdList: [scoresheetId]
	})
	const filteredMoves =
		availableMovesList.data?.filter(
			(move) => move.id === props.scoredMove.moveId
		) || []
	const scoredMoveAvailableBonuses: AvailableBonusType[] =
		(bonusList.data?.filter(
			(bonus) => bonus.move_id === props.scoredMove.moveId
		) as AvailableBonusType[]) || []
	if (filteredMoves.length === 1) {
		const moveData = filteredMoves[0]

		return (
			<Paper data-testid={"scored-move-" + props.scoredMove.id}>
				<Grid
					container
					spacing={1}
					justifyContent="space-between"
					alignItems="center"
				>
					<Grid item>
						<Chip
							onClick={() =>
								removeScoredMove(props.scoredMove.id)
							}
							color="default"
							label="X"
							data-testid={"scored-remove-" + props.scoredMove.id}
						/>
					</Grid>
					<Grid item>
						<Typography align="center">
							{props.scoredMove.direction !== "A"
								? props.scoredMove.direction
								: "-"}
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography align="center" display="inline">
							{moveData.name}
						</Typography>
					</Grid>

					{scoredMoveAvailableBonuses.map((availableBonus) => (
						<BonusChip
							availableBonus={availableBonus}
							scoredMove={props.scoredMove}
							scoredMoveBonuses={scoredMoveBonuses}
							updateScoredMoveBonuses={updateScoredMoveBonuses}
						/>
					))}
				</Grid>
			</Paper>
		)
	} else {
		return <div>Unknown</div>
	}
})

export interface AvailableBonusType {
	id: string
	sheet_id: string
	move_id: string
	name: string
	score: number
}

export default ScoredMove
