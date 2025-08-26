import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { toast } from "react-hot-toast"
import { ScoresheetBuilderHeader } from "../Header"

describe("ScoresheetBuilderHeader", () => {
	const createMockBonuses = () => ["Air", "Clean"]
	const mockSetBonuses = jest.fn()
	const mockDeleteBonus = jest.fn()

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it("renders header with bonus columns", () => {
		const mockSetUniqueBonusNamesList = jest.fn()
		render(
			<ScoresheetBuilderHeader
				bonuses={createMockBonuses()}
				setBonuses={mockSetBonuses}
				deleteBonus={mockDeleteBonus}
				setUniqueBonusNamesList={mockSetUniqueBonusNamesList}
			/>
		)

		// Check standard columns
		expect(screen.getByText("Name")).toBeInTheDocument()
		expect(screen.getByText("Direction")).toBeInTheDocument()
		expect(screen.getByText("F/R Score")).toBeInTheDocument()
		expect(screen.getByText("L/B Score")).toBeInTheDocument()

		// Check bonus columns
		createMockBonuses().forEach((bonus) => {
			expect(screen.getByText(bonus)).toBeInTheDocument()
		})

		// Check add bonus input
		expect(screen.getByLabelText("Add New Bonus")).toBeInTheDocument()
	})

	it("can add a new bonus", async () => {
		const mockSetUniqueBonusNamesList = jest.fn()
		render(
			<ScoresheetBuilderHeader
				bonuses={createMockBonuses()}
				setBonuses={mockSetBonuses}
				deleteBonus={mockDeleteBonus}
				setUniqueBonusNamesList={mockSetUniqueBonusNamesList}
			/>
		)

		const input = screen.getByLabelText("Add New Bonus")
		await userEvent.type(input, "Super{Enter}")

		expect(mockSetBonuses).toHaveBeenCalledWith("Super")
	})

	it("shows error when adding duplicate bonus", async () => {
		const mockSetUniqueBonusNamesList = jest.fn()
		render(
			<ScoresheetBuilderHeader
				bonuses={createMockBonuses()}
				setBonuses={mockSetBonuses}
				deleteBonus={mockDeleteBonus}
				setUniqueBonusNamesList={mockSetUniqueBonusNamesList}
			/>
		)

		const input = screen.getByLabelText("Add New Bonus")
		await userEvent.type(input, "Air{Enter}")

		expect(toast.error).toHaveBeenCalledWith("Bonus already exists")
		expect(mockSetBonuses).not.toHaveBeenCalled()
	})

	it("shows error when adding empty bonus", async () => {
		const mockSetUniqueBonusNamesList = jest.fn()
		render(
			<ScoresheetBuilderHeader
				bonuses={createMockBonuses()}
				setBonuses={mockSetBonuses}
				deleteBonus={mockDeleteBonus}
				setUniqueBonusNamesList={mockSetUniqueBonusNamesList}
			/>
		)

		const input = screen.getByLabelText("Add New Bonus")
		await userEvent.type(input, "{Enter}")

		expect(toast.error).toHaveBeenCalledWith("Please Add a bonus name")
		expect(mockSetBonuses).not.toHaveBeenCalled()
	})

	it("can delete existing bonus", async () => {
		const mockSetUniqueBonusNamesList = jest.fn()
		render(
			<ScoresheetBuilderHeader
				bonuses={createMockBonuses()}
				setBonuses={mockSetBonuses}
				deleteBonus={mockDeleteBonus}
				setUniqueBonusNamesList={mockSetUniqueBonusNamesList}
			/>
		)

		// Find delete buttons next to bonus names
		const deleteButtons = screen.getAllByRole("button")
		await userEvent.click(deleteButtons[0]) // Click first delete button

		expect(mockDeleteBonus).toHaveBeenCalledWith(createMockBonuses()[0])
	})

	it("clears input after successful bonus addition", async () => {
		const mockSetUniqueBonusNamesList = jest.fn()
		render(
			<ScoresheetBuilderHeader
				bonuses={createMockBonuses()}
				setBonuses={mockSetBonuses}
				deleteBonus={mockDeleteBonus}
				setUniqueBonusNamesList={mockSetUniqueBonusNamesList}
			/>
		)

		const input = screen.getByLabelText("Add New Bonus")
		await userEvent.type(input, "Super{Enter}")

		expect(input).toHaveValue("")
	})
	it("can change the display order of bonuses to the right", async () => {
		const mockSetUniqueBonusNamesList = jest.fn()
		render(
			<ScoresheetBuilderHeader
				bonuses={createMockBonuses()}
				setBonuses={mockSetBonuses}
				deleteBonus={mockDeleteBonus}
				setUniqueBonusNamesList={mockSetUniqueBonusNamesList}
			/>
		)
		const button = screen.getByTestId(`move-bonus-right-Air`)
		await userEvent.click(button)

		expect(mockSetUniqueBonusNamesList).toHaveBeenCalledWith([
			"Clean",
			"Air"
		])
	})
	it("can change the display order of bonuses to the right", async () => {
		const mockSetUniqueBonusNamesList = jest.fn()
		render(
			<ScoresheetBuilderHeader
				bonuses={createMockBonuses()}
				setBonuses={mockSetBonuses}
				deleteBonus={mockDeleteBonus}
				setUniqueBonusNamesList={mockSetUniqueBonusNamesList}
			/>
		)
		const button = screen.getByTestId(`move-bonus-left-Clean`)
		await userEvent.click(button)

		expect(mockSetUniqueBonusNamesList).toHaveBeenCalledWith([
			"Clean",
			"Air"
		])
		expect(toast.error).not.toHaveBeenCalled()
	})
	it("doesn't change the order of bonuses if it would roll over left", async () => {
		const mockSetUniqueBonusNamesList = jest.fn()
		render(
			<ScoresheetBuilderHeader
				bonuses={createMockBonuses()}
				setBonuses={mockSetBonuses}
				deleteBonus={mockDeleteBonus}
				setUniqueBonusNamesList={mockSetUniqueBonusNamesList}
			/>
		)
		const button = screen.getByTestId(`move-bonus-left-Air`)
		await userEvent.click(button)
		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith("Invalid move")
		})
	})
	it("doesn't change the order of bonuses if it would roll over right", async () => {
		const mockSetUniqueBonusNamesList = jest.fn()
		render(
			<ScoresheetBuilderHeader
				bonuses={createMockBonuses()}
				setBonuses={mockSetBonuses}
				deleteBonus={mockDeleteBonus}
				setUniqueBonusNamesList={mockSetUniqueBonusNamesList}
			/>
		)
		const button = screen.getByTestId(`move-bonus-right-Clean`)
		await userEvent.click(button)
		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith("Invalid move")
		})
	})
})
