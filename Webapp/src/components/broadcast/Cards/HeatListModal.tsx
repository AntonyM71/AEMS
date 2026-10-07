import FullscreenPixiOverlay from "../FullscreenPixiOverlay"
import { HeatStartGrid } from "./HeatStartGrid"
import { HeatSummaryTable } from "./HeatSummaryTable"

interface HeatListModalProps {
	isVisible: boolean
	selectedAthleteId?: string
}

export const HeatListModal = ({
	isVisible,
	selectedAthleteId
}: HeatListModalProps) => (
	<FullscreenPixiOverlay
		configName="startList"
		isVisible={isVisible}
		fallbackContent={
			<HeatStartGrid selectedAthleteId={selectedAthleteId} />
		}
	>
		<HeatSummaryTable />
	</FullscreenPixiOverlay>
)
