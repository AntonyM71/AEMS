import Paper from "@mui/material/Paper"
import { Variant } from "@mui/material/styles/createTypography"
import Typography from "@mui/material/Typography"
import React from "react"
import { useTimerStreamQuery } from "../../../redux/services/streamingApi"

export const LiveTimerLogic = ({ textSize = "h5" }: { textSize?: Variant }) => {
	const { data: time = 0 } = useTimerStreamQuery()

	return <Typography variant={textSize}>{Math.round(time)}</Typography>
}
const LiveTimer: React.FC = () => (
	<Paper
		data-testid="final-score"
		sx={{
			padding: "0.5em",
			height: "100%"
		}}
	>
		<Typography variant="h5">Timer:</Typography>
		<div style={{ textAlign: "center" }}>
			<LiveTimerLogic />
		</div>
	</Paper>
)
export default LiveTimer
