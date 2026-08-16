import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import React from "react"
import { useDispatch } from "react-redux"
import { DoubleClickDeleteButton } from "../../../DoubleClickDeleteButton"
import {
	updateScoredBonuses,
	updateScoredMoves
} from "../../../../redux/atoms/scoring"
import {
	useGetManyAvailablebonusesGetQuery,
	useGetManyAvailablemovesGetQuery
} from "../../../../redux/services/aemsApi"
import { sortBonuses } from "../../../ScoresheetBuilder/ScoresheetBuilder"
import { BonusChip } from "../BonusChip"
import {
	removeScoredMoveType,
	scoredBonusType,
	scoredMovesType
} from "../Interfaces"

interface ScoredMovePropsType {
	scoredMove: scoredMovesType
	scoredMovesList: scoredMovesType[]
	scoredBonuses: scoredBonusType[]
	chipActionsDisabled?: boolean
}

const ScoredMove = React.memo(
	({
		scoredMove,
		scoredMovesList,
		scoredBonuses,
		chipActionsDisabled = false
	}: ScoredMovePropsType) => {
		const dispatch = useDispatch()
		const scoredMoveBonuses = scoredBonuses.filter(
			(b) => b.moveId === scoredMove.id
		)

		const updateScoredMoveBonuses = (newMoveBonuses: scoredBonusType[]) => {
			const otherMoveBonuses = scoredBonuses.filter(
				(b) => b.moveId !== scoredMove.id
			)

			const newBonusList = [...otherMoveBonuses, ...newMoveBonuses]
			dispatch(updateScoredBonuses(newBonusList))
		}
		const removeScoredMove: removeScoredMoveType = (id: string) => {
			if (!chipActionsDisabled) {
				const newScoredMoves: scoredMovesType[] =
					scoredMovesList.filter(
						(sm: scoredMovesType) => sm.id !== id
					)
				updateScoredMoveBonuses([])
				dispatch(updateScoredMoves(newScoredMoves))
			}
		}

		const availableMovesList = useGetManyAvailablemovesGetQuery({
			idListComparisonOperator: "Equal",
			idList: [scoredMove.moveId]
		})
		const bonusList = useGetManyAvailablebonusesGetQuery({
			moveIdListComparisonOperator: "Equal",
			moveIdList: [scoredMove.moveId]
		})
		const filteredMoves =
			availableMovesList.data?.filter(
				(move) => move.id === scoredMove.moveId
			) ?? []
		const scoredMoveAvailableBonuses: AvailableBonusType[] =
			(bonusList.data
				?.filter((bonus) => bonus.move_id === scoredMove.moveId)
				.sort(sortBonuses) as AvailableBonusType[]) || []
		if (filteredMoves.length === 1) {
			const moveData = filteredMoves[0]

			return (
				<Paper
					sx={{
						padding: "0.5em",
						height: "max-content",
						width: "100%"
					}}
				>
					<Grid
						container
						spacing={0}
						justifyContent="space-between"
						alignItems="center"
					>
						{!chipActionsDisabled ? (
							<Grid>
								<DoubleClickDeleteButton
									onDelete={() =>
										removeScoredMove(scoredMove.id)
									}
									testId={"scored-remove-" + scoredMove.id}
									iconFontSize="small"
								/>
							</Grid>
						) : (
							<></>
						)}
						<Grid>
							<Typography
								fontWeight={"fontWeightBold"}
								align="center"
							>
								{scoredMove.direction}
							</Typography>
						</Grid>
						<Grid size={4}>
							<Typography align="center" display="inline">
								{moveData.name}
							</Typography>
						</Grid>

						{scoredMoveAvailableBonuses.map((availableBonus) => (
							<BonusChip
								key={`${scoredMove.id}-${availableBonus.id}`}
								availableBonus={availableBonus}
								scoredMove={scoredMove}
								scoredMoveBonuses={scoredMoveBonuses}
								chipActionsDisabled={chipActionsDisabled}
								updateScoredMoveBonuses={
									updateScoredMoveBonuses
								}
							/>
						))}
					</Grid>
				</Paper>
			)
		} else {
			return <div>Unknown</div>
		}
	}
)

export interface AvailableBonusType {
	id: string
	sheet_id: string
	move_id: string
	name: string
	score: number
}

export default ScoredMove
