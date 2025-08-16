import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import Skeleton from "@mui/material/Skeleton"
import Typography from "@mui/material/Typography"
import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { getSelectedHeat } from "../../../redux/atoms/competitions"
import { getSelectedRun } from "../../../redux/atoms/scoring"
import {
	ScoredMovesAndBonusesResponse,
	useGetAthleteMovesAndBonnusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberGetQuery,
	useGetManyAvailablebonusesGetQuery,
	useGetManyAvailablemovesGetQuery
} from "../../../redux/services/aemsApi"
import { AthleteInfo, CurrentScore } from "../scribe/InfoBar"
import ScoredMove from "../scribe/InfoBar/ScoredMove"
import {
	convertListToScoredBonusType,
	convertListToScoredMovesType
} from "../scribe/Interfaces"
import { ScoredMovesAndBonusesWithMetadata } from "./RunStatus"
import { connectCurrentScoreStatusSocket } from "./WebSocketConnections"

interface JudgeCardProps {
	judge: number
	selectedAthlete: AthleteInfo
	moveAndBonusData: ScoredMovesAndBonusesResponse
	currentScore: number
}

export const JudgeCard = ({
	judge,
	selectedAthlete,
	currentScore,
	moveAndBonusData
}: JudgeCardProps) => {
	const selectedRun = useSelector(getSelectedRun)
	const selectedHeat = useSelector(getSelectedHeat)

	const availableBonuses = useGetManyAvailablebonusesGetQuery(
		{
			sheetIdListComparisonOperator: "Equal",
			sheetIdList: [selectedAthlete.scoresheet ?? ""]
		},
		{ skip: !selectedAthlete?.scoresheet }
	)
	const availableMoves = useGetManyAvailablemovesGetQuery(
		{
			sheetIdListComparisonOperator: "Equal",
			sheetIdList: [selectedAthlete?.scoresheet ?? ""]
		},
		{ skip: !selectedAthlete?.scoresheet }
	)

	const scoredMoves = convertListToScoredMovesType(
		moveAndBonusData?.moves ?? []
	)
	if (availableMoves.isSuccess && availableBonuses.isSuccess) {
		return (
			<Grid container spacing={1} alignItems={"stretch"}>
				<Grid size={6}>
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

export const WebsocketMoveSubscriberUpdater = ({
	selectedHeat,
	selectedRun,

	selectedAthleteId,
	updateJudgeData
}: {
	selectedHeat: string
	selectedRun: number

	selectedAthleteId: string
	updateJudgeData: (
		movesAndBonuses: ScoredMovesAndBonusesResponse,
		clear: boolean,
		judgesToUpdate: string[]
	) => void
}) => {
	const socketRef = useRef<WebSocket | null>(null)
	const connectWebSocket = () => {
		socketRef.current ??= connectCurrentScoreStatusSocket()
		socketRef.current.onmessage = (event) => {
			const jsonData = JSON.parse(
				event.data as string
			) as ScoredMovesAndBonusesWithMetadata

			if (
				jsonData?.run_number === selectedRun &&
				jsonData?.athlete_id === selectedAthleteId &&
				jsonData?.heat_id === selectedHeat
			) {
				console.log("Details Match")

				updateJudgeData(jsonData.movesAndBonuses, false, [
					String(jsonData.judge_id)
				])
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
	}, [selectedHeat, selectedRun, selectedAthleteId, updateJudgeData])

	return <></>
}

export const HTTPMoveSubscriberUpdater = ({
	selectedHeat,
	selectedRun,

	selectedAthleteId,
	updateJudgeData
}: {
	selectedHeat: string
	selectedRun: number

	selectedAthleteId: string
	updateJudgeData: (
		movesAndBonuses: ScoredMovesAndBonusesResponse,
		clear: boolean,
		judgesToUpdate: string[]
	) => void
}) => {
	const { data: moveAndBonusHttpData, isUninitialized } =
		useGetAthleteMovesAndBonnusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberGetQuery(
			{
				runNumber: selectedRun.toString(),
				athleteId: selectedAthleteId,
				heatId: selectedHeat
			},
			{
				skip: !selectedAthleteId,
				refetchOnMountOrArgChange: true
			}
		)

	useEffect(() => {
		if (!isUninitialized && moveAndBonusHttpData) {
			const judgesToUpdate = Array.from(
				new Set([
					...(moveAndBonusHttpData.moves?.map((m) => m.judge_id) ??
						[]),
					...(moveAndBonusHttpData.bonuses?.map((b) => b.judge_id) ??
						[])
				])
			)
			updateJudgeData(moveAndBonusHttpData, true, judgesToUpdate)
		}
	}, [moveAndBonusHttpData, isUninitialized])

	return <></>
}
