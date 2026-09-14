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
			http.get("/api/phase", () => HttpResponse.json(mockPhases)),
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

				return HttpResponse.json([
					{ id: "new-phase-id", ...firstPhase }
				])
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
		const user = userEvent.setup({ delay: null })
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
		const user = userEvent.setup({ delay: null })
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

	it("adds a new phase and shows it in the selector", async () => {
		const user = userEvent.setup({ delay: null })
		const phases = [...mockPhases]
		server.use(
			http.get("/api/event/:eventPkId/phase", () =>
				HttpResponse.json(phases)
			),
			http.post("/api/phase/", async ({ request }) => {
				const created = (await request.json()) as PhasePostBody[]
				const withId = { id: "new-phase-id", ...created[0] }
				phases.push(withId)

				return HttpResponse.json([withId], { status: 201 })
			})
		)

		render(
			<Provider store={store}>
				<PhaseSelector showDetailed={true} />
			</Provider>
		)

		await screen.findByText("Add New Phase")

		await user.type(
			screen.getByRole("textbox", { name: "New Phase" }),
			"Semi Final"
		)

		const scoresheet = screen.getByRole("combobox", { name: "Scoresheet" })
		await user.click(scoresheet)
		await user.click(
			await screen.findByRole("option", { name: "Scoresheet 1" })
		)

		const addButton = screen.getByRole("button", { name: "Add Phase" })
		await waitFor(() => expect(addButton).toBeEnabled(), { timeout: 3000 })
		await user.click(addButton)

		await waitFor(
			() => expect(phases).toHaveLength(mockPhases.length + 1),
			{ timeout: 3000 }
		)
		await user.click(screen.getByRole("combobox", { name: "Select Phase" }))
		expect(
			await screen.findByRole(
				"option",
				{ name: "Semi Final" },
				{ timeout: 3000 }
			)
		).toBeInTheDocument()
	})

	it("warns when scoring runs exceed total runs and clears the warning once fixed", async () => {
		render(
			<Provider store={store}>
				<PhaseSelector showDetailed={true} />
			</Provider>
		)

		await screen.findByText("Add New Phase")

		const totalRuns = screen.getByRole("spinbutton", {
			name: "Number of Runs"
		})
		const scoringRuns = screen.getByRole("spinbutton", {
			name: "Number of Scoring Runs"
		})
		const warning =
			"Cannot have more scoring runs per paddler than total runs (9)"

		// 9 total, 10 scoring — a string comparison would read "10" < "9" and
		// miss this; the component must compare numbers.
		fireEvent.change(totalRuns, { target: { value: "9" } })
		fireEvent.change(scoringRuns, { target: { value: "10" } })

		expect(await screen.findByText(warning)).toBeInTheDocument()
		expect(screen.getByRole("button", { name: "Add Phase" })).toBeDisabled()

		fireEvent.change(totalRuns, { target: { value: "10" } })

		await waitFor(() =>
			expect(screen.queryByText(warning)).not.toBeInTheDocument()
		)
	})

	it("renders nothing when no event is selected", () => {
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

	it("edits an existing phase and shows the new name in the selector", async () => {
		const user = userEvent.setup({ delay: null })
		const phases = mockPhases.map((p) => ({ ...p }))
		server.use(
			http.get("/api/event/:eventPkId/phase", () =>
				HttpResponse.json(phases)
			),
			http.get("/api/phase/:id", ({ params }) =>
				HttpResponse.json(phases.find((p) => p.id === params.id))
			),
			http.patch("/api/phase/:id", async ({ params, request }) => {
				const update = (await request.json()) as PhasePatchBody
				const target = phases.find((p) => p.id === params.id)
				if (target && update.name) {
					target.name = update.name
				}

				return HttpResponse.json({ id: params.id, ...update })
			})
		)

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

		await screen.findByText("Select Phase")

		await user.click(
			screen.getByRole("button", { name: "Edit selected phase" })
		)

		const dialog = await screen.findByRole("dialog")
		expect(
			within(dialog).getByTestId("edit-phase-dialog-title")
		).toHaveTextContent("Edit Phase")

		const nameInput = within(dialog).getByRole("textbox", {
			name: "Phase name"
		})
		expect(nameInput).toHaveValue("Phase 1")
		expect(
			within(dialog).getByRole("spinbutton", { name: "Number of Runs" })
		).toHaveValue(3)

		await user.clear(nameInput)
		await user.type(nameInput, "Grand Final")
		await user.click(
			within(dialog).getByRole("button", { name: "Edit Phase" })
		)

		expect(
			await screen.findByText("Grand Final", undefined, { timeout: 3000 })
		).toBeInTheDocument()
	})
})
