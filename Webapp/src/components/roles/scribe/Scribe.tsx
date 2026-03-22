import Alert from "@mui/material/Alert"
import Grid from "@mui/material/Grid2"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	getSelectedHeat,
	updateNumberOfRuns
} from "../../../redux/atoms/competitions"
import {
	getCurrentPaddlerIndex,
	getScoredBonuses,
	getScoredMoves,
	getSelectedRun,
	updateScoredMovesAndBonuses
} from "../../../redux/atoms/scoring"
import {
	PydanticScoredBonuses,
	PydanticScoredMoves,
	useGetAthleteMovesAndBonusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberGetQuery,
	useGetHeatInfoGetHeatInfoHeatIdGetQuery,
	useGetManyAvailablemovesGetQuery,
	useUpdateAthleteScoreAddUpdateAthleteScoreHeatIdAthleteIdRunNumberJudgeIdPostMutation
} from "../../../redux/services/aemsApi"
import { useRunStatusStreamQuery } from "../../../redux/services/streamingApi"
import { InfoBar } from "./InfoBar"
import {
	directionType,
	movesType,
	scoredBonusType,
	scoredMovesType
} from "./Interfaces"
import { MoveCard } from "./MoveCard"

// eslint-disable-next-line complexity
const Scribe = ({ scribeNumber }: { scribeNumber: string }) => {
	const dispatch = useDispatch()
	const scoredMoves = useSelector(getScoredMoves)
	const scoredBonuses = useSelector(getScoredBonuses)
	const selectedHeat = useSelector(getSelectedHeat)
	const selectedRun = useSelector(getSelectedRun)
	const currentPaddlerIndex = useSelector(getCurrentPaddlerIndex)
	const setNumberOfRuns = (n: number) => dispatch(updateNumberOfRuns(n))

	const { data: athleteData } = useGetHeatInfoGetHeatInfoHeatIdGetQuery(
		{
			heatId: selectedHeat
		},
		{ skip: !selectedHeat }
	)

	const currentAthleteId =
		athleteData?.[currentPaddlerIndex]?.athlete_id ?? ""

	const { data: runStatus, isFetching: isRunStatusFetching } =
		useRunStatusStreamQuery(
			{
				heatId: selectedHeat,
				athleteId: currentAthleteId,
				runNumber: selectedRun
			},
			{
				skip: !selectedHeat || !currentAthleteId
			}
		)
	const setScoredMovesAndBonuses = (
		movesList: scoredMovesType[],
		bonusList: scoredBonusType[]
	): void => {
		dispatch(
			updateScoredMovesAndBonuses({
				moves: movesList,
				bonuses: bonusList
			})
		)
	}

	const athletes = useGetHeatInfoGetHeatInfoHeatIdGetQuery(
		{
			heatId: selectedHeat
		},
		{ skip: !selectedHeat }
	)

	useEffect(() => {
		if (athletes?.data) {
			setNumberOfRuns(
				Math.max(...athletes.data.map((a) => a.number_of_runs), 1)
			)
		}
	}, [
		dispatch,
		athleteData?.[currentPaddlerIndex]?.athlete_id,
		athletes.data
	])
	const [addUpdateMovesAndBonuses] =
		useUpdateAthleteScoreAddUpdateAthleteScoreHeatIdAthleteIdRunNumberJudgeIdPostMutation()
	const submitScores = () => {
		if (athleteData) {
			const formattedScoredMoves: PydanticScoredMoves[] = scoredMoves.map(
				(m: scoredMovesType) => ({ ...m, move_id: m.moveId })
			)
			const formattedScoredBonuses: PydanticScoredBonuses[] =
				scoredBonuses.map((b: scoredBonusType) => ({
					...b,
					move_id: b.moveId,
					bonus_id: b.bonusId
				}))

			void addUpdateMovesAndBonuses({
				heatId: selectedHeat,
				athleteId: athleteData?.[currentPaddlerIndex]?.athlete_id ?? "",
				runNumber: selectedRun.toString(),
				phaseId: athleteData[currentPaddlerIndex].phase_id,
				judgeId: scribeNumber,
				addUpdateScoredMovesRequest: {
					moves: formattedScoredMoves,
					bonuses: formattedScoredBonuses
				}
			})
		}
	}
	useEffect(() => {
		if (
			!isMoveAndBonusFetching &&
			!athletes.isFetching &&
			!isRunStatusFetching &&
			!runStatus?.locked
		) {
			submitScores()
		}
	}, [scoredMoves, scoredBonuses])

	const {
		currentData: moveAndBonusdata,

		isFetching: isMoveAndBonusFetching
	} =
		useGetAthleteMovesAndBonusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberGetQuery(
			{
				runNumber: selectedRun.toString(),
				athleteId: athleteData?.[currentPaddlerIndex].athlete_id ?? "",
				judgeId: scribeNumber,
				heatId: selectedHeat
			},
			{
				skip: !athleteData,
				refetchOnMountOrArgChange: true
			}
		)

	useEffect(() => {
		if (!isMoveAndBonusFetching) {
			setScoredMovesAndBonuses(
				moveAndBonusdata?.moves
					? moveAndBonusdata.moves.map((m) => ({
							moveId: m.move_id,
							id: m.id,
							direction: m.direction as directionType
					  }))
					: [],

				moveAndBonusdata?.bonuses
					? moveAndBonusdata.bonuses.map((b) => ({
							id: b.id,

							moveId: b.move_id,
							bonusId: b.bonus_id
					  }))
					: []
			)
		}
	}, [moveAndBonusdata])

	const availableMoves = useGetManyAvailablemovesGetQuery(
		{
			sheetIdListComparisonOperator: "Equal",
			sheetIdList: [athleteData?.[currentPaddlerIndex]?.scoresheet ?? ""]
		},
		{ skip: !athleteData?.[currentPaddlerIndex]?.scoresheet }
	)

	if (athleteData?.[currentPaddlerIndex]?.athlete_id) {
		return (
			<Grid container spacing={1}>
				<Grid size={7}>
					{runStatus?.locked && (
						<Alert severity="info" sx={{ marginBottom: "0.5em" }}>
							Run has been locked by head judge
						</Alert>
					)}
					<Grid container spacing={1}>
						{availableMoves.data?.map((move) => (
							<Grid key={move.id} size={3}>
								<MoveCard
									key={move.id}
									move={move as movesType}
									isRunLocked={runStatus?.locked ?? false}
								/>
							</Grid>
						))}
					</Grid>
				</Grid>
				<Grid size={5}>
					<InfoBar
						paddlerInfo={{
							id:
								athleteData?.[currentPaddlerIndex]
									?.athlete_id ?? "",
							first_name:
								athleteData?.[currentPaddlerIndex]
									?.first_name ?? "",
							last_name:
								athleteData?.[currentPaddlerIndex]?.last_name ??
								"",
							bib: athleteData?.[currentPaddlerIndex]?.bib ?? "",
							scoresheet:
								athleteData?.[currentPaddlerIndex]
									?.scoresheet ?? "",
							affiliation:
								athleteData?.[currentPaddlerIndex]
									?.affiliation ?? ""
						}}
						data-testid={"infobar"}
						availableMoves={availableMoves.data as movesType[]}
						isFetchingScoredMoves={isMoveAndBonusFetching}
						isRunLocked={runStatus?.locked ?? false}
					/>
				</Grid>
			</Grid>
		)
	}

	return <h4>Couldn't get current athlete</h4>
}

export default Scribe
