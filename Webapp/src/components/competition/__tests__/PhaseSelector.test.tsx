import { configureStore } from "@reduxjs/toolkit"
import {
	fireEvent,
	render,
	screen,
	waitFor,
	within
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { http, HttpResponse } from "msw"
import { toast } from "react-hot-toast"
import { Provider } from "react-redux"
import { server } from "../../../mocks/server"
import { competitionsReducer } from "../../../redux/atoms/competitions"
import { aemsApi } from "../../../redux/services/aemsApi"
import PhaseSelector from "../PhaseSelector"

interface PhasePostBody {
	name: string
	event_id: string
	number_of_runs: number
	number_of_runs_for_score: number
	scoresheet: string
	number_of_judges: number
}

interface PhasePatchBody {
	name?: string
	event_id?: string
	number_of_runs?: number
	number_of_runs_for_score?: number
	scoresheet?: string
	number_of_judges?: number
}

const mockPhases = [
	{
		id: "phase-1",
		name: "Phase 1",
		event_id: "event-1",
		number_of_runs: 3,
		number_of_runs_for_score: 2,
		scoresheet: "scoresheet-1",
		number_of_judges: 3
	},
	{
		id: "phase-2",
		name: "Phase 2",
		event_id: "event-1",
		number_of_runs: 2,
		number_of_runs_for_score: 1,
		scoresheet: "scoresheet-2",
		number_of_judges: 2
	}
]

const createTestStore = () =>
	configureStore({
		reducer: {
			[aemsApi.reducerPath]: aemsApi.reducer,
			competitions: competitionsReducer
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false
			}).concat(aemsApi.middleware),
		preloadedState: {
			competitions: {
				selectedPhase: "",
				selectedHeat: "",
				numberOfRuns: 0,
				selectedEvent: "event-1",
				selectedCompetition: "comp-1"
			}
		}
	})

describe("PhaseSelector", () => {
	let store: ReturnType<typeof createTestStore>

	beforeEach(() => {
		store = createTestStore()
		server.resetHandlers()

		// Set up MSW handlers for the API endpoints
		server.use(
			http.get("/api/event/:eventPkId/phase", () =>
				HttpResponse.json(mockPhases)
			),
			http.get("/api/phase", () =>
				HttpResponse.json(mockPhases)
			),
			http.get("/api/phase/:id", ({ params }) =>
				HttpResponse.json(mockPhases.find((p) => p.id === params.id))
			),
			http.get("/api/scoresheet", () =>
				HttpResponse.json([
					{ id: "scoresheet-1", name: "Scoresheet 1" },
					{ id: "scoresheet-2", name: "Scoresheet 2" }
				])
			),
			http.post("/api/phase", async ({ request }) => {
				const rawBody = await request.json()
				const body = rawBody as PhasePostBody[]
				const firstPhase = body[0]

				return HttpResponse.json([{ id: "new-phase-id", ...firstPhase }])
			}),
			http.patch("/api/phase/:id", async ({ params, request }) => {
				const rawBody = await request.json()
				const body = rawBody as PhasePatchBody

				return HttpResponse.json({ id: params.id, ...body })
			})
		)
	})

	it("should render loading skeleton when fetching phases", () => {
		render(
			<Provider store={store}>
				<PhaseSelector />
			</Provider>
		)

		expect(screen.getByTestId("phase-selector-loading")).toBeInTheDocument()
	})

	it("should display phases when data is loaded", async () => {
		const user = userEvent.setup()
		render(
			<Provider store={store}>
				<PhaseSelector />
			</Provider>
		)

		// Wait for loading state to finish and component to be ready
		await screen.findByText("Select Phase")

		// Find and click the select element
		const selectElement = screen.getByRole("combobox")
		await user.click(selectElement)

		// Wait for and verify options
		const listbox = await screen.findByRole("listbox")
		const options = within(listbox).getAllByRole("option")

		expect(options).toHaveLength(2)
		expect(options[0]).toHaveTextContent("Phase 1")
		expect(options[1]).toHaveTextContent("Phase 2")
	})

	it("should allow selecting a phase", async () => {
		const user = userEvent.setup()
		render(
			<Provider store={store}>
				<PhaseSelector />
			</Provider>
		)

		// Wait for loading state to finish and component to be ready
		await screen.findByText("Select Phase")

		// Find and click the select element
		const selectElement = screen.getByRole("combobox")
		await user.click(selectElement)

		// Find and click the first option
		const listbox = await screen.findByRole("listbox")
		const option = within(listbox).getByText("Phase 1")
		await user.click(option)

		// Verify the Redux store was updated
		expect(store.getState().competitions.selectedPhase).toBe("phase-1")
	})

	it("should show no phases message when event has no phases", async () => {
		server.use(
			http.get("/api/event/:eventPkId/phase", () =>
				HttpResponse.json(null)
			),
			http.get("/api/phase", () => HttpResponse.json(null))
		)

		render(
			<Provider store={store}>
				<PhaseSelector />
			</Provider>
		)

		// Wait for loading to finish and check for no phases message
		expect(
			await screen.findByText("No phases in event")
		).toBeInTheDocument()
	})

	it.skip("should allow adding a new phase", async () => {
		const user = userEvent.setup()
		jest.clearAllMocks()

		render(
			<Provider store={store}>
				<PhaseSelector showDetailed={true} />
			</Provider>
		)

		// Wait for loading state to finish and form to be ready
		await screen.findByText("Add New Phase")

		// Fill in phase name
		const nameInput = screen.getByTestId("edit-phase-name-input")
		await user.type(nameInput, "Test Phase")

		// Fill in required fields
		const scoresheetSelect = screen.getByLabelText("Scoresheet")
		await user.click(scoresheetSelect)
		const scoresheetOption = await screen.findByText("Scoresheet 1")
		await user.click(scoresheetOption)

		// Fill in number fields
		const runsInput = screen.getByTestId("number-of-runs-input")
		fireEvent.change(runsInput, { target: { value: 3 } })

		const scoringRunsInput = screen.getByTestId(
			"number-of-scoring-runs-input"
		)
		fireEvent.change(scoringRunsInput, { target: { value: 2 } })

		const judgesInput = screen.getByTestId("number-of-judges-input")
		fireEvent.change(judgesInput, { target: { value: 3 } })

		// Submit button should be enabled
		const submitButton = screen.getByTestId("submit-phase-button")
		expect(submitButton).toBeEnabled()

		// Submit and verify success
		await user.click(submitButton)
		await new Promise((resolve) => setTimeout(resolve, 0))
		expect(toast.success).toHaveBeenCalledWith("Success")
	})

	it.skip("should show error when scoring runs exceed total runs", async () => {
		const user = userEvent.setup()
		render(
			<Provider store={store}>
				<PhaseSelector showDetailed={true} />
			</Provider>
		)

		// Wait for loading state to finish and form to be ready
		await screen.findByText("Add New Phase")

		// Fill in phase name
		const nameInput = screen.getByTestId("edit-phase-name-input")
		await user.type(nameInput, "Test Phase")

		// Set total runs to 2
		const runsInput = screen.getByTestId("number-of-runs-input")
		await user.clear(runsInput)
		await user.type(runsInput, "2")

		// Set scoring runs to 3 (more than total runs)
		const scoringRunsInput = screen.getByTestId(
			"number-of-scoring-runs-input"
		)
		await user.clear(scoringRunsInput)
		await user.type(scoringRunsInput, "3")

		// Verify error message is shown
		expect(
			screen.getByText(
				"Cannot have more scoring runs per paddler than total runs (2)"
			)
		).toBeInTheDocument()

		// Verify submit button is disabled
		const submitButton = screen.getByTestId("submit-phase-button")
		expect(submitButton).toBeDisabled()
	})

	it.skip("should render empty state when no event is selected", () => {
		store = configureStore({
			reducer: {
				[aemsApi.reducerPath]: aemsApi.reducer,
				competitions: competitionsReducer
			},
			middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware({
					serializableCheck: false
				}).concat(aemsApi.middleware),
			preloadedState: {
				competitions: {
					selectedPhase: "",
					selectedHeat: "",
					numberOfRuns: 0,
					selectedEvent: "", // No event selected
					selectedCompetition: "comp-1"
				}
			}
		})

		render(
			<Provider store={store}>
				<PhaseSelector />
			</Provider>
		)

		// Component should render empty fragment
		expect(screen.queryByText("Select Phase")).not.toBeInTheDocument()
		expect(
			screen.queryByTestId("phase-selector-loading")
		).not.toBeInTheDocument()
	})

	it.skip("should allow editing an existing phase", async () => {
		const user = userEvent.setup()
		jest.clearAllMocks()

		// Set up store with a selected phase
		store = configureStore({
			reducer: {
				[aemsApi.reducerPath]: aemsApi.reducer,
				competitions: competitionsReducer
			},
			middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware({
					serializableCheck: false
				}).concat(aemsApi.middleware),
			preloadedState: {
				competitions: {
					selectedPhase: "phase-1",
					selectedHeat: "",
					numberOfRuns: 0,
					selectedEvent: "event-1",
					selectedCompetition: "comp-1"
				}
			}
		})

		render(
			<Provider store={store}>
				<PhaseSelector showDetailed={true} />
			</Provider>
		)

		// Wait for loading state to finish
		await screen.findByText("Select Phase")

		// Click edit button
		const editButton = screen.getByLabelText("toggle password visibility")
		await user.click(editButton)

		// Wait for dialog to open and load phase data
		const dialog = await screen.findByRole("dialog")
		expect(dialog).toBeInTheDocument()
		expect(
			within(dialog).getByTestId("edit-phase-dialog-title")
		).toHaveTextContent("Edit Phase")

		// Verify existing phase data is loaded
		const nameInput = within(dialog).getByRole("textbox", {
			name: "New Phase"
		})
		expect(nameInput).toHaveValue("Phase 1")

		const runsInput = within(dialog).getByRole("spinbutton", {
			name: "Number of Runs"
		})
		expect(runsInput).toHaveValue(3)

		// Edit phase name
		await user.clear(nameInput)
		await user.type(nameInput, "Updated Phase 1")

		// Mock the refetch functions and API endpoints
		const mockRefetch = jest.fn().mockResolvedValue(undefined)
		const mockRefetchPhaseInfo = jest.fn().mockResolvedValue(undefined)
		server.use(
			http.get("/api/phase/:id", async ({ params }) => {
				await mockRefetchPhaseInfo()

				return HttpResponse.json(mockPhases.find((p) => p.id === params.id))
			}),
			http.get("/api/event/:eventPkId/phase", async () => {
				await mockRefetch()

				return HttpResponse.json(mockPhases)
			})
		)

		// Submit changes
		const submitButton = within(dialog).getByTestId("submit-phase-button")
		await user.click(submitButton)

		await waitFor(() => {
			expect(toast.success).toHaveBeenCalledWith("Success")
		})
		expect(mockRefetch).toHaveBeenCalled()
		await waitFor(() => {
			expect(mockRefetchPhaseInfo).toHaveBeenCalled()
		})
	})
})
