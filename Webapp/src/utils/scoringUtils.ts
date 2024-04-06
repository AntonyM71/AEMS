import { groupBy, partition, sum } from "lodash"
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
	const trophyMoveIDs = availableMoves
		.map((a) => {
			if (
				["trophy 1", "trophy 2", "trophy 3"].includes(
					a.name.toLowerCase()
				)
			) {
				return a.id
			}
		})
		.filter((n) => n)
	console.log(trophyMoveIDs)
	const groupedMoves = groupBy(scoredMoves, (m) => m.moveId)
	const uniqueScoredMoves = Object.keys(groupedMoves)
	const scoredMoveScores = uniqueScoredMoves.map((id) => {
		const moveAvailableBonuses = availableBonuses.filter(
			(b) => b.move_id === id
		)
		const moveData = availableMoves.filter((m) => m.id === id)

		return groupedMoves[id].map((m) =>
			calculateMoveScore(
				m,
				scoredBonuses.filter((b) => b.moveId === m.id),
				moveData,
				moveAvailableBonuses
			)
		)
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
				console.log(directionalScoredMoves)
				const moveScore = trophyMoveIDs.includes(
					directionalScoredMoves[0]?.baseMove
				)
					? directionalScoredMoves
							.map((a) => a.value)
							?.reduce(getSumOfMoves, 0)
					: directionalScoredMoves
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

const getSumOfMoves = (prev: number, current: number): number => prev + current

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

	return {
		baseMove: baseMove?.id ?? "",
		value: sum([moveBaseScore, ...scoredBonusValues]),
		direction: scoredMove.direction,
		moveType: scoredMove.moveId
	}
}

const getMoveBaseScore = (
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
const getScoredMoveValues = (
	scoredMove: scoredMovesType,
	availableMoves: movesType[]
) => availableMoves.find((m) => m.id === scoredMove.moveId)

const getBonusScore = (
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
