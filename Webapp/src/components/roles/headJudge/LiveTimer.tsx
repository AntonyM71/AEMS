import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import React, { useEffect, useRef, useState } from "react"
import { connectTimerSocket } from "./WebSocketConnections"

interface TimeInfo {
	time_remaining: number
	status: string
}
const LiveTimer: React.FC = () => {
	const [time, setTime] = useState<number>(0)
	const socketRef = useRef<WebSocket | null>(null)
	const connectWebSocket = () => {
		socketRef.current = connectTimerSocket()
	}
	useEffect(() => {
		connectWebSocket()
	}, [])
	if (socketRef.current) {
		socketRef.current.onmessage = (event) => {
			const jsonData = JSON.parse(event.data as string) as TimeInfo

			if (jsonData?.time_remaining) {
				setTime(jsonData.time_remaining)
			}
		}
		socketRef.current.onclose = () => {
			setTimeout(connectWebSocket, 1000) // Reconnect after 5 seconds
		}
		socketRef.current.onerror = () => {
			if (socketRef?.current) {
				socketRef.current.close() // Trigger onclose event for reconnection
			}
		}
	}

	return (
		<Paper
			data-testid="final-score"
			sx={{
				padding: "0.5em",
				height: "100%"
			}}
		>
			<Typography variant="h5">Timer:</Typography>
			<div style={{ textAlign: "center" }}>
				<Typography variant="h5">{Math.round(time)}</Typography>
			</div>
		</Paper>
	)
}

export default LiveTimer
