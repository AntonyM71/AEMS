import { configureStore } from "@reduxjs/toolkit"
import { fireEvent, render, screen } from "@testing-library/react"
import { rest } from "msw"
import { Provider } from "react-redux"
import { server } from "../../../../../mocks/server"
import { scoringReducer } from "../../../../../redux/atoms/scoring"
import { aemsApi } from "../../../../../redux/services/aemsApi"
import {
	directionType,
	scoredBonusType,
	scoredMovesType
} from "../../Interfaces"
import ScoredMove from "../ScoredMove"

const mockStore = configureStore({
	reducer: {
		[aemsApi.reducerPath]: aemsApi.reducer,
		scoring: scoringReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(aemsApi.middleware)
})

const mockScoredMove: scoredMovesType = {
	id: "scored-move-1",
	moveId: "test-move-1",
	direction: "L" as directionType
}

const mockScoredMovesList: scoredMovesType[] = [mockScoredMove]

const mockScoredBonuses: scoredBonusType[] = [
	{
		id: "bonus-1",
		moveId: "scored-move-1",
		bonusId: "available-bonus-1"
	}
]

describe("ScoredMove", () => {
	const mockMoveResponse = [
		{
			id: "test-move-1",
			name: "Test Move",
			fl_score: 10,
			rb_score: 20,
			direction: "LR",
			sheet_id: "test-id"
		}
	]

	beforeEach(() => {
		// Default handler returns the move
		server.use(
			rest.get("/api/availablemoves", (req, res, ctx) =>
				res(ctx.json(mockMoveResponse))
			)
		)
	})

	it("renders move details correctly", async () => {
		render(
			<Provider store={mockStore}>
				<ScoredMove
					scoredMove={mockScoredMove}
					scoredMovesList={mockScoredMovesList}
					scoredBonuses={mockScoredBonuses}
				/>
			</Provider>
		)

		expect(await screen.findByText("Test Move")).toBeInTheDocument()
		expect(screen.getByText("L")).toBeInTheDocument()
		expect(
			screen.getByTestId("scored-remove-scored-move-1")
		).toBeInTheDocument()
	})

	it("handles remove move click", async () => {
		render(
			<Provider store={mockStore}>
				<ScoredMove
					scoredMove={mockScoredMove}
					scoredMovesList={mockScoredMovesList}
					scoredBonuses={mockScoredBonuses}
				/>
			</Provider>
		)

		const removeButton = await screen.findByTestId(
			"scored-remove-scored-move-1"
		)
		fireEvent.click(removeButton)
	})

	it("does not show remove button when actions are disabled", async () => {
		render(
			<Provider store={mockStore}>
				<ScoredMove
					scoredMove={mockScoredMove}
					scoredMovesList={mockScoredMovesList}
					scoredBonuses={mockScoredBonuses}
					chipActionsDisabled={true}
				/>
			</Provider>
		)

		await screen.findByText("Test Move")
		expect(
			screen.queryByTestId("scored-remove-scored-move-1")
		).not.toBeInTheDocument()
	})

	it("handles click events correctly", async () => {
		render(
			<Provider store={mockStore}>
				<ScoredMove
					scoredMove={mockScoredMove}
					scoredMovesList={mockScoredMovesList}
					scoredBonuses={mockScoredBonuses}
				/>
			</Provider>
		)

		const removeButton = await screen.findByTestId(
			"scored-remove-scored-move-1"
		)
		expect(removeButton).toBeInTheDocument()
		fireEvent.click(removeButton)
	})
})
