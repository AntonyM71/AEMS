import { setupListeners } from "@reduxjs/toolkit/query"
import { configureStore } from "@reduxjs/toolkit"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { Provider } from "react-redux"
import { server } from "../../../../mocks/server"
import { competitionsReducer } from "../../../../redux/atoms/competitions"
import { scoringReducer } from "../../../../redux/atoms/scoring"
import { aemsApi } from "../../../../redux/services/aemsApi"
import { InfoBar } from "../InfoBar"

const createTestStore = (preloadedState = {}) =>
	configureStore({
		reducer: {
			[aemsApi.reducerPath]: aemsApi.reducer,
			competitions: competitionsReducer,
			score: scoringReducer
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(aemsApi.middleware),
		preloadedState
	})

describe("InfoBar", () => {
	let store: ReturnType<typeof createTestStore>

	beforeEach(() => {
		store = createTestStore({
			score: {
				selectedPaddler: 0,
				selectedRun: 0,
				scoredMoves: [],
				scoredBonuses: [],
				currentMove: "",
				userRole: ""
			},
			competitions: {
				selectedHeat: null
			}
		})

		// Mock the bonuses API endpoint
		server.use(
			http.get("/api/availablebonuses", () => HttpResponse.json([]))
		)
	})

	it("renders basic info with minimal props", () => {
		const mockPaddlerInfo = {
			id: "1",
			first_name: "John",
			last_name: "Doe",
			bib: "123",
			scoresheet: "sheet1"
		}

		render(
			<Provider store={store}>
				<InfoBar
					paddlerInfo={mockPaddlerInfo}
					availableMoves={[]}
					isFetchingScoredMoves={false}
				/>
			</Provider>
		)

		// Check if basic paddler info is displayed
		expect(screen.getByText("John")).toBeInTheDocument()
		expect(screen.getByText("DOE")).toBeInTheDocument()
		expect(screen.getByText("123")).toBeInTheDocument()
	})

	it("shows loading skeleton when isFetchingScoredMoves is true", () => {
		const mockPaddlerInfo = {
			id: "1",
			first_name: "John",
			last_name: "Doe",
			bib: "123",
			scoresheet: "sheet1"
		}

		render(
			<Provider store={store}>
				<InfoBar
					paddlerInfo={mockPaddlerInfo}
					availableMoves={[]}
					isFetchingScoredMoves={true}
				/>
			</Provider>
		)

		expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument()
	})

	it("opens and closes Heat Scores modal", () => {
		const mockPaddlerInfo = {
			id: "1",
			first_name: "John",
			last_name: "Doe",
			bib: "123",
			scoresheet: "sheet1"
		}

		render(
			<Provider store={store}>
				<InfoBar
					paddlerInfo={mockPaddlerInfo}
					availableMoves={[]}
					isFetchingScoredMoves={false}
				/>
			</Provider>
		)

		// Open modal
		const heatScoresButton = screen.getByText("Heat Scores")
		fireEvent.click(heatScoresButton)

		// Check if modal is open
		expect(screen.getByRole("presentation")).toBeInTheDocument()

		// Close modal by clicking escape key
		fireEvent.keyDown(screen.getByRole("presentation"), {
			key: "Escape",
			code: "Escape"
		})

		// Wait for modal to close
		expect(screen.queryByRole("presentation")).not.toBeInTheDocument()
	})

	it("displays current score", () => {
		const mockPaddlerInfo = {
			id: "1",
			first_name: "John",
			last_name: "Doe",
			bib: "123",
			scoresheet: "sheet1"
		}

		render(
			<Provider store={store}>
				<InfoBar
					paddlerInfo={mockPaddlerInfo}
					availableMoves={[]}
					isFetchingScoredMoves={false}
				/>
			</Provider>
		)

		expect(screen.getByText("Score:")).toBeInTheDocument()
		expect(screen.getByText("0")).toBeInTheDocument() // Initial score should be 0
	})

	it("shows a scored move's name and bonus chip from the scoresheet, with no flash of Unknown", async () => {
		server.use(
			http.get("/api/availablebonuses", () =>
				HttpResponse.json([
					{
						id: "bonus-1",
						sheet_id: "sheet1",
						move_id: "move-1",
						name: "Huge",
						score: 50
					}
				])
			)
		)

		store = createTestStore({
			score: {
				selectedPaddler: 0,
				selectedRun: 0,
				scoredMoves: [
					{ id: "scored-1", moveId: "move-1", direction: "L" }
				],
				scoredBonuses: [],
				currentMove: "",
				userRole: ""
			},
			competitions: {
				selectedHeat: null
			}
		})

		const mockPaddlerInfo = {
			id: "1",
			first_name: "John",
			last_name: "Doe",
			bib: "123",
			scoresheet: "sheet1"
		}

		render(
			<Provider store={store}>
				<InfoBar
					paddlerInfo={mockPaddlerInfo}
					availableMoves={[
						{
							id: "move-1",
							name: "Cartwheel",
							direction: "LR",
							fl_score: 10,
							rb_score: 20
						}
					]}
					isFetchingScoredMoves={false}
				/>
			</Provider>
		)

		// Bonuses haven't resolved yet: no misleading "Unknown".
		expect(screen.queryByText("Unknown")).not.toBeInTheDocument()

		expect(await screen.findByText("Cartwheel")).toBeInTheDocument()
		expect(
			screen.getByTestId("scored-remove-scored-1-bonus-1")
		).toBeInTheDocument()
	})

	it("shows a placeholder, not Unknown, while the scoresheet's moves are still loading", async () => {
		server.use(
			http.get("/api/availablebonuses", () => HttpResponse.json([]))
		)

		store = createTestStore({
			score: {
				selectedPaddler: 0,
				selectedRun: 0,
				scoredMoves: [
					{ id: "scored-1", moveId: "move-1", direction: "L" }
				],
				scoredBonuses: [],
				currentMove: "",
				userRole: ""
			},
			competitions: {
				selectedHeat: null
			}
		})

		render(
			<Provider store={store}>
				<InfoBar
					paddlerInfo={{
						id: "1",
						first_name: "John",
						last_name: "Doe",
						bib: "123",
						scoresheet: "sheet1"
					}}
					availableMoves={undefined}
					isFetchingScoredMoves={false}
				/>
			</Provider>
		)

		await waitFor(() =>
			expect(
				Object.values(store.getState().aemsApi.queries).map(
					(q) => q?.status
				)
			).toContain("fulfilled")
		)
		expect(screen.queryByText("Unknown")).not.toBeInTheDocument()
		expect(screen.queryByTestId("scored-move-list")).not.toBeInTheDocument()
	})

	it("recovers the scoresheet's bonuses after a reconnect, without a page refresh", async () => {
		let bonusRequests = 0
		server.use(
			http.get("/api/availablebonuses", () => {
				bonusRequests += 1
				if (bonusRequests === 1) {
					return HttpResponse.error()
				}

				return HttpResponse.json([
					{
						id: "bonus-1",
						sheet_id: "sheet1",
						move_id: "move-1",
						name: "Huge",
						score: 50
					}
				])
			})
		)

		store = createTestStore({
			score: {
				selectedPaddler: 0,
				selectedRun: 0,
				scoredMoves: [
					{ id: "scored-1", moveId: "move-1", direction: "L" }
				],
				scoredBonuses: [],
				currentMove: "",
				userRole: ""
			},
			competitions: {
				selectedHeat: null
			}
		})
		const unsubscribe = setupListeners(store.dispatch)

		const mockPaddlerInfo = {
			id: "1",
			first_name: "John",
			last_name: "Doe",
			bib: "123",
			scoresheet: "sheet1"
		}

		render(
			<Provider store={store}>
				<InfoBar
					paddlerInfo={mockPaddlerInfo}
					availableMoves={[
						{
							id: "move-1",
							name: "Cartwheel",
							direction: "LR",
							fl_score: 10,
							rb_score: 20
						}
					]}
					isFetchingScoredMoves={false}
				/>
			</Provider>
		)

		await waitFor(() => expect(bonusRequests).toBeGreaterThan(0))
		expect(
			screen.queryByTestId("scored-remove-scored-1-bonus-1")
		).not.toBeInTheDocument()

		act(() => {
			window.dispatchEvent(new Event("online"))
		})

		expect(
			await screen.findByTestId("scored-remove-scored-1-bonus-1")
		).toBeInTheDocument()

		unsubscribe()
	})
})
