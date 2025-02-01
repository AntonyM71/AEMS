import { ScoredMovesAndBonusesResponse } from "../../../redux/services/aemsApi"

export interface RunStatus {
	id: string
	heat_id: string
	run_number: number
	phase_id: string
	athlete_id: string
	locked: boolean
	did_not_start: boolean
}

export interface ScoredMovesAndBonusesWithMetadata {
	movesAndBonuses: ScoredMovesAndBonusesResponse
	heat_id: string
	athlete_id: string
	run_number: number
	judge_id: number
	phase_id: string
}
