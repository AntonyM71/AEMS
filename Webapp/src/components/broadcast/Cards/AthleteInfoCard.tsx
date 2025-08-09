import Collapse from "@mui/material/Collapse"
import Grid2 from "@mui/material/Grid2"
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
		<AthleteInfo
			overlayControlState={overlayControlState}
			textSize={textSize}
		/>
	</Collapse>
)

export const AthleteInfo = ({
	overlayControlState,
	textSize = "h5"
}: {
	overlayControlState: OverlayControlState
	textSize?: Variant
}) => (
	<Paper
		sx={{
			padding: "0.5em",
			height: "100%"
		}}
	>
		<Grid2 container spacing={2}>
			<Grid2 size={9}>
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
				size={3}
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

			<Grid2 size={9}>
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
			<Grid2 size={3}>
				<Typography
					variant={textSize}
					sx={{ textAlign: "right", width: "100%" }}
				>
					{overlayControlState.selectedAthlete?.affiliation}
				</Typography>
			</Grid2>
		</Grid2>
	</Paper>
)

export default AthleteInfoCard
