import {
	movesType,
	scoredMovesType
} from "../components/judging/sheets/Float/Interfaces"
import { moves } from "../components/judging/sheets/Float/demoMoves"

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
				const recentMove = calculateScoreWithBonuses(scoredMoveObject)
				const earlierMove = scoresArray[index]

				if (recentMove > earlierMove) {
					scoresArray[index] = 0
					scoresArray.push(recentMove)
				}
			} else {
				if (scoredMoveObject.score) {
					scoresArray.push(
						calculateScoreWithBonuses(scoredMoveObject)
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
const calculateScoreWithBonuses = (scoredMoveObject: movesType) => {
	const score = []
	score.push(scoredMoveObject.score)

	return score.reduce((a, b) => a + b, 0)
}
