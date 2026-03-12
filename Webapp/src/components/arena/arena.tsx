import CssBaseline from "@mui/material/CssBaseline"
import GlobalStyles from "@mui/material/GlobalStyles"
import Grid2 from "@mui/material/Grid2"
import ThemeProvider from "@mui/material/styles/ThemeProvider"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import {
	updateSelectedCompetition,
	updateSelectedEvent,
	updateSelectedHeat,
	updateSelectedPhase
} from "../../redux/atoms/competitions"
import { updateRun } from "../../redux/atoms/scoring"
import { useBroadcastControlStreamQuery } from "../../redux/services/streamingApi"
import { AthleteInfo } from "../broadcast/Cards/AthleteInfoCard"
import { EventTitleModal } from "../broadcast/Cards/EventTitle"
import { HeatSummaryTable } from "../broadcast/Cards/HeatSummaryTable"
import { SubscribedFinalScore } from "../broadcast/Cards/LiveRunScore"
import { PhaseScoreTable } from "../broadcast/Cards/PhaseResultsTable"
import { RunDetails } from "../broadcast/Cards/RunCard"
import {
	defaultOverlayControllerState
} from "../Interfaces"
import { darkTheme } from "./arenaTheme"
import LiveTimerArena from "./liveTimerArena"
const Arena = () => {
	const { data: overlayControlState = defaultOverlayControllerState } =
		useBroadcastControlStreamQuery()
	const dispatch = useDispatch()
	const setSelectedCompetition = (newCompetition: string) =>
		dispatch(updateSelectedCompetition(newCompetition))

	useEffect(() => {
		if (overlayControlState.selectedCompetition) {
			setSelectedCompetition(overlayControlState.selectedCompetition)
		}
	}, [overlayControlState.selectedCompetition])

	const setSelectedEvent = (newEvent: string) =>
		dispatch(updateSelectedEvent(newEvent))
	useEffect(() => {
		if (overlayControlState.selectedEvent) {
			setSelectedEvent(overlayControlState.selectedEvent)
		}
	}, [overlayControlState.selectedEvent])

	const setSelectedPhase = (newPhase: string) =>
		dispatch(updateSelectedPhase(newPhase))
	useEffect(() => {
		if (overlayControlState.selectedPhase) {
			setSelectedPhase(overlayControlState.selectedPhase)
		}
	}, [overlayControlState.selectedPhase])

	const setSelectedHeat = (newHeat: string) =>
		dispatch(updateSelectedHeat(newHeat))
	useEffect(() => {
		if (overlayControlState.selectedHeat) {
			setSelectedHeat(overlayControlState.selectedHeat)
		}
	}, [overlayControlState.selectedHeat])
	const setSelectedRun = (newRun: number) => dispatch(updateRun(newRun))
	useEffect(() => {
		if (overlayControlState.selectedHeat) {
			setSelectedRun(overlayControlState.selectedRun)
		}
	}, [overlayControlState.selectedRun])

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<HeatSummaryTable
				overlayControlState={overlayControlState}
				size={100}
			/>
			<PhaseScoreTable
				overlayControlState={overlayControlState}
				size={100}
			/>
			<EventTitleModal
				overlayControlState={overlayControlState}
				size={100}
			/>
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
