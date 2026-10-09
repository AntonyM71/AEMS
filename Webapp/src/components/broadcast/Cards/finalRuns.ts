import { RunScores } from "../../../redux/services/aemsApi"

/** The runs the head judge has locked or marked did-not-start, in run order.
 * Only these go to air, so a half-scored run never shows. */
export const lockedOrDnsOnly = (runScores: RunScores[]): RunScores[] =>
	runScores
		.filter((run) => run.did_not_start || run.locked)
		.sort((a, b) => a.run_number - b.run_number)

// Mirrors the server's phase total (calculate_heat_scores), restricted to
// locked runs: the server's own total also counts runs still being judged.
export const bestRunsTotal = (scores: number[], scoringRuns: number): number =>
	[...scores]
		.sort((x, y) => y - x)
		.slice(0, scoringRuns)
		.reduce((sum, score) => sum + score, 0)
