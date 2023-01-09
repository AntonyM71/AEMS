import { createAction, createReducer } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface utilitiesStateType {
	preferDarkState: boolean
}
const initialState: utilitiesStateType = {
	preferDarkState: false
}
export const updatePreferDark = createAction<boolean>("preferDarkState")
export const utilitiesReducer = createReducer(initialState, (builder) => {
	builder.addCase(updatePreferDark, (state, action) => {
		// "mutate" the array by calling push()
		state.preferDarkState = action.payload
	})
})

export const getPreferDark = (state: RootState) =>
	state.utilities.preferDarkState
