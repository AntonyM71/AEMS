import { http, HttpResponse } from "msw"
import { server } from "./server"

// Phase scores fixtures for the leaderboard tower's tests.

export const run = (
	runNumber: number,
	meanRunScore: number,
	options: { didNotStart?: boolean; locked?: boolean } = {}
) => ({
	run_number: runNumber,
	mean_run_score: meanRunScore,
	did_not_start: options.didNotStart ?? false,
	locked: options.locked ?? true,
	highest_scoring_move: 0,
	judge_scores: [{ judge_id: "1", score_info: { score: meanRunScore } }]
})

export const entrant = (
	lastName: string,
	bib: number,
	runScores: ReturnType<typeof run>[]
) => ({
	athlete_id: `athlete-${lastName}`,
	first_name: "First",
	last_name: lastName,
	bib_number: bib,
	highest_scoring_move: 0,
	// The server's total also counts runs still being judged.
	total_score: 9999,
	run_scores: runScores
})

export type Entrant = ReturnType<typeof entrant>

/** Serves phase-1 and its scores; returns a counter of score requests. */
export const servePhase = (
	scores: Entrant[] | (() => Entrant[]),
	{ runs = 2, scoringRuns = 1 } = {}
) => {
	const scoreRequests = { count: 0 }
	server.use(
		http.get("/api/phase/:id", () =>
			HttpResponse.json({
				id: "phase-1",
				event_id: "event-1",
				name: "Preliminaries",
				number_of_runs: runs,
				number_of_runs_for_score: scoringRuns,
				number_of_judges: 1,
				scoresheet: "sheet-1"
			})
		),
		http.get("/api/event/:id", () =>
			HttpResponse.json({
				id: "event-1",
				competition_id: "competition-1",
				name: "Men's K1"
			})
		),
		http.get("/api/getPhaseScores/:phaseId", () => {
			scoreRequests.count += 1

			return HttpResponse.json({
				phase_id: "phase-1",
				scores: typeof scores === "function" ? scores() : scores
			})
		})
	)

	return scoreRequests
}

/** A field of `count` athletes with one locked run each, best first:
 * "Athlete1" scores 1000, "Athlete2" 990, and so on. */
export const fieldOf = (count: number): Entrant[] =>
	Array.from({ length: count }, (_, i) =>
		entrant(`Athlete${i + 1}`, i + 1, [run(1, 1000 - i * 10)])
	)
