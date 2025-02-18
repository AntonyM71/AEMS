import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { toast } from "react-hot-toast"
import { ScoresheetBuilderHeader } from "../Header"

describe("ScoresheetBuilderHeader", () => {
	const mockBonuses = ["Air", "Clean"]
	const mockSetBonuses = jest.fn()
	const mockDeleteBonus = jest.fn()

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it("renders header with bonus columns", () => {
		render(
			<ScoresheetBuilderHeader
				bonuses={mockBonuses}
				setBonuses={mockSetBonuses}
				deleteBonus={mockDeleteBonus}
			/>
		)

		// Check standard columns
		expect(screen.getByText("Name")).toBeInTheDocument()
		expect(screen.getByText("Direction")).toBeInTheDocument()
		expect(screen.getByText("F/R Score")).toBeInTheDocument()
		expect(screen.getByText("L/B Score")).toBeInTheDocument()

		// Check bonus columns
		mockBonuses.forEach((bonus) => {
			expect(screen.getByText(bonus)).toBeInTheDocument()
		})

		// Check add bonus input
		expect(screen.getByLabelText("Add New Bonus")).toBeInTheDocument()
	})

	it("can add a new bonus", async () => {
		render(
			<ScoresheetBuilderHeader
				bonuses={mockBonuses}
				setBonuses={mockSetBonuses}
				deleteBonus={mockDeleteBonus}
			/>
		)

		const input = screen.getByLabelText("Add New Bonus")
		await userEvent.type(input, "Super{Enter}")

		expect(mockSetBonuses).toHaveBeenCalledWith("Super")
	})

	it("shows error when adding duplicate bonus", async () => {
		render(
			<ScoresheetBuilderHeader
				bonuses={mockBonuses}
				setBonuses={mockSetBonuses}
				deleteBonus={mockDeleteBonus}
			/>
		)

		const input = screen.getByLabelText("Add New Bonus")
		await userEvent.type(input, "Air{Enter}")

		expect(toast.error).toHaveBeenCalledWith("Bonus already exists")
		expect(mockSetBonuses).not.toHaveBeenCalled()
	})

	it("shows error when adding empty bonus", async () => {
		render(
			<ScoresheetBuilderHeader
				bonuses={mockBonuses}
				setBonuses={mockSetBonuses}
				deleteBonus={mockDeleteBonus}
			/>
		)

		const input = screen.getByLabelText("Add New Bonus")
		await userEvent.type(input, "{Enter}")

		expect(toast.error).toHaveBeenCalledWith("Please Add a bonus name")
		expect(mockSetBonuses).not.toHaveBeenCalled()
	})

	it("can delete existing bonus", async () => {
		render(
			<ScoresheetBuilderHeader
				bonuses={mockBonuses}
				setBonuses={mockSetBonuses}
				deleteBonus={mockDeleteBonus}
			/>
		)

		// Find delete buttons next to bonus names
		const deleteButtons = screen.getAllByRole("button")
		await userEvent.click(deleteButtons[0]) // Click first delete button

		expect(mockDeleteBonus).toHaveBeenCalledWith(mockBonuses[0])
	})

	it("clears input after successful bonus addition", async () => {
		render(
			<ScoresheetBuilderHeader
				bonuses={mockBonuses}
				setBonuses={mockSetBonuses}
				deleteBonus={mockDeleteBonus}
			/>
		)

		const input = screen.getByLabelText("Add New Bonus")
		await userEvent.type(input, "Super{Enter}")

		expect(input).toHaveValue("")
	})
})
