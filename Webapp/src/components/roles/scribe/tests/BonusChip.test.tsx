import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
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
	let user: ReturnType<typeof userEvent.setup>

	beforeEach(() => {
		user = userEvent.setup()
	})
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

	it("calls updateScoredMoveBonuses when clicked", async () => {
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

		const chip = await screen.findByRole("button")

		await act(async () => {
			await user.click(chip)
		})

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

	it("does not call updateScoredMoveBonuses when chipActionsDisabled is true", async () => {
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

		const chip = await screen.findByRole("button")

		await act(async () => {
			await user.click(chip)
		})

		expect(mockUpdateBonuses).not.toHaveBeenCalled()
	})

	it("removes bonus when clicking an already scored bonus", async () => {
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

		const chip = await screen.findByRole("button")

		await act(async () => {
			await user.click(chip)
		})

		expect(mockUpdateBonuses).toHaveBeenCalledWith([])
	})

	it("handles camelCase bonus names and generates correct acronym", () => {
		const camelCaseBonus = {
			...mockAvailableBonus,
			name: "SuperClean"
		}
		render(
			<BonusChip
				availableBonus={camelCaseBonus}
				scoredMoveBonuses={[]}
				scoredMove={mockScoredMove}
				chipActionsDisabled={false}
				updateScoredMoveBonuses={jest.fn()}
			/>
		)

		const chip = screen.getByRole("button")
		expect(chip).toHaveTextContent("SC")
	})

	it("handles single word bonus names correctly", () => {
		const singleWordBonus = {
			...mockAvailableBonus,
			name: "Style"
		}
		render(
			<BonusChip
				availableBonus={singleWordBonus}
				scoredMoveBonuses={[]}
				scoredMove={mockScoredMove}
				chipActionsDisabled={false}
				updateScoredMoveBonuses={jest.fn()}
			/>
		)

		const chip = screen.getByRole("button")
		expect(chip).toHaveTextContent("S")
	})

	it("handles snake_case bonus names and generates correct acronym", () => {
		const snakeCaseBonus = {
			...mockAvailableBonus,
			name: "super_clean"
		}
		render(
			<BonusChip
				availableBonus={snakeCaseBonus}
				scoredMoveBonuses={[]}
				scoredMove={mockScoredMove}
				chipActionsDisabled={false}
				updateScoredMoveBonuses={jest.fn()}
			/>
		)

		const chip = screen.getByRole("button")
		expect(chip).toHaveTextContent("SC")
	})

	it("handles kebab-case bonus names and generates correct acronym", () => {
		const kebabCaseBonus = {
			...mockAvailableBonus,
			name: "super-clean"
		}
		render(
			<BonusChip
				availableBonus={kebabCaseBonus}
				scoredMoveBonuses={[]}
				scoredMove={mockScoredMove}
				chipActionsDisabled={false}
				updateScoredMoveBonuses={jest.fn()}
			/>
		)

		const chip = screen.getByRole("button")
		expect(chip).toHaveTextContent("SC")
	})
})
