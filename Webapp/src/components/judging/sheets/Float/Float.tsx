import Grid from "@mui/material/Grid"
import { cloneDeep, flatten } from "lodash"
import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import { getSelectedHeat } from "../../../../redux/atoms/competitions"
import {
	getCurrentPaddlerIndex,
	getScoredMoves,
	updateCurrentMove,
	updateScoredMoves
} from "../../../../redux/atoms/scoring"
import {
	useGetManyAthleteheatGetQuery,
	useGetManyAvailablemovesGetQuery
} from "../../../../redux/services/aemsApi"
import { InfoBar } from "./InfoBar"
import {
	addScoredBonusType,
	addScoredMoveType,
	directionType,
	scoredMovesType
} from "./Interfaces"
import { MoveCard } from "./MoveCard"

const Float = () => {
	const dispatch = useDispatch()

	const setScoredMoves = (newMoves: scoredMovesType[]) =>
		dispatch(updateScoredMoves(newMoves))
	const scoredMoves = useSelector(getScoredMoves)
	const setCurrentMove = (newMove: string) =>
		dispatch(updateCurrentMove(newMove))
	const selectedHeat = useSelector(getSelectedHeat)

	const athletes = useGetManyAthleteheatGetQuery({
		heatIdListComparisonOperator: "Equal",
		heatIdList: [selectedHeat],
		joinForeignTable: ["athlete"]
	})

	const athleteList = useMemo(() => {
		if (athletes.data) {
			const filteredList = flatten(
				athletes.data.map((a) => [
					{
						...a.athlete_foreign![0],
						scoresheetId: a.scoresheet!
					}
				])
			)

			return filteredList
		}

		return []
	}, [athletes])

	const currentPaddlerIndex = useSelector(getCurrentPaddlerIndex)
	const currentAthlete = athleteList[currentPaddlerIndex]
	// const athleteList
	// 	? flatten(athletes.data.map((a) => a.athlete_foreign))
	// 	: []

	// const paddlerInfo = useGetOneByPrimaryKeyAthleteIdGetQuery({})
	const movesList = useGetManyAvailablemovesGetQuery({
		sheetIdListComparisonOperator: "Equal",
		sheetIdList: [currentAthlete.scoresheetId]
	})
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

		const newScoredMoves: scoredMovesType[] = cloneDeep(scoredMoves)
		if (scoredMovesFiltered.length === 1) {
			const bonusMoves = { ...scoredMovesFiltered[0] }

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
	if (
		currentAthlete &&
		currentAthlete.id &&
		currentAthlete.first_name &&
		currentAthlete.last_name &&
		currentAthlete.bib
	) {
		return (
			<Grid container spacing={3}>
				<Grid item xs={7}>
					<Grid container spacing={2}>
						{movesList.data?.map((move) => (
							<Grid item xs={3} key={move.id}>
								<MoveCard
									key={move.id}
									move={move}
									addScoredMove={addScoredMove}
									addScoredBonus={addScoredBonus}
									data-testid={
										"movecard-" + move.id!.toString()
									}
								/>
							</Grid>
						))}
					</Grid>
				</Grid>
				<Grid item xs={5}>
					<InfoBar
						paddlerInfo={currentAthlete}
						addScoredMove={addScoredMove}
						addScoredBonus={addScoredBonus}
						data-testid={"infobar"}
					/>
				</Grid>
			</Grid>
		)
	}

	return <h4>Couldn't get current athlete</h4>
}

export default Float
