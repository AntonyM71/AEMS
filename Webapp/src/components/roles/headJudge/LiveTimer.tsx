import Paper from "@mui/material/Paper"
import { Variant } from "@mui/material/styles/createTypography"
import Typography from "@mui/material/Typography"
import React, { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { connectTimerSocket } from "./WebSocketConnections"

interface TimeInfo {
	time_remaining: number
	status: string
}
export const LiveTimerLogic = ({ textSize = "h5" }: { textSize?: Variant }) => {
	const [time, setTime] = useState<number>(0)
	const socketRef = useRef<WebSocket | null>(null)
	const connectWebSocket = () => {
		if (socketRef.current) {
			socketRef.current.close()
		}
		socketRef.current ??= connectTimerSocket()
		socketRef.current.onmessage = (event) => {
			const jsonData = JSON.parse(event.data as string) as TimeInfo
			if (jsonData?.time_remaining !== undefined) {
				setTime(jsonData.time_remaining)
			}
		}
		socketRef.current.onclose = () => {
			setTimeout(connectWebSocket, 1000) // Reconnect after 5 seconds
		}
		socketRef.current.onerror = () => {
			toast.error("WebSocket error. Attempting to reconnect...")
			if (socketRef?.current) {
				socketRef.current.close() // Trigger onclose event for reconnection
			}
		}
	}
    useEffect(() => {
        connectWebSocket()

        const handleVisibilityOrFocus = () => {
            // If socket is closed, reconnect
            if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
                toast("Reconnecting WebSocket after sleep/focus...")
                connectWebSocket()
            }
        }

        window.addEventListener("focus", handleVisibilityOrFocus)
        document.addEventListener("visibilitychange", handleVisibilityOrFocus)

        return () => {
            window.removeEventListener("focus", handleVisibilityOrFocus)
            document.removeEventListener("visibilitychange", handleVisibilityOrFocus)
            if (socketRef.current) {
                socketRef.current.close()
            }
        }
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
