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

	it("displays red text when run number exceeds athlete's number of runs", async () => {
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

		const nextButton = screen.getByTestId("button-next-run")
		fireEvent.click(nextButton)

		await waitFor(() => {
			const runNumber = screen.getByText("2")
			expect(runNumber).toHaveStyle({ color: "red" })
		})
	})
})
