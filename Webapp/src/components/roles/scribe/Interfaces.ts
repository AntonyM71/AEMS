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
	fl_score: number
	rb_score: number
}

export type AvailableMoveDirections = "S" | "LR" | "FB"
export type directionType = frontLeftDirections | rightBackDirections | "S"
export type frontLeftDirections = "L" | "F"
export type rightBackDirections = "R" | "B"
export type removeScoredMoveType = (id: string) => void

export interface scoredMovesType {
	id: string

	moveId: string
	direction: directionType
}
export interface scoredBonusType {
	id: string
	moveId: string
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
}
