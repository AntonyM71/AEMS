import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import {
	getSelectedEvent,
	getSelectedPhase
} from "../../../redux/atoms/competitions"
import {
	AthleteScoresWithAthleteInfo,
	useGetOneByPrimaryKeyEventIdGetQuery,
	useGetOneByPrimaryKeyPhaseIdGetQuery,
	useGetPhaseScoresGetPhaseScoresPhaseIdGetQuery
} from "../../../redux/services/aemsApi"
import { OverlayControlState } from "../../Interfaces"
import { BasicTable } from "./BasicBroadcastTable"
export const PhaseScoreTable = ({
	overlayControlState,
	size,
	maxWidth = 1150,
	pageLimit = 8, // Set max rows to 8
	rowHeight = 61,
	footerPadding = 32,
	firstRowHeight = 54,
	secondRowHeight = 60
}: {
	overlayControlState: OverlayControlState
	size?: number
	maxWidth?: number | string
	pageLimit?: number
	rowHeight?: number
	footerPadding?: number
	firstRowHeight?: number | string
	secondRowHeight?: number | string
}) => {
	const selectedPhase = useSelector(getSelectedPhase)
	const {
		data,
		isLoading,
		refetch: refetchPhase
	} = useGetOneByPrimaryKeyPhaseIdGetQuery(
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
	useEffect(() => {
		if (overlayControlState.showPhaseResults) {
			void refetchPhase()
			void refetchScores()
		}
	}, [overlayControlState.showPhaseResults])
	if (!data || !scoreData) {
		return <></>
	}

	return (
		<Paper
			elevation={6}
			sx={{
				maxWidth,
				margin: "16px auto",
				background: "transparent",
				boxShadow: "none",
				position: "relative"
			}}
		>
			<Stack spacing={2}>
				<PhaseDetails firstRowHeight={firstRowHeight} secondRowHeight={secondRowHeight} />
				<Box sx={{ height: 23 }} />
				<BasicTable
					data={
						processScoresData(
							scoreData.scores,
							data?.number_of_runs ?? 3
						) ?? []
					}
					pageLimit={pageLimit}
					pageChangeTime={5}
					maxWidth={maxWidth}
					rowHeight={rowHeight}
					footerPadding={footerPadding}
				/>
			</Stack>
		</Paper>
	)
}
interface PhaseDetailsProps {
	firstRowHeight?: number | string
	secondRowHeight?: number | string
}
const PhaseDetails = ({ firstRowHeight = 32, secondRowHeight = 20 }: PhaseDetailsProps) => {
	const selectedPhase = useSelector(getSelectedPhase)
	const { data: phaseData } = useGetOneByPrimaryKeyPhaseIdGetQuery(
		{ id: selectedPhase },
		{ refetchOnMountOrArgChange: true, skip: !selectedPhase }
	)
	const selectedEvent = useSelector(getSelectedEvent)
	const { data: eventData } = useGetOneByPrimaryKeyEventIdGetQuery(
		{ id: selectedEvent },
		{ refetchOnMountOrArgChange: true, skip: !selectedEvent }
	)

	return (
		<Box sx={{ width: "100%" }}>
			<Stack
				direction="row"
				justifyContent="flex-end"
				alignItems="flex-end"
				spacing={1}
				sx={{ minHeight: firstRowHeight, height: firstRowHeight }}
			>
				<Typography color="white" variant="h5" sx={{ fontWeight: 500 }}>
					{eventData?.name}
				</Typography>
				<Typography color="white" variant="h5" sx={{ fontWeight: 500 }}>
					{phaseData?.name}
				</Typography>
			</Stack>
			<Stack
				direction="row"
				justifyContent="flex-end"
				alignItems="flex-end"
				spacing={1}
				sx={{ minHeight: secondRowHeight, height: secondRowHeight }}
			>
				<Typography color="white" variant="h5" sx={{ fontWeight: 400 }}>
					{phaseData?.number_of_runs
						? `Runs: ${phaseData.number_of_runs}`
						: null}
				</Typography>
			</Stack>
		</Box>
	)
}
const processScoresData = (
	data: AthleteScoresWithAthleteInfo[],
	numberOfRuns: number
) => {
	const runNumbers = Array.from({ length: numberOfRuns }, (_, i) => i + 1)

	return data.map((d) => {
		const runScores = runNumbers.reduce((acc, rn) => {
			acc[`Run ${rn}`] = d.run_scores[rn - 1]?.did_not_start
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
