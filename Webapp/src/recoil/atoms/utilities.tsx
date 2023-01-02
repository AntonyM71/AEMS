import { createAction, createReducer } from "@reduxjs/toolkit"

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

export const getPreferDark = (state: utilitiesStateType) =>
	state.preferDarkState
