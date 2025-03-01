import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { FC, useState } from "react"
import { EditDeleteMove } from "../EditDeleteMove"
import { MoveData } from "../EditMove"

const initialMoveData: MoveData = {
	id: "test-id",
	name: "Test Move",
	rbScore: 5,
	flScore: 3,
	bonuses: [
		{ name: "Air", id: "air-1", score: 2 },
		{ name: "Link", id: "link-1", score: 1 }
	],
	direction: "LR" as const
}

// Test wrapper component that manages state
const TestWrapper: FC<{
	onDelete?: (m: MoveData) => void
	onUpdate?: (m: MoveData) => void
}> = ({ onDelete, onUpdate }) => {
	const [moveData, setMoveData] = useState<MoveData>(initialMoveData)

	const handleDelete = (m: MoveData) => {
		onDelete?.(m)
	}

	const handleUpdate = (m: MoveData) => {
		setMoveData(m)
		onUpdate?.(m)
	}

	return (
		<EditDeleteMove
			moveData={moveData}
			deleteMove={handleDelete}
			updateMove={handleUpdate}
		/>
	)
}

describe("EditDeleteMove", () => {
	it("should call deleteMove when delete button is clicked", async () => {
		const mockDelete = jest.fn()
		const user = userEvent.setup()

		render(<TestWrapper onDelete={mockDelete} />)

		const deleteButton = screen.getByTestId("delete-button")
		await user.click(deleteButton)

		expect(mockDelete).toHaveBeenCalledWith(initialMoveData)
	})

	it("should update move name correctly", async () => {
		const mockUpdate = jest.fn()
		const user = userEvent.setup()

		render(<TestWrapper onUpdate={mockUpdate} />)

		const nameInput = screen.getByLabelText("Name")
		await user.clear(nameInput)
		await user.type(nameInput, "New Name")

		// The last call should have the updated name
		expect(mockUpdate).toHaveBeenLastCalledWith(
			expect.objectContaining({
				...initialMoveData,
				name: "New Name"
			})
		)
	})
})
