import { configureStore } from "@reduxjs/toolkit"
import { render, screen } from "@testing-library/react"
import { rest } from "msw"
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
			rest.get("/api/getHeatInfo/:heatId", (_req, res, ctx) =>
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

	it("should show DNS when run is marked as did not start", async () => {
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

		// Mock run status as DNS
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

		// Wait for loading to finish
		await screen.findByTestId("head-judge-page")

		// Check for DNS text
		expect(screen.getByText("DNS")).toBeInTheDocument()
	})

	it("should disable DNS button when run is locked", async () => {
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
		expect(
			screen.getByText("Please unlock run before setting DNS")
		).toBeInTheDocument()
	})
})
