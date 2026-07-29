import { OverlayControlState } from "../../Interfaces"
import FullscreenPixiOverlay from "../FullscreenPixiOverlay"
import { PhaseScoreTable } from "./PhaseResultsTable"

interface PhaseResultsModalProps {
	isVisible: boolean
	overlayControlState: OverlayControlState
}

export const PhaseResultsModal = ({
	isVisible,
	overlayControlState
}: PhaseResultsModalProps) => (
	<FullscreenPixiOverlay configName="phaseResults" isVisible={isVisible}>
		<PhaseScoreTable overlayControlState={overlayControlState} />
	</FullscreenPixiOverlay>
)
