import { flatten, groupBy, partition, sum } from "lodash"
import { AvailableBonusType } from "../components/roles/scribe/InfoBar/ScoredMove"
import {
	directionType,
	movesType,
	scoredBonusType,
	scoredMovesType
} from "../components/roles/scribe/Interfaces"

export function calculateSingleJudgeRunScore(
	scoredMoves: scoredMovesType[],
	scoredBonuses: scoredBonusType[],
	availableMoves: movesType[],
	availableBonuses: AvailableBonusType[]
): RunScoreInfo {
	const groupedMoves = groupBy(scoredMoves, (m) => m.moveId)
	const uniqueScoredMoves = Object.keys(groupedMoves)
	const scoredMoveScores = uniqueScoredMoves.map((id) => {
		const moveAvailableBonuses = availableBonuses.filter(
			(b) => b.move_id === id
		)
		const moveData = availableMoves.filter((m) => m.id === id)

		const scores: MoveScoreInfo[] = flatten(
			moveData[0].direction.split("").map((d) => {
				console.log("VVVVVVVV")
				console.log(d)
				if (!moveData) {
					return []
				}

				const same_move__and_direction = groupedMoves[id].filter(
					(gm) => gm.direction === d
				)
				if (same_move__and_direction.length === 0) {
					return []
				}
				const same_move_ids = same_move__and_direction.map(
					(gm) => gm.id
				)

				const same_move_and_direction_bonuses = scoredBonuses.filter(
					(b) => same_move_ids.includes(b.moveId)
				)

				return calculateMoveScore(
					same_move__and_direction[0],
					same_move_and_direction_bonuses,
					moveData,
					moveAvailableBonuses
				)
			})
		)

		return scores
	})

	const highestScoredMove =
		scoredMoveScores && scoredMoves.length
			? scoredMoveScores
					.flat()
					.map((a) => a.value)
					?.reduce(getMaximumScoredMoveFromArrayByValue)
			: 0

	let runScore = 0
	scoredMoveScores.forEach((am) => {
		if (am && am.length === 1) {
			runScore = runScore + am[0].value
		} else if (am && am.length > 1) {
			const leftRightPartition = partition(am, (ami) =>
				frontLeftDirectionValues.includes(ami.direction)
			)

			leftRightPartition.map((directionalScoredMoves) => {
				const moveScore = directionalScoredMoves
					.map((a) => a.value)
					?.reduce(getMaximumScoredMoveFromArrayByValue, 0)
				if (directionalScoredMoves.length !== 0) {
					runScore = runScore + moveScore
				}
			})
		}
	})

	return { score: runScore, highestMove: highestScoredMove }
}

const getMaximumScoredMoveFromArrayByValue = (prev: number, current: number) =>
	prev > current ? prev : current

export const calculateMoveScore = (
	scoredMove: scoredMovesType,
	scoredBonuses: scoredBonusType[],
	availableMoves: movesType[],
	availableBonuses: AvailableBonusType[]
): MoveScoreInfo => {
	const baseMove = getScoredMoveValues(scoredMove, availableMoves)

	const moveBaseScore = getMoveBaseScore(scoredMove, availableMoves)
	const scoredBonusValues = scoredBonuses.map((b) =>
		getBonusScore(b, availableBonuses)
	)
	console.log([moveBaseScore, ...scoredBonusValues])

	return {
		baseMove: baseMove?.id ?? "",
		value: sum([moveBaseScore, ...scoredBonusValues]),
		direction: scoredMove.direction,
		moveType: scoredMove.moveId
	}
}

export const getMoveBaseScore = (
	scoredMove: scoredMovesType,
	availableMoves: movesType[]
): number => {
	const scoredMoveValues = getScoredMoveValues(scoredMove, availableMoves)

	if (frontLeftDirectionValues.includes(scoredMove.direction)) {
		return scoredMoveValues?.fl_score ?? 0
	} else {
		return scoredMoveValues?.rb_score ?? 0
	}
}
export const getScoredMoveValues = (
	scoredMove: scoredMovesType,
	availableMoves: movesType[]
) => availableMoves.find((m) => m.id === scoredMove.moveId)

export const getBonusScore = (
	scoredBonus: scoredBonusType,
	availableBonuses: AvailableBonusType[]
): number => {
	const scoredBonusValues = availableBonuses.find(
		(b) => b.id === scoredBonus.bonusId
	)

	return scoredBonusValues?.score ?? 0
}

export interface MoveScoreInfo {
	baseMove: string
	value: number
	direction: directionType
	moveType: string
}

export interface RunScoreInfo {
	score: number
	highestMove: number
}

const frontLeftDirectionValues = ["LF", "L", "F", "S"]
