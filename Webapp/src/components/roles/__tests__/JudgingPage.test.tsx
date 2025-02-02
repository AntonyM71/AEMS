import { configureStore } from "@reduxjs/toolkit"
import { render, screen } from "@testing-library/react"
import { rest } from "msw"
import { Provider } from "react-redux"
import { server } from "../../../mocks/server"
import { competitionsReducer } from "../../../redux/atoms/competitions"
import { aemsApi } from "../../../redux/services/aemsApi"
import JudgingPage from "../JudgingPage"

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
				selectedEvent: "",
				selectedCompetition: ""
			}
		}
	})

describe("JudgingPage", () => {
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
							id: "athlete-1",
							name: "Athlete 1"
						}
					])
				)
			)
		)
	})

	it("should render selector display when no heat is selected", async () => {
		render(
			<Provider store={store}>
				<JudgingPage />
			</Provider>
		)

		// Should not show judging page content
		expect(
			screen.queryByTestId("judging-page-content")
		).not.toBeInTheDocument()

		// Wait for loading state to finish
		expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument()

		// Should show selector display after loading
		await screen.findByText("Select Competition")
	})

	it("should show warning and disable buttons when heat has no paddlers", async () => {
		// Set up store with a selected heat
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
					selectedHeat: "heat-1",
					numberOfRuns: 0,
					selectedEvent: "event-1",
					selectedCompetition: "comp-1"
				}
			}
		})

		// Mock API to return empty athlete list
		server.use(
			rest.get("/api/getHeatInfo/:heatId", (_req, res, ctx) =>
				res(ctx.json([]))
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
			)
		)

		render(
			<Provider store={store}>
				<JudgingPage />
			</Provider>
		)

		// Wait for loading state to finish
		await screen.findByTestId("judging-page-content")

		// Warning should be shown
		expect(screen.getByTestId("no-paddlers-warning")).toBeInTheDocument()
		expect(screen.getByTestId("no-paddlers-warning")).toHaveTextContent(
			"Cannot Judge a heat with no paddlers"
		)

		// Buttons should be disabled
		expect(screen.getByTestId("scribe-button-1")).toBeDisabled()
		expect(screen.getByTestId("scribe-button-2")).toBeDisabled()
		expect(screen.getByTestId("scribe-button-3")).toBeDisabled()
		expect(screen.getByTestId("head-judge-button")).toBeDisabled()
	})
})
