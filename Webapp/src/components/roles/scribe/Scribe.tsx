import Grid from "@mui/material/Grid"
import { flatten } from "lodash"
import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSelectedHeat } from "../../../redux/atoms/competitions"
import {
	getCurrentPaddlerIndex,
	getScoredMoves,
	updateScoredBonuses
} from "../../../redux/atoms/scoring"
import {
	useGetManyAthleteheatGetQuery,
	useGetManyAvailablemovesGetQuery
} from "../../../redux/services/aemsApi"
import { AthleteInfo, InfoBar } from "./InfoBar"
import { movesType, scoredBonusType } from "./Interfaces"
import { MoveCard } from "./MoveCard"

const Scribe = ({ scribeNumber }: { scribeNumber: string }) => {
	const dispatch = useDispatch()

	const setScoredBonuses = (newBonuses: scoredBonusType[]) =>
		dispatch(updateScoredBonuses(newBonuses))
	const scoredMoves = useSelector(getScoredMoves)

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

	const submitScores = () => {
		console.log(scribeNumber)
	}
	const movesList = useGetManyAvailablemovesGetQuery({
		sheetIdListComparisonOperator: "Equal",
		sheetIdList: [currentAthlete.scoresheetId]
	})

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
									move={move as movesType}
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
						paddlerInfo={currentAthlete as AthleteInfo}
						data-testid={"infobar"}
					/>
				</Grid>
			</Grid>
		)
	}

	return <h4>Couldn't get current athlete</h4>
}

export default Scribe
