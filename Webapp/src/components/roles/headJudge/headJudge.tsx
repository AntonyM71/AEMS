import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid2"
import Modal from "@mui/material/Modal"
import Paper from "@mui/material/Paper"
import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"
import { useEffect, useRef, useState } from "react"
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
	useGetHeatInfoGetHeatInfoHeatIdGetQuery,
	useGetHeatPhasesGetHeatInfoHeatIdPhaseGetQuery,
	useGetManyAvailablebonusesGetQuery,
	useGetManyAvailablemovesGetQuery
} from "../../../redux/services/aemsApi"
import {
	useAthleteMovesAndBonusesStreamQuery,
	useRunStatusStreamQuery
} from "../../../redux/services/streamingApi"
import { calculateSingleJudgeRunScore } from "../../../utils/scoringUtils"
import { HeatScoreTable } from "../../competition/HeatScoreTable"
import { HeatSummaryTable } from "../../competition/HeatSummaryTable"
import { SelectorDisplay } from "../../competition/MainSelector"
import { AthleteInfo } from "../scribe/InfoBar"
import { PaddlerSelector } from "../scribe/InfoBar/PaddlerSelector"
import { RunSelector } from "../scribe/InfoBar/Runselector"
import { AvailableBonusType } from "../scribe/InfoBar/ScoredMove"
import {
	convertListToScoredBonusType,
	convertListToScoredMovesType,
	movesType
} from "../scribe/Interfaces"
import { FinalScore } from "./FinalScore"
import { JudgeCard } from "./JudgeCard"
import LiveTimer from "./LiveTimer"
import { RunStatus } from "./RunStatus"
import { connectWebRunStatusSocket } from "./WebSocketConnections"


export default ({
	changeRunStatus = true,
	showLiveTimer = false
}: {
	changeRunStatus?: boolean
	showLiveTimer?: boolean
}) => {
	const [scoresOpen, setScoresOpen] = useState(false)
	const [allJudgeScores, setAllJudgeScores] = useState<
		Record<string, number>
	>({})
	const [allJudgeMoveAndBonusData, setAllJudgeMoveAndBonusData] = useState<
		Record<string, ScoredMovesAndBonusesResponse>
	>({})
	const handleScoresOpen = () => setScoresOpen(true)
	const handleScoresClose = () => setScoresOpen(false)

	const [listOpen, setListOpen] = useState(false)

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
	const availableBonuses = useGetManyAvailablebonusesGetQuery(
		{
			sheetIdListComparisonOperator: "Equal",
			sheetIdList: [selectedAthlete?.scoresheet ?? ""]
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
	const { data: streamMoveData } = useAthleteMovesAndBonusesStreamQuery(
		{
			heatId: selectedHeat,
			athleteId: selectedAthlete?.id ?? "",
			runNumber: selectedRun
		},
		{ skip: !selectedHeat || !selectedAthlete?.id }
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

	const httpRunStatus = useRunStatusStreamQuery(
		{
			heatId: selectedHeat,
			athleteId: selectedAthlete?.id ?? "",
			runNumber: selectedRun
		},
		{
			skip: !selectedHeat || !selectedAthlete?.id
		}
	)

	const socketRef = useRef<WebSocket | null>(null)
	const connectWebSocket = () => {
		socketRef.current = connectWebRunStatusSocket()
		socketRef.current.onclose = () => {
			if (changeRunStatus) {
				setTimeout(connectWebSocket, 1000)
			}
		}
		socketRef.current.onerror = () => {
			if (socketRef?.current) {
				socketRef.current.close()
			}
		}
	}
	useEffect(() => {
		if (changeRunStatus) {
			connectWebSocket()
		}
		return () => {
			socketRef.current?.close()
		}
	}, [changeRunStatus])

	useEffect(() => {
		if (httpRunStatus.data) {
			setRunStatus(httpRunStatus.data)
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
		// Example: get judgeIds from phaseData or another source
		const judgeIds: string[] = Array.from({ length: maxJudges }, (_, i) =>
			String(i + 1)
		)

		const initialScores: Record<string, number> = {}
		judgeIds.forEach((jid) => {
			initialScores[jid] = 0
		})
		setAllJudgeScores(initialScores)
		const initialMovesAndBonuses: Record<
			string,
			ScoredMovesAndBonusesResponse
		> = {}
		judgeIds.forEach((jid) => {
			initialMovesAndBonuses[jid] = { moves: [], bonuses: [] }
		})
		setAllJudgeMoveAndBonusData(initialMovesAndBonuses)
	}, [maxJudges, phaseData])

	useEffect(() => {
		if (!streamMoveData) {
			return
		}
		const judgeNumbers = new Array(maxJudges)
			.fill(null)
			.map((_, i) => String(i + 1))
		const newScores: Record<string, number> = {}
		const newData: Record<string, ScoredMovesAndBonusesResponse> = {}
		judgeNumbers.forEach((jid) => {
			const filteredData: ScoredMovesAndBonusesResponse = {
				moves:
					streamMoveData.moves?.filter((m) => m.judge_id === jid) ??
					[],
				bonuses:
					streamMoveData.bonuses?.filter(
						(b) => b.judge_id === jid
					) ?? []
			}
			newScores[jid] = calculateMoveAndBonusScore(
				filteredData,
				(availableMoves.data ?? []) as movesType[],
				(availableBonuses.data ?? []) as AvailableBonusType[]
			)
			newData[jid] = filteredData
		})
		setAllJudgeScores(newScores)
		setAllJudgeMoveAndBonusData(newData)
	}, [streamMoveData, maxJudges, availableMoves.data, availableBonuses.data])

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
			<div data-testid="head-judge-page">
				<Modal
					open={scoresOpen}
					onClose={handleScoresClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Paper
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							width: "70%",
							height: "80%",
							bgcolor: "background.paper",
							boxShadow: 24,
							p: 4
						}}
					>
						<HeatScoreTable defaultShowJudgeScores={true} />
					</Paper>
				</Modal>
				<Modal
					open={listOpen}
					onClose={handleListClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Paper
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							width: "70%",
							height: "80%",
							bgcolor: "background.paper",
							boxShadow: 24,
							p: 4
						}}
					>
						<HeatSummaryTable />
					</Paper>
				</Modal>
				<Grid
					container
					spacing={2}
					alignItems={"stretch"}
					sx={{ marginTop: "0.5em" }}
				>
					<Grid size={5}>
						<SelectorDisplay
							showDetailed={false}
							showEvent={false}
							showPhase={false}
						/>
					</Grid>
					<Grid size={2}>
						<PaddlerSelector paddlerInfo={selectedAthlete} />
					</Grid>
					<Grid size={1}>
						<RunSelector />
					</Grid>{" "}
					<Grid size={1}>
						<FinalScore
							locked={runStatus?.locked ?? false}
							did_not_start={runStatus?.did_not_start ?? false}
							allJudgeScores={allJudgeScores}
						/>
					</Grid>
					{process.env.NEXT_PUBLIC_SHOW_LOCK_RUN &&
						changeRunStatus && (
							<Grid size={1}>
								<Button
									data-testid="lock-run-button"
									variant="contained"
									fullWidth
									sx={{ height: "100%" }}
									color={
										runStatus?.locked
											? "success"
											: "primary"
									}
									onClick={() =>
										void updateRunStatus(
											!runStatus?.locked,
											runStatus?.did_not_start ?? false
										)
									}
								>
									{runStatus?.locked
										? "Unlock Run"
										: "Lock Run"}
								</Button>
							</Grid>
						)}
					{changeRunStatus && (
						<Grid size={1}>
							<Button
								data-testid="dns-button"
								variant="contained"
								fullWidth
								sx={{
									height: "100%"
								}}
								color={
									runStatus?.did_not_start
										? "error"
										: "primary"
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
								{runStatus?.did_not_start
									? "Unset DNS"
									: "SET DNS"}
							</Button>
						</Grid>
					)}
					{showLiveTimer && (
						<Grid size={1}>
							<LiveTimer />
						</Grid>
					)}
					<Grid size={1}>
						<Stack
							spacing={2}
							sx={{
								justifyContent: "space-between",
								alignItems: "center",
								height: "100%"
							}}
						>
							<Button
								data-testid="heat-list-button"
								onClick={handleListOpen}
								variant="contained"
								fullWidth
								sx={{ height: "100%" }}
							>
								Heat List
							</Button>

							<Button
								data-testid="heat-scores-button"
								onClick={handleScoresOpen}
								variant="contained"
								fullWidth
								sx={{ height: "100%" }}
							>
								Heat Scores
							</Button>
						</Stack>
					</Grid>
					<Grid size={12}>
						<Divider />
					</Grid>
					{judgeNumberArray.map((jn) => (
						<Grid key={jn} size={Math.floor(12 / maxJudges)}>
							<JudgeCard
								judge={jn}
								selectedAthlete={selectedAthlete}
								moveAndBonusData={allJudgeMoveAndBonusData[jn]}
								currentScore={allJudgeScores[jn]}
							/>
						</Grid>
					))}
				</Grid>
			</div>
		)
	}

	return <Skeleton data-testid="loading-skeleton" />
}

export const calculateMoveAndBonusScore = (
	data: ScoredMovesAndBonusesResponse,

	availableMoves: movesType[],
	availableBonuses: AvailableBonusType[]
): number => {
	const score = calculateSingleJudgeRunScore(
		convertListToScoredMovesType(data.moves),
		convertListToScoredBonusType(data.bonuses),
		availableMoves,
		availableBonuses
	).score

	return score
}
