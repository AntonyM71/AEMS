import { AvailableBonusType } from "../components/roles/scribe/InfoBar/ScoredMove"
import {
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
	const mockScoredMoves = [
		{ id: "1", moveId: "move1", direction: "F" },
		{ id: "2", moveId: "move2", direction: "R" }
	]

	const mockScoredBonuses = [{ id: "bonus1", moveId: "1", bonusId: "bonus1" }]

	const mockAvailableMoves = [
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
		}
	]

	const mockAvailableBonuses = [
		{
			id: "bonus1",
			name: "Bonus 1",
			shortName: "B1",
			move_id: "move1",
			score: 5
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
			{ id: "1", moveId: "move1", direction: "F" },
			{ id: "2", moveId: "move1", direction: "B" }
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
			{ id: "1", moveId: "move1", direction: "F" },
			{ id: "2", moveId: "move1", direction: "B" }
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
	const mockScoredMove = { id: "1", moveId: "move1", direction: "L" }
	const mockScoredBonuses = [{ id: "bonus1", moveId: "1", bonusId: "bonus1" }]
	const mockAvailableMoves = [
		{
			id: "move1",
			name: "Move 1",
			direction: "FB",
			fl_score: 10,
			rb_score: 5
		}
	]
	const mockAvailableBonuses = [
		{
			id: "bonus1",
			name: "Bonus 1",
			shortName: "B1",
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

	it("should return rb_score when direction is not in frontLeftDirectionValues", () => {
		const mockScoredMove: scoredMovesType = {
			id: "2",
			moveId: "move1",
			direction: "RB"
		}
		const result = getMoveBaseScore(mockScoredMove, mockAvailableMoves)
		expect(result).toBe(5)
	})

	it("should return 0 when move is not found", () => {
		const mockScoredMove: scoredMovesType = {
			id: "3",
			moveId: "move2",
			direction: "LF"
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
			direction: "LF",
			fl_score: 10,
			rb_score: 5
		}
	]

	it("should return move details when move is found", () => {
		const mockScoredMove: scoredMovesType = {
			id: "1",
			moveId: "move1",
			direction: "LF"
		}
		const result = getScoredMoveValues(mockScoredMove, mockAvailableMoves)
		expect(result).toEqual(mockAvailableMoves[0])
	})

	it("should return undefined when move is not found", () => {
		const mockScoredMove: scoredMovesType = {
			id: "2",
			moveId: "move2",
			direction: "LF"
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
			shortName: "B1",
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
