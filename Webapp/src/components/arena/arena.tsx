import CssBaseline from "@mui/material/CssBaseline"
import GlobalStyles from "@mui/material/GlobalStyles"
import Grid2 from "@mui/material/Grid2"
import ThemeProvider from "@mui/material/styles/ThemeProvider"
import React from "react"
import { useBroadcastControlStreamQuery } from "../../redux/services/streamingApi"
import { AthleteInfo } from "../broadcast/Cards/AthleteInfoCard"
import { EventTitle } from "../broadcast/Cards/EventTitle"
import { HeatSummaryTable } from "../broadcast/Cards/HeatSummaryTable"
import { SubscribedFinalScore } from "../broadcast/Cards/LiveRunScore"
import { PhaseScoreTable } from "../broadcast/Cards/PhaseResultsTable"
import { RunDetails } from "../broadcast/Cards/RunCard"
import { defaultOverlayControllerState } from "../Interfaces"
import SlidingModal from "../broadcast/SlidingModal"
import useSyncOverlaySelectionState from "../broadcast/useSyncOverlaySelectionState"
import { darkTheme } from "./arenaTheme"
import LiveTimerArena from "./liveTimerArena"

const Arena = () => {
	const { data: overlayControlState = defaultOverlayControllerState } =
		useBroadcastControlStreamQuery()
	useSyncOverlaySelectionState(overlayControlState)

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			{/* On the arena each of these takes over the whole screen: the
			    modal fills the viewport and arenaTheme paints its backdrop an
			    opaque #181818, hiding the live grid behind it. The broadcast
			    overlay composes the same cards over Pixi artwork instead. */}
			<SlidingModal
				direction="down"
				show={overlayControlState.showHeatSummary}
				size={100}
			>
				<HeatSummaryTable />
			</SlidingModal>
			<SlidingModal
				direction="up"
				show={overlayControlState.showPhaseResults}
				size={100}
			>
				<PhaseScoreTable overlayControlState={overlayControlState} />
			</SlidingModal>
			<SlidingModal
				direction="up"
				show={overlayControlState.showEventTitle}
				size={100}
			>
				<EventTitle />
			</SlidingModal>
			<GlobalStyles
				styles={{
					body: { backgroundColor: "#181818", height: "100%" }
				}}
			/>
			<Grid2
				container
				spacing={5}
				alignItems="stretch"
				sx={{
					paddingTop: "1em",
					paddingBottom: "1em",
					height: "100vh"
				}}
			>
				<Grid2 size={12}>
					<AthleteInfo
						overlayControlState={overlayControlState}
						textSize="h1"
					/>
				</Grid2>
				<Grid2 size={6}>
					<LiveTimerArena />
				</Grid2>
				<Grid2 size={6}>
					<RunDetails
						overlayControlState={overlayControlState}
						textSize="h1"
					/>
				</Grid2>
				<Grid2 size={12}>
					<SubscribedFinalScore
						overlayControlState={overlayControlState}
						textSize="h1"
					/>
				</Grid2>
			</Grid2>
		</ThemeProvider>
	)
}

export default Arena
