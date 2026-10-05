import { AthleteInfo } from "./roles/scribe/InfoBar"

export interface OverlayControlState {
	// flags to show/hide different components
	showImageCard: boolean
	showHeatSummary: boolean
	showLiveRunScore: boolean
	showPhaseResults: boolean
	showEventTitle: boolean
	showAthleteOverview: boolean
	showCompetitionOverview: boolean
	competitionOverviewList: "events" | "heats"
	// data
	selectedCompetition: string
	selectedEvent: string
	selectedPhase: string
	selectedHeat: string

	selectedAthlete: AthleteInfo | undefined
	selectedRun: number
}

export const defaultOverlayControllerState: OverlayControlState = {
	showImageCard: true,
	showHeatSummary: false,
	showEventTitle: false,
	showLiveRunScore: false,
	showPhaseResults: false,
	showAthleteOverview: false,
	showCompetitionOverview: false,
	competitionOverviewList: "events",
	selectedCompetition: "",
	selectedEvent: "",
	selectedPhase: "",
	selectedHeat: "",
	selectedAthlete: undefined,
	selectedRun: 0
}
