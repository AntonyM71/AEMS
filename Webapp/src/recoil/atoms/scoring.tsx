import { createAction, createReducer } from "@reduxjs/toolkit"
import {
	movesType,
	scoredMovesType
} from "../../components/judging/sheets/Float/Interfaces"
import { calculateRunScore } from "../../utils/scoringUtils"
export const isTest = false

export interface ScoringStateType {
	selectedPaddler: number
	selectedRun: number
	availableMoves: movesType[]
	scoredMoves: scoredMovesType[]
	currentMove: string
}

const initialState: ScoringStateType = {
	selectedPaddler: 0,
	selectedRun: 0,
	availableMoves: [],
	scoredMoves: [],
	currentMove: ""
}
export const updateCurrentMove = createAction<string>("availableMovesListState")
export const updateScoredMoves =
	createAction<scoredMovesType[]>("updateScoredMoves")
export const updateAvailableMoves = createAction<movesType[]>(
	"updateAvailableMoves"
)
export const updatePaddler = createAction<number>("updatePaddler")
export const updateRun = createAction<number>("updateRun")
export const scoringReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(updatePaddler, (state, action) => {
			// "mutate" the array by calling push()
			state.selectedPaddler = action.payload
		})
		.addCase(updateRun, (state, action) => {
			// "mutate" the array by calling push()
			state.selectedRun = action.payload
		})
		.addCase(updateAvailableMoves, (state, action) => {
			// "mutate" the array by calling push()
			state.availableMoves = action.payload
		})
		.addCase(updateScoredMoves, (state, action) => {
			// "mutate" the array by calling push()
			state.scoredMoves = action.payload
		})
		.addCase(updateCurrentMove, (state, action) => {
			// "mutate" the array by calling push()
			state.currentMove = action.payload
		})
})

export const getScoredMoves = (state: ScoringStateType) => state.scoredMoves
export const getAvailableMoves = (state: ScoringStateType) =>
	state.availableMoves
export const getCurrentPaddlerIndex = (state: ScoringStateType) =>
	state.selectedPaddler
export const getCurrentRun = (state: ScoringStateType) => state.selectedRun
export const getCurrentScore = (state: ScoringStateType) => {
	const scoredMoves = getScoredMoves(state)

	return calculateRunScore(scoredMoves)
}
