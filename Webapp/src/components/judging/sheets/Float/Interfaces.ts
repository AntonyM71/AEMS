export interface BonusPropsType {
	bonus: bonusesType
	addScoredMove: addScoredMoveType
	addScoredBonus: addScoredBonusType
}
export interface bonusesType {
	id: string
	name: string
	shortName: string
}

export interface movesType {
	id: string
	name: string
	direction: AvailableMoveDirections
	score: number
}

export type AvailableMoveDirections = "SINGLE" | "LR" | "FB" | "LRFB"
export type directionType = "L" | "R" | "F" | "B" | "LF" | "RB" | "A"
export type removeScoredMoveType = (id: string) => void
export interface scoredMovesType {
	id: string
	timestamp: Date
	moveId: string
	direction: directionType
	bonuses: scoredBonusType[]
	status: string
}
export interface scoredBonusType {
	id: string
	timestamp: Date
	bonusId: string
}

export interface stateType {
	currentMoveId: string
	scoredMoves: scoredMovesType[]
	scores: {
		heat: number
		run: number
	}
}
export type addScoredMoveType = (id: string, direction: directionType) => void
export type addScoredBonusType = (id: string, moveId: string) => void

export interface MovePropsType {
	move: movesType
	addScoredMove: addScoredMoveType
	addScoredBonus: addScoredBonusType
}
