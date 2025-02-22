import { configureStore, EnhancedStore } from "@reduxjs/toolkit"

import { render, RenderOptions } from "@testing-library/react"

import _ from "lodash"
import React, { JSX, PropsWithChildren } from "react"
import { Provider } from "react-redux"
import { competitionInitialState } from "./redux/atoms/competitions"
import { scoringInitialState } from "./redux/atoms/scoring"
import { utilitiesInitialState } from "./redux/atoms/utilities"
import { aemsApi } from "./redux/services/aemsApi"
import { AppStore, rootReducer, RootState } from "./redux/store"
// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
type DeepPartial<T> = {
	[P in keyof T]?: DeepPartial<T[P]>
}

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
	preloadedState?: DeepPartial<RootState>
	store?: AppStore
}
const baseState: Partial<RootState> = {
	competitions: competitionInitialState,
	score: scoringInitialState,
	utilities: utilitiesInitialState
}

export const renderWithProviders = (
	ui: React.ReactElement,
	{
		preloadedState = {},
		// Automatically create a store instance if no store was passed in
		store = configureStore({
			reducer: rootReducer,
			middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware().concat(aemsApi.middleware),
			preloadedState: _.mergeWith(
				{},
				baseState,
				preloadedState,
				(a: object, b: object) => (b ? { ...a, ...b } : a)
			)
		}),
		...renderOptions
	}: ExtendedRenderOptions = {}
): { store: EnhancedStore<RootState> } => {
	const Wrapper = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
		<Provider store={store}>{children}</Provider>
	)

	// Return an object with the store and all of RTL's query functions
	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
