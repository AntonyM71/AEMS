import AlarmAddIcon from "@mui/icons-material/AlarmAdd"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import { OverlayControlState } from "../../Interfaces"
import { LiveTimerLogic } from "../../roles/headJudge/LiveTimer"
import SlidingWrapper from "../SlidingWrapper"

export const LiveTimerSpace = ({
	overlayControlState
}: {
	overlayControlState: OverlayControlState
}) => (
	// Keep track of whether the timer was previously shown
	<SlidingWrapper show={overlayControlState.showTimer} gridSize={1}>
		<Paper
			data-testid="final-score"
			sx={{
				padding: "0.5em",
				height: "100%"
			}}
		>
			<Stack direction="row" spacing={1} alignItems="center">
				<AlarmAddIcon />

				<LiveTimerLogic />
			</Stack>
		</Paper>
	</SlidingWrapper>
)
