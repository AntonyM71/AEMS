import { useEffect } from "react"
import {
	PhaseScoresResponse,
	useGetHeatInfoGetHeatInfoHeatIdGetQuery,
	useGetPhaseScoresGetPhaseScoresPhaseIdGetQuery
} from "../../../redux/services/aemsApi"
import { useAthleteRunStatusStreamQuery } from "../../../redux/services/streamingApi"

export interface AthleteRunLabel {
	runNumber: number
	label: string
}

// A lock or DNS refetches at once via the run-status stream; this slow poll
// only catches messages missed while the socket was reconnecting.
const SCORES_BACKSTOP_POLL_MS = 30000

/** Refetches as soon as a lock or DNS for this athlete is broadcast. The
 * server saves the status before broadcasting it, so the refetch sees it. */
const useRefetchOnRunStatus = (
	heatId: string,
	athleteId: string | undefined,
	refetch: () => unknown,
	isQueryActive: boolean
) => {
	const { data: latestRunStatus } = useAthleteRunStatusStreamQuery(
		{ heatId, athleteId: athleteId ?? "" },
		{ skip: !heatId || !athleteId }
	)
	useEffect(() => {
		if (latestRunStatus && isQueryActive) {
			void refetch()
		}
	}, [latestRunStatus, isQueryActive, refetch])
}

/** One entry per run in the athlete's phase (1-based), labelled "340.00",
 * "DNS", or "-" until the run is final, and their total over final runs. A run stays
 * off air until the head judge locks it or marks it did-not-start, so a
 * half-scored run never shows. */
export const useAthleteRunScores = (
	heatId: string,
	athleteId: string | undefined
): { runs: AthleteRunLabel[]; total: number | undefined } => {
	const { data: heatInfo } = useGetHeatInfoGetHeatInfoHeatIdGetQuery(
		{ heatId },
		{ skip: !heatId || !athleteId }
	)
	const athleteHeat = heatInfo?.find((a) => a.athlete_id === athleteId)
	const { data, refetch } = useGetPhaseScoresGetPhaseScoresPhaseIdGetQuery(
		{ phaseId: athleteHeat?.phase_id ?? "" },
		{ skip: !athleteHeat, pollingInterval: SCORES_BACKSTOP_POLL_MS }
	)
	useRefetchOnRunStatus(heatId, athleteId, refetch, Boolean(athleteHeat))
	const finalRuns = lockedOrDnsRuns(data, athleteId)
	// Every run in the phase gets a cell, so the graphic keeps one width as
	// runs are locked; a run that isn't final yet shows a placeholder.
	const runs = Array.from(
		{ length: athleteHeat?.number_of_runs ?? 0 },
		(_, runNumber) => ({
			runNumber: runNumber + 1,
			label: runLabel(finalRuns.find((r) => r.run_number === runNumber))
		})
	)
	if (finalRuns.length === 0) {
		return { runs, total: undefined }
	}

	return {
		runs,
		total: bestRunsTotal(
			finalRuns.map((run) =>
				run.did_not_start ? 0 : run.mean_run_score
			),
			athleteHeat?.number_of_runs_for_score ?? 0
		)
	}
}

const runLabel = (run?: { did_not_start: boolean; mean_run_score: number }) => {
	if (!run) {
		return "-"
	}

	return run.did_not_start ? "DNS" : run.mean_run_score.toFixed(2)
}

const lockedOrDnsRuns = (
	data: PhaseScoresResponse | undefined,
	athleteId: string | undefined
) =>
	(data?.scores.find((s) => s.athlete_id === athleteId)?.run_scores ?? [])
		.filter((run) => run.did_not_start || run.locked)
		.sort((a, b) => a.run_number - b.run_number)

// Mirrors the server's phase total (calculate_heat_scores), restricted to
// locked runs: the server's own total also counts runs still being judged.
const bestRunsTotal = (scores: number[], scoringRuns: number): number =>
	scoringRuns > 0
		? [...scores]
				.sort((a, b) => b - a)
				.slice(0, scoringRuns)
				.reduce((sum, score) => sum + score, 0)
		: 0
