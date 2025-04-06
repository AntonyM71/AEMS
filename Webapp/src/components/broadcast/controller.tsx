import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid2"
import Typography from "@mui/material/Typography"
import React, { useEffect, useRef } from "react"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import {
	getSelectedCompetition,
	getSelectedEvent,
	getSelectedHeat,
	getSelectedPhase
} from "../../redux/atoms/competitions"
import { SelectorDisplay } from "../competition/MainSelector"
import {
	defaultOverlayControllerState,
	OverlayControlState
} from "../Interfaces"
import { connectBroadcastControlSocket } from "../roles/headJudge/WebSocketConnections"

const OverlayController: React.FC = () => {
	const [overlayControlState, setOverlayControlState] = React.useState(
		defaultOverlayControllerState
	)

	const selectedCompetition = useSelector(getSelectedCompetition)
	useEffect(() => {
		setOverlayControlState({ ...overlayControlState, selectedCompetition })
	}, [selectedCompetition])

	const selectedEvent = useSelector(getSelectedEvent)
	useEffect(() => {
		setOverlayControlState({ ...overlayControlState, selectedEvent })
	}, [selectedEvent])

	const selectedPhase = useSelector(getSelectedPhase)
	useEffect(() => {
		setOverlayControlState({ ...overlayControlState, selectedPhase })
	}, [selectedPhase])

	const selectedHeat = useSelector(getSelectedHeat)
	useEffect(() => {
		setOverlayControlState({ ...overlayControlState, selectedHeat })
	}, [selectedHeat])

	const socketRef = useRef<WebSocket | null>(null)
	const connectWebSocket = () => {
		if (socketRef.current) {
			socketRef.current.close()
		}
		socketRef.current = connectBroadcastControlSocket()
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
		connectWebSocket()
	}, [])

	useEffect(() => {
		if (
			socketRef.current &&
			socketRef.current.readyState === WebSocket.OPEN
		) {
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
				<SelectorDisplay />
			</Grid>
			<Grid size={12}>
				<ConfigurableButton
					label="Show Timer"
					active={overlayControlState.showTimer}
					onClick={() =>
						updateOverlayControlState({
							showTimer: !overlayControlState.showTimer
						})
					}
					activeColor="green"
					inactiveColor="red"
					textColor="white"
				/>
			</Grid>
			<Grid size={12}>
				<ConfigurableButton
					label="Show Heat Summary Modal"
					active={overlayControlState.showHeatSummary}
					onClick={() => {
						if (overlayControlState.selectedHeat) {
							updateOverlayControlState({
								showHeatSummary:
									!overlayControlState.showHeatSummary
							})
						} else {
							toast.error(
								"Please select a competitoin and heat to use this feature"
							)
						}
					}}
					activeColor="green"
					inactiveColor="red"
					textColor="white"
				/>
			</Grid>
			<Grid size={12}>
				<ConfigurableButton
					label="Show ICF Logo"
					active={overlayControlState.showImageCard}
					onClick={() =>
						updateOverlayControlState({
							showImageCard: !overlayControlState.showImageCard
						})
					}
					activeColor="green"
					inactiveColor="red"
					textColor="white"
				/>
			</Grid>
		</Grid>
	)
}

interface ConfigurableButtonProps {
	label: string // Text to display on the button
	active: boolean // Whether the button is active
	onClick: () => void // Function to call when the button is clicked
	activeColor?: string // Background color when active
	inactiveColor?: string // Background color when inactive
	textColor?: string // Text color
}

const ConfigurableButton: React.FC<ConfigurableButtonProps> = ({
	label,
	active,
	onClick,
	activeColor = "green", // Default active color
	inactiveColor = "red", // Default inactive color
	textColor = "white" // Default text color
}) => (
	<Button
		variant="contained"
		onClick={onClick}
		style={{
			backgroundColor: active ? activeColor : inactiveColor,
			color: textColor
		}}
	>
		{label}
	</Button>
)

export default OverlayController
