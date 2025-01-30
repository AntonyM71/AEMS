import { AnyAction, Middleware } from "@reduxjs/toolkit"

export const mockPrefetchMoves = jest.fn()
export const mockPrefetchBonuses = jest.fn()

interface ApiState {
	queries: Record<string, unknown>
	mutations: Record<string, unknown>
}

const initialState: ApiState = {
	queries: {},
	mutations: {}
}

export const aemsApi = {
	usePrefetch: (endpoint: string) => {
		if (endpoint === "getManyAvailablemovesGet") {
			return mockPrefetchMoves
		}
		if (endpoint === "getManyAvailablebonusesGet") {
			return mockPrefetchBonuses
		}

		return jest.fn()
	},
	reducerPath: "api",
	reducer: (state: ApiState = initialState, _action: AnyAction) => state,
	middleware: jest.fn(
		() => (next: (action: AnyAction) => void) => next
	) as Middleware
}

export default aemsApi
