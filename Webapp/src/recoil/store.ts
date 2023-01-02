import {
	combineReducers,
	configureStore,
	DeepPartial,
	EnhancedStore,
	PreloadedState
} from "@reduxjs/toolkit"
import { cloneDeep } from "lodash"
import { competitionsReducer } from "./atoms/competitions"
import { scoringReducer } from "./atoms/scoring"
import { utilitiesReducer } from "./atoms/utilities"

export const rootReducer = combineReducers({
	score: scoringReducer,
	competitions: competitionsReducer,
	utilities: utilitiesReducer
})
export const setupStore = (
	preloadedState: DeepPartial<PreloadedState<RootState>> = {}
): EnhancedStore<RootState> =>
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	configureStore({
		reducer: rootReducer,
		preloadedState: cloneDeep(preloadedState)
	})
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
