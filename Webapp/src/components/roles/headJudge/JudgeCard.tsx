import Grid from "@mui/material/Grid"
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
import { directionType, movesType } from "../scribe/Interfaces"
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
	const [moveAndBonusData, setMoveAndBonusData] = useState<
		ScoredMovesAndBonusesResponse | undefined
	>(undefined)
	const {
		data: moveAndBonusHttpData,
		isUninitialized,
		refetch
	} = useGetAthleteMovesAndBonnusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberJudgeIdGetQuery(
		{
			runNumber: selectedRun.toString(),
			athleteId: selectedAthlete?.id ?? "",
			judgeId: judge.toString(),
			heatId: selectedHeat
		},
		{
			skip: !selectedAthlete?.id
		}
	)
	const socketRef = useRef<WebSocket | null>(null)
	const connectWebSocket = () => {
		socketRef.current = connectCurrentScoreStatusSocket()
	}
	useEffect(() => {
		if (!isUninitialized) {
			void refetch()
		}
	}, [judge, selectedRun, selectedHeat])
	useEffect(() => {
		connectWebSocket()
	}, [])
	if (socketRef.current) {
		socketRef.current.onmessage = (event) => {
			const jsonData = JSON.parse(
				event.data as string
			) as ScoredMovesAndBonusesWithMetadata

			if (
				jsonData?.run_number === selectedRun &&
				jsonData?.athlete_id === selectedAthlete?.id &&
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
		if (!isUninitialized) {
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
		(availableMoves.data as movesType[]) || [],
		(availableBonuses.data as AvailableBonusType[]) || []
	)
	useEffect(() => {
		updateHeadJudgeScore(currentScore.score, judge - 1) // compensate for zero index
	}, [currentScore.score])
	if (!isUninitialized) {
		return (
			<Grid container spacing={1} alignItems={"stretch"}>
				<Grid item xs={6}>
					<Paper
						sx={{
							padding: "1em",
							height: "100%"
						}}
					>
						<Typography>{`Judge: ${judge}`}</Typography>
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<CurrentScore currentScore={currentScore} />
				</Grid>

				{[...scoredMoves] // put these into a new array so that reverse works
					.reverse()
					.map((scoredMove) => (
						<Grid item xs={12} key={scoredMove.id}>
							<ScoredMove
								key={scoredMove.id}
								scoredMove={scoredMove}
								scoredMovesList={scoredMoves}
								scoredBonuses={scoredBonuses}
								chipActionsDisabled={true}
							/>
						</Grid>
					))}
			</Grid>
		)
	}

	return <Skeleton />
}
