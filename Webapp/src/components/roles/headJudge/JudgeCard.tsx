import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import Skeleton from "@mui/material/Skeleton"
import Typography from "@mui/material/Typography"
import { useEffect, useRef, useState } from "react"
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
	directionType,
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

	const updateScore = (newScore: number, judgeNumber: number) => {
		updateHeadJudgeScore(newScore, judgeNumber)
		setCurrentScore(newScore)
	}
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
						updateHeadJudgeScore={updateScore}
						availableBonuses={
							availableBonuses.data as AvailableBonusType[]
						}
						availableMoves={availableMoves.data as movesType[]}
						judge={judge}
						setMovesAndBonuses={setMoveAndBonusData}
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

export const MoveSubscriberUpdater = ({
	selectedHeat,
	selectedRun,
	judge,
	selectedAthleteId,
	updateHeadJudgeScore,
	availableMoves,
	availableBonuses,
	setMovesAndBonuses
}: {
	selectedHeat: string
	selectedRun: number
	judge: number
	selectedAthleteId: string
	updateHeadJudgeScore: (newScore: number, judgeNumber: number) => void
	availableMoves: movesType[]
	availableBonuses: AvailableBonusType[]
	setMovesAndBonuses?: (
		movesAndBonuses: ScoredMovesAndBonusesResponse
	) => void
}) => {
	const [moveAndBonusData, setMoveAndBonusData] =
		useState<ScoredMovesAndBonusesResponse>({ moves: [], bonuses: [] })
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
		if (!socketRef.current) {
			socketRef.current = connectCurrentScoreStatusSocket()
		}
		socketRef.current.onmessage = (event) => {
			const jsonData = JSON.parse(
				event.data as string
			) as ScoredMovesAndBonusesWithMetadata

			if (
				jsonData?.run_number === selectedRun &&
				jsonData?.athlete_id === selectedAthleteId &&
				jsonData?.heat_id === selectedHeat &&
				jsonData?.judge_id === judge
			) {
				setMoveAndBonusData(jsonData.movesAndBonuses)
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
		connectWebSocket()
	}, [])

	useEffect(() => {
		if (!isUninitialized && moveAndBonusHttpData) {
			setMoveAndBonusData(moveAndBonusHttpData)
		}
	}, [moveAndBonusHttpData])
	const scoredMoves = moveAndBonusData?.moves
		? moveAndBonusData.moves.map((m) => ({
				moveId: m.move_id,
				id: m.id,
				direction: m.direction as directionType
		  }))
		: []

	const scoredBonuses = moveAndBonusData?.bonuses
		? moveAndBonusData.bonuses.map((b) => ({
				id: b.id,
				moveId: b.move_id,
				bonusId: b.bonus_id
		  }))
		: []
	const currentScore = calculateSingleJudgeRunScore(
		scoredMoves,
		scoredBonuses,
		availableMoves,
		availableBonuses
	)
	useEffect(() => {
		updateHeadJudgeScore(currentScore.score, judge - 1) // compensate for zero index
	}, [currentScore.score])

	useEffect(() => {
		if (setMovesAndBonuses) {
			setMovesAndBonuses(moveAndBonusData)
		}
	}, [moveAndBonusData])

	return null
}
