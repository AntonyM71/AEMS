import Grid from "@mui/material/Grid"
import { useEffect } from "react"
import { batch, useDispatch, useSelector } from "react-redux"
import {
	getSelectedHeat,
	getSelectedPhase,
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
	useGetAthleteMovesAndBonnusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberJudgeIdGetQuery,
	useGetHeatInfoGetHeatInfoHeatIdGetQuery,
	useGetManyAvailablemovesGetQuery,
	useUpdateAthleteScoreAddUpdateAthleteScoreHeatIdAthleteIdRunNumberJudgeIdPostMutation
} from "../../../redux/services/aemsApi"
import { AthleteInfo, InfoBar } from "./InfoBar"
import {
	directionType,
	movesType,
	scoredBonusType,
	scoredMovesType
} from "./Interfaces"
import { MoveCard } from "./MoveCard"

const Scribe = ({ scribeNumber }: { scribeNumber: string }) => {
	const dispatch = useDispatch()
	const scoredMoves = useSelector(getScoredMoves)
	const scoredBonuses = useSelector(getScoredBonuses)
	const selectedHeat = useSelector(getSelectedHeat)
	const selectedRun = useSelector(getSelectedRun)
	const selectedPhase = useSelector(getSelectedPhase)
	const setNumberOfRuns = (n: number) => dispatch(updateNumberOfRuns(n))

	const setScoredMovesAndBonuses = (
		movesList: scoredMovesType[],
		bonusList: scoredBonusType[]
	): void => {
		batch(() => {
			dispatch(
				updateScoredMovesAndBonuses({
					moves: movesList,
					bonuses: bonusList
				})
			)
		})
	}

	const athletes = useGetHeatInfoGetHeatInfoHeatIdGetQuery({
		heatId: selectedHeat
	})

	const currentPaddlerIndex = useSelector(getCurrentPaddlerIndex)
	const selectedAthlete = athletes.data
		? athletes.data[currentPaddlerIndex]
		: undefined
	useEffect(() => {
		setNumberOfRuns(selectedAthlete?.number_of_runs)
	}, [dispatch, selectedAthlete, selectedAthlete?.number_of_runs])
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
			athleteId: selectedAthlete?.athlete_id!,
			runNumber: selectedRun.toString(),
			phaseId: selectedAthlete?.phase_id!,
			judgeId: scribeNumber,
			addUpdateScoredMovesRequest: {
				moves: formattedScoredMoves,
				bonuses: formattedScoredBonuses
			}
		})
	}
	useEffect(() => {
		if (!isMoveAndBonusFetching && !athletes.isFetching) {
			submitScores()
		}
	}, [scoredMoves, scoredBonuses])

	const {
		data: moveAndBonusdata,
		refetch: refetchMoveAndBonusData,
		isFetching: isMoveAndBonusFetching
	} = useGetAthleteMovesAndBonnusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberJudgeIdGetQuery(
		{
			runNumber: selectedRun.toString(),
			athleteId: selectedAthlete?.athlete_id ?? "",
			judgeId: scribeNumber,
			heatId: selectedHeat
		}
	)

	const getServerScores = async () => {
		await refetchMoveAndBonusData()
	}
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
	useEffect(() => {
		void getServerScores()
	}, [scribeNumber, selectedHeat, selectedRun, selectedAthlete?.athlete_id])

	const availableMoves = useGetManyAvailablemovesGetQuery({
		sheetIdListComparisonOperator: "Equal",
		sheetIdList: [selectedAthlete?.scoresheet]
	})

	if (
		selectedAthlete &&
		selectedAthlete?.id &&
		selectedAthlete.first_name &&
		selectedAthlete.last_name &&
		selectedAthlete.bib
	) {
		return (
			<Grid container spacing={3}>
				<Grid item xs={7}>
					<Grid container spacing={2}>
						{availableMoves.data?.map((move) => (
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
						paddlerInfo={selectedAthlete as AthleteInfo}
						data-testid={"infobar"}
						availableMoves={availableMoves.data as movesType[]}
						isFetchingScoredMoves={isMoveAndBonusFetching}
					/>
				</Grid>
			</Grid>
		)
	}

	return <h4>Couldn't get current athlete</h4>
}

export default Scribe
