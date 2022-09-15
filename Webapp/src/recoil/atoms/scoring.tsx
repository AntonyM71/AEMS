import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit"
import { atom } from "recoil"
import { moves as demoMoves } from "../../components/judging/sheets/Float/demoMoves"
import { scoredMovesType } from "../../components/judging/sheets/Float/Interfaces"
import { testMoves } from "../../components/judging/sheets/Float/tests/TestData"
import conf from "../../config"
export const isTest = conf.get("env") === "test" ? true : false

export const selectedPaddlerState = atom({
	key: "selectedPaddler", // unique ID (with respect to other atoms/selectors)
	default: 0 as number // default value (aka initial value)
})
export const selectedRunState = atom({
	key: "selectedRun", // unique ID (with respect to other atoms/selectors)
	default: 0 as number // default value (aka initial value)
})

export const currentMoveState = atom({
	key: "currentMove", // unique ID (with respect to other atoms/selectors)
	default: "" as string // default value (aka initial value)
})

export const scoredMovesState = atom({
	key: "scoredMovesState", // unique ID (with respect to other atoms/selectors)
	default: [] as scoredMovesType[] // default value (aka initial value)
})
export const availableMovesListState = atom({
	key: "availableMovesListState", // unique ID (with respect to other atoms/selectors)
	default: isTest ? testMoves : demoMoves // default value (aka initial value)
})

export interface ScoringStateType {
	selectedPaddler: number
	selectedRun: number
}

const initialState = {
	selectedPaddler: 0,
	selectedRun: 0
}


const changePaddler = createAction<number>("updatePaddler")
const changeRun = createAction<number>("updateRun")
export const scoringReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changePaddler, (state, action) => {
      // "mutate" the array by calling push()
      state.selectedPaddler = action.payload
    })
    .addCase(changeRun, (state, action) => {
      // "mutate" the array by calling push()
      state.selectedRun = action.payload
    })

})
