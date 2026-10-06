import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid2"
import Modal from "@mui/material/Modal"
import Paper from "@mui/material/Paper"
import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"
import { ReactNode, useEffect, useMemo, useState } from "react"
import { toast } from "react-hot-toast"
import { useSelector } from "react-redux"
import { v4 } from "uuid"
import {
	getSelectedCompetition,
	getSelectedHeat
} from "../../../redux/atoms/competitions"
import {
	getCurrentPaddlerIndex,
	getSelectedRun
} from "../../../redux/atoms/scoring"
import {
	HeatInfoResponse,
	ScoredMovesAndBonusesResponse,
	useGetHeatInfoGetHeatInfoHeatIdGetQuery,
	useGetHeatPhasesGetHeatInfoHeatIdPhaseGetQuery,
	useGetManyAvailablebonusesGetQuery,
	useGetManyAvailablemovesGetQuery
} from "../../../redux/services/aemsApi"
import {
	useAthleteMovesAndBonusesStreamQuery,
	useEmitRunStatusMutation,
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
import usePublishHeadJudgePosition from "./usePublishHeadJudgePosition"

const PAPER_MODAL_SX = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "70%",
	height: "80%",
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4
} as const

const PaperModal = ({
	open,
	onClose,
	children
}: {
	open: boolean
	onClose: () => void
	children: ReactNode
}) => (
	<Modal
		open={open}
		onClose={onClose}
		aria-labelledby="modal-modal-title"
		aria-describedby="modal-modal-description"
	>
		<Paper sx={PAPER_MODAL_SX}>{children}</Paper>
	</Modal>
)

const toAthleteInfo = (
	athlete: HeatInfoResponse | undefined
): AthleteInfo | undefined =>
	athlete && {
		id: athlete.athlete_id,
		first_name: athlete.first_name,
		last_name: athlete.last_name,
		bib: athlete.bib,
		scoresheet: athlete.scoresheet,
		affiliation: athlete.affiliation
	}

const judgeIdsFor = (maxJudges: number): string[] =>
	Array.from({ length: maxJudges }, (_, i) => String(i + 1))

const useJudgeScores = (
	maxJudges: number,
	streamMoveData: ScoredMovesAndBonusesResponse | undefined,
	availableMoves: movesType[],
	availableBonuses: AvailableBonusType[]
) =>
	useMemo(() => {
		const allJudgeScores: Record<string, number> = {}
		const allJudgeMoveAndBonusData: Record<
			string,
			ScoredMovesAndBonusesResponse
		> = {}
		judgeIdsFor(maxJudges).forEach((jid) => {
			const judgeData: ScoredMovesAndBonusesResponse = {
				moves:
					streamMoveData?.moves?.filter((m) => m.judge_id === jid) ??
					[],
				bonuses:
					streamMoveData?.bonuses?.filter(
						(b) => b.judge_id === jid
					) ?? []
			}
			allJudgeScores[jid] = calculateMoveAndBonusScore(
				judgeData,
				availableMoves,
				availableBonuses
			)
			allJudgeMoveAndBonusData[jid] = judgeData
		})

		return { allJudgeScores, allJudgeMoveAndBonusData }
	}, [streamMoveData, maxJudges, availableMoves, availableBonuses])

// An unspecified flag keeps the current status's value.
const buildRunStatusUpdate = (
	run: Pick<RunStatus, "run_number" | "phase_id" | "heat_id" | "athlete_id">,
	current: RunStatus | undefined,
	locked?: boolean,
	did_not_start?: boolean
) => ({
	...run,
	id: current?.id ?? v4(),
	locked: locked ?? current?.locked ?? false,
	did_not_start: did_not_start ?? current?.did_not_start ?? false
})

const LockRunButton = ({
	runStatus,
	onUpdate
}: {
	runStatus: RunStatus | undefined
	onUpdate: (locked: boolean, didNotStart: boolean) => void
}) => (
	<Grid size={1}>
		<Button
			data-testid="lock-run-button"
			variant="contained"
			fullWidth
			sx={{ height: "100%" }}
			color={runStatus?.locked ? "success" : "primary"}
			onClick={() =>
				onUpdate(!runStatus?.locked, runStatus?.did_not_start ?? false)
			}
		>
			{runStatus?.locked ? "Unlock Run" : "Lock Run"}
		</Button>
	</Grid>
)

const DnsButton = ({
	runStatus,
	onUpdate
}: {
	runStatus: RunStatus | undefined
	onUpdate: (locked: boolean, didNotStart: boolean) => void
}) => (
	<Grid size={1}>
		<Button
			data-testid="dns-button"
			variant="contained"
			fullWidth
			sx={{ height: "100%" }}
			color={runStatus?.did_not_start ? "error" : "primary"}
			onClick={() => {
				if (runStatus?.locked) {
					toast.error("Please unlock run before setting DNS")
				} else {
					onUpdate(false, !runStatus?.did_not_start)
				}
			}}
		>
			{runStatus?.did_not_start ? "Unset DNS" : "SET DNS"}
		</Button>
	</Grid>
)

const RunFinalScore = ({
	runStatus,
	allJudgeScores
}: {
	runStatus: RunStatus | undefined
	allJudgeScores: Record<string, number>
}) => (
	<Grid size={1}>
		<FinalScore
			locked={runStatus?.locked ?? false}
			did_not_start={runStatus?.did_not_start ?? false}
			allJudgeScores={allJudgeScores}
		/>
	</Grid>
)

const RunStatusButtons = ({
	runStatus,
	onUpdate
}: {
	runStatus: RunStatus | undefined
	onUpdate: (locked: boolean, didNotStart: boolean) => void
}) => (
	<>
		{process.env.NEXT_PUBLIC_SHOW_LOCK_RUN && (
			<LockRunButton runStatus={runStatus} onUpdate={onUpdate} />
		)}
		<DnsButton runStatus={runStatus} onUpdate={onUpdate} />
	</>
)

const useRunStatus = (
	heatId: string,
	athleteId: string | undefined,
	runNumber: number
): RunStatus | undefined =>
	useRunStatusStreamQuery(
		{ heatId, athleteId: athleteId ?? "", runNumber },
		{ skip: !heatId || !athleteId }
	).data

const useHeadJudgePublishing = (
	isHeadJudge: boolean,
	selectedAthlete: AthleteInfo | undefined
) => {
	const selectedHeat = useSelector(getSelectedHeat)
	const selectedCompetition = useSelector(getSelectedCompetition)
	const selectedRun = useSelector(getSelectedRun)
	const headJudgePosition = useMemo(
		() =>
			isHeadJudge && selectedHeat && selectedAthlete
				? {
						competitionId: selectedCompetition,
						heatId: selectedHeat,
						athlete: selectedAthlete,
						runNumber: selectedRun
				  }
				: undefined,
		[
			isHeadJudge,
			selectedCompetition,
			selectedHeat,
			selectedAthlete,
			selectedRun
		]
	)
	usePublishHeadJudgePosition(headJudgePosition)
}

const NO_MOVES: movesType[] = []
const NO_BONUSES: AvailableBonusType[] = []

const useAvailableScoringItems = (scoresheet: string | undefined) => {
	const query = { sheetIdList: [scoresheet ?? ""] }
	const options = { skip: !scoresheet, refetchOnReconnect: true }
	const bonuses = useGetManyAvailablebonusesGetQuery(query, options)
	const moves = useGetManyAvailablemovesGetQuery(query, options)

	return {
		availableMoves: (moves.data as movesType[] | undefined) ?? NO_MOVES,
		availableBonuses:
			(bonuses.data as AvailableBonusType[] | undefined) ?? NO_BONUSES
	}
}

const useHeadJudgeHeatData = () => {
	const selectedHeat = useSelector(getSelectedHeat)
	const currentPaddlerIndex = useSelector(getCurrentPaddlerIndex)
	const selectedRun = useSelector(getSelectedRun)
	// currentData, not data: data still holds the previous heat's paddlers
	// while a new heat loads, which would publish them under the new heat.
	const { currentData: athleteData } =
		useGetHeatInfoGetHeatInfoHeatIdGetQuery(
			{
				heatId: selectedHeat
			},
			{ skip: !selectedHeat }
		)
	const selectedAthlete = useMemo(
		() => toAthleteInfo(athleteData?.[currentPaddlerIndex]),
		[athleteData, currentPaddlerIndex]
	)
	const { availableMoves, availableBonuses } = useAvailableScoringItems(
		selectedAthlete?.scoresheet
	)
	const { data: streamMoveData } = useAthleteMovesAndBonusesStreamQuery(
		{
			heatId: selectedHeat,
			athleteId: selectedAthlete?.id ?? "",
			runNumber: selectedRun
		},
		{ skip: !selectedHeat || !selectedAthlete?.id }
	)
	const { data: phaseData, isLoading: isPhaseDataLoading } =
		useGetHeatPhasesGetHeatInfoHeatIdPhaseGetQuery(
			{ heatId: selectedHeat },
			{ skip: !selectedHeat }
		)
	const maxJudges = Math.max(
		...(phaseData ?? []).map((p) => p.number_of_judges),
		1
	)

	return {
		selectedHeat,
		selectedRun,
		athleteData,
		currentPaddlerIndex,
		selectedAthlete,
		streamMoveData,
		isPhaseDataLoading,
		maxJudges,
		availableMoves,
		availableBonuses
	}
}

const HeatListAndScoresButtons = ({
	onOpenList,
	onOpenScores
}: {
	onOpenList: () => void
	onOpenScores: () => void
}) => (
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
				onClick={onOpenList}
				variant="contained"
				fullWidth
				sx={{ height: "100%" }}
			>
				Heat List
			</Button>

			<Button
				data-testid="heat-scores-button"
				onClick={onOpenScores}
				variant="contained"
				fullWidth
				sx={{ height: "100%" }}
			>
				Heat Scores
			</Button>
		</Stack>
	</Grid>
)

const JudgeCards = ({
	maxJudges,
	selectedAthlete,
	allJudgeMoveAndBonusData,
	allJudgeScores
}: {
	maxJudges: number
	selectedAthlete: AthleteInfo
	allJudgeMoveAndBonusData: Record<string, ScoredMovesAndBonusesResponse>
	allJudgeScores: Record<string, number>
}) => (
	<>
		{judgeIdsFor(maxJudges).map((jn) => (
			<Grid key={jn} size={Math.floor(12 / maxJudges)}>
				<JudgeCard
					judge={Number(jn)}
					selectedAthlete={selectedAthlete}
					moveAndBonusData={allJudgeMoveAndBonusData[jn]}
					currentScore={allJudgeScores[jn]}
				/>
			</Grid>
		))}
	</>
)

export default ({
	changeRunStatus = true,
	showLiveTimer = false
}: {
	changeRunStatus?: boolean
	showLiveTimer?: boolean
}) => {
	const [scoresOpen, setScoresOpen] = useState(false)
	const [listOpen, setListOpen] = useState(false)
	const {
		selectedHeat,
		selectedRun,
		athleteData,
		currentPaddlerIndex,
		selectedAthlete,
		streamMoveData,
		isPhaseDataLoading,
		maxJudges,
		availableMoves,
		availableBonuses
	} = useHeadJudgeHeatData()

	// The commentator page reuses this screen read-only; only the real head
	// judge may publish, or displays following the head judge would flip-flop.
	useHeadJudgePublishing(changeRunStatus, selectedAthlete)

	const runStatus = useRunStatus(
		selectedHeat,
		selectedAthlete?.id,
		selectedRun
	)
	const [emitRunStatus] = useEmitRunStatusMutation()
	const { allJudgeScores, allJudgeMoveAndBonusData } = useJudgeScores(
		maxJudges,
		streamMoveData,
		availableMoves,
		availableBonuses
	)

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
	if (!selectedAthlete || isPhaseDataLoading) {
		return <Skeleton data-testid="loading-skeleton" />
	}

	const updateRunStatus = (locked?: boolean, did_not_start?: boolean) =>
		void emitRunStatus(
			buildRunStatusUpdate(
				{
					run_number: selectedRun,
					phase_id: athleteData?.[currentPaddlerIndex].phase_id ?? "",
					heat_id: selectedHeat,
					athlete_id: selectedAthlete.id
				},
				runStatus,
				locked,
				did_not_start
			)
		)

	return (
		<div data-testid="head-judge-page">
			<PaperModal open={scoresOpen} onClose={() => setScoresOpen(false)}>
				<HeatScoreTable defaultShowJudgeScores={true} />
			</PaperModal>
			<PaperModal open={listOpen} onClose={() => setListOpen(false)}>
				<HeatSummaryTable />
			</PaperModal>
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
				<RunFinalScore
					runStatus={runStatus}
					allJudgeScores={allJudgeScores}
				/>
				{changeRunStatus && (
					<RunStatusButtons
						runStatus={runStatus}
						onUpdate={updateRunStatus}
					/>
				)}
				{showLiveTimer && (
					<Grid size={1}>
						<LiveTimer />
					</Grid>
				)}
				<HeatListAndScoresButtons
					onOpenList={() => setListOpen(true)}
					onOpenScores={() => setScoresOpen(true)}
				/>
				<Grid size={12}>
					<Divider />
				</Grid>
				<JudgeCards
					maxJudges={maxJudges}
					selectedAthlete={selectedAthlete}
					allJudgeMoveAndBonusData={allJudgeMoveAndBonusData}
					allJudgeScores={allJudgeScores}
				/>
			</Grid>
		</div>
	)
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
