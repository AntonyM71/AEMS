import { ThemeProvider } from "@mui/material/styles"
import React from "react"
import { useBroadcastControlStreamQuery } from "../../redux/services/streamingApi"

import { defaultOverlayControllerState } from "../Interfaces"
import { AthleteOverviewModal } from "./Cards/AthleteOverview"
import { CompetitionOverviewModal } from "./Cards/CompetitionOverview"
import { EventTitleModal } from "./Cards/EventTitle"
import { HeatListModal } from "./Cards/HeatListModal"
import { PhaseResultsModal } from "./Cards/PhaseResultsModal"
import { RunCornerModal } from "./Cards/RunCorner"
import { lightTheme } from "./overlayTheme"
import useSyncOverlaySelectionState from "./useSyncOverlaySelectionState"

type OverlayComponent = (() => React.JSX.Element) & {
	noLayout?: boolean
}

const Overlay: OverlayComponent = () => {
	const { data: overlayControlState = defaultOverlayControllerState } =
		useBroadcastControlStreamQuery()
	useSyncOverlaySelectionState(overlayControlState)

	return (
		<ThemeProvider theme={lightTheme}>
			<div
				style={{
					height: "100vh",
					overflow: "clip"
				}}
			>
				<EventTitleModal
					isVisible={overlayControlState.showEventTitle}
				/>
				<HeatListModal
					isVisible={overlayControlState.showHeatSummary}
				/>
				<PhaseResultsModal
					isVisible={overlayControlState.showPhaseResults}
					overlayControlState={overlayControlState}
				/>
				<AthleteOverviewModal
					overlayControlState={overlayControlState}
				/>
				<RunCornerModal overlayControlState={overlayControlState} />
				<CompetitionOverviewModal
					overlayControlState={overlayControlState}
				/>
			</div>
		</ThemeProvider>
	)
}
Overlay.noLayout = true
export default Overlay
