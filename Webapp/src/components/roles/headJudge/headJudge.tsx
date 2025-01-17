import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import Modal from "@mui/material/Modal"
import Paper from "@mui/material/Paper"
import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import React, { useEffect, useRef, useState } from "react"
import { toast } from "react-hot-toast"
import { useSelector } from "react-redux"
import { v4 } from "uuid"
import { getSelectedHeat } from "../../../redux/atoms/competitions"
import {
	getCurrentPaddlerIndex,
	getSelectedRun
} from "../../../redux/atoms/scoring"
import {
	ScoredMovesAndBonusesResponse,
	useGetAthleteMovesAndBonnusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberJudgeIdGetQuery,
	useGetHeatInfoGetHeatInfoHeatIdGetQuery,
	useGetHeatPhasesGetHeatInfoHeatIdPhaseGetQuery,
	useGetManyAvailablebonusesGetQuery,
	useGetManyAvailablemovesGetQuery,
	useGetManyRunStatusGetQuery
} from "../../../redux/services/aemsApi"
import { calculateSingleJudgeRunScore } from "../../../utils/scoringUtils"
import {
	HeatScoreTable,
	makeLockedScoreStyle
} from "../../competition/HeatScoreTable"
import { HeatSummaryTable } from "../../competition/HeatSummaryTable"
import { SelectorDisplay } from "../../competition/MainSelector"
import { AthleteInfo, CurrentScore } from "../scribe/InfoBar"
import { PaddlerSelector } from "../scribe/InfoBar/PaddlerSelector"
import { RunSelector } from "../scribe/InfoBar/Runselector"
import ScoredMove, { AvailableBonusType } from "../scribe/InfoBar/ScoredMove"
import { directionType, movesType, scoredMovesType } from "../scribe/Interfaces"

const calculateAverage = (numbers: number[]): number =>
	numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length
// eslint-disable-next-line complexity
export default () => {
	const [scoresOpen, setScoresOpen] = React.useState(false)
	const [allJudgeScores, setAllJudgeScores] = React.useState<number[]>([])
	const handleScoresOpen = () => setScoresOpen(true)
	const handleScoresClose = () => setScoresOpen(false)

	const [listOpen, setListOpen] = React.useState(false)

	const handleListOpen = () => setListOpen(true)
	const handleListClose = () => setListOpen(false)
	const [selectedAthlete, setSelectedAthlete] = useState<
		AthleteInfo | undefined
	>(undefined)
	const selectedHeat = useSelector(getSelectedHeat)
	const [runStatus, setRunStatus] = useState<RunStatus | undefined>(undefined)
	const currentPaddlerIndex = useSelector(getCurrentPaddlerIndex)
	const selectedRun = useSelector(getSelectedRun)
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
	useEffect(() => {
		if (!httpRunStatus?.isUninitialized) {
			void httpRunStatus.refetch()
		}
	}, [selectedHeat, selectedRun, currentPaddlerIndex])
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
		socketRef.current.onerror = () => {
			if (socketRef?.current) {
				socketRef.current.close() // Trigger onclose event for reconnection
			}
		}
	}
	const updateSingleJudgeScore = (newScore: number, judgeNumber: number) => {
		const newAllScores = [...allJudgeScores]
		newAllScores[judgeNumber] = newScore

		setAllJudgeScores(newAllScores)
	}
	useEffect(() => {
		if (httpRunStatus.data) {
			setRunStatus(httpRunStatus.data[0] as RunStatus)
		} else {
			setRunStatus(undefined)
		}
	}, [httpRunStatus])
	const { data: phaseData, isLoading: isPhaseDataLoading } =
		useGetHeatPhasesGetHeatInfoHeatIdPhaseGetQuery(
			{ heatId: selectedHeat },
			{ skip: !selectedHeat }
		)
	const maxJudges =
		(phaseData &&
			Math.max(...phaseData.map((p) => p.number_of_judges), 1)) ??
		1
	const judgeNumberArray = new Array(maxJudges)
		.fill(null)
		.map((_, i) => i + 1)

	useEffect(() => {
		setAllJudgeScores(new Array(maxJudges).fill(0))
	}, [maxJudges])
	// const selectedPhaseData = phaseData?.filter(p => p.athlete_id)

	if (!selectedHeat) {
		return (
			<SelectorDisplay
				showCompetition={true}
				showEvent={false}
				showPhase={false}
				showHeat={true}
			/>
		)
	}
	if (selectedAthlete && !isPhaseDataLoading) {
		// eslint-disable-next-line complexity
		const updateRunStatus = (locked?: boolean, did_not_start?: boolean) => {
			if (!socketRef.current) {
				toast.error(
					"Websocket Connection not ready, please try again in a few seconds"
				)
			}
			if (runStatus) {
				socketRef.current?.send(
					JSON.stringify({
						id: runStatus.id ?? v4(),
						run_number: selectedRun,
						phase_id: athleteData?.[currentPaddlerIndex].phase_id,
						heat_id: selectedHeat,
						athlete_id: selectedAthlete.id,
						locked: locked ?? runStatus.locked ?? false,
						did_not_start:
							did_not_start ?? runStatus.did_not_start ?? false
					})
				)
			} else {
				socketRef.current?.send(
					JSON.stringify({
						id: v4(),

						run_number: selectedRun,
						phase_id:
							athleteData?.[currentPaddlerIndex].phase_id ?? "",
						heat_id: selectedHeat,
						athlete_id: selectedAthlete.id,
						locked: locked ?? false,
						did_not_start: did_not_start ?? false
					})
				)
			}
		}

		return (
			<>
				<Modal
					open={scoresOpen}
					onClose={handleScoresClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Paper sx={style}>
						<HeatScoreTable defaultShowJudgeScores={true} />
					</Paper>
				</Modal>
				<Modal
					open={listOpen}
					onClose={handleListClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Paper sx={style}>
						<HeatSummaryTable />
					</Paper>
				</Modal>
				<Grid
					container
					spacing={2}
					alignItems={"stretch"}
					sx={{ marginTop: "0.5em" }}
				>
					<Grid item xs={5}>
						<SelectorDisplay
							showDetailed={false}
							showEvent={false}
							showPhase={false}
						/>
					</Grid>
					<Grid item xs={2}>
						<PaddlerSelector paddlerInfo={selectedAthlete} />
					</Grid>
					<Grid item xs={1}>
						<RunSelector />
					</Grid>{" "}
					<Grid item xs={1}>
						<FinalScore
							locked={runStatus?.locked ?? false}
							did_not_start={runStatus?.did_not_start ?? false}
							allJudgeScores={allJudgeScores}
						/>
					</Grid>
					{process.env.NEXT_PUBLIC_SHOW_LOCK_RUN && (
						<Grid item xs={1}>
							<Button
								variant="contained"
								fullWidth
								sx={{ height: "100%" }}
								color={
									runStatus?.locked ? "success" : "primary"
								}
								onClick={() =>
									void updateRunStatus(
										!runStatus?.locked,
										runStatus?.did_not_start ?? false
									)
								}
							>
								{runStatus?.locked ? "Unlock Run" : "Lock Run"}
							</Button>
						</Grid>
					)}
					<Grid item xs={1}>
						<Button
							variant="contained"
							fullWidth
							sx={{
								height: "100%"
							}}
							color={
								runStatus?.did_not_start ? "error" : "primary"
							}
							onClick={() => {
								if (runStatus?.locked) {
									toast.error(
										"Please unlock run before setting DNS"
									)
								} else {
									void updateRunStatus(
										runStatus?.locked ?? false,
										!runStatus?.did_not_start
									)
								}
							}}
						>
							{runStatus?.did_not_start ? "Unset DNS" : "SET DNS"}
						</Button>
					</Grid>
					<Grid item xs={1}>
						<Stack
							spacing={2}
							sx={{
								justifyContent: "space-between",
								alignItems: "center",
								height: "100%"
							}}
						>
							<Button
								onClick={handleListOpen}
								variant="contained"
								fullWidth
								sx={{ height: "100%" }}
							>
								Heat List
							</Button>

							<Button
								onClick={handleScoresOpen}
								variant="contained"
								fullWidth
								sx={{ height: "100%" }}
							>
								Heat Scores
							</Button>
						</Stack>
					</Grid>
					<Grid item xs={12}>
						<Divider />
					</Grid>
					{judgeNumberArray.map((jn) => (
						<Grid item key={jn} xs={Math.floor(12 / maxJudges)}>
							<JudgeCard
								judge={jn}
								selectedAthlete={selectedAthlete}
								updateHeadJudgeScore={updateSingleJudgeScore}
							/>
						</Grid>
					))}
				</Grid>
			</>
		)
	}

	return <Skeleton />
}

export interface RunStatus {
	id: string
	heat_id: string
	run_number: number
	phase_id: string
	athlete_id: string
	locked: boolean
	did_not_start: boolean
}

const JudgeCard = ({
	judge,
	selectedAthlete,
	updateHeadJudgeScore
}: {
	judge: number
	selectedAthlete: AthleteInfo
	updateHeadJudgeScore: (newScore: number, judgeNumber: number) => void
}) => {
	const selectedRun = useSelector(getSelectedRun)
	const selectedHeat = useSelector(getSelectedHeat)

	const availableBonuses = useGetManyAvailablebonusesGetQuery({
		sheetIdListComparisonOperator: "Equal",
		sheetIdList: [selectedAthlete.scoresheet]
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
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
					.map((scoredMove: scoredMovesType) => (
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

const FinalScore = ({
	allJudgeScores,
	locked,
	did_not_start
}: {
	allJudgeScores: number[]
	locked: boolean
	did_not_start: boolean
}) => (
	<Paper
		sx={{
			padding: "0.5em",
			height: "100%"
		}}
	>
		<Typography variant="h6">Final Score:</Typography>
		<div style={{ textAlign: "center" }}>
			<Typography variant="h5" sx={makeLockedScoreStyle(locked)}>
				{did_not_start
					? "DNS"
					: calculateAverage(allJudgeScores).toFixed(2)}
			</Typography>
		</div>
	</Paper>
)

export interface ScoredMovesAndBonusesWithMetadata {
	movesAndBonuses: ScoredMovesAndBonusesResponse
	heat_id: string
	athlete_id: string
	run_number: number
	judge_id: number
	phase_id: string
}

export const connectWebRunStatusSocket = (): WebSocket =>
	new WebSocket(
		`ws://localhost:${
			process.env.NEXT_PUBLIC_SERVER_PORT ?? 8000
		}/api/runstatus`
	)

export const connectCurrentScoreStatusSocket = (): WebSocket =>
	new WebSocket(
		`ws://localhost:${
			process.env.NEXT_PUBLIC_SERVER_PORT ?? 8000
		}/api/current_scores`
	)
const style = {
	position: "absolute" as const,
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "70%",
	height: "80%",
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4
}
