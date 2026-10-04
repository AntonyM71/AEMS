import { configureStore } from "@reduxjs/toolkit"
import { act, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { http, HttpResponse } from "msw"
import toast from "react-hot-toast"
import { Provider } from "react-redux"
import { server } from "../../../../mocks/server"
import { socketHub } from "../../../../mocks/socketHub"
import {
	competitionInitialState,
	competitionsReducer,
	updateSelectedPhase
} from "../../../../redux/atoms/competitions"
import {
	scoringInitialState,
	scoringReducer,
	updateRun
} from "../../../../redux/atoms/scoring"
import { aemsApi } from "../../../../redux/services/aemsApi"
import HeadJudge from "../headJudge"

jest.mock("../WebSocketConnections")

const competitionsWithHeat: typeof competitionInitialState = {
	...competitionInitialState,
	selectedPhase: "phase-1",
	selectedHeat: "heat-1",
	numberOfRuns: 2,
	selectedEvent: "event-1",
	selectedCompetition: "comp-1"
}

const makeStore = (competitions: typeof competitionInitialState) =>
	configureStore({
		reducer: {
			[aemsApi.reducerPath]: aemsApi.reducer,
			competitions: competitionsReducer,
			score: scoringReducer
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false
			}).concat(aemsApi.middleware),
		preloadedState: {
			competitions,
			score: { ...scoringInitialState, selectedRun: 1 }
		}
	})

const createTestStore = () => makeStore(competitionInitialState)

const runStatusResponse = (overrides: Record<string, unknown>) =>
	server.use(
		http.get("/api/run_status/", () =>
			HttpResponse.json([
				{
					id: "status-1",
					heat_id: "heat-1",
					run_number: 1,
					phase_id: "phase-1",
					athlete_id: "athlete-1",
					locked: false,
					did_not_start: false,
					...overrides
				}
			])
		)
	)

describe("HeadJudge", () => {
	// The lock-run button is gated on this build-time flag. Scope it to this
	// file — process.env is shared across a Jest worker with no auto-reset.
	const originalShowLockRun = process.env.NEXT_PUBLIC_SHOW_LOCK_RUN
	beforeAll(() => {
		process.env.NEXT_PUBLIC_SHOW_LOCK_RUN = "true"
	})
	afterAll(() => {
		if (originalShowLockRun === undefined) {
			delete process.env.NEXT_PUBLIC_SHOW_LOCK_RUN
		} else {
			process.env.NEXT_PUBLIC_SHOW_LOCK_RUN = originalShowLockRun
		}
	})

	let store: ReturnType<typeof createTestStore>

	beforeEach(() => {
		store = createTestStore()
		socketHub.reset()
		// getHeatInfo, getHeatInfo/:id/phase, getAthleteMovesAndBonuses and
		// run_status/ are all covered by the global handlers in src/mocks.
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

	it("shows DNS once the server reports the run did not start", async () => {
		runStatusResponse({ did_not_start: true })

		render(
			<Provider store={makeStore(competitionsWithHeat)}>
				<HeadJudge />
			</Provider>
		)

		await screen.findByTestId("head-judge-page")

		await waitFor(() =>
			expect(screen.getByTestId("final-score-value")).toHaveTextContent(
				"DNS"
			)
		)
		expect(screen.getByTestId("dns-button")).toHaveTextContent("Unset DNS")
	})

	it("refuses to set DNS while the run is locked", async () => {
		runStatusResponse({ locked: true })

		render(
			<Provider store={makeStore(competitionsWithHeat)}>
				<HeadJudge />
			</Provider>
		)

		await screen.findByTestId("head-judge-page")
		await waitFor(() =>
			expect(screen.getByTestId("dns-button")).toHaveTextContent(
				"SET DNS"
			)
		)

		await waitFor(() =>
			expect(socketHub.openCount("run_status")).toBeGreaterThan(0)
		)
		await userEvent.click(screen.getByTestId("dns-button"))

		// The operator is told why, with the run still not marked DNS.
		expect(screen.getByTestId("dns-button")).toHaveTextContent("SET DNS")
		expect(toast.error).toHaveBeenCalledWith(
			"Please unlock run before setting DNS"
		)
		// The guard blocks the write entirely — no run_status was sent.
		// Checked last so any stray async emit has had maximum time to appear.
		expect(socketHub.emittedOn("run_status")).toHaveLength(0)
	})

	it("shows the mean of the judges' scores and keeps each judge's moves separate", async () => {
		server.use(
			http.get("/api/availablemoves", () =>
				HttpResponse.json([
					{
						id: "test-move-1",
						name: "Cartwheel",
						fl_score: 10,
						rb_score: 20,
						direction: "LR",
						sheet_id: "sheet-1"
					}
				])
			),
			http.get("/api/getHeatInfo/:heatId/phase", () =>
				HttpResponse.json([
					{
						id: "phase-1",
						event_id: "event-1",
						name: "Final",
						number_of_runs: 2,
						number_of_runs_for_score: 2,
						number_of_judges: 2,
						scoresheet: "sheet-1"
					}
				])
			)
		)

		const currentScores = (judge: number, direction: string) => ({
			heat_id: "heat-1",
			athlete_id: "athlete-1",
			run_number: 1,
			phase_id: "phase-1",
			judge_id: judge,
			movesAndBonuses: {
				moves: [
					{
						id: `m-j${judge}`,
						move_id: "test-move-1",
						heat_id: "heat-1",
						run_number: 1,
						phase_id: "phase-1",
						judge_id: String(judge),
						athlete_id: "athlete-1",
						direction
					}
				],
				bonuses: []
			}
		})

		render(
			<Provider store={makeStore(competitionsWithHeat)}>
				<HeadJudge />
			</Provider>
		)
		await screen.findByTestId("head-judge-page")
		await waitFor(() =>
			expect(socketHub.openCount("current_scores")).toBeGreaterThan(0)
		)

		// Judge 1 scores a front-left move worth 10; judge 2 has nothing.
		act(() =>
			socketHub.emit(
				"current_scores",
				"current_scores",
				currentScores(1, "L")
			)
		)
		await waitFor(() =>
			expect(screen.getByTestId("final-score-value")).toHaveTextContent(
				"5.00"
			)
		)

		// Judge 2 scores a right-back move worth 20 → mean of 10 and 20.
		act(() =>
			socketHub.emit(
				"current_scores",
				"current_scores",
				currentScores(2, "R")
			)
		)
		await waitFor(() =>
			expect(screen.getByTestId("final-score-value")).toHaveTextContent(
				"15.00"
			)
		)

		// Judge 1 re-scores: the new move replaces the old, it is not added on top.
		act(() =>
			socketHub.emit(
				"current_scores",
				"current_scores",
				currentScores(1, "R")
			)
		)
		await waitFor(() =>
			expect(screen.getByTestId("final-score-value")).toHaveTextContent(
				"20.00"
			)
		)
		expect(screen.getAllByText("Cartwheel")).toHaveLength(2)
	})

	it("only shows the run locked once the server confirms it, not on click", async () => {
		render(
			<Provider store={makeStore(competitionsWithHeat)}>
				<HeadJudge />
			</Provider>
		)

		await screen.findByTestId("head-judge-page")
		await waitFor(() =>
			expect(screen.getByTestId("lock-run-button")).toHaveTextContent(
				"Lock Run"
			)
		)
		await waitFor(() =>
			expect(socketHub.openCount("run_status")).toBeGreaterThan(0)
		)

		await userEvent.click(screen.getByTestId("lock-run-button"))

		// The button does not flip optimistically.
		expect(screen.getByTestId("lock-run-button")).toHaveTextContent(
			"Lock Run"
		)

		// The click sent a lock request for this run to the server.
		await waitFor(() =>
			expect(socketHub.emittedOn("run_status")).toContainEqual([
				"run_status",
				expect.objectContaining({
					locked: true,
					did_not_start: false,
					heat_id: "heat-1",
					athlete_id: "athlete-1",
					run_number: 1
				})
			])
		)

		// The server broadcasts the confirmed lock back to every subscriber.
		act(() => {
			socketHub.emit("run_status", "run_status", {
				id: "status-1",
				heat_id: "heat-1",
				run_number: 1,
				phase_id: "phase-1",
				athlete_id: "athlete-1",
				locked: true,
				did_not_start: false
			})
		})

		await waitFor(() =>
			expect(screen.getByTestId("lock-run-button")).toHaveTextContent(
				"Unlock Run"
			)
		)
	})

	it("should show loading skeleton before showing the page", async () => {
		render(
			<Provider store={makeStore(competitionsWithHeat)}>
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
		render(
			<Provider store={makeStore(competitionsWithHeat)}>
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
		render(
			<Provider store={makeStore(competitionsWithHeat)}>
				<HeadJudge />
			</Provider>
		)

		// Wait for loading to finish
		await screen.findByTestId("head-judge-page")

		// Check for main controls
		expect(screen.getByTestId("final-score")).toBeInTheDocument()
		expect(screen.getByTestId("dns-button")).toBeInTheDocument()
		expect(screen.getByTestId("lock-run-button")).toBeInTheDocument()
		expect(screen.getByTestId("heat-list-button")).toBeInTheDocument()
		expect(screen.getByTestId("heat-scores-button")).toBeInTheDocument()

		// Check initial button states
		expect(screen.getByTestId("dns-button")).toHaveTextContent("SET DNS")
		expect(screen.getByTestId("lock-run-button")).toHaveTextContent(
			"Lock Run"
		)
	})
	it("should show does not show lock and dns controls when changeRunStatus is false", async () => {
		render(
			<Provider store={makeStore(competitionsWithHeat)}>
				<HeadJudge changeRunStatus={false} />
			</Provider>
		)

		// Wait for loading to finish
		await screen.findByTestId("head-judge-page")

		// Check for main controls
		expect(screen.getByTestId("final-score")).toBeInTheDocument()
		expect(screen.queryByTestId("dns-button")).not.toBeInTheDocument()
		expect(screen.queryByTestId("lock-run-button")).not.toBeInTheDocument()
		expect(screen.getByTestId("heat-list-button")).toBeInTheDocument()
		expect(screen.getByTestId("heat-scores-button")).toBeInTheDocument()
	})
})

describe("HeadJudge position publishing", () => {
	const athleteRow = (id: string, lastName: string) => ({
		athlete_heat_id: `ah-${id}`,
		heat_id: "heat-1",
		athlete_id: id,
		phase_id: "phase-1",
		number_of_runs: 3,
		number_of_runs_for_score: 2,
		scoresheet: "sheet-1",
		first_name: "Test",
		last_name: lastName,
		affiliation: "GBR",
		bib: "1",
		event_name: "Test Event"
	})

	const positionsSent = () =>
		socketHub
			.emittedOn("head_judge_selection")
			.filter(([event]) => event === "head_judge_selection")
			.map(([, position]) => position)

	beforeEach(() => {
		socketHub.reset()
		server.use(
			http.get("/api/getHeatInfo/:heatId", () =>
				HttpResponse.json([
					athleteRow("athlete-1", "Smith"),
					athleteRow("athlete-2", "Jones")
				])
			)
		)
	})

	const mountHeadJudge = (changeRunStatus = true) => {
		const store = makeStore(competitionsWithHeat)
		render(
			<Provider store={store}>
				<HeadJudge changeRunStatus={changeRunStatus} />
			</Provider>
		)

		return store
	}

	it("publishes the next paddler when the head judge steps forward", async () => {
		mountHeadJudge()
		await waitFor(() =>
			expect(positionsSent()).toContainEqual(
				expect.objectContaining({
					competitionId: "comp-1",
					heatId: "heat-1",
					runNumber: 1,
					athlete: expect.objectContaining({ id: "athlete-1" })
				})
			)
		)

		await userEvent.click(screen.getByTestId("button-next-paddler"))

		await waitFor(() =>
			expect(positionsSent().at(-1)).toEqual(
				expect.objectContaining({
					athlete: expect.objectContaining({
						id: "athlete-2",
						last_name: "Jones"
					})
				})
			)
		)
	})

	it("publishes the new run, but nothing for a phase-only change", async () => {
		const store = mountHeadJudge()
		await waitFor(() => expect(positionsSent().length).toBeGreaterThan(0))

		act(() => {
			store.dispatch(updateRun(2))
		})
		await waitFor(() =>
			expect(positionsSent().at(-1)).toEqual(
				expect.objectContaining({ runNumber: 2 })
			)
		)

		const sentBeforePhaseChange = positionsSent().length
		act(() => {
			store.dispatch(updateSelectedPhase("phase-2"))
		})
		// Give a stray emit time to appear before asserting there was none.
		await act(() => new Promise((resolve) => setTimeout(resolve, 50)))
		expect(positionsSent()).toHaveLength(sentBeforePhaseChange)
	})

	it("re-sends its position when a display asks for it", async () => {
		mountHeadJudge()
		await waitFor(() =>
			expect(socketHub.openCount("head_judge_selection")).toBeGreaterThan(
				0
			)
		)
		await waitFor(() => expect(positionsSent().length).toBeGreaterThan(0))
		const sentBeforeRequest = positionsSent().length

		act(() => {
			socketHub.emit(
				"head_judge_selection",
				"request_head_judge_selection"
			)
		})

		await waitFor(() =>
			expect(positionsSent().length).toBeGreaterThan(sentBeforeRequest)
		)
		expect(positionsSent().at(-1)).toEqual(
			expect.objectContaining({
				athlete: expect.objectContaining({ id: "athlete-1" })
			})
		)
	})

	it("publishes nothing from the read-only commentator view", async () => {
		mountHeadJudge(false)
		await screen.findByTestId("head-judge-page")
		await screen.findByText("SMITH")

		expect(socketHub.openCount("head_judge_selection")).toBe(0)
	})
})
