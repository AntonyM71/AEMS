import { createServerClock } from "./serverClock"

describe("createServerClock", () => {
	afterEach(() => {
		jest.useRealTimers()
	})

	it("corrects the local clock when the device is ahead of the server", () => {
		jest.useFakeTimers().setSystemTime(new Date("2024-01-01T00:00:10.000Z"))
		const clock = createServerClock()

		clock.calibrateFromFirstDateHeader(
			new Date("2024-01-01T00:00:00.000Z").toUTCString()
		)

		expect(clock.correctedNow()).toBe(
			new Date("2024-01-01T00:00:00.000Z").getTime()
		)
	})

	it("corrects the local clock when the device is behind the server", () => {
		jest.useFakeTimers().setSystemTime(new Date("2024-01-01T00:00:00.000Z"))
		const clock = createServerClock()

		clock.calibrateFromFirstDateHeader(
			new Date("2024-01-01T00:00:10.000Z").toUTCString()
		)

		expect(clock.correctedNow()).toBe(
			new Date("2024-01-01T00:00:10.000Z").getTime()
		)
	})

	it("keeps the local clock when it already matches the server", () => {
		const now = new Date("2024-01-01T00:00:00.000Z")
		jest.useFakeTimers().setSystemTime(now)
		const clock = createServerClock()

		clock.calibrateFromFirstDateHeader(now.toUTCString())

		expect(clock.correctedNow()).toBe(now.getTime())
	})

	it("falls back to the device clock when the Date header is missing", () => {
		const now = new Date("2024-01-01T00:00:00.000Z")
		jest.useFakeTimers().setSystemTime(now)
		const clock = createServerClock()

		clock.calibrateFromFirstDateHeader(undefined)

		expect(clock.correctedNow()).toBe(now.getTime())
	})

	it("falls back to the device clock when the Date header is unparseable, without throwing", () => {
		const now = new Date("2024-01-01T00:00:00.000Z")
		jest.useFakeTimers().setSystemTime(now)
		const clock = createServerClock()

		expect(() => clock.calibrateFromFirstDateHeader("not a date")).not.toThrow()
		expect(clock.correctedNow()).toBe(now.getTime())
	})

	it("calibrates once and ignores every later Date header", () => {
		jest.useFakeTimers().setSystemTime(new Date("2024-01-01T00:00:00.000Z"))
		const clock = createServerClock()

		clock.calibrateFromFirstDateHeader(
			new Date("2024-01-01T00:00:05.000Z").toUTCString()
		)
		clock.calibrateFromFirstDateHeader(
			new Date("2024-01-01T01:00:00.000Z").toUTCString()
		)

		expect(clock.correctedNow()).toBe(
			new Date("2024-01-01T00:00:05.000Z").getTime()
		)
	})
})
