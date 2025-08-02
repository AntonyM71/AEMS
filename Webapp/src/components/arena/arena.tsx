import CssBaseline from "@mui/material/CssBaseline"
import GlobalStyles from "@mui/material/GlobalStyles"
import Grid2 from "@mui/material/Grid2"
import ThemeProvider from "@mui/material/styles/ThemeProvider"
import React, { useEffect, useRef } from "react"
import AthleteInfoCard from "../broadcast/Cards/AthleteInfoCard"
import { LiveRunScoreSpace } from "../broadcast/Cards/LiveRunScore"
import {
	defaultOverlayControllerState,
	OverlayControlState
} from "../Interfaces"
import { connectBroadcastControlSocket } from "../roles/headJudge/WebSocketConnections"
import { darkTheme } from "./arenaTheme"
import LiveTimerArena from "./liveTimerArena"
const Arena = () => {
	const [overlayControlState, setOverlayControlState] = React.useState(
		defaultOverlayControllerState
	)
	const socketRef = useRef<WebSocket | null>(null)
	const connectWebSocket = () => {
		socketRef.current ??= connectBroadcastControlSocket()
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
	useEffect(() => {
		connectWebSocket()
	}, [])

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<GlobalStyles styles={{ body: { backgroundColor: "#181818" } }} />
			<Grid2 container spacing={5} alignItems="stretch">
				<Grid2 size={12}>
					<AthleteInfoCard
						overlayControlState={overlayControlState}
						textSize="h1"
					/>
				</Grid2>
				<Grid2 size={4}>
					<LiveTimerArena />
				</Grid2>
				<Grid2 size={8}>
					<LiveRunScoreSpace
						overlayControlState={overlayControlState}
						textSize="h1"
					></LiveRunScoreSpace>
				</Grid2>
			</Grid2>
		</ThemeProvider>
	)
}

export default Arena
