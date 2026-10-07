import { RunScores } from "../../../redux/services/aemsApi"

export const runFormatText = (runs: number, scoringRuns: number): string => {
	const runCount = runs === 1 ? "1 run" : `${runs} runs`
	if (scoringRuns >= runs) {
		return `${runCount}, all count toward the total`
	}
	if (scoringRuns === 1) {
		return `${runCount}, the best one counts toward the total`
	}

	return `${runCount}, best ${scoringRuns} count toward the total`
}

// The server lists every run in the phase, so an unridden run arrives scored 0
// with no judge scores; a locked run with no moves was ridden and scored 0.
const hasScore = (run: Pick<RunScores, "locked" | "judge_scores">) =>
	run.locked || run.judge_scores.length > 0

/** "DNS", the run's score, or "-" until it has one. */
export const runLabel = (run?: RunScores): string => {
	if (run?.did_not_start) {
		return "DNS"
	}
	if (!run || !hasScore(run)) {
		return "-"
	}

	return run.mean_run_score.toFixed(2)
}

/** The scored runs that make up the server's best-N total. A did-not-start run
 * scores zero, so it never displaces a scored run; ties go to the earlier run. */
export const countingRunNumbers = (
	runScores: Pick<
		RunScores,
		| "run_number"
		| "mean_run_score"
		| "did_not_start"
		| "locked"
		| "judge_scores"
	>[],
	scoringRuns: number
): Set<number> =>
	new Set(
		runScores
			.filter((run) => !run.did_not_start && hasScore(run))
			.sort(
				(a, b) =>
					b.mean_run_score - a.mean_run_score ||
					a.run_number - b.run_number
			)
			.slice(0, scoringRuns)
			.map((run) => run.run_number)
	)
