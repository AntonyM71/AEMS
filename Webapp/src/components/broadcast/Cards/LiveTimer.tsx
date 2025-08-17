import AlarmAddIcon from "@mui/icons-material/AlarmAdd"

import Collapse from "@mui/material/Collapse"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import { OverlayControlState } from "../../Interfaces"
import { LiveTimerLogic } from "../../roles/headJudge/LiveTimer"

export const LiveTimerSpace = ({
	overlayControlState
}: {
	overlayControlState: OverlayControlState
}) => (
	<Collapse
		in={overlayControlState.showTimer}
		orientation="horizontal"
		mountOnEnter
		sx={{ display: "flex", justifyContent: "flex-end" }}
		unmountOnExit
	>
		<Paper
			data-testid="final-score"
			sx={{
				padding: "0.5em",
				height: "100%"
			}}
		>
			<Stack
				direction="row"
				spacing={1}
				alignItems="center"
				justifyContent={"space-between"}
			>
				<AlarmAddIcon />

				<LiveTimerLogic />
			</Stack>
		</Paper>
	</Collapse>
)
