import { EnhancedStore } from "@reduxjs/toolkit"
import { fireEvent, screen, waitFor } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { server } from "../../../../../mocks/server"
import { RootState } from "../../../../../redux/store"
import { aemsApi } from "../../../../../redux/services/aemsApi"
import { renderWithProviders } from "../../../../../testUtils"
import { PaddlerSelector } from "../PaddlerSelector"

// Waits for the heat's athlete data (and their number_of_runs) to load
// before interacting, so navigation math isn't racing the query.
const waitForHeatInfoData = async (
	store: EnhancedStore<RootState>,
	expectedLength: number
) => {
	await waitFor(() => {
		const apiState = store.getState()[aemsApi.reducerPath] as {
			queries: Record<string, { data?: unknown[] }>
		}
		const heatInfoKey = Object.keys(apiState.queries).find((key) =>
			key.startsWith("getHeatInfo")
		)
		expect(heatInfoKey && apiState.queries[heatInfoKey].data).toHaveLength(
			expectedLength
		)
	})
}

const twoMockPaddlers = (numberOfRuns: number) => [
	{
		id: "123",
		bib: "456",
		first_name: "John",
		last_name: "Doe",
		scoresheet: "sheet-1",
		number_of_runs: numberOfRuns
	},
	{
		id: "124",
		bib: "457",
		first_name: "Jane",
		last_name: "Smith",
		scoresheet: "sheet-2",
		number_of_runs: numberOfRuns
	}
]

// Renders PaddlerSelector for a two-paddler heat and waits for the heat data
// to load, so each test only has to describe its own interaction/assertions.
const renderTwoPaddlerHeat = async (
	numberOfRuns: number,
	competitionsOverrides: Record<string, unknown> = {}
) => {
	const mockPaddlers = twoMockPaddlers(numberOfRuns)

	server.use(
		http.get("/api/getHeatInfo/:heatId", () => HttpResponse.json(mockPaddlers))
	)

	const { store } = renderWithProviders(
		<PaddlerSelector paddlerInfo={mockPaddlers[0]} />,
		{
			preloadedState: {
				competitions: { selectedHeat: "heat-1", ...competitionsOverrides }
			}
		}
	)

	await waitForHeatInfoData(store, 2)

	return { store, mockPaddlers }
}

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
			http.get("/api/getHeatInfo/:heatId", () =>
				HttpResponse.json([mockPaddlerInfo])
			)
		)

		renderWithProviders(<PaddlerSelector paddlerInfo={mockPaddlerInfo} />)

		expect(screen.getByText("Bib No:")).toBeInTheDocument()
		expect(screen.getByText("456")).toBeInTheDocument()
		expect(screen.getByText("John")).toBeInTheDocument()
		expect(screen.getByText("DOE")).toBeInTheDocument()
	})

	it("handles navigation buttons correctly", async () => {
		const { store } = await renderTwoPaddlerHeat(2)

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
		const { store } = await renderTwoPaddlerHeat(2)

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

	it("keeps the run in range going backwards through paddlers with only one run (issue #397)", async () => {
		const { store } = await renderTwoPaddlerHeat(1, {
			// stale global value left over from a previously-viewed multi-run
			// phase; must not be used for the wrap math
			numberOfRuns: 3
		})

		const prevButton = screen.getByTestId("button-prev-paddler")

		fireEvent.click(prevButton)

		await waitFor(() => {
			expect(store.getState().score.selectedPaddler).toBe(1)
		})
		expect(store.getState().score.selectedRun).toBe(0)
	})
})
