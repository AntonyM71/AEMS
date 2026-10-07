import Divider from "@mui/material/Divider"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useThemeProps } from "@mui/material/styles"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import {
	getSelectedEvent,
	getSelectedPhase
} from "../../../redux/atoms/competitions"
import {
	AthleteScoresWithAthleteInfo,
	PhaseResponse,
	useGetOneByPrimaryKeyEventIdGetQuery,
	useGetOneByPrimaryKeyPhaseIdGetQuery,
	useGetPhaseScoresGetPhaseScoresPhaseIdGetQuery
} from "../../../redux/services/aemsApi"
import { OverlayControlState } from "../../Interfaces"
import { AemsPhaseResultsThemeProps } from "../themeAugmentation"
import { BasicTable } from "./BasicBroadcastTable"

interface PhaseScoreTableProps extends AemsPhaseResultsThemeProps {
	overlayControlState: OverlayControlState
	isVisible?: boolean
}

/** The selected phase, its event's name and its athletes' scores. Scores
 * refetch each time phase results are switched on. */
export const usePhaseLeaderboard = (
	overlayControlState: OverlayControlState
) => {
	const selectedPhase = useSelector(getSelectedPhase)
	const { data: phase, refetch: refetchPhase } =
		useGetOneByPrimaryKeyPhaseIdGetQuery(
			{
				id: selectedPhase
			},
			{ refetchOnMountOrArgChange: true, skip: !selectedPhase }
		)
	const { data: scoreData, refetch: refetchScores } =
		useGetPhaseScoresGetPhaseScoresPhaseIdGetQuery(
			{
				phaseId: selectedPhase
			},
			{ refetchOnMountOrArgChange: true, skip: !selectedPhase }
		)
	const selectedEvent = useSelector(getSelectedEvent)
	const { data: eventData } = useGetOneByPrimaryKeyEventIdGetQuery(
		{ id: selectedEvent },
		{ refetchOnMountOrArgChange: true, skip: !selectedEvent }
	)
	useEffect(() => {
		if (overlayControlState.showPhaseResults) {
			void refetchPhase()
			void refetchScores()
		}
	}, [overlayControlState.showPhaseResults])

	return { phase, eventName: eventData?.name, scores: scoreData?.scores }
}

export const PhaseScoreTable = (inProps: PhaseScoreTableProps) => {
	const {
		overlayControlState,
		isVisible = true,
		titleAlign = "space-between",
		spacerHeight,
		detailRows = "single"
	} = useThemeProps({ props: inProps, name: "AemsPhaseResults" })

	const { phase, eventName, scores } =
		usePhaseLeaderboard(overlayControlState)
	if (!isVisible || !phase || !scores) {
		return <></>
	}

	return (
		<Paper
			className="AemsTableCard-root"
			sx={{ margin: "16px auto", position: "relative" }}
		>
			<Stack spacing={2}>
				<PhaseDetails
					titleAlign={titleAlign}
					detailRows={detailRows}
					phase={phase}
					eventName={eventName}
				/>
				{/* A rule on the arena; invisible artwork clearance on the
				    overlay, where the theme zeroes dividers and the height
				    comes from AemsPhaseResults.spacerHeight. */}
				<Divider sx={{ height: spacerHeight }} />
				<BasicTable
					data={processScoresData(scores, phase.number_of_runs)}
					dataColumns={scoreColumns(phase.number_of_runs)}
					pageChangeTime={5}
				/>
			</Stack>
		</Paper>
	)
}
const PhaseDetails = ({
	titleAlign,
	detailRows,
	phase,
	eventName
}: Required<Pick<AemsPhaseResultsThemeProps, "titleAlign" | "detailRows">> & {
	phase: PhaseResponse
	eventName?: string
}) => {
	const eventPhase = (
		<>
			<Typography variant="h5" sx={{ color: "text.primary" }}>
				{eventName}
			</Typography>
			<Typography variant="h5" sx={{ color: "text.primary" }}>
				{phase.name}
			</Typography>
		</>
	)
	const runs = (
		<Typography
			variant="h5"
			sx={{ color: "text.primary", fontWeight: 400 }}
		>
			{phase.number_of_runs ? `Runs: ${phase.number_of_runs}` : null}
		</Typography>
	)
	const row = (children: React.ReactNode, className: string) => (
		<Stack
			className={className}
			direction="row"
			justifyContent={titleAlign}
			alignItems="flex-end"
			spacing={1}
			sx={{ width: "100%" }}
		>
			{children}
		</Stack>
	)

	// One line on the arena; two fixed-height lines on the overlay, where each
	// lands in its own band of the background frame (heights come from the
	// theme's AemsPhaseDetails-* rules).
	return detailRows === "split" ? (
		<Stack sx={{ width: "100%" }}>
			{row(eventPhase, "AemsPhaseDetails-names")}
			{row(runs, "AemsPhaseDetails-runs")}
		</Stack>
	) : (
		row(
			<>
				{eventPhase}
				{runs}
			</>,
			"AemsPhaseDetails-names"
		)
	)
}
const runColumn = (runNumber: number) => `Run ${runNumber}`

const scoreColumns = (numberOfRuns: number) => [
	...Array.from({ length: numberOfRuns }, (_, i) => runColumn(i + 1)),
	"Total Score"
]

const processScoresData = (
	data: AthleteScoresWithAthleteInfo[],
	numberOfRuns: number
) => {
	const runNumbers = Array.from({ length: numberOfRuns }, (_, i) => i + 1)

	return data.map((d) => {
		const runScores = runNumbers.reduce((acc, rn) => {
			acc[runColumn(rn)] = d.run_scores[rn - 1]?.did_not_start
				? "DNS"
				: d.run_scores[rn - 1]?.mean_run_score.toFixed(2) ?? "-"

			return acc
		}, {} as Record<string, string | number>)

		return {
			Rank: d.ranking,
			Name: `${d.first_name} ${d.last_name.toUpperCase()}`,
			Number: d.bib_number,
			Affiliation: d.affiliation,
			...runScores,
			"Total Score": d.total_score?.toFixed(2)
		}
	})
}
