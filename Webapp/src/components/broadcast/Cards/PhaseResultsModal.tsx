import dynamic from "next/dynamic"
import { OverlayControlState } from "../../Interfaces"
import { PhaseScoreTable } from "./PhaseResultsTable"

const PixiFrameSequenceOverlay = dynamic(
	() => import("../PixiFrameSequenceOverlay"),
	{ ssr: false }
)

interface PhaseResultsModalProps {
	isVisible: boolean
	overlayControlState: OverlayControlState
	size?: number
}

export const PhaseResultsModal = ({
	isVisible,
	overlayControlState,
	size
}: PhaseResultsModalProps) => (
	<PixiFrameSequenceOverlay
		configName="phaseResults"
		isVisible={isVisible}
		style={{
			position: "fixed",
			inset: 0,
			width: "100vw",
			height: "100vh",
			zIndex: 1400
		}}
	>
		<PhaseScoreTable
			overlayControlState={overlayControlState}
			size={size}
		/>
	</PixiFrameSequenceOverlay>
)
