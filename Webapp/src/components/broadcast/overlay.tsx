import ThemeProvider from "@mui/material/styles/ThemeProvider"
import React from "react"
import { useBroadcastControlStreamQuery } from "../../redux/services/streamingApi"

import { defaultOverlayControllerState } from "../Interfaces"
import { EventTitleModal } from "./Cards/EventTitle"
import { HeatListModal } from "./Cards/HeatListModal"
import { PhaseResultsModal } from "./Cards/PhaseResultsModal"
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
				{/* Non-Pixi overlay cards are intentionally disabled while we migrate
				to always-mounted Pixi-driven visibility control. */}
				<EventTitleModal
					isVisible={overlayControlState.showEventTitle}
				/>
				<HeatListModal isVisible={overlayControlState.showHeatSummary} />
				<PhaseResultsModal
					isVisible={overlayControlState.showPhaseResults}
					overlayControlState={overlayControlState}
				/>
			</div>
		</ThemeProvider>
	)
}
Overlay.noLayout = true
export default Overlay
