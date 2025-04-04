import { OverlayControlState } from "../../Interfaces"
import LiveTimer from "../../roles/headJudge/LiveTimer"
import SlidingWrapper from "../SlidingWrapper"

export const LiveTimerSpace = ({
	overlayControlState
}: {
	overlayControlState: OverlayControlState
}) => (
	// Keep track of whether the timer was previously shown
	<SlidingWrapper show={overlayControlState.showTimer} gridSize={1}>
		<LiveTimer />
	</SlidingWrapper>
)
