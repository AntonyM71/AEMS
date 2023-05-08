import { v4 } from "uuid"
import { AvailableBonusType } from "../src/components/roles/scribe/InfoBar/ScoredMove"
import {
	movesType,
	scoredBonusType,
	scoredMovesType
} from "../src/components/roles/scribe/Interfaces"
import { calculateMoveScore } from "../src/utils/scoringUtils"

describe("The user can see the correct score for a list of moves", () => {
	it("calculates the score of a move  when scored left without any bonuses", () => {
		const exampleMoveId = "e347dce3-9da6-4ad4-93fc-1719e92e7c37"
		const scoredMove: scoredMovesType = {
			id: v4(),
			timestamp: "0001",
			direction: "L",
			status: "New",
			moveId: exampleMoveId
		}
		const availableMoves: movesType = {
			id: v4(),
			name: "SuperCoolMove",
			direction: "LR",
			fl_score: 30,
			rb_score: 40
		}
		const got = calculateMoveScore(scoredMove, [], [availableMoves], [])

		const want = 30
		expect(got).toEqual(want)
	})
	it("calculates the score of a move  when scored left without any bonuses", () => {
		const exampleMoveId = "e347dce3-9da6-4ad4-93fc-1719e92e7c37"
		const scoredMove: scoredMovesType = {
			id: v4(),
			timestamp: "0001",
			direction: "L",
			status: "New",
			moveId: exampleMoveId
		}
		const availableMoves: movesType = {
			id: v4(),
			name: "SuperCoolMove",
			direction: "LR",
			fl_score: 30,
			rb_score: 40
		}
		const got = calculateMoveScore(scoredMove, [], [availableMoves], [])

		const want = 30
		expect(got).toEqual(want)
	})
	it("calculates the score of a move  when scored right without any bonuses", () => {
		const exampleMoveId = "e347dce3-9da6-4ad4-93fc-1719e92e7c37"
		const scoredMove: scoredMovesType = {
			id: v4(),
			timestamp: "0001",
			direction: "R",
			status: "New",
			moveId: exampleMoveId
		}
		const availableMoves: movesType = {
			id: v4(),
			name: "SuperCoolMove",
			direction: "LR",
			fl_score: 30,
			rb_score: 40
		}
		const got = calculateMoveScore(scoredMove, [], [availableMoves], [])

		const want = 40
		expect(got).toEqual(want)
	})
	it("returns zero if the score doesn't exist", () => {
		const exampleMoveId = "e347dce3-9da6-4ad4-93fc-1719e92e7c37"
		const scoredMove: scoredMovesType = {
			id: v4(),
			timestamp: "0001",
			direction: "R",
			status: "New",
			moveId: exampleMoveId
		}
		const availableMoves: movesType = {
			id: v4(),
			name: "SuperCoolMove",
			direction: "LR",
			fl_score: 30,
			rb_score: 40
		}
		const got = calculateMoveScore(scoredMove, [], [availableMoves], [])

		const want = 0
		expect(got).toEqual(want)
	})
	it("calculates the score of a move  when scored right without a bonus", () => {
		const exampleMoveId = "e347dce3-9da6-4ad4-93fc-1719e92e7c37"
		const exampleSheetId = "e347dce3-9da6-4ad4-93fc-1719e92e7c36"
		const exampleBonusId = "e347dce3-9da6-4ad4-93fc-1719e92e7c38"
		const scoredMove: scoredMovesType = {
			id: v4(),
			timestamp: "0001",
			direction: "R",
			status: "New",
			moveId: exampleMoveId
		}
		const availableMoves: movesType = {
			id: v4(),
			name: "SuperCoolMove",
			direction: "LR",
			fl_score: 30,
			rb_score: 40
		}
		const availableBonus: AvailableBonusType = {
			id: exampleBonusId,
			move_id: exampleMoveId,
			name: "Awesome Bonus",
			score: 35,
			sheet_id: exampleSheetId
		}
		const scoredBonuses: scoredBonusType[] = [
			{
				id: "e347dce3-9da6-4ad4-93fc-1719e92e7c35",
				timestamp: "0002",
				moveId: exampleMoveId,
				bonusId: exampleBonusId
			}
		]
		const got = calculateMoveScore(
			scoredMove,
			scoredBonuses,
			[availableMoves],
			[availableBonus]
		)

		const want = 75
		expect(got).toEqual(want)
	})
})
