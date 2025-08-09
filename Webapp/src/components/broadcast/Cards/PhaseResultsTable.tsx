import Divider from "@mui/material/Divider"
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
import SlidingModal from "../SlidingModal"
import { BasicTable } from "./BasicBroadcastTable"

export const PhaseScoreTable = ({
	overlayControlState,
	size
}: {
	overlayControlState: OverlayControlState
	size?: number
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

	return (
		<SlidingModal
			direction="up"
			show={overlayControlState.showPhaseResults}
			size={size}
		>
			{scoreData?.scores && (
				<Paper>
					<Stack spacing={2}>
						<PhaseDetails />
						<Divider />
						<BasicTable
							data={
								processScoresData(
									scoreData.scores,
									data?.number_of_runs ?? 3
								) ?? []
							}
							pageLimit={10}
							pageChangeTime={5}
						/>
					</Stack>
				</Paper>
			)}
		</SlidingModal>
	)
}
const PhaseDetails = () => {
	const selectedPhase = useSelector(getSelectedPhase)
	const { data: phaseData, isLoading: phaseIsLoading } =
		useGetOneByPrimaryKeyPhaseIdGetQuery(
			{
				id: selectedPhase
			},
			{ refetchOnMountOrArgChange: true, skip: !selectedPhase }
		)
	const selectedEvent = useSelector(getSelectedEvent)
	const { data: eventData, isLoading: eventIsLoading } =
		useGetOneByPrimaryKeyEventIdGetQuery(
			{
				id: selectedEvent
			},
			{ refetchOnMountOrArgChange: true, skip: !selectedEvent }
		)

	return (
		<Stack spacing={2} direction="row" justifyContent="space-between">
			<Typography variant="h5">{eventData?.name}</Typography>
			<Typography variant="h5">{phaseData?.name}</Typography>
			<Typography variant="h5">{`Runs: ${phaseData?.number_of_runs}`}</Typography>
		</Stack>
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
