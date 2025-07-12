import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
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

export const EventTitle = ({
	overlayControlState
}: {
	overlayControlState: OverlayControlState
}) => {
	const selectedCompetition = useSelector(getSelectedCompetition)
	const { data: competitionData, isLoading: competitionIsLoading } =
		useGetManyCompetitionGetQuery(
			{
				idList: [selectedCompetition]
			},
			{ refetchOnMountOrArgChange: true, skip: !selectedCompetition }
		)
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
	if (!competitionData || !phaseData || !eventData) {
		return <></>
	}

	return (
		<SlidingModal direction="up" show={overlayControlState.showEventTitle}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100%"
					// width: "100%"
				}}
			>
				<Paper
					sx={{ padding: "2em", justify: "center", width: "100%" }}
				>
					<Stack spacing={2}>
						<Stack
							spacing={4}
							direction="column"
							justifyContent="space-between"
						>
							<Typography variant="h1">
								{competitionData?.[0].name}
							</Typography>
							<Divider />
							<Stack
								spacing={2}
								direction="row"
								justifyContent="space-between"
							>
								<Stack
									spacing={4}
									direction="column"
									justifyContent="space-between"
								>
									<Typography variant="h4">{`Event : ${eventData?.name}`}</Typography>
									<Typography variant="h4">{`Phase : ${phaseData?.name}`}</Typography>
								</Stack>
								<Typography variant="h4">{`Runs : ${phaseData?.number_of_runs}`}</Typography>
							</Stack>
						</Stack>
					</Stack>
				</Paper>
			</Box>
		</SlidingModal>
	)
}
