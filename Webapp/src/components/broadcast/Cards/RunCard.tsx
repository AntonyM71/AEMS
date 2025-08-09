import Collapse from "@mui/material/Collapse"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { Variant } from "@mui/material/styles/createTypography"
import { useGetHeatInfoGetHeatInfoHeatIdGetQuery } from "../../../redux/services/aemsApi"
import { OverlayControlState } from "../../Interfaces"

const RunCard = ({
	overlayControlState,
	textSize = "h5"
}: {
	overlayControlState: OverlayControlState
	textSize?: Variant
}) => (
	<Collapse
		in={overlayControlState.showLiveRunScore}
		orientation="horizontal"
		sx={{ display: "flex", justifyContent: "flex-end" }}
	>
		<RunDetails
			overlayControlState={overlayControlState}
			textSize={textSize}
		/>
	</Collapse>
)

export const RunDetails = ({
	overlayControlState,
	textSize = "h5"
}: {
	overlayControlState: OverlayControlState
	textSize?: Variant
}) => {
	const athletes = useGetHeatInfoGetHeatInfoHeatIdGetQuery(
		{
			heatId: overlayControlState.selectedHeat
		},
		{ skip: !overlayControlState.selectedHeat }
	)

	const numberOfRuns =
		athletes.data?.filter(
			(a) => a.athlete_id === overlayControlState.selectedAthlete?.id
		)?.[0]?.number_of_runs ?? 0

	return (
		<Paper
			sx={{
				padding: "0.5em",
				height: "100%"
			}}
		>
			<Stack
				spacing={2}
				direction={"row"}
				justifyContent={"space-between"}
			>
				<Typography variant={textSize}>Run:</Typography>
				<Stack direction={"row"}>
					<Typography variant={textSize}>
						{overlayControlState.selectedRun + 1}
					</Typography>
					<Typography variant={textSize}>/</Typography>
					<Typography variant={textSize}>{numberOfRuns}</Typography>
				</Stack>
			</Stack>
		</Paper>
	)
}

export default RunCard
