import { configureStore } from "@reduxjs/toolkit"
import { render, screen, waitFor } from "@testing-library/react"
import { rest } from "msw"
import toast from "react-hot-toast"
import { Provider } from "react-redux"
import { server } from "../../../../mocks/server"
import { competitionsReducer } from "../../../../redux/atoms/competitions"
import { scoringReducer } from "../../../../redux/atoms/scoring"
import { aemsApi } from "../../../../redux/services/aemsApi"
import HeadJudge from "../headJudge"

const createTestStore = () =>
	configureStore({
		reducer: {
			[aemsApi.reducerPath]: aemsApi.reducer,
			competitions: competitionsReducer,
			score: scoringReducer
		},
		middleware: (getDefaultMiddleware) => [
			...getDefaultMiddleware({
				serializableCheck: false
			}),
			aemsApi.middleware
		],
		preloadedState: {
			competitions: {
				selectedPhase: "",
				selectedHeat: "",
				numberOfRuns: 0,
				selectedEvent: "",
				selectedCompetition: ""
			},
			score: {
				selectedPaddler: 0,
				selectedRun: 1,
				scoredMoves: [],
				scoredBonuses: [],
				currentMove: "",
				userRole: ""
			}
		}
	})

describe("HeadJudge", () => {
	let store: ReturnType<typeof createTestStore>

	beforeEach(() => {
		store = createTestStore()
		server.resetHandlers()

		// Set up MSW handlers for the API endpoints
		server.use(
			rest.get("/api/run_status", (_req, res, ctx) =>
				res(
					ctx.json({
						id: "status-1",
						heat_id: "heat-1",
						run_number: 1,
						phase_id: "phase-1",
						athlete_id: "athlete-1",
						locked: false,
						did_not_start: true
					})
				)
			),
			rest.get("/api/getManyCompetitions", (_req, res, ctx) =>
				res(
					ctx.json([
						{
							id: "comp-1",
							name: "Competition 1"
						}
					])
				)
			),
			rest.get("/api/getManyPhases", (_req, res, ctx) =>
				res(
					ctx.json([
						{
							id: "phase-1",
							name: "Phase 1",
							heat_id: "heat-1"
						}
					])
				)
			),
			rest.get("/api/getManyEvents", (_req, res, ctx) =>
				res(
					ctx.json([
						{
							id: "event-1",
							name: "Event 1",
							competition_id: "comp-1"
						}
					])
				)
			),
			rest.get("/api/getManyHeats", (_req, res, ctx) =>
				res(
					ctx.json([
						{
							id: "heat-1",
							name: "Heat 1",
							event_id: "event-1"
						}
					])
				)
			),
			rest.get("/api/getHeatInfo/:heatId/phase", (_req, res, ctx) =>
				res(
					ctx.json([
						{
							id: "phase-1",
							name: "Phase 1",
							number_of_judges: 3
						}
					])
				)
			),
			rest.get("/api/getHeatInfo/:heatId", (req, res, ctx) =>
				res(
					ctx.json([
						{
							athlete_id: "athlete-1",
							first_name: "John",
							last_name: "Doe",
							bib: "123",
							scoresheet: "sheet-1",
							phase_id: "phase-1"
						}
					])
				)
			),
			rest.get("/api/getManyRunStatus", (req, res, ctx) =>
				res(
					ctx.json([
						{
							id: "status-1",
							heat_id: "heat-1",
							run_number: 1,
							phase_id: "phase-1",
							athlete_id: "athlete-1",
							locked: false,
							did_not_start: false
						}
					])
				)
			),
			rest.get("/api/getManyAvailablebonuses", (_req, res, ctx) =>
				res(ctx.json([]))
			),
			rest.get("/api/getManyAvailablemoves", (_req, res, ctx) =>
				res(ctx.json([]))
			),
			rest.get(
				"/api/getAthleteMovesAndBonuses/:heatId/:athleteId/:runNumber/:judgeId",
				(_req, res, ctx) =>
					res(
						ctx.json({
							moves: [],
							bonuses: []
						})
					)
			)
		)
	})

	it("should render selector display when no heat is selected", async () => {
		render(
			<Provider store={store}>
				<HeadJudge />
			</Provider>
		)

		// Should show loading skeleton first
		expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument()

		// Should show selector display after loading
		expect(screen.queryByTestId("head-judge-page")).not.toBeInTheDocument()
		await screen.findByText("Select Competition")
	})

	it.skip("should show DNS when run is marked as did not start", async () => {
		// Set up store with a selected heat
		store = configureStore({
			reducer: {
				[aemsApi.reducerPath]: aemsApi.reducer,
				competitions: competitionsReducer,
				score: scoringReducer
			},
			middleware: (getDefaultMiddleware) => [
				...getDefaultMiddleware({
					serializableCheck: false
				}),
				aemsApi.middleware
			],
			preloadedState: {
				competitions: {
					selectedPhase: "phase-1",
					selectedHeat: "heat-1",
					numberOfRuns: 2,
					selectedEvent: "event-1",
					selectedCompetition: "comp-1"
				},
				score: {
					selectedPaddler: 0,
					selectedRun: 1,
					scoredMoves: [],
					scoredBonuses: [],
					currentMove: "",
					userRole: ""
				}
			}
		})

		// Mock run status as DNS before rendering
		server.use(
			rest.get("/api/getManyRunStatus", (_req, res, ctx) =>
				res(
					ctx.json([
						{
							id: "status-1",
							heat_id: "heat-1",
							run_number: 1,
							phase_id: "phase-1",
							athlete_id: "athlete-1",
							locked: false,
							did_not_start: true
						}
					])
				)
			)
		)

		render(
			<Provider store={store}>
				<HeadJudge />
			</Provider>
		)

		// Wait for loading to finish and verify loading state is gone
		await screen.findByTestId("head-judge-page")
		await waitFor(() => {
			expect(
				screen.queryByTestId("loading-skeleton")
			).not.toBeInTheDocument()
		})

		// Wait for the run status to be loaded and check final score shows DNS
		await waitFor(() => {
			const finalScore = screen.getByTestId("final-score-value")
			expect(finalScore).toHaveTextContent("DNS")
		})

		// Verify DNS button shows correct state
		await waitFor(() => {
			const dnsButton = screen.getByTestId("dns-button")
			expect(dnsButton).toHaveTextContent("Unset DNS")
		})
	})

	it.skip("should disable DNS button when run is locked", async () => {
		// Set up store with a selected heat
		store = configureStore({
			reducer: {
				[aemsApi.reducerPath]: aemsApi.reducer,
				competitions: competitionsReducer,
				score: scoringReducer
			},
			middleware: (getDefaultMiddleware) => [
				...getDefaultMiddleware({
					serializableCheck: false
				}),
				aemsApi.middleware
			],
			preloadedState: {
				competitions: {
					selectedPhase: "phase-1",
					selectedHeat: "heat-1",
					numberOfRuns: 2,
					selectedEvent: "event-1",
					selectedCompetition: "comp-1"
				},
				score: {
					selectedPaddler: 0,
					selectedRun: 1,
					scoredMoves: [],
					scoredBonuses: [],
					currentMove: "",
					userRole: ""
				}
			}
		})

		// Mock run status as locked
		server.use(
			rest.get("/api/getManyRunStatus", (_req, res, ctx) =>
				res(
					ctx.json([
						{
							id: "status-1",
							heat_id: "heat-1",
							run_number: 1,
							phase_id: "phase-1",
							athlete_id: "athlete-1",
							locked: true,
							did_not_start: false
						}
					])
				)
			)
		)

		render(
			<Provider store={store}>
				<HeadJudge />
			</Provider>
		)

		// Wait for loading to finish
		await screen.findByTestId("head-judge-page")

		// Click DNS button
		const dnsButton = screen.getByTestId("dns-button")
		dnsButton.click()

		// Check for error toast
		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith(
				"Please unlock run before setting DNS"
			)
		})
	})

	it("should show loading skeleton before showing the page", async () => {
		// Set up store with a selected heat
		store = configureStore({
			reducer: {
				[aemsApi.reducerPath]: aemsApi.reducer,
				competitions: competitionsReducer,
				score: scoringReducer
			},
			middleware: (getDefaultMiddleware) => [
				...getDefaultMiddleware({
					serializableCheck: false
				}),
				aemsApi.middleware
			],
			preloadedState: {
				competitions: {
					selectedPhase: "phase-1",
					selectedHeat: "heat-1",
					numberOfRuns: 2,
					selectedEvent: "event-1",
					selectedCompetition: "comp-1"
				},
				score: {
					selectedPaddler: 0,
					selectedRun: 1,
					scoredMoves: [],
					scoredBonuses: [],
					currentMove: "",
					userRole: ""
				}
			}
		})

		render(
			<Provider store={store}>
				<HeadJudge />
			</Provider>
		)

		// First check that loading skeleton is shown
		expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument()

		// Then verify it's replaced by the page content
		await screen.findByTestId("head-judge-page")
		await waitFor(() => {
			expect(
				screen.queryByTestId("loading-skeleton")
			).not.toBeInTheDocument()
		})
	})

	it("should show initial score as 0.00 when heat is selected", async () => {
		// Set up store with a selected heat
		store = configureStore({
			reducer: {
				[aemsApi.reducerPath]: aemsApi.reducer,
				competitions: competitionsReducer,
				score: scoringReducer
			},
			middleware: (getDefaultMiddleware) => [
				...getDefaultMiddleware({
					serializableCheck: false
				}),
				aemsApi.middleware
			],
			preloadedState: {
				competitions: {
					selectedPhase: "phase-1",
					selectedHeat: "heat-1",
					numberOfRuns: 2,
					selectedEvent: "event-1",
					selectedCompetition: "comp-1"
				},
				score: {
					selectedPaddler: 0,
					selectedRun: 1,
					scoredMoves: [],
					scoredBonuses: [],
					currentMove: "",
					userRole: ""
				}
			}
		})

		render(
			<Provider store={store}>
				<HeadJudge />
			</Provider>
		)

		// Wait for loading to finish
		await screen.findByTestId("head-judge-page")

		// Check that final score shows 0.00
		const finalScore = screen.getByTestId("final-score-value")
		expect(finalScore).toHaveTextContent("0.00")
	})

	it("should show all controls when heat is selected", async () => {
		// Set up store with a selected heat
		store = configureStore({
			reducer: {
				[aemsApi.reducerPath]: aemsApi.reducer,
				competitions: competitionsReducer,
				score: scoringReducer
			},
			middleware: (getDefaultMiddleware) => [
				...getDefaultMiddleware({
					serializableCheck: false
				}),
				aemsApi.middleware
			],
			preloadedState: {
				competitions: {
					selectedPhase: "phase-1",
					selectedHeat: "heat-1",
					numberOfRuns: 2,
					selectedEvent: "event-1",
					selectedCompetition: "comp-1"
				},
				score: {
					selectedPaddler: 0,
					selectedRun: 1,
					scoredMoves: [],
					scoredBonuses: [],
					currentMove: "",
					userRole: ""
				}
			}
		})

		render(
			<Provider store={store}>
				<HeadJudge />
			</Provider>
		)

		// Wait for loading to finish
		await screen.findByTestId("head-judge-page")

		// Check for main controls
		expect(screen.getByTestId("final-score")).toBeInTheDocument()
		expect(screen.getByTestId("dns-button")).toBeInTheDocument()
		if (process.env.NEXT_PUBLIC_SHOW_LOCK_RUN) {
			expect(screen.getByTestId("lock-run-button")).toBeInTheDocument()
		}
		expect(screen.getByTestId("heat-list-button")).toBeInTheDocument()
		expect(screen.getByTestId("heat-scores-button")).toBeInTheDocument()

		// Check initial button states
		expect(screen.getByTestId("dns-button")).toHaveTextContent("SET DNS")
		if (process.env.NEXT_PUBLIC_SHOW_LOCK_RUN) {
			expect(screen.getByTestId("lock-run-button")).toHaveTextContent(
				"Lock Run"
			)
		}
	})
	it("should show does not show lock and dns controls when changeRunStatus is false", async () => {
		// Set up store with a selected heat
		store = configureStore({
			reducer: {
				[aemsApi.reducerPath]: aemsApi.reducer,
				competitions: competitionsReducer,
				score: scoringReducer
			},
			middleware: (getDefaultMiddleware) => [
				...getDefaultMiddleware({
					serializableCheck: false
				}),
				aemsApi.middleware
			],
			preloadedState: {
				competitions: {
					selectedPhase: "phase-1",
					selectedHeat: "heat-1",
					numberOfRuns: 2,
					selectedEvent: "event-1",
					selectedCompetition: "comp-1"
				},
				score: {
					selectedPaddler: 0,
					selectedRun: 1,
					scoredMoves: [],
					scoredBonuses: [],
					currentMove: "",
					userRole: ""
				}
			}
		})

		render(
			<Provider store={store}>
				<HeadJudge changeRunStatus={false} />
			</Provider>
		)

		// Wait for loading to finish
		await screen.findByTestId("head-judge-page")

		// Check for main controls
		expect(screen.getByTestId("final-score")).toBeInTheDocument()
		expect(screen.queryByTestId("dns-button")).not.toBeInTheDocument()
		if (process.env.NEXT_PUBLIC_SHOW_LOCK_RUN) {
			expect(
				screen.queryByTestId("lock-run-button")
			).not.toBeInTheDocument()
		}
		expect(screen.getByTestId("heat-list-button")).toBeInTheDocument()
		expect(screen.getByTestId("heat-scores-button")).toBeInTheDocument()
	})
})
