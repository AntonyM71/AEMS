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
		// Competition and heat are set even when empty, so a heat taken from
		// the head judge while following is cleared on returning to Manual.
		dispatch(
			updateSelectedCompetition(overlayControlState.selectedCompetition)
		)
		dispatch(updateSelectedHeat(overlayControlState.selectedHeat))

		if (overlayControlState.selectedEvent) {
			dispatch(updateSelectedEvent(overlayControlState.selectedEvent))
		}

		if (overlayControlState.selectedPhase) {
			dispatch(updateSelectedPhase(overlayControlState.selectedPhase))
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
