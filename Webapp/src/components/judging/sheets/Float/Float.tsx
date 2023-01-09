import Grid from "@mui/material/Grid"
import { cloneDeep } from "lodash"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import {
	getAvailableMoves,
	getScoredMoves,
	updateCurrentMove,
	updateScoredMoves
} from "../../../../redux/atoms/scoring"
import { InfoBar } from "./InfoBar"
import {
	addScoredBonusType,
	addScoredMoveType,
	directionType,
	scoredMovesType
} from "./Interfaces"
import { MoveCard } from "./MoveCard"

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const Float = () => {
	const dispatch = useDispatch()
	const setScoredMoves = (newMoves: scoredMovesType[]) =>
		dispatch(updateScoredMoves(newMoves))
	const scoredMoves = useSelector(getScoredMoves)
	const setCurrentMove = (newMove: string) =>
		dispatch(updateCurrentMove(newMove))
	const movesList = useSelector(getAvailableMoves)
	console.log(movesList)
	const addScoredMove: addScoredMoveType = (
		id: string,
		direction: directionType
	) => {
		const newMoveId = uuidv4()
		const newScoredMoves: scoredMovesType[] = [
			...scoredMoves,
			{
				id: newMoveId,
				timestamp: new Date(),
				moveId: id,
				direction,
				bonuses: [],
				status: "active"
			}
		]

		setScoredMoves(newScoredMoves)
		setCurrentMove(newMoveId)
	}

	const addScoredBonus: addScoredBonusType = (moveId: string, id: string) => {
		const scoredMovesFiltered = scoredMoves.filter((sm) => sm.id === moveId)

		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		const newScoredMoves: scoredMovesType[] = cloneDeep(scoredMoves)
		if (scoredMovesFiltered.length === 1) {
			const bonusMoves = { ...scoredMovesFiltered[0] }
			// eslint-disable-next-line no-console

			const currentBonusesFiltered = bonusMoves.bonuses.filter(
				(b) => b.bonusId === id
			)
			if (currentBonusesFiltered.length === 0) {
				// Only add it if it doesn't exist
				// eslint-disable-next-line prefer-const
				const newBonuses = [
					...bonusMoves.bonuses,
					{
						id: uuidv4(),
						timestamp: new Date(),
						bonusId: id
					}
				]
				// eslint-disable-next-line no-console
				const index = newScoredMoves.findIndex(
					(scoredMove: scoredMovesType) => scoredMove.id === moveId
				)
				newScoredMoves[index].bonuses = newBonuses
				setScoredMoves(newScoredMoves)
			} else {
				// remove bonus from list
				const newBonuses = bonusMoves.bonuses.filter(
					(b) => b.bonusId !== id
				)

				// create new scored moves list with newBonuses
				const index = scoredMoves.findIndex(
					(scoredMove: scoredMovesType) => scoredMove.id === moveId
				)
				newScoredMoves[index].bonuses = newBonuses
				setScoredMoves(newScoredMoves)
			}
		}
	}

	return (
		<Grid container spacing={3}>
			<Grid item xs={7}>
				<Grid container spacing={2}>
					{movesList.map((move) => (
						<Grid item xs={3} key={move.id}>
							<MoveCard
								key={move.id}
								move={move}
								addScoredMove={addScoredMove}
								addScoredBonus={addScoredBonus}
								data-testid={"movecard-" + move.id}
							/>
						</Grid>
					))}
				</Grid>
			</Grid>
			<Grid item xs={5}>
				<InfoBar
					addScoredMove={addScoredMove}
					addScoredBonus={addScoredBonus}
					data-testid={"infobar"}
				/>
			</Grid>
		</Grid>
	)
}

export default Float
