import { configureStore } from "@reduxjs/toolkit"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { Provider } from "react-redux"
import { server } from "../../../../../mocks/server"
import { competitionsReducer } from "../../../../../redux/atoms/competitions"
import { scoringReducer } from "../../../../../redux/atoms/scoring"
import { aemsApi } from "../../../../../redux/services/aemsApi"
import { RunSelector } from "../Runselector"

const createTestStore = (preloadedState = {}) =>
	configureStore({
		reducer: {
			[aemsApi.reducerPath]: aemsApi.reducer,
			competitions: competitionsReducer,
			score: scoringReducer
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(aemsApi.middleware),
		preloadedState
	})

describe("RunSelector", () => {
	let store: ReturnType<typeof createTestStore>

	beforeEach(() => {
		store = createTestStore({
			score: {
				selectedPaddler: 0,
				selectedRun: 0,
				scoredMoves: [],
				scoredBonuses: [],
				currentMove: "",
				userRole: ""
			},
			competitions: {
				selectedHeat: "heat-1",
				numberOfRuns: 2
			}
		})
		jest.clearAllMocks()
	})

	afterEach(() => {
		jest.resetAllMocks()
	})

	it("renders run information correctly", () => {
		const mockPaddlerInfo = {
			id: "123",
			bib: "456",
			first_name: "John",
			last_name: "Doe",
			number_of_runs: 2
		}

		server.use(
			http.get("/api/getHeatInfo/:heatId", () =>
				HttpResponse.json([mockPaddlerInfo])
			)
		)

		render(
			<Provider store={store}>
				<RunSelector />
			</Provider>
		)

		expect(screen.getByText("Run:")).toBeInTheDocument()
		expect(screen.getByText("1")).toBeInTheDocument() // Run number starts at 1
		expect(screen.getByTestId("button-prev-run")).toBeInTheDocument()
		expect(screen.getByTestId("button-next-run")).toBeInTheDocument()
	})

	it("handles navigation buttons correctly", async () => {
		const mockPaddlerInfo = {
			id: "123",
			bib: "456",
			first_name: "John",
			last_name: "Doe",
			number_of_runs: 2
		}

		server.use(
			http.get("/api/getHeatInfo/:heatId", () =>
				HttpResponse.json([mockPaddlerInfo])
			)
		)

		render(
			<Provider store={store}>
				<RunSelector />
			</Provider>
		)

		// Wait for the heat's athlete data (and their number_of_runs) to load
		// before interacting, so the wrap math isn't racing the query.
		await waitFor(() => {
			const apiState = store.getState()[aemsApi.reducerPath] as {
				queries: Record<string, { data?: any[] }>
			}
			const heatInfoKey = Object.keys(apiState.queries).find((key) =>
				key.startsWith("getHeatInfo")
			)
			expect(heatInfoKey && apiState.queries[heatInfoKey].data).toHaveLength(
				1
			)
		})

		// Test next button
		const nextButton = screen.getByTestId("button-next-run")
		expect(store.getState().score.selectedRun).toBe(0)

		fireEvent.click(nextButton)
		await waitFor(() => {
			expect(store.getState().score.selectedRun).toBe(1)
		})

		// Test previous button
		const prevButton = screen.getByTestId("button-prev-run")
		fireEvent.click(prevButton)
		await waitFor(() => {
			expect(store.getState().score.selectedRun).toBe(0)
		})

		// Test wrapping around to last run
		fireEvent.click(prevButton)
		await waitFor(() => {
			expect(store.getState().score.selectedRun).toBe(1)
		})
	})

	it("keeps the run in range for an athlete with a single run (issue #397)", async () => {
		const mockPaddlerInfo = {
			id: "123",
			bib: "456",
			first_name: "John",
			last_name: "Doe",
			number_of_runs: 1
		}

		server.use(
			http.get("/api/getHeatInfo/:heatId", () =>
				HttpResponse.json([mockPaddlerInfo])
			)
		)

		render(
			<Provider store={store}>
				<RunSelector />
			</Provider>
		)

		const nextButton = await screen.findByTestId("button-next-run")
		fireEvent.click(nextButton)

		await waitFor(() => {
			expect(store.getState().score.selectedRun).toBe(0)
		})
	})

	it("displays red text when the selected run is out of range for the athlete", async () => {
		store = createTestStore({
			score: {
				selectedPaddler: 0,
				selectedRun: 1,
				scoredMoves: [],
				scoredBonuses: [],
				currentMove: "",
				userRole: ""
			},
			competitions: {
				selectedHeat: "heat-1",
				numberOfRuns: 2
			}
		})

		const mockPaddlerInfo = {
			id: "123",
			bib: "456",
			first_name: "John",
			last_name: "Doe",
			number_of_runs: 1
		}

		server.use(
			http.get("/api/getHeatInfo/:heatId", () =>
				HttpResponse.json([mockPaddlerInfo])
			)
		)

		render(
			<Provider store={store}>
				<RunSelector />
			</Provider>
		)

		await waitFor(() => {
			expect(screen.getByText("2")).toHaveStyle({ color: "red" })
		})
	})
})
