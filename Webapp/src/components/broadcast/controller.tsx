import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid2"
import Typography from "@mui/material/Typography"
import React, { useEffect, useRef } from "react"
import { connectBroadcastControlSocket } from "../roles/headJudge/WebSocketConnections"

export interface OverlayControlState {
	showTimer: boolean
}

export const defaultOverlayControllerState: OverlayControlState = {
	showTimer: false
}
const OverlayController: React.FC = () => {
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
	useEffect(() => {
		if (
			socketRef.current &&
			socketRef.current.readyState === WebSocket.OPEN
		) {
			console.log(socketRef.current)
			console.log(JSON.stringify(overlayControlState))
			socketRef.current?.send(JSON.stringify(overlayControlState))
		}
	}, [overlayControlState])

	const updateOverlayControlState = (
		newState: Partial<OverlayControlState>
	) => {
		setOverlayControlState({
			...overlayControlState,
			...newState
		})
	}

	return (
		<Grid
			container
			justifyContent="center"
			alignItems="center"
			style={{ height: "100%" }}
			spacing={2}
		>
			<Grid size={12}>
				<Typography variant="h4">Overlay Controller</Typography>
			</Grid>
			<Grid size={12}>
				<Button
					variant="contained"
					onClick={() =>
						updateOverlayControlState({
							showTimer: !overlayControlState.showTimer
						})
					}
					style={{
						backgroundColor: overlayControlState.showTimer
							? "green"
							: "red",
						color: "white"
					}}
				>
					Show Timer
				</Button>
			</Grid>
		</Grid>
	)
}

export default OverlayController
