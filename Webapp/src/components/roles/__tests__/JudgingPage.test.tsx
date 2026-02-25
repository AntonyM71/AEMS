import { configureStore } from "@reduxjs/toolkit"
import { render, screen } from "@testing-library/react"
import { http, HttpResponse } from "msw"
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
			http.get("/api/getHeatInfo/:heatId/phase", () =>
				HttpResponse.json([
					{
						id: "phase-1",
						name: "Phase 1",
						number_of_judges: 3
					}
				])
			),
			http.get("/api/getHeatInfo/:heatId", () =>
				HttpResponse.json([
					{
						id: "athlete-1",
						name: "Athlete 1"
					}
				])
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
			http.get("/api/getHeatInfo/:heatId", () =>
				HttpResponse.json([])
			),
			http.get("/api/getHeatInfo/:heatId/phase", () =>
				HttpResponse.json([
					{
						id: "phase-1",
						name: "Phase 1",
						number_of_judges: 3
					}
				])
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
		expect(screen.getByTestId("commentator-button")).toBeDisabled()
	})

	it("should show active buttons when there are paddlers", async () => {
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
			http.get("/api/getHeatInfo/:heatId", () =>
				HttpResponse.json([
					{
						id: "athlete-1",
						name: "Athlete 1"
					}
				])
			),
			http.get("/api/getHeatInfo/:heatId/phase", () =>
				HttpResponse.json([
					{
						id: "phase-1",
						name: "Phase 1",
						number_of_judges: 3
					}
				])
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
		expect(
			screen.queryByTestId("no-paddlers-warning")
		).not.toBeInTheDocument()

		// Buttons should be disabled
		expect(screen.getByTestId("scribe-button-1")).toBeEnabled()
		expect(screen.getByTestId("scribe-button-2")).toBeEnabled()
		expect(screen.getByTestId("scribe-button-3")).toBeEnabled()
		expect(screen.getByTestId("head-judge-button")).toBeEnabled()
		expect(screen.getByTestId("commentator-button")).toBeEnabled()
	})
})
