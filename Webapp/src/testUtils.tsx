import { configureStore, EnhancedStore, PreloadedState } from "@reduxjs/toolkit"

import { render, RenderOptions } from "@testing-library/react"

import React, { PropsWithChildren } from "react"
import { Provider } from "react-redux"
import { competitionsReducer } from "./redux/atoms/competitions"
import { scoringReducer } from "./redux/atoms/scoring"
import { utilitiesReducer } from "./redux/atoms/utilities"
import { emptySplitApi } from "./redux/services/emptyApi"
import { AppStore, RootState } from "./redux/store"
// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
	preloadedState?: Partial<PreloadedState<RootState>>
	store?: AppStore
}

export const renderWithProviders = (
	ui: React.ReactElement,
	{
		preloadedState = {},
		// Automatically create a store instance if no store was passed in
		store = configureStore({
			reducer: {
				score: scoringReducer,
				competitions: competitionsReducer,
				utilities: utilitiesReducer,
				[emptySplitApi.reducerPath]: emptySplitApi.reducer
			},
			preloadedState
		}),
		...renderOptions
	}: ExtendedRenderOptions = {}
): { store: EnhancedStore } => {
	const Wrapper = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
		<Provider store={store}>{children}</Provider>
	)

	// Return an object with the store and all of RTL's query functions
	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
