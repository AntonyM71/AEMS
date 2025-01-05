import Alert from "@mui/material/Alert"
import Grid from "@mui/material/Grid"
import { useEffect, useRef, useState } from "react"
import { batch, useDispatch, useSelector } from "react-redux"
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
	useGetAthleteMovesAndBonnusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberJudgeIdGetQuery,
	useGetHeatInfoGetHeatInfoHeatIdGetQuery,
	useGetManyAvailablemovesGetQuery,
	useGetManyRunStatusGetQuery,
	useUpdateAthleteScoreAddUpdateAthleteScoreHeatIdAthleteIdRunNumberJudgeIdPostMutation
} from "../../../redux/services/aemsApi"
import { connectWebRunStatusSocket, RunStatus } from "../headJudge/headJudge"
import { AthleteInfo, InfoBar } from "./InfoBar"
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
	const [runStatus, setRunStatus] = useState<RunStatus | undefined>(undefined)
	const [selectedAthlete, setSelectedAthlete] = useState<
		AthleteInfo | undefined
	>(undefined)
	const { data: athleteData } = useGetHeatInfoGetHeatInfoHeatIdGetQuery(
		{
			heatId: selectedHeat
		},
		{ skip: !selectedHeat }
	)
	useEffect(() => {
		if (athleteData) {
			setSelectedAthlete({
				id: athleteData[currentPaddlerIndex].athlete_id,
				first_name: athleteData[currentPaddlerIndex].first_name,
				last_name: athleteData[currentPaddlerIndex].last_name,
				bib: athleteData[currentPaddlerIndex].bib,
				scoresheet: athleteData[currentPaddlerIndex].scoresheet
			})
		} else {
			setSelectedAthlete(undefined)
		}
	}, [currentPaddlerIndex, athleteData, selectedHeat])

	const httpRunStatus = useGetManyRunStatusGetQuery(
		{
			heatIdList: [selectedHeat],
			athleteIdList: [selectedAthlete?.id ?? ""],
			runNumberList: [selectedRun]
		},
		{
			skip: !selectedHeat || !selectedAthlete?.id
		}
	)

	const socketRef = useRef<WebSocket | null>(null)
	const connectWebSocket = () => {
		socketRef.current = connectWebRunStatusSocket()
	}
	useEffect(() => {
		connectWebSocket()
	}, [])
	if (socketRef.current) {
		socketRef.current.onmessage = (event) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			const jsonData = JSON.parse(event.data) as RunStatus

			if (
				jsonData?.run_number === selectedRun &&
				jsonData?.athlete_id === selectedAthlete?.id &&
				jsonData?.heat_id === selectedHeat
			) {
				setRunStatus(jsonData)
			}
		}
		socketRef.current.onclose = () => {
			setTimeout(connectWebSocket, 1000) // Reconnect after 5 seconds
		}
		socketRef.current.onerror = (error) => {
			console.error("WebSocket error:", error)
			if (socketRef?.current) {
				socketRef.current.close() // Trigger onclose event for reconnection
			}
		}
	}
	useEffect(() => {
		if (httpRunStatus.data) {
			setRunStatus(httpRunStatus.data[0] as RunStatus)
		} else {
			setRunStatus(undefined)
		}
	}, [httpRunStatus])
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
	}, [dispatch, selectedAthlete, athletes.data])
	const [addUpdateMovesAndBonuses] =
		useUpdateAthleteScoreAddUpdateAthleteScoreHeatIdAthleteIdRunNumberJudgeIdPostMutation()
	const submitScores = () => {
		if (selectedAthlete && athleteData) {
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
				athleteId: selectedAthlete.id,
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
			!httpRunStatus.isFetching &&
			!runStatus?.locked
		) {
			submitScores()
		}
	}, [scoredMoves, scoredBonuses])

	const {
		data: moveAndBonusdata,
		refetch: refetchMoveAndBonusData,
		isFetching: isMoveAndBonusFetching,
		isUninitialized
	} = useGetAthleteMovesAndBonnusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberJudgeIdGetQuery(
		{
			runNumber: selectedRun.toString(),
			athleteId: selectedAthlete?.id ?? "",
			judgeId: scribeNumber,
			heatId: selectedHeat
		},
		{ skip: !selectedAthlete?.id }
	)

	const getserverScores = async () => {
		if (!isUninitialized) {
			await refetchMoveAndBonusData()
		}
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
		void getserverScores()
		if (!httpRunStatus?.isUninitialized) {
			void httpRunStatus.refetch()
		}
	}, [
		scribeNumber,
		selectedHeat,
		selectedRun,
		selectedAthlete,
		selectedAthlete?.id
	])

	const availableMoves = useGetManyAvailablemovesGetQuery(
		{
			sheetIdListComparisonOperator: "Equal",
			sheetIdList: [selectedAthlete?.scoresheet ?? ""]
		},
		{ skip: !selectedAthlete?.scoresheet }
	)

	if (
		selectedAthlete?.id &&
		selectedAthlete?.first_name &&
		selectedAthlete?.last_name &&
		selectedAthlete?.bib
	) {
		return (
			<Grid container spacing={1}>
				<Grid item xs={7}>
					{runStatus?.locked && (
						<Alert severity="info">
							Run has been locked by head judge
						</Alert>
					)}
					<Grid container spacing={1}>
						{availableMoves.data?.map((move) => (
							<Grid item xs={3} key={move.id}>
								<MoveCard
									key={move.id}
									move={move as movesType}
									isRunLocked={runStatus?.locked ?? false}
								/>
							</Grid>
						))}
					</Grid>
				</Grid>
				<Grid item xs={5}>
					<InfoBar
						paddlerInfo={selectedAthlete}
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
