import Grid from "@mui/material/Grid2"
import ThemeProvider from "@mui/material/styles/ThemeProvider"
import React, { useEffect, useRef } from "react"
import { connectBroadcastControlSocket } from "../roles/headJudge/WebSocketConnections"

import {
	defaultOverlayControllerState,
	OverlayControlState
} from "../Interfaces"
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
		socketRef.current = connectBroadcastControlSocket()
	}

	useEffect(() => {
		connectWebSocket()
	}, [])

	if (socketRef.current) {
		socketRef.current.onclose = () => {
			setTimeout(connectWebSocket, 1000) // Reconnect after 5 seconds
		}
		socketRef.current.onerror = (error) => {
			console.error("WebSocket error:", error)
			if (socketRef?.current) {
				socketRef.current.close() // Trigger onclose event for reconnection
			}
		}
	}
	if (socketRef.current) {
		socketRef.current.onmessage = (event) => {
			const jsonData = JSON.parse(
				event.data as string
			) as OverlayControlState
			setOverlayControlState(jsonData)
		}
	}

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
					<></>
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
