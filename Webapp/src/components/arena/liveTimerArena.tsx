import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { LiveTimerLogic } from "../roles/headJudge/LiveTimer"

const LiveTimerArena: React.FC = () => (
	<Paper
		data-testid="final-score"
		sx={{
			padding: "0.5em",
			height: "100%",
			width: "100%"
		}}
	>
		<Stack
			direction="row"
			spacing={2}
			justifyContent="space-between"
			alignItems="center"
			sx={{ height: "100%" }}
		>
			<Typography variant="h1">Time:</Typography>
			<div style={{ textAlign: "right" }}>
				<LiveTimerLogic textSize="h1" />
			</div>
		</Stack>
	</Paper>
)
export default LiveTimerArena
