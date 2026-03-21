import ThemeProvider from "@mui/material/styles/ThemeProvider"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"

import {
	updateSelectedCompetition,
	updateSelectedEvent,
	updateSelectedHeat,
	updateSelectedPhase
} from "../../redux/atoms/competitions"
import { updateRun } from "../../redux/atoms/scoring"
import { useBroadcastControlStreamQuery } from "../../redux/services/streamingApi"

import { defaultOverlayControllerState } from "../Interfaces"
import { EventTitleModal } from "./Cards/EventTitle"
import { HeatListModal } from "./Cards/HeatListModal"
import { lightTheme } from "./overlayTheme"

interface OverlayProps extends React.FC {
	noLayout?: boolean
}

const Overlay: OverlayProps = () => {
	const { data: overlayControlState = defaultOverlayControllerState } =
		useBroadcastControlStreamQuery()
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
	const setSelectedRun = (newRun: number) => dispatch(updateRun(newRun))
	useEffect(() => {
		if (overlayControlState.selectedHeat) {
			setSelectedRun(overlayControlState.selectedRun)
		}
	}, [overlayControlState.selectedRun])

	return (
		<ThemeProvider theme={lightTheme}>
			<div
				style={{
					height: "100vh",
					overflow: "clip"
				}}
			>
				{/* Non-Pixi overlay cards are intentionally disabled while we migrate
				to always-mounted Pixi-driven visibility control. */}
				<EventTitleModal
					isVisible={overlayControlState.showEventTitle}
				/>
				<HeatListModal
					isVisible={overlayControlState.showHeatSummary}
					overlayControlState={overlayControlState}
				/>
			</div>
		</ThemeProvider>
	)
}
Overlay.noLayout = true
export default Overlay
