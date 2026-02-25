import { configureStore } from "@reduxjs/toolkit"
import { fireEvent, render, screen } from "@testing-library/react"
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
			http.get("/api/availablebonuses", () =>
				HttpResponse.json([])
			)
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
})
