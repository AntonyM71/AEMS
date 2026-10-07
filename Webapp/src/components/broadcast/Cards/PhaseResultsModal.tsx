import { OverlayControlState } from "../../Interfaces"
import FullscreenPixiOverlay from "../FullscreenPixiOverlay"
import { PhaseLeaderboard } from "./PhaseLeaderboard"
import { PhaseScoreTable } from "./PhaseResultsTable"

interface PhaseResultsModalProps {
	isVisible: boolean
	overlayControlState: OverlayControlState
}

export const PhaseResultsModal = ({
	isVisible,
	overlayControlState
}: PhaseResultsModalProps) => (
	<FullscreenPixiOverlay
		configName="phaseResults"
		isVisible={isVisible}
		fallbackContent={
			<PhaseLeaderboard overlayControlState={overlayControlState} />
		}
	>
		<PhaseScoreTable overlayControlState={overlayControlState} />
	</FullscreenPixiOverlay>
)
