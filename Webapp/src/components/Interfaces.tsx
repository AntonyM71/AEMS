import { AthleteInfo } from "./roles/scribe/InfoBar"

export interface OverlayControlState {
	// flags to show/hide different components
	showTimer: boolean
	showImageCard: boolean
	showHeatSummary: boolean
	showLiveRunScore: boolean
	showPhaseResults: boolean
	showEventTitle: boolean
	// When true, displays take competition, heat, athlete and run from the
	// head judge's position instead of the selections below.
	followHeadJudge: boolean
	// data
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
	showEventTitle: false,
	showLiveRunScore: false,
	showPhaseResults: false,
	followHeadJudge: false,
	selectedCompetition: "",
	selectedEvent: "",
	selectedPhase: "",
	selectedHeat: "",
	selectedAthlete: undefined,
	selectedRun: 0
}

export interface HeadJudgePosition {
	competitionId: string
	heatId: string
	athlete: AthleteInfo
	runNumber: number
}
