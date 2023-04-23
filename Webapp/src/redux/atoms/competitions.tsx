import { createAction, createReducer } from "@reduxjs/toolkit"

import { RootState } from "../store"

interface competitionsStateType {
	selectedPhase: string
	selectedHeat: string
	numberOfRuns: number
	selectedEvent: string
	selectedCompetition: string
}

const initialState: competitionsStateType = {
	selectedPhase: "",
	selectedHeat: "",
	numberOfRuns: 3,
	selectedEvent: "",
	selectedCompetition: ""
}
export const updateSelectedEvent = createAction<string>("updateSelectedEvent")
export const updateSelectedHeat = createAction<string>("updateSelectedHeat")
export const updateSelectedPhase = createAction<string>("updateSelectedPhase")
export const updateSelectedCompetition = createAction<string>(
	"updateSelectedCompetition"
)
export const competitionsReducer = createReducer(initialState, (builder) => {
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

export const getSelectedHeat = (state: RootState) =>
	state.competitions.selectedHeat
export const getSelectedEvent = (state: RootState) =>
	state.competitions.selectedEvent
export const getSelectedPhase = (state: RootState) =>
	state.competitions.selectedPhase
export const getSelectedCompetition = (state: RootState): string =>
	state.competitions.selectedCompetition
