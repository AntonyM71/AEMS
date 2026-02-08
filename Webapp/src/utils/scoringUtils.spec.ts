import { AvailableBonusType } from "../components/roles/scribe/InfoBar/ScoredMove"
import {
	AvailableMoveDirections,
	directionType,
	movesType,
	scoredBonusType,
	scoredMovesType
} from "../components/roles/scribe/Interfaces"
import {
	calculateMoveScore,
	calculateSingleJudgeRunScore,
	getBonusScore,
	getMoveBaseScore,
	getScoredMoveValues,
	MoveScoreInfo,
	RunScoreInfo
} from "./scoringUtils"

describe("calculateSingleJudgeRunScore", () => {
	const mockScoredMoves: scoredMovesType[] = [
		{ id: "1", moveId: "move1", direction: "F" as directionType },
		{ id: "2", moveId: "move2", direction: "R" as directionType }
	]

	const mockScoredBonuses = [{ id: "bonus1", moveId: "1", bonusId: "bonus1" }]

	const mockAvailableMoves = [
		{
			id: "move1",
			name: "Move 1",
			direction: "FB" as AvailableMoveDirections,
			fl_score: 10,
			rb_score: 5
		},
		{
			id: "move2",
			name: "Move 2",
			direction: "LR" as AvailableMoveDirections,
			fl_score: 15,
			rb_score: 20
		}
	]

	const mockAvailableBonuses = [
		{
			id: "bonus1",
			name: "Bonus 1",
			sheet_id: "test_sheet",
			move_id: "move1",
			score: 5
		},
		{
			id: "bonus2",
			name: "Bonus 2",
			sheet_id: "test_sheet",
			move_id: "move1",
			score: 3
		}
	]

	it("should calculate the correct run score and highest move", () => {
		const result: RunScoreInfo = calculateSingleJudgeRunScore(
			mockScoredMoves,
			mockScoredBonuses,
			mockAvailableMoves,
			mockAvailableBonuses
		)

		expect(result).toEqual({
			score: 35,
			highestMove: 20
		})
	})

	// eslint-disable-next-line max-len
	it("should calculate the correct run score and highest move when runs both side are scored with a single bonus", () => {
		const bothSideScoredMoves = [
			{ id: "1", moveId: "move1", direction: "F" as directionType },
			{ id: "2", moveId: "move1", direction: "B" as directionType }
		]

		const bothSiddeScoredBonuses = [
			{ id: "bonus1", moveId: "1", bonusId: "bonus1" }
		]

		const result: RunScoreInfo = calculateSingleJudgeRunScore(
			bothSideScoredMoves,
			bothSiddeScoredBonuses,
			mockAvailableMoves,
			mockAvailableBonuses
		)

		expect(result).toEqual({
			score: 20,
			highestMove: 15
		})
	})

	// eslint-disable-next-line max-len
	it("should calculate the correct run score and highest move when runs both side are scored with a both side bonus", () => {
		const bothSideScoredMoves = [
			{ id: "1", moveId: "move1", direction: "F" as directionType },
			{ id: "2", moveId: "move1", direction: "B" as directionType }
		]

		const bothSiddeScoredBonuses = [
			{ id: "bonus1", moveId: "1", bonusId: "bonus1" },
			{ id: "bonus2", moveId: "2", bonusId: "bonus1" }
		]

		const result: RunScoreInfo = calculateSingleJudgeRunScore(
			bothSideScoredMoves,
			bothSiddeScoredBonuses,
			mockAvailableMoves,
			mockAvailableBonuses
		)

		expect(result).toEqual({
			score: 25,
			highestMove: 15
		})
	})
	it("should calculate the run score with repeated same move and direction using the same bonus", () => {
		const repeatedSameMoveSameBonus = [
			{ id: "1", moveId: "move1", direction: "F" as directionType },
			{ id: "2", moveId: "move1", direction: "F" as directionType }
		]

		const repeatedSameMoveSameBonusBonuses = [
			{ id: "bonus1", moveId: "1", bonusId: "bonus1" },
			{ id: "bonus2", moveId: "2", bonusId: "bonus1" }
		]

		const result: RunScoreInfo = calculateSingleJudgeRunScore(
			repeatedSameMoveSameBonus,
			repeatedSameMoveSameBonusBonuses,
			mockAvailableMoves,
			mockAvailableBonuses
		)

		expect(result).toEqual({
			score: 15,
			highestMove: 15
		})
	})
	it(
		"should calculate the run score when first move has multiple bonuses " +
			"and second has only one of those bonuses",
		() => {
			// This test matches the scenario from #287:
			// First move: Loop with Air + Huge bonuses
			// Second move: Loop with Air bonus only (same moveId and direction as first)
			// Expected: Move scored once with base (10), Air bonus counted once (5, deduplicated),
			// Huge counted once (3). Score: move1 base (10) + Air (5) + Huge (3) = 18
			const testMoves = [
				{ id: "1", moveId: "move1", direction: "F" as directionType },
				{ id: "2", moveId: "move1", direction: "F" as directionType }
			]

			const testBonuses = [
				{ id: "bonus1", moveId: "1", bonusId: "bonus1" }, // Air on first move
				{ id: "bonus2", moveId: "1", bonusId: "bonus2" }, // Huge on first move
				{ id: "bonus3", moveId: "2", bonusId: "bonus1" } // Air on second move (duplicate)
			]

			const result: RunScoreInfo = calculateSingleJudgeRunScore(
				testMoves,
				testBonuses,
				mockAvailableMoves,
				mockAvailableBonuses
			)

			expect(result).toEqual({
				score: 18,
				highestMove: 18
			})
		}
	)
	it("should return zero score and highest move when inputs are empty", () => {
		const result: RunScoreInfo = calculateSingleJudgeRunScore(
			[],
			[],
			[],
			[]
		)

		expect(result).toEqual({
			score: 0,
			highestMove: 0
		})
	})

	// Add more test cases to cover different scenarios and edge cases
})
describe("calculateMoveScore", () => {
	const mockScoredMove = {
		id: "1",
		moveId: "move1",
		direction: "L" as directionType
	}
	const mockScoredBonuses = [{ id: "bonus1", moveId: "1", bonusId: "bonus1" }]
	const mockAvailableMoves = [
		{
			id: "move1",
			name: "Move 1",
			direction: "FB" as AvailableMoveDirections,
			fl_score: 10,
			rb_score: 5
		}
	]
	const mockAvailableBonuses = [
		{
			id: "bonus1",
			name: "Bonus 1",
			sheet_id: "test_sheet",
			move_id: "move1",
			score: 5
		}
	]

	it("should calculate the correct move score", () => {
		const result: MoveScoreInfo = calculateMoveScore(
			mockScoredMove,
			mockScoredBonuses,
			mockAvailableMoves,
			mockAvailableBonuses
		)

		expect(result).toEqual({
			baseMove: "move1",
			value: 15,
			direction: "L",
			moveType: "move1"
		})
	})

	it("should return zero score when no bonuses are applied", () => {
		const result: MoveScoreInfo = calculateMoveScore(
			mockScoredMove,
			[],
			mockAvailableMoves,
			[]
		)

		expect(result).toEqual({
			baseMove: "move1",
			value: 10,
			direction: "L",
			moveType: "move1"
		})
	})

	// Add more test cases to cover different scenarios and edge cases
})
describe("calculateSingleJudgeRunScore", () => {
	const mockScoredMoves: scoredMovesType[] = [
		{ id: "1", moveId: "move1", direction: "F" },
		{ id: "2", moveId: "move1", direction: "B" }
	]
	const mockScoredBonuses: scoredBonusType[] = [
		{ id: "bonus1", moveId: "1", bonusId: "bonus1" }
	]
	const mockAvailableMoves: movesType[] = [
		{
			id: "move1",
			name: "Move 1",
			direction: "FB",
			fl_score: 10,
			rb_score: 5
		},
		{
			id: "move2",
			name: "Move 2",
			direction: "LR",
			fl_score: 15,
			rb_score: 20
		},
		{
			id: "move3",
			name: "Move 3",
			direction: "S",
			fl_score: 15,
			rb_score: 20
		}
	]
	const mockAvailableBonuses: AvailableBonusType[] = [
		{
			id: "bonus1",
			name: "Bonus 1",
			sheet_id: "a",
			move_id: "move1",
			score: 5
		}
	]
	it("should partition correctly and calculate run score for multiple directions", () => {
		const result: RunScoreInfo = calculateSingleJudgeRunScore(
			mockScoredMoves,
			mockScoredBonuses,
			mockAvailableMoves,
			mockAvailableBonuses
		)
		expect(result).toEqual({ score: 20, highestMove: 15 })
	})
	it("should calculate correct score when no directional scored moves are found", () => {
		const mockScoredMovesNoDirection: scoredMovesType[] = [
			{ id: "3", moveId: "move3", direction: "S" }
		]
		const result: RunScoreInfo = calculateSingleJudgeRunScore(
			mockScoredMovesNoDirection,
			mockScoredBonuses,
			mockAvailableMoves,
			mockAvailableBonuses
		)
		expect(result).toEqual({ score: 15, highestMove: 15 })
	})
	it("should handle cases where leftRightPartition is empty", () => {
		const mockScoredMovesEmptyPartition: scoredMovesType[] = [
			{ id: "4", moveId: "move2", direction: "R" }
		]
		const result: RunScoreInfo = calculateSingleJudgeRunScore(
			mockScoredMovesEmptyPartition,
			mockScoredBonuses,
			mockAvailableMoves,
			mockAvailableBonuses
		)
		expect(result).toEqual({ score: 20, highestMove: 20 })
	})
	// Additional edge case: No moves or bonuses
	it("should return zero score and highest move when no moves or bonuses are provided", () => {
		const result: RunScoreInfo = calculateSingleJudgeRunScore(
			[],
			[],
			[],
			[]
		)
		expect(result).toEqual({ score: 0, highestMove: 0 })
	})
})

describe("getMoveBaseScore", () => {
	const mockAvailableMoves: movesType[] = [
		{
			id: "move1",
			name: "Move 1",
			direction: "FB",
			fl_score: 10,
			rb_score: 5
		}
	]

	it("should return fl_score when direction is in frontLeftDirectionValues", () => {
		const mockScoredMove: scoredMovesType = {
			id: "1",
			moveId: "move1",
			direction: "F"
		}
		const result = getMoveBaseScore(mockScoredMove, mockAvailableMoves)
		expect(result).toBe(10)
	})

	it("should return fb_score when direction is not in frontLeftDirectionValues", () => {
		const mockScoredMove: scoredMovesType = {
			id: "2",
			moveId: "move1",
			direction: "B"
		}
		const result = getMoveBaseScore(mockScoredMove, mockAvailableMoves)
		expect(result).toBe(5)
	})

	it("should return 0 when move is not found", () => {
		const mockScoredMove: scoredMovesType = {
			id: "3",
			moveId: "move2",
			direction: "L"
		}
		const result = getMoveBaseScore(mockScoredMove, mockAvailableMoves)
		expect(result).toBe(0)
	})
})

describe("getScoredMoveValues", () => {
	const mockAvailableMoves: movesType[] = [
		{
			id: "move1",
			name: "Move 1",
			direction: "LR",
			fl_score: 10,
			rb_score: 5
		}
	]

	it("should return move details when move is found", () => {
		const mockScoredMove: scoredMovesType = {
			id: "1",
			moveId: "move1",
			direction: "L"
		}
		const result = getScoredMoveValues(mockScoredMove, mockAvailableMoves)
		expect(result).toEqual(mockAvailableMoves[0])
	})

	it("should return undefined when move is not found", () => {
		const mockScoredMove: scoredMovesType = {
			id: "2",
			moveId: "move2",
			direction: "L"
		}
		const result = getScoredMoveValues(mockScoredMove, mockAvailableMoves)
		expect(result).toBeUndefined()
	})
})

describe("getBonusScore", () => {
	const mockAvailableBonuses: AvailableBonusType[] = [
		{
			id: "bonus1",
			name: "Bonus 1",
			sheet_id: "testSheet",
			move_id: "move1",
			score: 5
		}
	]

	it("should return bonus score when bonus is found", () => {
		const mockScoredBonus: scoredBonusType = {
			id: "bonus1",
			moveId: "1",
			bonusId: "bonus1"
		}
		const result = getBonusScore(mockScoredBonus, mockAvailableBonuses)
		expect(result).toBe(5)
	})

	it("should return 0 when bonus is not found", () => {
		const mockScoredBonus: scoredBonusType = {
			id: "bonus2",
			moveId: "1",
			bonusId: "bonus2"
		}
		const result = getBonusScore(mockScoredBonus, mockAvailableBonuses)
		expect(result).toBe(0)
	})
})
