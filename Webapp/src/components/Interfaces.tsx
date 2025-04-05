export interface OverlayControlState {
	showTimer: boolean
	showImageCard: boolean
	showHeatSummary: boolean
	//
	selectedCompetition: string
	selectedEvent: string
	selectedPhase: string
	selectedHeat: string
}

export const defaultOverlayControllerState: OverlayControlState = {
	showTimer: false,
	showImageCard: true,
	showHeatSummary: false,
	selectedCompetition: "",
	selectedEvent: "",
	selectedPhase: "",
	selectedHeat: ""
}
