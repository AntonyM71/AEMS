import { configureStore } from "@reduxjs/toolkit"
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { competitionsReducer } from "../../../../redux/atoms/competitions"
import { scoringReducer } from "../../../../redux/atoms/scoring"
import { aemsApi } from "../../../../redux/services/aemsApi"
import Scribe from "../ScribePage"

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

describe("ScribePage", () => {
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
		jest.clearAllMocks()
	})

	afterEach(() => {
		jest.resetAllMocks()
	})

	it("renders nothing when no heat is selected", () => {
		render(
			<Provider store={store}>
				<Scribe scribeNumber="1" />
			</Provider>
		)

		expect(document.body).toHaveTextContent("")
	})

	it("renders Float component when heat is selected", () => {
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
				selectedHeat: "heat-1"
			}
		})

		render(
			<Provider store={store}>
				<Scribe scribeNumber="1" />
			</Provider>
		)

		// Verify Grid container is rendered with correct class
		expect(screen.getByTestId("scribe-grid")).toBeInTheDocument()
	})

	it("updates userRole in store with correct scribe number", () => {
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
				selectedHeat: "heat-1"
			}
		})

		render(
			<Provider store={store}>
				<Scribe scribeNumber="2" />
			</Provider>
		)

		expect(store.getState().score.userRole).toBe("Scribe 2")
	})
})
