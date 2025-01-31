import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { EditMove, MoveData } from "../EditMove"

const TestWrapper = () => {
	const [moveData, setMoveData] = useState<MoveData>({
		id: "1",
		name: "Test Move",
		rbScore: 5,
		flScore: 3,
		bonuses: [
			{ name: "Air", id: "1", score: 2 },
			{ name: "Clean", id: "2", score: 1 }
		],
		direction: "LR"
	})

	return <EditMove moveData={moveData} setMoveData={setMoveData} />
}

describe("EditMove", () => {
	it("renders all fields with initial values", () => {
		render(<TestWrapper />)

		// Text fields
		expect(screen.getByLabelText("Name")).toHaveValue("Test Move")
		expect(screen.getByLabelText("F/L")).toHaveValue("3")
		expect(screen.getByLabelText("B/R")).toHaveValue("5")
		expect(screen.getByLabelText("Air")).toHaveValue("2")
		expect(screen.getByLabelText("Clean")).toHaveValue("1")

		// Select field (Material-UI select needs different query)
		const select = screen.getByRole("combobox")
		expect(select).toHaveTextContent("L/R")
	})

	it("updates name when changed", async () => {
		const user = userEvent.setup()
		render(<TestWrapper />)

		const nameInput = screen.getByLabelText("Name")
		await user.clear(nameInput)
		await user.type(nameInput, "New Move Name")

		// Verify the input value changed
		expect(nameInput).toHaveValue("New Move Name")
	})
})
