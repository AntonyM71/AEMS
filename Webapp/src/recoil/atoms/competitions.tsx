import { createAction, createReducer } from "@reduxjs/toolkit"
import { heatsType } from "../../competitiondata/Competitions"
import { RootState } from "../store"

interface competitionsStateType {
	heatsList: heatsType[]
	selectedPhase: string
	selectedHeat: string
	numberOfRuns: number
	selectedEvent: string
	selectedCompetition: string
}

const initialState: competitionsStateType = {
	heatsList: [],
	selectedPhase: "",
	selectedHeat: "",
	numberOfRuns: 3,
	selectedEvent: "",
	selectedCompetition: ""
}
export const updateSelectedEvent = createAction<string>("updateSelectedEvent")
export const updateHeatsList = createAction<heatsType[]>("updateHeatsList")
export const updateSelectedHeat = createAction<string>("updateSelectedHeat")
export const updateSelectedPhase = createAction<string>("updateSelectedPhase")
export const updateSelectedCompetition = createAction<string>(
	"updateSelectedCompetition"
)
export const competitionsReducer = createReducer(initialState, (builder) => {
	builder.addCase(updateHeatsList, (state, action) => {
		state.heatsList = action.payload
	})
	builder.addCase(updateSelectedHeat, (state, action) => {
		state.selectedHeat = action.payload
	})
	builder.addCase(updateSelectedEvent, (state, action) => {
		state.selectedEvent = action.payload
	})
	builder.addCase(updateSelectedPhase, (state, action) => {
		state.selectedPhase = action.payload
	})
	builder.addCase(updateSelectedCompetition, (state, action) => {
		state.selectedCompetition = action.payload
	})
})

export const getHeatsList = (state: RootState) => state.competitions.heatsList
export const getSelectedHeat = (state: RootState) =>
	state.competitions.selectedHeat
export const getSelectedEvent = (state: RootState) =>
	state.competitions.selectedEvent
export const getSelectedPhase = (state: RootState) =>
	state.competitions.selectedPhase
export const getSelectedCompetition = (state: RootState): string =>
	state.competitions.selectedCompetition
export const getCurrentHeatInfo = (state: RootState) =>
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	state.competitions.heatsList.find(
		(h) => h.id === state.competitions.selectedHeat
	)!
export const getNumberOfPaddlersInCurrentHeat = (state: RootState) => {
	const currentHeat = getCurrentHeatInfo(state)

	return currentHeat.athletes.length
}

export const getNumberOfRunsInCurrentHeat = (state: RootState) =>
	state.competitions.numberOfRuns
