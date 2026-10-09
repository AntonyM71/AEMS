import { useEffect, useMemo, useRef, useState } from "react"
import {
	AthleteScoresWithAthleteInfo,
	useGetOneByPrimaryKeyPhaseIdGetQuery,
	useGetPhaseScoresGetPhaseScoresPhaseIdGetQuery
} from "../../../redux/services/aemsApi"
import { usePhaseRunStatusStreamQuery } from "../../../redux/services/streamingApi"
import { RunStatus } from "../../roles/headJudge/RunStatus"
import { bestRunsTotal, lockedOrDnsOnly } from "./finalRuns"

// Every reload recalculates the whole phase on the server, so run broadcasts
// that arrive close together share one reload.
export const RUN_STATUS_BURST_MS = 1000

export interface TowerStanding {
	athleteId: string
	firstName: string
	lastName: string
	bib: number
	total: number
	/** Total minus the leader's: zero for the leader, negative for the rest. */
	gapToLeader: number
	/** Score of each final run that wasn't did-not-start, by run number. */
	runScores: Record<number, number>
}

/** The last lock in a burst of run broadcasts, with the standings from before
 * the reload it caused. */
export interface LandedLock {
	lock: RunStatus
	before: TowerStanding[]
}

const toHundredths = (score: number) => Math.round(score * 100) / 100

/** Athletes with a final run that wasn't did-not-start, best final total
 * first. Equal totals keep the server's order. */
export const rankOnFinalRuns = (
	scores: AthleteScoresWithAthleteInfo[],
	scoringRuns: number
): TowerStanding[] => {
	const ranked = scores
		.flatMap((athlete) => {
			const runs = lockedOrDnsOnly(athlete.run_scores)
			const ridden = runs.filter((run) => !run.did_not_start)
			if (ridden.length === 0) {
				return []
			}

			return [
				{
					athleteId: athlete.athlete_id,
					firstName: athlete.first_name,
					lastName: athlete.last_name,
					bib: athlete.bib_number,
					total: toHundredths(
						bestRunsTotal(
							runs.map((run) =>
								run.did_not_start ? 0 : run.mean_run_score
							),
							scoringRuns
						)
					),
					runScores: Object.fromEntries(
						ridden.map((run) => [
							run.run_number,
							run.mean_run_score
						])
					)
				}
			]
		})
		.sort((a, b) => b.total - a.total)
	const leaderTotal = ranked[0]?.total ?? 0

	return ranked.map((standing) => ({
		...standing,
		gapToLeader: toHundredths(standing.total - leaderTotal)
	}))
}

/** The selected phase's standings on final runs and how many athletes are
 * entered in it. Reloads only when a run in the phase changes or the run
 * broadcasts reconnect, never on a timer. */
export const useTowerStandings = (phaseId: string) => {
	const { currentData: phase } = useGetOneByPrimaryKeyPhaseIdGetQuery(
		{ id: phaseId },
		{ skip: !phaseId }
	)
	const { currentData: scores, refetch } =
		useGetPhaseScoresGetPhaseScoresPhaseIdGetQuery(
			{ phaseId },
			{ skip: !phaseId }
		)
	const standings = useMemo(
		() =>
			phase && scores
				? rankOnFinalRuns(scores.scores, phase.number_of_runs_for_score)
				: [],
		[phase, scores]
	)
	const landedLock = useReloadOnRunStatus(phaseId, standings, refetch)

	return {
		phase,
		standings,
		enteredCount: scores?.scores.length ?? 0,
		landedLock
	}
}

const useReloadOnRunStatus = (
	phaseId: string,
	standings: TowerStanding[],
	refetch: () => PromiseLike<unknown>
): LandedLock | null => {
	const { currentData: stream } = usePhaseRunStatusStreamQuery(
		{ phaseId },
		{ skip: !phaseId }
	)
	const latest = stream?.latest
	const connects = stream?.connects ?? 0
	const standingsRef = useRef(standings)
	standingsRef.current = standings
	const refetchRef = useRef(refetch)
	refetchRef.current = refetch
	const pendingLock = useRef<RunStatus | null>(null)
	const [landedLock, setLandedLock] = useState<LandedLock | null>(null)

	useEffect(() => {
		if (!latest || latest.phase_id !== phaseId) {
			return
		}
		if (latest.locked && !latest.did_not_start) {
			pendingLock.current = latest
		}
		const timer = setTimeout(() => {
			const lock = pendingLock.current
			pendingLock.current = null
			const before = standingsRef.current
			void refetchRef.current().then(() => {
				if (lock) {
					setLandedLock({ lock, before })
				}
			})
		}, RUN_STATUS_BURST_MS)

		return () => clearTimeout(timer)
	}, [latest, phaseId])

	// The first connection needs no catch-up: the scores were just fetched.
	useEffect(() => {
		if (connects > 1) {
			void refetchRef.current()
		}
	}, [connects])

	return landedLock
}
