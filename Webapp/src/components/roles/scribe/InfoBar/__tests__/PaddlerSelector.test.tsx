import { fireEvent, screen, waitFor } from "@testing-library/react"
import { rest } from "msw"
import { server } from "../../../../../mocks/server"
import { aemsApi } from "../../../../../redux/services/aemsApi"
import { renderWithProviders } from "../../../../../testUtils"
import { PaddlerSelector } from "../PaddlerSelector"

describe("PaddlerSelector", () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	afterEach(() => {
		jest.resetAllMocks()
	})

	beforeEach(() => {
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

		renderWithProviders(<PaddlerSelector paddlerInfo={mockPaddlerInfo} />)

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

		const { store } = renderWithProviders(
			<PaddlerSelector paddlerInfo={mockPaddlers[0]} />,
			{
				preloadedState: {
					competitions: {
						selectedHeat: "heat-1",
						numberOfRuns: 2
					}
				}
			}
		)

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
		expect(await screen.findByText("456")).toBeInTheDocument()
		expect(screen.getByText("John")).toBeInTheDocument()
		expect(screen.getByText("DOE")).toBeInTheDocument()

		// Test next button
		const nextButton = await screen.findByTestId("button-next-paddler")
		expect(nextButton).toBeInTheDocument()
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

	it("increments the run when rolling round to the first paddler", async () => {
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

		const { store } = renderWithProviders(
			<PaddlerSelector paddlerInfo={mockPaddlers[0]} />,
			{
				preloadedState: {
					competitions: {
						selectedHeat: "heat-1",
						numberOfRuns: 2
					}
				}
			}
		)

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

		// rolls back to first paddler

		fireEvent.click(nextButton)
		await waitFor(() => {
			expect(store.getState().score.selectedPaddler).toBe(0)
		})

		// It increments the run when we roll around
		await waitFor(() => {
			expect(store.getState().score.selectedRun).toBe(1)
		})
	})
})
