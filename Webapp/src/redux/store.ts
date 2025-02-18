import {
	EnhancedStore,
	combineReducers,
	configureStore
} from "@reduxjs/toolkit"
import { cloneDeep } from "lodash"
import { rtkQueryErrorLogger } from "../utils/rtkQueryHelper"
import { competitionsReducer } from "./atoms/competitions"
import { scoringReducer } from "./atoms/scoring"
import { utilitiesReducer } from "./atoms/utilities"
import { emptySplitApi } from "./services/emptyApi"

export const rootReducer = combineReducers({
	score: scoringReducer,
	competitions: competitionsReducer,
	utilities: utilitiesReducer,
	[emptySplitApi.reducerPath]: emptySplitApi.reducer
})
export const setupStore = (
	preloadedState: Partial<RootState> = {}
): EnhancedStore<RootState> =>
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	configureStore({
		reducer: rootReducer,
		preloadedState: cloneDeep(preloadedState),
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware()
				.concat(emptySplitApi.middleware)
				.concat(rtkQueryErrorLogger)
	})
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
