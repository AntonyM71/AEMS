import { sortByName, windowAround } from "./useCompetitionOverview"

describe("sortByName", () => {
	it("orders heats by their number, not character by character", () => {
		const names = sortByName(
			["Heat 10", "Heat 2", "Heat 1"].map((name) => ({ name }))
		).map((heat) => heat.name)

		expect(names).toEqual(["Heat 1", "Heat 2", "Heat 10"])
	})
})

describe("windowAround", () => {
	it("keeps the current entry fourth in the middle of a long list", () => {
		expect(windowAround(12, 6)).toEqual([3, 11])
	})

	it("stops at the end of the list", () => {
		expect(windowAround(12, 11)).toEqual([4, 12])
	})

	it("shows every entry of a short list", () => {
		expect(windowAround(5, 2)).toEqual([0, 5])
	})

	it("starts at the top when nothing is selected", () => {
		expect(windowAround(12, -1)).toEqual([0, 8])
	})
})
