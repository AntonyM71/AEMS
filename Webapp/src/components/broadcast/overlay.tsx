import { ThemeProvider } from "@mui/material/styles"
import React from "react"

import { AthleteOverviewModal } from "./Cards/AthleteOverview"
import { CompetitionOverviewModal } from "./Cards/CompetitionOverview"
import { EventTitleModal } from "./Cards/EventTitle"
import { HeatListModal } from "./Cards/HeatListModal"
import { LeaderboardTowerModal } from "./Cards/LeaderboardTower"
import { PhaseResultsModal } from "./Cards/PhaseResultsModal"
import { RunCornerModal } from "./Cards/RunCorner"
import { lightTheme } from "./overlayTheme"
import useDisplayedOverlayState from "./useDisplayedOverlayState"
import useSyncOverlaySelectionState from "./useSyncOverlaySelectionState"

type OverlayComponent = (() => React.JSX.Element) & {
	noLayout?: boolean
}

const Overlay: OverlayComponent = () => {
	const overlayControlState = useDisplayedOverlayState()
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
					selectedAthleteId={overlayControlState.selectedAthlete?.id}
				/>
				<PhaseResultsModal
					isVisible={overlayControlState.showPhaseResults}
					overlayControlState={overlayControlState}
				/>
				<AthleteOverviewModal
					overlayControlState={overlayControlState}
				/>
				<RunCornerModal overlayControlState={overlayControlState} />
				<LeaderboardTowerModal
					overlayControlState={overlayControlState}
				/>
				<CompetitionOverviewModal
					overlayControlState={overlayControlState}
				/>
			</div>
		</ThemeProvider>
	)
}
Overlay.noLayout = true
export default Overlay
