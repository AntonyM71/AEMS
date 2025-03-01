import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { toast } from "react-hot-toast"
import { AddNewMove } from "../AddMove"
import { MoveData } from "../EditMove"

// Mock EditMove component
jest.mock("../EditMove", () => ({
	EditMove: ({
		moveData,
		setMoveData
	}: {
		moveData: MoveData
		setMoveData: (m: MoveData) => void
	}) => (
		<div data-testid="edit-move">
			<button
				onClick={() => setMoveData({ ...moveData, name: "Test Move" })}
			>
				Set Name
			</button>
		</div>
	),
	checkMoveisValid: (move: MoveData) => !!move.name
}))

describe("AddNewMove", () => {
	const mockBonuses = ["Air", "Clean"]
	const mockAddMove = jest.fn<void, [MoveData]>()

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it("renders EditMove component and Add button", () => {
		render(<AddNewMove bonuses={mockBonuses} addMove={mockAddMove} />)

		expect(screen.getByTestId("edit-move")).toBeInTheDocument()
		expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument()
	})

	it("adds move when valid and resets form", async () => {
		render(<AddNewMove bonuses={mockBonuses} addMove={mockAddMove} />)

		// First set a name to make the move valid
		await userEvent.click(screen.getByRole("button", { name: "Set Name" }))

		// Then click add
		await userEvent.click(screen.getByRole("button", { name: "Add" }))

		expect(mockAddMove).toHaveBeenCalledTimes(1)
		const addedMove = mockAddMove.mock.calls[0]?.[0]
		expect(addedMove.name).toBe("Test Move")
		expect(addedMove.bonuses).toHaveLength(mockBonuses.length)
		expect(addedMove.bonuses[0]?.name).toBe(mockBonuses[0])
		expect(addedMove.bonuses[1]?.name).toBe(mockBonuses[1])
	})

	it("shows error when trying to add invalid move", async () => {
		render(<AddNewMove bonuses={mockBonuses} addMove={mockAddMove} />)

		// Click add without setting a name
		await userEvent.click(screen.getByRole("button", { name: "Add" }))

		expect(toast.error).toHaveBeenCalledWith(
			"Please ensure you have a valid move before submitting"
		)
		expect(mockAddMove).not.toHaveBeenCalled()
	})

	it("updates bonuses when prop changes", async () => {
		const { rerender } = render(
			<AddNewMove bonuses={mockBonuses} addMove={mockAddMove} />
		)

		// Add a new bonus
		const newBonuses = [...mockBonuses, "Super"]
		rerender(<AddNewMove bonuses={newBonuses} addMove={mockAddMove} />)

		// Set name and add move to check bonus structure
		await userEvent.click(screen.getByRole("button", { name: "Set Name" }))
		await userEvent.click(screen.getByRole("button", { name: "Add" }))

		const addedMove = mockAddMove.mock.calls[0]?.[0]
		expect(addedMove.bonuses).toHaveLength(newBonuses.length)
		expect(addedMove.bonuses[2]?.name).toBe("Super")
	})
})
