import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import React, { useEffect, useRef, useState } from "react"
import { connectTimerSocket } from "./WebSocketConnections"

interface TimeInfo {
	time_remaining: number
	status: string
}
export const LiveTimerLogic: React.FC = () => {
	const [time, setTime] = useState<number>(0)
	const socketRef = useRef<WebSocket | null>(null)
	const connectWebSocket = () => {
		socketRef.current = connectTimerSocket()
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
	useEffect(() => {
		connectWebSocket()
	}, [])

	return <Typography variant="h5">{Math.round(time)}</Typography>
}
const LiveTimer: React.FC = () => (
	<Paper
		data-testid="final-score"
		sx={{
			padding: "0.5em",
			height: "100%"
		}}
	>
		<Typography variant="h5">Timer:</Typography>
		<div style={{ textAlign: "center" }}>
			<LiveTimerLogic />
		</div>
	</Paper>
)
export default LiveTimer
