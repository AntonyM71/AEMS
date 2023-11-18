import { createAction, createReducer } from "@reduxjs/toolkit"
import {
	movesType,
	scoredBonusType,
	scoredMovesType
} from "../../components/roles/scribe/Interfaces"
import { RootState } from "../store"
export const isTest = false

export interface ScoringStateType {
	selectedPaddler: number
	selectedRun: number

	scoredMoves: scoredMovesType[]
	scoredBonuses: scoredBonusType[]
	currentMove: string
	userRole: string
}

const initialState: ScoringStateType = {
	selectedPaddler: 0,
	selectedRun: 0,

	scoredMoves: [],
	scoredBonuses: [],
	currentMove: "",
	userRole: ""
}
export const updateCurrentMove = createAction<string>("currentMove")
export const updateUserRole = createAction<string>("userRole")

export const updateScoredMoves =
	createAction<scoredMovesType[]>("updateScoredMoves")
export const updateScoredBonuses = createAction<scoredBonusType[]>(
	"updateScoredBonuses"
)
export const updateScoredMovesAndBonuses = createAction<{
	moves: scoredMovesType[]
	bonuses: scoredBonusType[]
}>("updateScoredMovesAndBonuses")
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
		.addCase(updateScoredMovesAndBonuses, (state, action) => {
			state.scoredBonuses = action.payload.bonuses
			state.scoredMoves = action.payload.moves
		})
		.addCase(updateScoredMoves, (state, action) => {
			// "mutate" the array by calling push()
			state.scoredMoves = action.payload
		})
		.addCase(updateScoredBonuses, (state, action) => {
			// "mutate" the array by calling push()
			state.scoredBonuses = action.payload
		})
		.addCase(updateCurrentMove, (state, action) => {
			// "mutate" the array by calling push()
			state.currentMove = action.payload
		})
		.addCase(updateUserRole, (state, action) => {
			// "mutate" the array by calling push()
			state.userRole = action.payload
		})
})

export const getScoredMoves = (state: RootState) => state.score.scoredMoves
export const getScoredBonuses = (state: RootState) => state.score.scoredBonuses

export const getCurrentPaddlerIndex = (state: RootState) =>
	state.score.selectedPaddler
export const getSelectedRun = (state: RootState) => state.score.selectedRun

export const getUserRole = (state: RootState) => state.score.userRole
