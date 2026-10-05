import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { Variant } from "@mui/material/styles/createTypography"
import { useGetHeatInfoGetHeatInfoHeatIdGetQuery } from "../../../redux/services/aemsApi"
import { OverlayControlState } from "../../Interfaces"

/** How many runs the selected athlete has in the selected heat, or 0 before
 * the heat info arrives. */
export const useRunCount = (overlayControlState: OverlayControlState) => {
	const athletes = useGetHeatInfoGetHeatInfoHeatIdGetQuery(
		{
			heatId: overlayControlState.selectedHeat
		},
		{ skip: !overlayControlState.selectedHeat }
	)

	return (
		athletes.data?.find(
			(a) => a.athlete_id === overlayControlState.selectedAthlete?.id
		)?.number_of_runs ?? 0
	)
}

export const RunDetails = ({
	overlayControlState,
	textSize = "h5"
}: {
	overlayControlState: OverlayControlState
	textSize?: Variant
}) => {
	const numberOfRuns = useRunCount(overlayControlState)

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
				alignItems="center"
				sx={{ height: "100%" }}
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
