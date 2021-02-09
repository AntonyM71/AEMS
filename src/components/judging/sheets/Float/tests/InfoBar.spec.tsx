import { calculateNewIndex } from "../InfoBar"

test.each([
	[1, 2, 1],
	[-1, 2, 1],
	[2, 2, 0]
])(".returns the correct value with %i and %i)", (a, b, want) => {
	const got = calculateNewIndex(a, b)
	expect(got).toBe(want)
})
