import Collapse from "@mui/material/Collapse"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useGetHeatInfoGetHeatInfoHeatIdGetQuery } from "../../../redux/services/aemsApi"
import { OverlayControlState } from "../../Interfaces"

const RunCard = ({
	overlayControlState
}: {
	overlayControlState: OverlayControlState
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
		<Collapse
			in={overlayControlState.showLiveRunScore}
			orientation="horizontal"
			sx={{ display: "flex", justifyContent: "flex-end" }}
		>
			<Paper
				sx={{
					padding: "0.5em",
					height: "100%"
				}}
			>
				<Stack
					spacing={2}
					direction={"column"}
					justifyContent={"space-between"}
				>
					<Typography>Run:</Typography>
					<Stack direction={"row"}>
						<Typography>
							{overlayControlState.selectedRun + 1}
						</Typography>
						<Typography>/</Typography>
						<Typography>{numberOfRuns}</Typography>
					</Stack>
				</Stack>
			</Paper>
		</Collapse>
	)
}

export default RunCard
