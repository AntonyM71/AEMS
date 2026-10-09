import { towerLayout } from "./towerLayout"

// Sections as "first–last place: rows", 1-based like the places on screen.
const describeLayout = (...args: Parameters<typeof towerLayout>) =>
	towerLayout(...args).map(
		({ places, rows }) =>
			`${places[0] + 1}–${places[places.length - 1] + 1}: ${rows}`
	)

describe("towerLayout", () => {
	it("pins the medals and the bubble with ten places through", () => {
		expect(
			describeLayout(26, { placesThrough: 10, qualifierRows: null })
		).toEqual(["1–3: 3", "4–8: 5", "9–12: 4", "13–26: 6"])
	})

	it("shows everyone when the whole field is currently through", () => {
		expect(
			describeLayout(7, { placesThrough: 10, qualifierRows: null })
		).toEqual(["1–7: 7"])
	})

	it("pins only the medals when places through is not set", () => {
		expect(
			describeLayout(26, { placesThrough: null, qualifierRows: null })
		).toEqual(["1–3: 3", "4–26: 15"])
	})

	it("rotates the qualifiers three at a time when asked", () => {
		expect(
			describeLayout(26, { placesThrough: 10, qualifierRows: 3 })
		).toEqual(["1–3: 3", "4–8: 3", "9–12: 4", "13–26: 8"])
	})

	it("rotates the qualifiers even when the whole field would fit", () => {
		expect(
			describeLayout(12, { placesThrough: 10, qualifierRows: 2 })
		).toEqual(["1–3: 3", "4–8: 2", "9–12: 4"])
	})

	it("shows a small field in full with nothing rotating", () => {
		expect(
			describeLayout(12, { placesThrough: null, qualifierRows: null })
		).toEqual(["1–12: 12"])
	})

	it("never uses more than eighteen rows", () => {
		for (const placesThrough of [null, 2, 4, 10, 16, 30]) {
			for (const qualifierRows of [null, 2, 3, 4]) {
				const rows = towerLayout(40, { placesThrough, qualifierRows })
					.map((section) => section.rows)
					.reduce((sum, r) => sum + r, 0)
				expect(rows).toBeLessThanOrEqual(18)
			}
		}
	})

	it("starts the bubble after the medals when few go through", () => {
		expect(
			describeLayout(26, { placesThrough: 4, qualifierRows: null })
		).toEqual(["1–3: 3", "4–6: 3", "7–26: 12"])
	})
})
