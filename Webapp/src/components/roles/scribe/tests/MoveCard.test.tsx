import { configureStore } from "@reduxjs/toolkit"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider } from "react-redux"
import { server } from "../../../../mocks/server"
import { scoringReducer } from "../../../../redux/atoms/scoring"
import { aemsApi } from "../../../../redux/services/aemsApi"
import { AvailableMoveDirections } from "../Interfaces"
import { MoveCard } from "../MoveCard"

// Need to ensure MSW intercepts requests
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const testMoves = [
	{
		id: "1",
		name: "Single Test",
		direction: "S" as AvailableMoveDirections,
		fl_score: 10,
		rb_score: 10
	},
	{
		id: "2",
		name: "LR Test",
		direction: "LR" as AvailableMoveDirections,
		fl_score: 15,
		rb_score: 15
	},
	{
		id: "3",
		name: "FB Test",
		direction: "FB" as AvailableMoveDirections,
		fl_score: 20,
		rb_score: 20
	}
]

const createTestStore = () => {
	const store = configureStore({
		reducer: {
			score: scoringReducer,
			[aemsApi.reducerPath]: aemsApi.reducer
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(aemsApi.middleware),
		preloadedState: {
			score: {
				selectedPaddler: 0,
				selectedRun: 0,
				scoredMoves: [],
				scoredBonuses: [],
				currentMove: "",
				userRole: ""
			}
		}
	})

	return store
}

describe("MoveCard", () => {
	let user: ReturnType<typeof userEvent.setup>

	beforeEach(() => {
		jest.clearAllMocks()
		user = userEvent.setup()
	})

	afterEach(() => {
		jest.resetModules()
	})

	it("renders single direction move correctly", () => {
		const store = createTestStore()
		const singleMove = testMoves[0] // Using the Single Test move

		render(
			<Provider store={store}>
				<MoveCard move={singleMove} isRunLocked={false} />
			</Provider>
		)

		expect(screen.getByText("Single Test")).toBeInTheDocument()
		expect(screen.getByText("Single")).toBeInTheDocument()
		expect(screen.getByRole("button")).toBeEnabled()
	})

	it("renders left/right direction move correctly", async () => {
		const store = createTestStore()
		const lrMove = testMoves[1] // Using the LR Test move

		render(
			<Provider store={store}>
				<MoveCard move={lrMove} isRunLocked={false} />
			</Provider>
		)

		expect(screen.getByText("LR Test")).toBeInTheDocument()
		const leftButton = screen.getByText("L")
		const rightButton = screen.getByText("R")

		expect(leftButton).toBeEnabled()
		expect(rightButton).toBeEnabled()

		// Test button clicks and wait for state updates
		await user.click(leftButton)

		// Use async assertions to wait for state updates
		await expect(async () => {
			const state = store.getState()
			expect(state.score.scoredMoves).toHaveLength(1)
			expect(state.score.scoredMoves[0].direction).toBe("L")
			expect(state.score.scoredMoves[0].moveId).toBe(lrMove.id)
		}).not.toThrow()
	})

	it("renders front/back direction move correctly", async () => {
		const store = createTestStore()
		const fbMove = testMoves[2] // Using the FB Test move

		render(
			<Provider store={store}>
				<MoveCard move={fbMove} isRunLocked={false} />
			</Provider>
		)

		expect(screen.getByText("FB Test")).toBeInTheDocument()
		const frontButton = screen.getByText("F")
		const backButton = screen.getByText("B")

		expect(frontButton).toBeEnabled()
		expect(backButton).toBeEnabled()

		// Test front button click and wait for state updates
		await user.click(frontButton)

		await expect(async () => {
			const state = store.getState()
			expect(state.score.scoredMoves).toHaveLength(1)
			expect(state.score.scoredMoves[0].direction).toBe("F")
			expect(state.score.scoredMoves[0].moveId).toBe(fbMove.id)
		}).not.toThrow()

		// Test back button click and wait for state updates
		await user.click(backButton)

		await expect(async () => {
			const state = store.getState()
			expect(state.score.scoredMoves).toHaveLength(2)
			expect(state.score.scoredMoves[1].direction).toBe("B")
			expect(state.score.scoredMoves[1].moveId).toBe(fbMove.id)
		}).not.toThrow()
	})

	it("disables buttons when isRunLocked is true", () => {
		const store = createTestStore()

		// Test with all move types
		const moves = [
			testMoves[0], // Single
			testMoves[1], // LR
			testMoves[2] // FB
		]

		const { unmount } = render(
			<Provider store={store}>
				<MoveCard move={moves[0]} isRunLocked={true} />
			</Provider>
		)

		// Get all buttons and verify they're disabled
		let buttons = screen.getAllByRole("button")
		buttons.forEach((button) => {
			expect(button).toBeDisabled()
		})
		unmount()

		// Test LR move
		const { unmount: unmountLR } = render(
			<Provider store={store}>
				<MoveCard move={moves[1]} isRunLocked={true} />
			</Provider>
		)
		buttons = screen.getAllByRole("button")
		buttons.forEach((button) => {
			expect(button).toBeDisabled()
		})
		unmountLR()

		// Test FB move
		render(
			<Provider store={store}>
				<MoveCard move={moves[2]} isRunLocked={true} />
			</Provider>
		)
		buttons = screen.getAllByRole("button")
		buttons.forEach((button) => {
			expect(button).toBeDisabled()
		})

		// Verify no moves were added to the store
		const state = store.getState()
		expect(state.score.scoredMoves).toHaveLength(0)
	})
})
