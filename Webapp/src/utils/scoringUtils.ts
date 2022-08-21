import { moves } from "../components/judging/sheets/Float/demoMoves"
import {
	movesType,
	scoredMovesType
} from "../components/judging/sheets/Float/Interfaces"

// TODO: This function doens't handle bonuses yet

export function calculateRunScore(scoredMoves: scoredMovesType[]): number {
	const alreadyScoredMoves: string[] = []
	const scoresArray: number[] = []

	scoredMoves.map((scoredMove) => {
		const filteredMoves: movesType[] = moves.filter(
			(move) => move.id === scoredMove.moveId
		)
		if (filteredMoves.length === 1) {
			const scoredMoveObject = filteredMoves[0]

			const index = alreadyScoredMoves.indexOf(
				scoredMove.moveId + "|" + scoredMove.direction
			)
			if (index !== -1) {
				const recentMove = calculateScoreWithBonuses(
					scoredMoveObject,
					scoredMove
				)
				const earlierMove = scoresArray[index]

				if (recentMove > earlierMove) {
					scoresArray[index] = 0
					scoresArray.push(recentMove)
				}
			} else {
				if (scoredMoveObject.score[scoredMove.direction]) {
					scoresArray.push(
						calculateScoreWithBonuses(scoredMoveObject, scoredMove)
					)
					alreadyScoredMoves.push(
						scoredMove.moveId + "|" + scoredMove.direction
					)
				}
			}
		}
	})

	return scoresArray.reduce((a, b) => a + b, 0)
}
// TODO add in bonus values and calculate from them
const calculateScoreWithBonuses = (
	scoredMoveObject: movesType,
	scoredMove: scoredMovesType
) => {
	const score = []
	score.push(scoredMoveObject.score[scoredMove.direction])

	return score.reduce((a, b) => a + b, 0)
}
