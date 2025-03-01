import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { EditMove, MoveData, checkMoveisValid } from "../EditMove"

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

	it("handles Single direction changes correctly", async () => {
		const user = userEvent.setup()
		render(<TestWrapper />)

		// Find and click the direction select
		const select = screen.getByRole("combobox")
		await user.click(select)

		// Select "Single" option
		const singleOption = screen.getByRole("option", { name: "Single" })
		await user.click(singleOption)

		// Verify B/R field is disabled and set to 0
		const brInput = screen.getByLabelText("B/R")
		expect(brInput).toBeDisabled()
		expect(brInput).toHaveValue("0")

		// Change back to L/R
		await user.click(select)
		const lrOption = screen.getByRole("option", { name: "L/R" })
		await user.click(lrOption)

		// Verify B/R field is enabled again
		expect(brInput).toBeEnabled()
	})

	it("handles F/B direction changes correctly", async () => {
		const user = userEvent.setup()
		render(<TestWrapper />)

		// Find and click the direction select
		const select = screen.getByRole("combobox")
		await user.click(select)

		// Select "F/B" option
		const fbOption = screen.getByRole("option", { name: "F/B" })
		await user.click(fbOption)

		// Verify B/R field is still enabled and can be updated
		const brInput = screen.getByLabelText("B/R")
		expect(brInput).toBeEnabled()
		await user.clear(brInput)
		await user.type(brInput, "9")
		expect(brInput).toHaveValue("9")

		// Verify F/L field can be updated in F/B mode
		const flInput = screen.getByLabelText("F/L")
		await user.clear(flInput)
		await user.type(flInput, "6")
		expect(flInput).toHaveValue("6")
	})

	it("updates score fields correctly", async () => {
		const user = userEvent.setup()
		render(<TestWrapper />)

		// Test F/L score update
		const flInput = screen.getByLabelText("F/L")
		await user.clear(flInput)
		await user.type(flInput, "7")
		expect(flInput).toHaveValue("7")

		// Test B/R score update
		const brInput = screen.getByLabelText("B/R")
		await user.clear(brInput)
		await user.type(brInput, "8")
		expect(brInput).toHaveValue("8")

		// Test error state when score is empty
		await user.clear(flInput)
		expect(screen.getByLabelText("F/L")).toHaveValue("")
	})

	it("updates bonus scores correctly", async () => {
		const user = userEvent.setup()
		render(<TestWrapper />)

		// Test Air bonus update
		const airInput = screen.getByLabelText("Air")
		await user.clear(airInput)
		await user.type(airInput, "5")
		expect(airInput).toHaveValue("5")

		// Test Clean bonus update
		const cleanInput = screen.getByLabelText("Clean")
		await user.clear(cleanInput)
		await user.type(cleanInput, "3")
		expect(cleanInput).toHaveValue("3")

		// Test error state when bonus score is empty
		await user.clear(airInput)
		expect(airInput).toHaveValue("")
	})

	it("validates move data correctly", () => {
		const validMove: MoveData = {
			id: "1",
			name: "Test Move",
			rbScore: 5,
			flScore: 3,
			bonuses: [{ name: "Air", id: "1", score: 2 }],
			direction: "LR"
		}

		const invalidMove: MoveData = {
			id: "1",
			name: "", // Empty name makes it invalid
			rbScore: 5,
			flScore: 3,
			bonuses: [{ name: "Air", id: "1", score: 2 }],
			direction: "LR"
		}

		expect(checkMoveisValid(validMove)).toBe(true)
		expect(checkMoveisValid(invalidMove)).toBe(false)
	})

	it("shows error states for invalid inputs", async () => {
		const user = userEvent.setup()
		render(<TestWrapper />)

		// Test empty name error
		const nameInput = screen.getByLabelText("Name")
		await user.clear(nameInput)

		expect(nameInput).toHaveAttribute("aria-invalid", "true")

		// Test empty F/L score error
		const flInput = screen.getByLabelText("F/L")
		await user.clear(flInput)
		expect(flInput).toHaveAttribute("aria-invalid", "true")

		// Test empty bonus score error
		const airInput = screen.getByLabelText("Air")
		await user.clear(airInput)
		expect(airInput).toHaveAttribute("aria-invalid", "true")

		// Test that B/R is disabled when direction is Single
		const select = screen.getByRole("combobox")
		await user.click(select)
		const singleOption = screen.getByRole("option", { name: "Single" })
		await user.click(singleOption)
		const brInput = screen.getByLabelText("B/R")
		expect(brInput).toBeDisabled()
		expect(brInput).toHaveValue("0")
	})
})
