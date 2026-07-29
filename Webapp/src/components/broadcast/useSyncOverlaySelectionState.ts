import { useEffect } from "react"
import { useDispatch } from "react-redux"

import {
	updateSelectedCompetition,
	updateSelectedEvent,
	updateSelectedHeat,
	updateSelectedPhase
} from "../../redux/atoms/competitions"
import { updateRun } from "../../redux/atoms/scoring"
import { OverlayControlState } from "../Interfaces"

const useSyncOverlaySelectionState = (
	overlayControlState: OverlayControlState
): void => {
	const dispatch = useDispatch()

	useEffect(() => {
		if (overlayControlState.selectedCompetition) {
			dispatch(updateSelectedCompetition(overlayControlState.selectedCompetition))
		}

		if (overlayControlState.selectedEvent) {
			dispatch(updateSelectedEvent(overlayControlState.selectedEvent))
		}

		if (overlayControlState.selectedPhase) {
			dispatch(updateSelectedPhase(overlayControlState.selectedPhase))
		}

		if (overlayControlState.selectedHeat) {
			dispatch(updateSelectedHeat(overlayControlState.selectedHeat))
		}

		dispatch(updateRun(overlayControlState.selectedRun))
	}, [
		dispatch,
		overlayControlState.selectedCompetition,
		overlayControlState.selectedEvent,
		overlayControlState.selectedHeat,
		overlayControlState.selectedPhase,
		overlayControlState.selectedRun
	])
}

export default useSyncOverlaySelectionState
