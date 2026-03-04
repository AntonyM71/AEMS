import { fireEvent, screen, waitFor } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import toast from "react-hot-toast"
import { server } from "../../../../../mocks/server"
import { renderWithProviders } from "../../../../../testUtils"
import {
	directionType,
	scoredBonusType,
	scoredMovesType
} from "../../Interfaces"
import ScoredMove from "../ScoredMove"

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
			http.get("/api/availablemoves", () =>
				HttpResponse.json(mockMoveResponse)
			)
		)
	})

	it("renders move details correctly", async () => {
		renderWithProviders(
			<ScoredMove
				scoredMove={mockScoredMove}
				scoredMovesList={mockScoredMovesList}
				scoredBonuses={mockScoredBonuses}
			/>
		)

		expect(await screen.findByText("Test Move")).toBeInTheDocument()
		expect(screen.getByText("L")).toBeInTheDocument()
		expect(
			screen.getByTestId("scored-remove-scored-move-1")
		).toBeInTheDocument()
	})

	it("shows toast when remove move is clicked", async () => {
		renderWithProviders(
			<ScoredMove
				scoredMove={mockScoredMove}
				scoredMovesList={mockScoredMovesList}
				scoredBonuses={mockScoredBonuses}
			/>
		)

		const removeButton = await screen.findByTestId(
			"scored-remove-scored-move-1"
		)
		fireEvent.click(removeButton)
		// error message appears
		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith("Double Click to delete")
		})
		// item not removed
		expect(await screen.findByText("Test Move")).toBeInTheDocument()
		expect(screen.getByText("L")).toBeInTheDocument()
		expect(
			screen.getByTestId("scored-remove-scored-move-1")
		).toBeInTheDocument()
	})
	it("removes scored move when delete icon is double clicked", async () => {
		const { store } = renderWithProviders(
			<ScoredMove
				scoredMove={mockScoredMove}
				scoredMovesList={mockScoredMovesList}
				scoredBonuses={mockScoredBonuses}
			/>,
			{
				preloadedState: {
					score: {
						scoredMoves: [mockScoredMove],
						scoredBonuses: mockScoredBonuses,
						userRole: "Judge 1",
						selectedPaddler: 1,
						selectedRun: 1,
						currentMove: mockScoredMove.id
					}
				}
			}
		)

		const removeButton = await screen.findByTestId(
			"scored-remove-scored-move-1"
		)
		fireEvent.doubleClick(removeButton)
		// error message appears
		expect(toast.error).not.toHaveBeenCalled()
		// item not removed

		expect(store.getState().score.scoredMoves).toHaveLength(0)
		expect(store.getState().score.scoredBonuses).toHaveLength(0)
	})
	it("does not show remove button when actions are disabled", async () => {
		renderWithProviders(
			<ScoredMove
				scoredMove={mockScoredMove}
				scoredMovesList={mockScoredMovesList}
				scoredBonuses={mockScoredBonuses}
				chipActionsDisabled={true}
			/>
		)

		await screen.findByText("Test Move")
		expect(
			screen.queryByTestId("scored-remove-scored-move-1")
		).not.toBeInTheDocument()
	})
})
