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

/** The scored runs that make up the server's best-N total. A did-not-start run
 * scores zero, so it never displaces a scored run; ties go to the earlier run. */
export const countingRunNumbers = (
	runScores: Pick<
		RunScores,
		"run_number" | "mean_run_score" | "did_not_start"
	>[],
	scoringRuns: number
): Set<number> =>
	new Set(
		runScores
			.filter((run) => !run.did_not_start)
			.sort(
				(a, b) =>
					b.mean_run_score - a.mean_run_score ||
					a.run_number - b.run_number
			)
			.slice(0, scoringRuns)
			.map((run) => run.run_number)
	)
