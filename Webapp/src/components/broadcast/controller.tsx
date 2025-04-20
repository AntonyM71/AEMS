import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid2"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import React, { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import {
	getSelectedCompetition,
	getSelectedEvent,
	getSelectedHeat,
	getSelectedPhase
} from "../../redux/atoms/competitions"
import {
	getCurrentPaddlerIndex,
	getSelectedRun
} from "../../redux/atoms/scoring"
import { useGetHeatInfoGetHeatInfoHeatIdGetQuery } from "../../redux/services/aemsApi"
import { SelectorDisplay } from "../competition/MainSelector"
import {
	defaultOverlayControllerState,
	OverlayControlState
} from "../Interfaces"
import { connectBroadcastControlSocket } from "../roles/headJudge/WebSocketConnections"
import { AthleteInfo } from "../roles/scribe/InfoBar"
import { PaddlerSelector } from "../roles/scribe/InfoBar/PaddlerSelector"
import { RunSelector } from "../roles/scribe/InfoBar/Runselector"

const OverlayController: React.FC = () => {
	const [overlayControlState, setOverlayControlState] = React.useState(
		defaultOverlayControllerState
	)
	const selectedCompetition = useSelector(getSelectedCompetition)

	const selectedEvent = useSelector(getSelectedEvent)
	const currentPaddlerIndex = useSelector(getCurrentPaddlerIndex)

	const selectedHeat = useSelector(getSelectedHeat)
	const selectedRun = useSelector(getSelectedRun)
	const { data: athleteData } = useGetHeatInfoGetHeatInfoHeatIdGetQuery(
		{
			heatId: selectedHeat
		},
		{ skip: !selectedHeat }
	)
	const [selectedAthlete, setSelectedAthlete] = useState<
		AthleteInfo | undefined
	>(undefined)
	useEffect(() => {
		if (athleteData) {
			setSelectedAthlete({
				id: athleteData[currentPaddlerIndex].athlete_id,
				first_name: athleteData[currentPaddlerIndex].first_name,
				last_name: athleteData[currentPaddlerIndex].last_name,
				bib: athleteData[currentPaddlerIndex].bib,
				scoresheet: athleteData[currentPaddlerIndex].scoresheet
			})
		} else {
			setSelectedAthlete(undefined)
		}
	}, [currentPaddlerIndex, athleteData, selectedHeat])
	useEffect(() => {
		setOverlayControlState({ ...overlayControlState, selectedCompetition })
	}, [selectedCompetition])

	useEffect(() => {
		setOverlayControlState({ ...overlayControlState, selectedEvent })
	}, [selectedEvent])

	const selectedPhase = useSelector(getSelectedPhase)
	useEffect(() => {
		setOverlayControlState({ ...overlayControlState, selectedPhase })
	}, [selectedPhase])

	useEffect(() => {
		setOverlayControlState({ ...overlayControlState, selectedHeat })
	}, [selectedHeat])
	useEffect(() => {
		setOverlayControlState({ ...overlayControlState, selectedAthlete })
	}, [selectedAthlete])
	useEffect(() => {
		setOverlayControlState({ ...overlayControlState, selectedRun })
	}, [selectedRun])
	const socketRef = useRef<WebSocket | null>(null)
	const connectWebSocket = () => {
		if (!socketRef.current) {
			socketRef.current = connectBroadcastControlSocket()
		}
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
	const toggleKey = (key: keyof OverlayControlState) => {
		setOverlayControlState((prevState) => ({
			...prevState,
			[key]: !prevState[key]
		}))
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
			{selectedAthlete ? (
				<Grid size={6}>
					<Stack direction="row" spacing={2}>
						<PaddlerSelector paddlerInfo={selectedAthlete} />

						<RunSelector />
					</Stack>
				</Grid>
			) : (
				<Grid size={12}>
					<Typography>Please Select a heat to get started</Typography>{" "}
				</Grid>
			)}
			<Grid size={12}>
				<ConfigurableButton
					label="Show ICF Logo"
					active={overlayControlState.showImageCard}
					onClick={() => toggleKey("showImageCard")}
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
							toggleKey("showHeatSummary")
						} else {
							toast.error(
								"Please select a competition and heat to use this feature"
							)
						}
					}}
				/>
				<ConfigurableButton
					label="Show Phase Results Modal"
					active={overlayControlState.showPhaseResults}
					onClick={() => {
						if (overlayControlState.selectedPhase) {
							toggleKey("showPhaseResults")
						} else {
							toast.error(
								"Please select a phase to use this feature"
							)
						}
					}}
				/>
			</Grid>
			<Grid size={12}>
				<ConfigurableButton
					label="Show Live Run Score"
					active={overlayControlState.showLiveRunScore}
					onClick={() => toggleKey("showLiveRunScore")}
				/>
				<ConfigurableButton
					label="Show Timer"
					active={overlayControlState.showTimer}
					onClick={() => toggleKey("showTimer")}
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
