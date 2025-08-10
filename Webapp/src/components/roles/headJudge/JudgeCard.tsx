import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import Skeleton from "@mui/material/Skeleton"
import Typography from "@mui/material/Typography"
import { useCallback, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { getSelectedHeat } from "../../../redux/atoms/competitions"
import { getSelectedRun } from "../../../redux/atoms/scoring"
import {
	ScoredMovesAndBonusesResponse,
	useGetAthleteMovesAndBonnusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberJudgeIdGetQuery,
	useGetManyAvailablebonusesGetQuery,
	useGetManyAvailablemovesGetQuery
} from "../../../redux/services/aemsApi"
import { calculateSingleJudgeRunScore } from "../../../utils/scoringUtils"
import { AthleteInfo, CurrentScore } from "../scribe/InfoBar"
import ScoredMove, { AvailableBonusType } from "../scribe/InfoBar/ScoredMove"
import {
	convertListToScoredBonusType,
	convertListToScoredMovesType,
	movesType
} from "../scribe/Interfaces"
import { ScoredMovesAndBonusesWithMetadata } from "./RunStatus"
import { connectCurrentScoreStatusSocket } from "./WebSocketConnections"

interface JudgeCardProps {
	judge: number
	selectedAthlete: AthleteInfo
	updateHeadJudgeScore: (newScore: number, judgeNumber: number) => void
}

export const JudgeCard = ({
	judge,
	selectedAthlete,
	updateHeadJudgeScore
}: JudgeCardProps) => {
	const selectedRun = useSelector(getSelectedRun)
	const selectedHeat = useSelector(getSelectedHeat)
	const [currentScore, setCurrentScore] = useState<number>(0)
	const availableBonuses = useGetManyAvailablebonusesGetQuery({
		sheetIdListComparisonOperator: "Equal",
		sheetIdList: [selectedAthlete.scoresheet ?? ""]
	})
	const availableMoves = useGetManyAvailablemovesGetQuery(
		{
			sheetIdListComparisonOperator: "Equal",
			sheetIdList: [selectedAthlete?.scoresheet ?? ""]
		},
		{ skip: !selectedAthlete?.scoresheet }
	)

	const updateJudgeData = useCallback(
		(newData: {
			score: number
			judgeNumber: number
			movesAndBonuses: ScoredMovesAndBonusesResponse
		}) => {
			// console.log("New Score:", newData.score)
			updateHeadJudgeScore(newData.score, newData.judgeNumber)
			setCurrentScore(newData.score)

			setMoveAndBonusData(newData.movesAndBonuses)
		},
		[]
	)
	const [moveAndBonusData, setMoveAndBonusData] =
		useState<ScoredMovesAndBonusesResponse>({ moves: [], bonuses: [] })
	const scoredMoves = convertListToScoredMovesType(moveAndBonusData.moves)
	if (availableMoves.isSuccess && availableBonuses.isSuccess) {
		return (
			<Grid container spacing={1} alignItems={"stretch"}>
				<Grid size={6}>
					<MoveSubscriberUpdater
						selectedHeat={selectedHeat}
						selectedRun={selectedRun}
						selectedAthleteId={selectedAthlete.id}
						updateJudgeData={updateJudgeData}
						availableBonuses={
							availableBonuses.data as AvailableBonusType[]
						}
						availableMoves={availableMoves.data as movesType[]}
						judge={judge}
					/>
					<Paper
						sx={{
							padding: "1em",
							height: "100%"
						}}
					>
						<Typography>{`Judge: ${judge}`}</Typography>
					</Paper>
				</Grid>
				<Grid size={6}>
					<CurrentScore currentScore={currentScore} />
				</Grid>

				{[...scoredMoves] // put these into a new array so that reverse works
					.reverse()
					.map((scoredMove) => (
						<Grid key={scoredMove.id} size={12}>
							<ScoredMove
								key={scoredMove.id}
								scoredMove={scoredMove}
								scoredMovesList={scoredMoves}
								scoredBonuses={convertListToScoredBonusType(
									moveAndBonusData.bonuses
								)}
								chipActionsDisabled={true}
							/>
						</Grid>
					))}
			</Grid>
		)
	}

	return <Skeleton />
}

const calculateAndUpdateScore = (
	data: ScoredMovesAndBonusesResponse,
	judge: number,
	availableMoves: movesType[],
	availableBonuses: AvailableBonusType[],
	updateJudgeData: (newData: {
		score: number
		judgeNumber: number
		movesAndBonuses: ScoredMovesAndBonusesResponse
	}) => void
) => {
	const score = calculateSingleJudgeRunScore(
		convertListToScoredMovesType(data.moves),
		convertListToScoredBonusType(data.bonuses),
		availableMoves,
		availableBonuses
	).score

	updateJudgeData({
		score,
		judgeNumber: judge - 1,
		movesAndBonuses: data
	})
}

export const MoveSubscriberUpdater = ({
	selectedHeat,
	selectedRun,
	judge,
	selectedAthleteId,
	updateJudgeData,
	availableMoves,
	availableBonuses
}: {
	selectedHeat: string
	selectedRun: number
	judge: number
	selectedAthleteId: string
	updateJudgeData: (newData: {
		score: number
		judgeNumber: number
		movesAndBonuses: ScoredMovesAndBonusesResponse
	}) => void
	availableMoves: movesType[]
	availableBonuses: AvailableBonusType[]
}) => {
	const { data: moveAndBonusHttpData, isUninitialized } =
		useGetAthleteMovesAndBonnusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberJudgeIdGetQuery(
			{
				runNumber: selectedRun.toString(),
				athleteId: selectedAthleteId,
				judgeId: judge.toString(),
				heatId: selectedHeat
			},
			{
				skip: !selectedAthleteId,
				refetchOnMountOrArgChange: true
			}
		)
	const socketRef = useRef<WebSocket | null>(null)
	const connectWebSocket = () => {
		socketRef.current ??= connectCurrentScoreStatusSocket()
		socketRef.current.onmessage = (event) => {
			const jsonData = JSON.parse(
				event.data as string
			) as ScoredMovesAndBonusesWithMetadata
			// console.log("WebSocket handler values:", {
			// 	selectedRun,
			// 	selectedAthleteId,
			// 	selectedHeat,
			// 	judge,
			// 	availableMoves,
			// 	availableBonuses
			// })
			if (
				jsonData?.run_number === selectedRun &&
				jsonData?.athlete_id === selectedAthleteId &&
				jsonData?.heat_id === selectedHeat &&
				jsonData?.judge_id === judge
			) {
				calculateAndUpdateScore(
					jsonData.movesAndBonuses,
					judge,
					availableMoves,
					availableBonuses,
					updateJudgeData
				)
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
		if (!isUninitialized && moveAndBonusHttpData) {
			calculateAndUpdateScore(
				moveAndBonusHttpData,
				judge,
				availableMoves,
				availableBonuses,
				updateJudgeData
			)
		}
	}, [moveAndBonusHttpData, isUninitialized])

	useEffect(() => {
		connectWebSocket()
	}, [])

	return <></>
}
