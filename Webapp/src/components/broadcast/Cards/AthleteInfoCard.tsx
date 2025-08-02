import { Grid2 } from "@mui/material"
import Collapse from "@mui/material/Collapse"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { Variant } from "@mui/material/styles/createTypography"
import { OverlayControlState } from "../../Interfaces"

const AthleteInfoCard = ({
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
		<Paper
			sx={{
				padding: "0.5em",
				height: "100%"
			}}
		>
			<Grid2 container spacing={2}>
				<Grid2 size={10}>
					<Typography
						variant={textSize}
						sx={{
							wordBreak: "break-word",
							whiteSpace: "normal",
							overflowWrap: "break-word",
							hyphens: "auto"
						}}
					>
						{overlayControlState.selectedAthlete?.first_name}
					</Typography>
				</Grid2>
				<Grid2
					size={2}
					sx={{
						display: "flex",
						justifyContent: "flex-end",
						alignItems: "center"
					}}
				>
					<Typography variant={textSize}>
						{overlayControlState.selectedAthlete?.bib}
					</Typography>
				</Grid2>

				<Grid2 size={10}>
					<Typography
						variant={textSize}
						sx={{
							wordBreak: "break-word",
							whiteSpace: "normal",
							overflowWrap: "break-word",
							hyphens: "auto"
						}}
					>
						{overlayControlState.selectedAthlete?.last_name.toUpperCase()}
					</Typography>
				</Grid2>
				<Grid2 size={2}>
					<Typography
						variant={textSize}
						sx={{ textAlign: "right", width: "100%" }}
					>
						{overlayControlState.selectedAthlete?.affiliation}
					</Typography>
				</Grid2>
			</Grid2>
		</Paper>
	</Collapse>
)

export default AthleteInfoCard
