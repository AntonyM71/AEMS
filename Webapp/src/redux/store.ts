import {
	EnhancedStore,
	combineReducers,
	configureStore
} from "@reduxjs/toolkit"
import { rtkQueryErrorLogger } from "../utils/rtkQueryHelper"
import { competitionsReducer } from "./atoms/competitions"
import { scoringReducer } from "./atoms/scoring"
import { utilitiesReducer } from "./atoms/utilities"
import { emptySplitApi } from "./services/emptyApi"

// structuredClone is Baseline 2022; JSON round-trip covers any older runtime,
// safe here because Redux state is required to be serializable.
const clone = <T>(value: T): T =>
	globalThis.structuredClone?.(value) ?? JSON.parse(JSON.stringify(value))

export const rootReducer = combineReducers({
	score: scoringReducer,
	competitions: competitionsReducer,
	utilities: utilitiesReducer,
	[emptySplitApi.reducerPath]: emptySplitApi.reducer
})
export const setupStore = (
	preloadedState: Partial<RootState> = {}
): EnhancedStore<RootState> =>
	configureStore({
		reducer: rootReducer,
		preloadedState: clone(preloadedState),
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware()
				.concat(emptySplitApi.middleware)
				.concat(rtkQueryErrorLogger)
	})
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
