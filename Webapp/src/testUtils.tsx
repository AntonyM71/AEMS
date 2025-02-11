import { configureStore, EnhancedStore } from "@reduxjs/toolkit"

import { render, RenderOptions } from "@testing-library/react"

import React, { JSX, PropsWithChildren } from "react"
import { Provider } from "react-redux"
import { AppStore, rootReducer, RootState } from "./redux/store"
// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
	preloadedState?: Partial<RootState>
	store?: AppStore
}

export const renderWithProviders = (
	ui: React.ReactElement,
	{
		preloadedState = {},
		// Automatically create a store instance if no store was passed in
		store = configureStore({
			reducer: rootReducer,

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
