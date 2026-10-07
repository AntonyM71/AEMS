import { countingRunNumbers, runFormatText } from "./runFormat"

describe("runFormatText", () => {
	it("names how many of the runs count when it is fewer than all", () => {
		expect(runFormatText(3, 2)).toBe(
			"3 runs, best 2 count toward the total"
		)
	})

	it("says every run counts when they all do", () => {
		expect(runFormatText(2, 2)).toBe("2 runs, all count toward the total")
	})

	it("says the best one counts when only one does", () => {
		expect(runFormatText(3, 1)).toBe(
			"3 runs, the best one counts toward the total"
		)
	})

	it("uses the singular for a one-run phase", () => {
		expect(runFormatText(1, 1)).toBe("1 run, all count toward the total")
	})
})

const run = (
	run_number: number,
	mean_run_score: number,
	did_not_start = false,
	scored = true
) => ({
	run_number,
	mean_run_score,
	did_not_start,
	locked: scored,
	judge_scores: []
})

describe("countingRunNumbers", () => {
	it("picks the best two of three runs", () => {
		expect(
			countingRunNumbers([run(1, 812.5), run(2, 1040), run(3, 986.25)], 2)
		).toEqual(new Set([2, 3]))
	})

	it("never counts a did-not-start run", () => {
		expect(
			countingRunNumbers([run(1, 890), run(2, 905.5), run(3, 0, true)], 2)
		).toEqual(new Set([1, 2]))
	})

	it("counts only the runs that have been scored", () => {
		expect(
			countingRunNumbers([run(1, 700), run(2, 0, false, false)], 2)
		).toEqual(new Set([1]))
	})

	it("gives a tie for the last counting place to the earlier run", () => {
		expect(
			countingRunNumbers([run(3, 600), run(1, 900), run(2, 600)], 2)
		).toEqual(new Set([1, 2]))
	})
})
