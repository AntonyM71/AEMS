import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useSelector } from "react-redux"
import {
	getSelectedCompetition,
	getSelectedEvent,
	getSelectedPhase
} from "../../../redux/atoms/competitions"
import {
	useGetManyCompetitionGetQuery,
	useGetOneByPrimaryKeyEventIdGetQuery,
	useGetOneByPrimaryKeyPhaseIdGetQuery
} from "../../../redux/services/aemsApi"
import FullscreenPixiOverlay from "../FullscreenPixiOverlay"

export const EventTitleModal = ({ isVisible }: { isVisible: boolean }) => (
	<FullscreenPixiOverlay configName="eventTitle" isVisible={isVisible}>
		<EventTitle />
	</FullscreenPixiOverlay>
)

export const EventTitle = () => {
	const selectedCompetition = useSelector(getSelectedCompetition)
	const { data: competitionData } = useGetManyCompetitionGetQuery(
		{
			idList: [selectedCompetition]
		},
		{ refetchOnMountOrArgChange: true, skip: !selectedCompetition }
	)
	const selectedPhase = useSelector(getSelectedPhase)
	const { data: phaseData } = useGetOneByPrimaryKeyPhaseIdGetQuery(
		{
			id: selectedPhase
		},
		{ refetchOnMountOrArgChange: true, skip: !selectedPhase }
	)
	const selectedEvent = useSelector(getSelectedEvent)
	const { data: eventData } = useGetOneByPrimaryKeyEventIdGetQuery(
		{
			id: selectedEvent
		},
		{ refetchOnMountOrArgChange: true, skip: !selectedEvent }
	)
	if (!competitionData || !phaseData || !eventData) {
		return null
	}

	return (
		<Box
			sx={{
				position: "relative",
				width: "100%",
				height: "100%",
				pointerEvents: "none"
			}}
		>
			<Box
				sx={{
					position: "absolute",
					left: "27%",
					top: "53%",
					display: "flex",
					flexDirection: "column",
					gap: "0.35rem",
					maxWidth: "72%"
				}}
			>
				<Typography
					variant="h2"
					sx={{
						color: "#ffffff"
					}}
				>
					{competitionData?.[0].name}
				</Typography>
				<Box
					sx={{
						display: "flex",
						gap: "0.7rem",
						flexWrap: "wrap",
						paddingTop: "0.5em"
					}}
				>
					<Typography
						variant="h5"
						sx={{
							textTransform: "uppercase",
							color: "#ffffff"
						}}
					>
						{`Event : ${eventData?.name}`}
					</Typography>
					<Typography
						variant="h5"
						sx={{
							textTransform: "uppercase",
							color: "#ffffff"
						}}
					>
						{`Phase : ${phaseData?.name}`}
					</Typography>
				</Box>
			</Box>

			<Box
				sx={{
					position: "absolute",
					left: "43%",
					top: "76%",
					display: "flex",
					gap: "0.75rem",
					flexWrap: "wrap",
					maxWidth: "60%"
				}}
			>
				<Typography
					variant="h5"
					sx={{
						textTransform: "uppercase"
					}}
				>
					{`Runs : ${phaseData?.number_of_runs}`}
				</Typography>
				<Typography
					variant="h5"
					sx={{
						textTransform: "uppercase"
					}}
				>
					{`Scoring Runs : ${phaseData?.number_of_runs_for_score}`}
				</Typography>
			</Box>
		</Box>
	)
}
