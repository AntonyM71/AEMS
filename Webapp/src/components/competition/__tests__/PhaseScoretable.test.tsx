import { configureStore } from "@reduxjs/toolkit"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { http, HttpResponse } from "msw"
import { Provider } from "react-redux"
import { server } from "../../../mocks/server"
import { competitionsReducer } from "../../../redux/atoms/competitions"
import { aemsApi } from "../../../redux/services/aemsApi"
import { PhaseScoreTable } from "../PhaseScoretable"

interface RootState {
	competitions: {
		selectedPhase: string
	}
	[aemsApi.reducerPath]: ReturnType<typeof aemsApi.reducer>
}

// Mock MainSelector to avoid its loading states interfering with our tests
jest.mock("../MainSelector", () => ({
	SelectorDisplay: jest.fn(() => null)
}))

// Mock react-hot-toast as it's mocked at top level
jest.mock("react-hot-toast", () => ({
	error: jest.fn(),
	success: jest.fn()
}))

const mockPhaseData = {
	id: "1",
	name: "Test Phase",
	number_of_runs: 2
}

const mockPhaseScores = {
	scores: [
		{
			bib_number: "123",
			first_name: "John",
			last_name: "Doe",
			ranking: 1,
			total_score: 85.5,
			run_scores: [
				{
					locked: true,
					did_not_start: false,
					mean_run_score: 85.5,
					judge_scores: [
						{
							judge_id: "1",
							score_info: { score: 85 }
						},
						{
							judge_id: "2",
							score_info: { score: 86 }
						}
					]
				},
				{
					locked: true,
					did_not_start: false,
					mean_run_score: 85.5,
					judge_scores: [
						{
							judge_id: "1",
							score_info: { score: 85 }
						},
						{
							judge_id: "2",
							score_info: { score: 86 }
						}
					]
				}
			]
		}
	]
}

// Create a test store
const createTestStore = () => {
	const store = configureStore({
		reducer: {
			[aemsApi.reducerPath]: aemsApi.reducer,
			competitions: competitionsReducer
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				// This prevents warnings about non-serializable values in action
				serializableCheck: false
			}).concat(aemsApi.middleware),
		preloadedState: {
			competitions: {
				selectedPhase: "1",
				selectedHeat: "",
				numberOfRuns: 0,
				selectedEvent: "",
				selectedCompetition: ""
			}
		}
	})

	return store
}

describe("PhaseScoreTable", () => {
	let store: ReturnType<typeof createTestStore>

	beforeEach(() => {
		store = createTestStore()
		jest.clearAllMocks()
	})

	beforeEach(() => {
		// Reset handlers before each test
		server.resetHandlers()
		// Add default handlers with logging
		server.use(
			http.get("/api/phase/:id", async () =>
				HttpResponse.json(mockPhaseData)
			),
			http.get("/api/getPhaseScores/:phaseId", async () =>
				HttpResponse.json(mockPhaseScores)
			),
			http.get("/api/phase_pdf/:phaseId", () =>
				new HttpResponse("mock pdf content", {
					headers: { "Content-Type": "application/pdf" }
				})
			)
		)
	})

	it("should show loading skeleton when data is being fetched", () => {
		store.dispatch({
			type: "competitions/setSelectedPhase",
			payload: "1"
		})

		render(
			<Provider store={store}>
				<PhaseScoreTable />
			</Provider>
		)

		expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument()
	})

	it("should display phase data when loaded", async () => {
		render(
			<Provider store={store}>
				<PhaseScoreTable />
			</Provider>
		)

		// First verify loading state
		expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument()

		// Wait for phase name to appear
		const phaseName = await screen.findByTestId("phase-name")
		expect(phaseName).toHaveTextContent("Phase: Test Phase")

		// Loading skeleton should be gone and grid should be present
		expect(screen.queryByTestId("loading-skeleton")).not.toBeInTheDocument()
		expect(screen.getByTestId("mock-data-grid")).toBeInTheDocument()
	})

	it("should handle empty athlete list", async () => {
		// Override the mock to return empty scores
		server.use(
			http.get("/api/getPhaseScores/:phaseId", () =>
				HttpResponse.json({ scores: [] })
			)
		)

		store.dispatch({
			type: "competitions/setSelectedPhase",
			payload: "1"
		})

		render(
			<Provider store={store}>
				<PhaseScoreTable />
			</Provider>
		)

		// Wait for phase name to appear
		const phaseName = await screen.findByTestId("phase-name")
		expect(phaseName).toBeInTheDocument()

		// Verify DataGrid is rendered with empty rows
		const dataGrid = screen.getByTestId("mock-data-grid")
		const props = JSON.parse(
			dataGrid.getAttribute("data-grid-props") || "{}"
		) as { rows: unknown[] }
		expect(props.rows).toHaveLength(0)
	})

	it("should handle PDF download", async () => {
		const mockWindow = { location: { href: "" } }
		window.open = jest.fn().mockReturnValue(mockWindow)
		const createObjectURL = jest.fn().mockReturnValue("mock-url")
		URL.createObjectURL = createObjectURL

		store.dispatch({
			type: "competitions/setSelectedPhase",
			payload: "1"
		})

		render(
			<Provider store={store}>
				<PhaseScoreTable />
			</Provider>
		)

		// Wait for download button to appear
		const downloadButton = await screen.findByTestId("download-pdf-button")
		const user = userEvent.setup()
		await user.click(downloadButton)

		// Verify PDF download
		await waitFor(() => {
			expect(createObjectURL).toHaveBeenCalled()
		})
		expect(window.open).toHaveBeenCalled()
		expect(mockWindow.location.href).toBe("mock-url")
	})
})
