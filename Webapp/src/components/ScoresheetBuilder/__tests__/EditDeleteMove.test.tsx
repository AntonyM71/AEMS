import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { FC, useState } from "react"
import toast from "react-hot-toast"
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
	highlighted?: boolean
}> = ({ onDelete, onUpdate, highlighted }) => {
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
			moveUp={jest.fn()}
			moveDown={jest.fn()}
			canMoveUp={true}
			canMoveDown={true}
			highlighted={highlighted}
		/>
	)
}

describe("EditDeleteMove", () => {
	it("should call deleteMove when delete button is double clicked", async () => {
		const mockDelete = jest.fn()
		const user = userEvent.setup()

		render(<TestWrapper onDelete={mockDelete} />)

		const deleteButton = screen.getByTestId("delete-button")
		await user.dblClick(deleteButton)

		expect(mockDelete).toHaveBeenCalledWith(initialMoveData)
	})

	it("should not call deleteMove on a single click, and should hint at double click", async () => {
		const mockDelete = jest.fn()
		const user = userEvent.setup()

		render(<TestWrapper onDelete={mockDelete} />)

		const deleteButton = screen.getByTestId("delete-button")
		await user.click(deleteButton)

		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith("Double Click to delete")
		})
		expect(mockDelete).not.toHaveBeenCalled()
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

	it("reflects the highlighted prop on the move row", () => {
		const { rerender } = render(<TestWrapper highlighted={false} />)

		expect(screen.getByTestId("move-row-test-id")).toHaveAttribute(
			"data-highlighted",
			"false"
		)

		rerender(<TestWrapper highlighted={true} />)

		expect(screen.getByTestId("move-row-test-id")).toHaveAttribute(
			"data-highlighted",
			"true"
		)
	})
})
