import { selector } from "recoil"
import { calculateRunScore } from "../utils/scoringUtils"
import {
	scoredMovesState,
	selectedHeatState,
	selectedPaddlerState
} from "./atoms"

export const currentScore = selector({
	key: "currentScore",
	get: ({ get }) => {
		const moveList = get(scoredMovesState)
		const score = calculateRunScore(moveList)

		return score
	}
})

export const numberOfPaddlersInHeat = selector({
	key: "paddlersInHeat",
	get: ({ get }) => {
		const heatInfo = get(selectedHeatState)
		const number: number = heatInfo.athletes.length

		return number
	}
})

export const currentPaddlerInfo = selector({
	key: "currentPaddlerInfo",
	get: ({ get }) => {
		const heatInfo = get(selectedHeatState)
		const currentPaddlerNo = get(selectedPaddlerState)
		const paddlerInfo = heatInfo.athletes[currentPaddlerNo]

		return paddlerInfo
	}
})
