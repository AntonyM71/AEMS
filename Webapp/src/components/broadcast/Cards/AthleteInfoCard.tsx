import Collapse from "@mui/material/Collapse"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { OverlayControlState } from "../../Interfaces"

const AthleteInfoCard = ({
	overlayControlState
}: {
	overlayControlState: OverlayControlState
}) => (
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
				justifyContent={"space-around"}
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
				<Typography sx={{ textAlign: "right", width: "100%" }}>
					{overlayControlState.selectedAthlete?.affiliation}
				</Typography>
			</Stack>
		</Paper>
	</Collapse>
)

export default AthleteInfoCard
