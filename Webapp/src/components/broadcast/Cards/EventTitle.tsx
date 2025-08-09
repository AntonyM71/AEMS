import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Grid2 from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
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
import { OverlayControlState } from "../../Interfaces"
import SlidingModal from "../SlidingModal"

export const EventTitleModal = ({
	overlayControlState,
	size
}: {
	overlayControlState: OverlayControlState
	size?: number
}) => (
	<SlidingModal
		direction="up"
		show={overlayControlState.showEventTitle}
		size={size}
	>
		<EventTitle />
	</SlidingModal>
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
		return <></>
	}

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100%"
				// width: "100%"
			}}
		>
			<Paper sx={{ padding: "2em", justify: "center", width: "100%" }}>
				<Stack spacing={2}>
					<Grid2 container spacing={4} direction="column">
						<Grid2>
							<Typography variant="h1">
								{competitionData?.[0].name}
							</Typography>
						</Grid2>
						<Grid2>
							<Divider />
						</Grid2>
						<Grid2>
							<Grid2 container spacing={2} alignItems="center">
								<Grid2 size={12}>
									<Typography variant="h4">{`Event : ${eventData?.name}`}</Typography>
								</Grid2>
								<Grid2 size={12}>
									<Typography variant="h4">{`Phase : ${phaseData?.name}`}</Typography>
								</Grid2>
								<Grid2 size={12}>
									<Typography variant="h4">{`Runs : ${phaseData?.number_of_runs}`}</Typography>
								</Grid2>
								<Grid2 size={12}>
									<Typography variant="h4">
										{`Scoring Runs : ${phaseData?.number_of_runs_for_score}`}
									</Typography>
								</Grid2>
							</Grid2>
						</Grid2>
					</Grid2>
				</Stack>
			</Paper>
		</Box>
	)
}
