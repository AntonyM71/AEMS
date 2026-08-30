import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useThemeProps } from "@mui/material/styles"
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
import { AemsEventTitleThemeProps } from "../themeAugmentation"

export const EventTitleModal = ({ isVisible }: { isVisible: boolean }) => (
	<FullscreenPixiOverlay configName="eventTitle" isVisible={isVisible}>
		<EventTitle />
	</FullscreenPixiOverlay>
)

// One layout for both surfaces. The overlay's theme positions the two text
// groups absolutely over its background art and picks the smaller type scale;
// the arena's theme leaves them in normal flow inside a dark panel.
export const EventTitle = (inProps: AemsEventTitleThemeProps = {}) => {
	const {
		titleVariant = "h1",
		detailVariant = "h4",
		headingSx = {},
		runsSx = {},
		stackSpacing = 2
	} = useThemeProps({ props: inProps, name: "AemsEventTitle" })

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
		<Paper className="AemsEventTitle-root">
			<Stack spacing={stackSpacing}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						...headingSx
					}}
				>
					<Typography
						variant={titleVariant}
						sx={{ color: "text.primary" }}
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
							variant={detailVariant}
							sx={{
								textTransform: "uppercase",
								color: "text.primary"
							}}
						>
							{`Event : ${eventData?.name}`}
						</Typography>
						<Typography
							variant={detailVariant}
							sx={{
								textTransform: "uppercase",
								color: "text.primary"
							}}
						>
							{`Phase : ${phaseData?.name}`}
						</Typography>
					</Box>
				</Box>
				<Divider />
				<Box
					sx={{
						display: "flex",
						gap: "0.75rem",
						flexWrap: "wrap",
						...runsSx
					}}
				>
					<Typography
						variant={detailVariant}
						sx={{
							textTransform: "uppercase",
							color: "text.secondary"
						}}
					>
						{`Runs : ${phaseData?.number_of_runs}`}
					</Typography>
					<Typography
						variant={detailVariant}
						sx={{
							textTransform: "uppercase",
							color: "text.secondary"
						}}
					>
						{`Scoring Runs : ${phaseData?.number_of_runs_for_score}`}
					</Typography>
				</Box>
			</Stack>
		</Paper>
	)
}
