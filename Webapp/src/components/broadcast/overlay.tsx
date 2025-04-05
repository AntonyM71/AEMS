import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid2"
import Modal from "@mui/material/Modal"
import ThemeProvider from "@mui/material/styles/ThemeProvider"
import React, { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { connectBroadcastControlSocket } from "../roles/headJudge/WebSocketConnections"

import {
	updateSelectedCompetition,
	updateSelectedEvent,
	updateSelectedHeat,
	updateSelectedPhase
} from "../../redux/atoms/competitions"
import {
	defaultOverlayControllerState,
	OverlayControlState
} from "../Interfaces"
import { HeatSummaryTable } from "../competition/HeatSummaryTable"
import { SlidingImageCard } from "./Cards/ICFLogo"
import { LiveTimerSpace } from "./Cards/LiveTimer"
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
		if (socketRef.current) {
			socketRef.current.close() // Close any existing connection
		}
		socketRef.current = connectBroadcastControlSocket()

		console.log(socketRef.current)
		socketRef.current.onmessage = (event) => {
			console.log("Got Event")
			const jsonData = JSON.parse(
				event.data as string
			) as OverlayControlState
			console.log(jsonData)
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

	useEffect(() => {
		connectWebSocket()
	}, [])

	return (
		<ThemeProvider theme={lightTheme}>
			<div
				style={{
					display: "grid",
					gridTemplateRows: "15% auto 15%",
					height: "100vh"
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
					<Modal
						open={overlayControlState.showHeatSummary}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box
							sx={{
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%)",
								width: "70%",
								height: "80%",
								border: "1px solid transparent" // Transparent border
							}}
						>
							<HeatSummaryTable />
						</Box>
					</Modal>
				</main>
				<footer style={{ padding: "1rem" }}>
					<Grid container spacing={2} alignItems="stretch">
						<LiveTimerSpace
							overlayControlState={overlayControlState}
						/>
					</Grid>
				</footer>
			</div>
		</ThemeProvider>
	)
}
Overlay.noLayout = true
export default Overlay
