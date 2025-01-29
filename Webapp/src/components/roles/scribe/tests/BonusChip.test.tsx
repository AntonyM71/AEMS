import { render, screen } from "@testing-library/react"
import { BonusChip } from "../BonusChip"

// Mock data
const mockAvailableBonus = {
	id: "1",
	name: "Jump Spin Overall",
	score: 10,
	sheet_id: "sheet1",
	move_id: "move1"
}

const mockScoredMove = {
	id: "move1",
	moveId: "1",
	direction: "S" as const
}

describe("BonusChip Component", () => {
	it("renders without crashing", () => {
		render(
			<BonusChip
				availableBonus={mockAvailableBonus}
				scoredMoveBonuses={[]}
				scoredMove={mockScoredMove}
				chipActionsDisabled={false}
				updateScoredMoveBonuses={jest.fn()}
			/>
		)

		const chip = screen.getByRole("button")
		expect(chip).toBeInTheDocument()
	})

	it("displays correct acronym from bonus name", () => {
		render(
			<BonusChip
				availableBonus={mockAvailableBonus}
				scoredMoveBonuses={[]}
				scoredMove={mockScoredMove}
				chipActionsDisabled={false}
				updateScoredMoveBonuses={jest.fn()}
			/>
		)

		const chip = screen.getByRole("button")
		expect(chip).toHaveTextContent("JSO")
	})

	it("displays fallback '?' when bonus name has no valid acronym characters", () => {
		const noAcronymBonus = {
			...mockAvailableBonus,
			name: "!@# $%^"
		}
		render(
			<BonusChip
				availableBonus={noAcronymBonus}
				scoredMoveBonuses={[]}
				scoredMove={mockScoredMove}
				chipActionsDisabled={false}
				updateScoredMoveBonuses={jest.fn()}
			/>
		)

		const chip = screen.getByRole("button")
		expect(chip).toHaveTextContent("?")
	})

	it("is disabled when bonus has no score", () => {
		const noScoreBonus = { ...mockAvailableBonus, score: 0 }
		render(
			<BonusChip
				availableBonus={noScoreBonus}
				scoredMoveBonuses={[]}
				scoredMove={mockScoredMove}
				chipActionsDisabled={false}
				updateScoredMoveBonuses={jest.fn()}
			/>
		)

		const chip = screen.getByRole("button")
		expect(chip).toHaveAttribute("aria-disabled", "true")
		expect(chip).toHaveClass("Mui-disabled")
	})

	it("calls updateScoredMoveBonuses when clicked", () => {
		const mockUpdateBonuses = jest.fn()
		render(
			<BonusChip
				availableBonus={mockAvailableBonus}
				scoredMoveBonuses={[]}
				scoredMove={mockScoredMove}
				chipActionsDisabled={false}
				updateScoredMoveBonuses={mockUpdateBonuses}
			/>
		)

		const chip = screen.getByRole("button")
		chip.click()

		expect(mockUpdateBonuses).toHaveBeenCalledWith([
			expect.objectContaining({
				moveId: mockScoredMove.id,
				bonusId: mockAvailableBonus.id
			})
		])
	})

	it("shows primary color when bonus is scored", () => {
		const scoredBonus = {
			id: "bonus1",
			moveId: mockScoredMove.id,
			bonusId: mockAvailableBonus.id
		}

		render(
			<BonusChip
				availableBonus={mockAvailableBonus}
				scoredMoveBonuses={[scoredBonus]}
				scoredMove={mockScoredMove}
				chipActionsDisabled={false}
				updateScoredMoveBonuses={jest.fn()}
			/>
		)

		const chip = screen.getByRole("button")
		expect(chip).toHaveClass("MuiChip-colorPrimary")
	})

	it("does not call updateScoredMoveBonuses when chipActionsDisabled is true", () => {
		const mockUpdateBonuses = jest.fn()
		render(
			<BonusChip
				availableBonus={mockAvailableBonus}
				scoredMoveBonuses={[]}
				scoredMove={mockScoredMove}
				chipActionsDisabled={true}
				updateScoredMoveBonuses={mockUpdateBonuses}
			/>
		)

		const chip = screen.getByRole("button")
		chip.click()

		expect(mockUpdateBonuses).not.toHaveBeenCalled()
	})

	it("removes bonus when clicking an already scored bonus", () => {
		const scoredBonus = {
			id: "bonus1",
			moveId: mockScoredMove.id,
			bonusId: mockAvailableBonus.id
		}
		const mockUpdateBonuses = jest.fn()

		render(
			<BonusChip
				availableBonus={mockAvailableBonus}
				scoredMoveBonuses={[scoredBonus]}
				scoredMove={mockScoredMove}
				chipActionsDisabled={false}
				updateScoredMoveBonuses={mockUpdateBonuses}
			/>
		)

		const chip = screen.getByRole("button")
		chip.click()

		expect(mockUpdateBonuses).toHaveBeenCalledWith([])
	})
})
