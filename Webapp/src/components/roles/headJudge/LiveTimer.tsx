import Paper from "@mui/material/Paper"
import { Variant } from "@mui/material/styles/createTypography"
import Typography from "@mui/material/Typography"
import React, { useEffect, useRef, useState } from "react"
import { connectTimerSocket } from "./WebSocketConnections"

interface TimeInfo {
	time_remaining: number
	status: string
}
export const LiveTimerLogic = ({ textSize = "h5" }: { textSize?: Variant }) => {
	const [time, setTime] = useState<number>(0)
	const socketRef = useRef<WebSocket | null>(null)
	const connectWebSocket = () => {
		socketRef.current ??= connectTimerSocket()
		socketRef.current.onmessage = (event) => {
			const jsonData = JSON.parse(event.data as string) as TimeInfo
			console.log(jsonData)
			if (jsonData?.time_remaining !== undefined) {
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

	return <Typography variant={textSize}>{Math.round(time)}</Typography>
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
