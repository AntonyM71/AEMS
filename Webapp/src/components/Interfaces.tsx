import { AthleteInfo } from "./roles/scribe/InfoBar"

export interface OverlayControlState {
	showTimer: boolean
	showImageCard: boolean
	showHeatSummary: boolean
	showLiveRunScore: boolean
	showPhaseResults: boolean

	//
	selectedCompetition: string
	selectedEvent: string
	selectedPhase: string
	selectedHeat: string

	selectedAthlete: AthleteInfo | undefined
	selectedRun: number
}

export const defaultOverlayControllerState: OverlayControlState = {
	showTimer: false,
	showImageCard: true,
	showHeatSummary: false,
	showLiveRunScore: false,
	showPhaseResults: false,
	selectedCompetition: "",
	selectedEvent: "",
	selectedPhase: "",
	selectedHeat: "",
	selectedAthlete: undefined,
	selectedRun: 0
}
