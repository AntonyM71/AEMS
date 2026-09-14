import FullscreenPixiOverlay from "../FullscreenPixiOverlay"
import { HeatSummaryTable } from "./HeatSummaryTable"

interface HeatListModalProps {
	isVisible: boolean
}

export const HeatListModal = ({ isVisible }: HeatListModalProps) => (
	<FullscreenPixiOverlay configName="startList" isVisible={isVisible}>
		<HeatSummaryTable />
	</FullscreenPixiOverlay>
)
