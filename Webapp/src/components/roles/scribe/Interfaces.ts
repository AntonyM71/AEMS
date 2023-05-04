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

export type AvailableMoveDirections = "SINGLE" | "LR" | "FB" | "LRFB"
export type directionType = frontLeftDirections | rightBackDirections
export type frontLeftDirections = "LF" | "L" | "F"
export type rightBackDirections = "RB" | "R" | "B"
export type removeScoredMoveType = (id: string) => void
export interface scoredMovesType {
	id: string
	timestamp: string
	moveId: string
	direction: directionType
	status: string
}
export interface scoredBonusType {
	id: string
	timestamp: string
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
