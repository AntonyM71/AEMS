import { configureStore } from "@reduxjs/toolkit"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { rest } from "msw"
import { Provider } from "react-redux"
import { server } from "../../../../../mocks/server"
import { competitionsReducer } from "../../../../../redux/atoms/competitions"
import { scoringReducer } from "../../../../../redux/atoms/scoring"
import { aemsApi } from "../../../../../redux/services/aemsApi"
import { PaddlerSelector } from "../PaddlerSelector"

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

describe("PaddlerSelector", () => {
	let store: ReturnType<typeof createTestStore>

	beforeEach(() => {
		store = createTestStore()
		jest.clearAllMocks()
	})

	afterEach(() => {
		jest.resetAllMocks()
	})

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

	it("renders paddler information correctly", () => {
		const mockPaddlerInfo = {
			id: "123",
			bib: "456",
			first_name: "John",
			last_name: "Doe",
			scoresheet: "sheet-1"
		}

		// Mock the API response
		server.use(
			rest.get("/api/getHeatInfo/:heatId", (req, res, ctx) =>
				res(ctx.json([mockPaddlerInfo]))
			)
		)

		render(
			<Provider store={store}>
				<PaddlerSelector paddlerInfo={mockPaddlerInfo} />
			</Provider>
		)

		expect(screen.getByText("Bib No:")).toBeInTheDocument()
		expect(screen.getByText("456")).toBeInTheDocument()
		expect(screen.getByText("John")).toBeInTheDocument()
		expect(screen.getByText("DOE")).toBeInTheDocument()
	})

	it("handles navigation buttons correctly", async () => {
		const mockPaddlers = [
			{
				id: "123",
				bib: "456",
				first_name: "John",
				last_name: "Doe",
				scoresheet: "sheet-1"
			},
			{
				id: "124",
				bib: "457",
				first_name: "Jane",
				last_name: "Smith",
				scoresheet: "sheet-2"
			}
		]

		// Mock the API response with multiple paddlers
		server.use(
			rest.get("/api/getHeatInfo/:heatId", (req, res, ctx) =>
				res(ctx.json(mockPaddlers))
			)
		)

		const { container } = render(
			<Provider store={store}>
				<PaddlerSelector paddlerInfo={mockPaddlers[0]} />
			</Provider>
		)

		// Wait for component to be rendered
		await waitFor(() => {
			expect(container).toBeInTheDocument()
		})

		// Wait for API response to be processed
		let queryData: any[] | undefined
		await waitFor(() => {
			const apiState = store.getState()[aemsApi.reducerPath] as {
				queries: Record<string, { data?: any[] }>
			}
			const queryKeys = Object.keys(apiState.queries)
			const heatInfoKey = queryKeys.find((key) =>
				key.startsWith("getHeatInfo")
			)
			if (!heatInfoKey) {
				throw new Error("Heat info query not found")
			}
			queryData = apiState.queries[heatInfoKey].data
			expect(queryData).toBeDefined()
		})

		// Verify API data length
		expect(queryData).toHaveLength(2)

		// Verify initial state
		expect(screen.getByText("456")).toBeInTheDocument()
		expect(screen.getByText("John")).toBeInTheDocument()
		expect(screen.getByText("DOE")).toBeInTheDocument()

		// Test next button
		const nextButton = screen.getByTestId("button-next-paddler")
		expect(store.getState().score.selectedPaddler).toBe(0)

		// Click next and wait for update
		fireEvent.click(nextButton)
		await waitFor(() => {
			expect(store.getState().score.selectedPaddler).toBe(1)
		})

		// Test previous button
		const prevButton = screen.getByTestId("button-prev-paddler")
		fireEvent.click(prevButton)
		await waitFor(() => {
			expect(store.getState().score.selectedPaddler).toBe(0)
		})

		// Test wrapping around to last paddler
		fireEvent.click(prevButton)
		await waitFor(() => {
			expect(store.getState().score.selectedPaddler).toBe(1)
		})
	})

	it("updates run when navigating through all paddlers", async () => {
		const mockPaddlers = [
			{
				id: "123",
				bib: "456",
				first_name: "John",
				last_name: "Doe",
				scoresheet: "sheet-1"
			},
			{
				id: "124",
				bib: "457",
				first_name: "Jane",
				last_name: "Smith",
				scoresheet: "sheet-2"
			}
		]

		server.use(
			rest.get("/api/getHeatInfo/:heatId", (req, res, ctx) =>
				res(ctx.json(mockPaddlers))
			)
		)

		const { container } = render(
			<Provider store={store}>
				<PaddlerSelector paddlerInfo={mockPaddlers[0]} />
			</Provider>
		)

		// Wait for component to be rendered
		await waitFor(() => {
			expect(container).toBeInTheDocument()
		})

		// Wait for API response to be processed
		let queryData: any[] | undefined
		await waitFor(() => {
			const apiState = store.getState()[aemsApi.reducerPath] as {
				queries: Record<string, { data?: any[] }>
			}
			const queryKeys = Object.keys(apiState.queries)
			const heatInfoKey = queryKeys.find((key) =>
				key.startsWith("getHeatInfo")
			)
			if (!heatInfoKey) {
				throw new Error("Heat info query not found")
			}
			queryData = apiState.queries[heatInfoKey].data
			expect(queryData).toBeDefined()
		})

		// Verify API data length
		expect(queryData).toHaveLength(2)

		const nextButton = screen.getByTestId("button-next-paddler")

		// Click next to go to second paddler
		fireEvent.click(nextButton)
		await waitFor(
			() => {
				expect(store.getState().score.selectedPaddler).toBe(1)
			},
			{ timeout: 2000 }
		)

		// Click next again to wrap around and increment run
		fireEvent.click(nextButton)
		await waitFor(() => {
			expect(store.getState().score.selectedPaddler).toBe(0)
		})
		await waitFor(() => {
			expect(store.getState().score.selectedRun).toBe(1)
		})
	})
})
