import Grid from "@mui/material/Grid"
import { flatten } from "lodash"
import { useEffect, useMemo } from "react"
import { useSelector } from "react-redux"
import { getSelectedHeat } from "../../../redux/atoms/competitions"
import {
	getCurrentPaddlerIndex,
	getScoredBonuses,
	getScoredMoves,
	getSelectedRun
} from "../../../redux/atoms/scoring"
import {
	PydanticScoredBonuses,
	PydanticScoredMoves,
	useGetManyAthleteheatGetQuery,
	useGetManyAvailablemovesGetQuery,
	useUpdateAthleteScoreAddUpdateAthleteScoreHeatIdAthleteIdRunNumberJudgeIdPostMutation
} from "../../../redux/services/aemsApi"
import { AthleteInfo, InfoBar } from "./InfoBar"
import { movesType, scoredBonusType, scoredMovesType } from "./Interfaces"
import { MoveCard } from "./MoveCard"

const Scribe = ({ scribeNumber }: { scribeNumber: string }) => {
	const scoredMoves = useSelector(getScoredMoves)
	const scoredBonuses = useSelector(getScoredBonuses)
	const selectedHeat = useSelector(getSelectedHeat)
	const selectedRun = useSelector(getSelectedRun)

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
	const [addUpdateMovesAndBonuses] =
		useUpdateAthleteScoreAddUpdateAthleteScoreHeatIdAthleteIdRunNumberJudgeIdPostMutation()
	const submitScores = () => {
		const formattedScoredMoves: PydanticScoredMoves[] = scoredMoves.map(
			(m: scoredMovesType) => ({ ...m, move_id: m.moveId })
		)
		const formattedScoredBonuses: PydanticScoredBonuses[] =
			scoredBonuses.map((b: scoredBonusType) => ({
				...b,
				move_id: b.moveId,
				bonus_id: b.bonusId
			}))
		// ToDo: if statement here to only send the moves if they don't match the most recent returned requested moves?
		void addUpdateMovesAndBonuses({
			heatId: selectedHeat,
			athleteId: currentAthlete.id!,
			runNumber: selectedRun.toString(),
			judgeId: scribeNumber,
			addUpdateScoredMovesRequest: {
				moves: formattedScoredMoves,
				bonuses: formattedScoredBonuses
			}
		})
	}
	useEffect(() => {
		submitScores()
	}, [scoredMoves, scoredBonuses])

	const availableMoves = useGetManyAvailablemovesGetQuery({
		sheetIdListComparisonOperator: "Equal",
		sheetIdList: [currentAthlete.scoresheetId]
	})

	if (
		currentAthlete?.id &&
		currentAthlete.first_name &&
		currentAthlete.last_name &&
		currentAthlete.bib
	) {
		return (
			<Grid container spacing={3}>
				<Grid item xs={7}>
					<Grid container spacing={2}>
						{availableMoves.data?.map((move) => (
							<Grid item xs={3} key={move.id}>
								<MoveCard
									key={move.id}
									move={move}
									data-testid={
										"movecard-" + move.id.toString()
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
						availableMoves={availableMoves.data as movesType[]}
					/>
				</Grid>
			</Grid>
		)
	}

	return <h4>Couldn't get current athlete</h4>
}

export default Scribe
