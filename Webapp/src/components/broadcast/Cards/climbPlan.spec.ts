import { climbPlan } from "./climbPlan"

const field = (count: number) =>
	Array.from({ length: count }, (_, i) => `athlete-${i + 1}`)

describe("climbPlan", () => {
	it("starts a new athlete below the last place", () => {
		const before = field(26)
		const after = [...before.slice(0, 8), "new", ...before.slice(8)]

		expect(climbPlan(before, after, "new", 10)).toEqual({
			athleteId: "new",
			from: 26,
			to: 8,
			pushedOutId: "athlete-10"
		})
	})

	it("climbs from the old place on a second-run improvement", () => {
		const before = field(20)
		const climber = before[14]
		const after = [
			...before.slice(0, 3),
			climber,
			...before.slice(3, 14),
			...before.slice(15)
		]

		expect(climbPlan(before, after, climber, null)).toEqual({
			athleteId: climber,
			from: 14,
			to: 3,
			pushedOutId: undefined
		})
	})

	it("pushes no one out when the climb stays above the line", () => {
		const before = field(20)
		const climber = before[6]
		const after = [climber, ...before.slice(0, 6), ...before.slice(7)]

		expect(
			climbPlan(before, after, climber, 10)?.pushedOutId
		).toBeUndefined()
	})

	it("pushes no one out when the climb stays below the line", () => {
		const before = field(20)
		const climber = before[18]
		const after = [
			...before.slice(0, 12),
			climber,
			...before.slice(12, 18),
			before[19]
		]

		expect(
			climbPlan(before, after, climber, 10)?.pushedOutId
		).toBeUndefined()
	})

	it("plans no climb when the place doesn't improve", () => {
		const before = field(10)

		expect(climbPlan(before, before, "athlete-5", 10)).toBeNull()
	})

	it("plans no climb for a new athlete who lands last", () => {
		const before = field(10)

		expect(climbPlan(before, [...before, "new"], "new", 10)).toBeNull()
	})
})
