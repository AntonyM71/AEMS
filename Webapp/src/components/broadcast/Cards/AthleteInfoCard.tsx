import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { OverlayControlState } from "../../Interfaces"
import SlidingWrapper from "../SlidingWrapper"

const AthleteInfoCard = ({
	overlayControlState
}: {
	overlayControlState: OverlayControlState
}) => (
	<SlidingWrapper
		show={
			overlayControlState.showLiveRunScore &&
			!!overlayControlState.selectedAthlete
		}
		gridSize={3}
	>
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
				<Typography>
					{overlayControlState.selectedAthlete?.bib}
				</Typography>
				<Stack spacing={2} direction={"row"}>
					<Typography>
						{overlayControlState.selectedAthlete?.first_name}
					</Typography>
					<Typography>
						{overlayControlState.selectedAthlete?.last_name.toUpperCase()}
					</Typography>
				</Stack>
			</Stack>
		</Paper>
	</SlidingWrapper>
)

export default AthleteInfoCard
