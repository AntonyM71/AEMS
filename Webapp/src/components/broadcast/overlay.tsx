import Grid from "@mui/material/Grid2"
import Stack from "@mui/material/Stack"
import ThemeProvider from "@mui/material/styles/ThemeProvider"
import React, { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import TransitionGroup from "react-transition-group/TransitionGroup"
import { connectBroadcastControlSocket } from "../roles/headJudge/WebSocketConnections"

import {
	updateSelectedCompetition,
	updateSelectedEvent,
	updateSelectedHeat,
	updateSelectedPhase
} from "../../redux/atoms/competitions"
import { updateRun } from "../../redux/atoms/scoring"

import {
	defaultOverlayControllerState,
	OverlayControlState
} from "../Interfaces"
import AthleteInfoCard from "./Cards/AthleteInfoCard"
import { EventTitleModal } from "./Cards/EventTitle"
import { HeatSummaryTable } from "./Cards/HeatSummaryTable"
import { SlidingImageCard } from "./Cards/ICFLogo"
import { LiveRunScoreSpace } from "./Cards/LiveRunScore"
import { LiveTimerSpace } from "./Cards/LiveTimer"
import { PhaseScoreTable } from "./Cards/PhaseResultsTable"
import RunCard from "./Cards/RunCard"
import { lightTheme } from "./overlayTheme"

interface OverlayProps extends React.FC {
	noLayout?: boolean
}

const Overlay: OverlayProps = () => {
	const [overlayControlState, setOverlayControlState] = React.useState(
		defaultOverlayControllerState
	)
	const socketRef = useRef<WebSocket | null>(null)
	const connectWebSocket = () => {
		if (!socketRef.current) {
			socketRef.current = connectBroadcastControlSocket()
		}
		socketRef.current.onmessage = (event) => {
			const jsonData = JSON.parse(
				event.data as string
			) as OverlayControlState

			setOverlayControlState(() => ({
				...jsonData
			}))
		}
		socketRef.current.onclose = () => {
			console.warn("WebSocket closed. Reconnecting...")

			setTimeout(connectWebSocket, 1000) // Reconnect after 5 seconds
		}
		socketRef.current.onerror = (error) => {
			console.error("WebSocket error:", error)

			if (socketRef?.current) {
				socketRef.current.close() // Trigger onclose event for reconnection
			}
		}
	}
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
	useEffect(() => {
		connectWebSocket()
	}, [])

	return (
		<ThemeProvider theme={lightTheme}>
			<div
				style={{
					display: "grid",
					gridTemplateRows: "15% auto 15%",
					height: "100vh",
					overflow: "clip"
				}}
			>
				<header style={{ padding: "1rem" }}>
					{" "}
					<Grid container spacing={2} alignItems="stretch">
						<SlidingImageCard
							overlayControlState={overlayControlState}
						/>
					</Grid>
				</header>
				<main style={{ padding: "1rem" }}>
					<HeatSummaryTable
						overlayControlState={overlayControlState}
					/>
					<PhaseScoreTable
						overlayControlState={overlayControlState}
					/>
					<EventTitleModal
						overlayControlState={overlayControlState}
					/>
				</main>
				<footer style={{ padding: "1rem" }}>
					<TransitionGroup
						component={Stack}
						direction="row"
						spacing={2}
					>
						<AthleteInfoCard
							overlayControlState={overlayControlState}
						/>
						<LiveRunScoreSpace
							overlayControlState={overlayControlState}
						/>
						<RunCard overlayControlState={overlayControlState} />

						<LiveTimerSpace
							overlayControlState={overlayControlState}
						/>
					</TransitionGroup>
				</footer>
			</div>
		</ThemeProvider>
	)
}
Overlay.noLayout = true
export default Overlay
