import { act, screen, waitFor } from "@testing-library/react"
import { modernTimers } from "../../../mocks/modernTimers"
import { socketHub } from "../../../mocks/socketHub"
import { entrant, Entrant, run, servePhase } from "../../../mocks/towerPhase"
import { renderWithProviders } from "../../../testUtils"
import { useTowerStandings } from "../Cards/useTowerStandings"

jest.mock("../../roles/headJudge/WebSocketConnections")

afterEach(() => socketHub.reset())

const broadcast = (
	athleteId: string,
	{ locked = true, didNotStart = false } = {}
) =>
	act(() =>
		socketHub.emit("run_status", "run_status", {
			id: `status-${athleteId}`,
			heat_id: "heat-1",
			phase_id: "phase-1",
			athlete_id: athleteId,
			run_number: 1,
			locked,
			did_not_start: didNotStart
		})
	)

const Standings = () => {
	const { standings, enteredCount } = useTowerStandings("phase-1")

	return (
		<>
			<p>{enteredCount} entered</p>
			<ol>
				{standings.map((s) => (
					<li key={s.athleteId}>
						{s.lastName} {s.total.toFixed(2)}{" "}
						{s.gapToLeader.toFixed(2)}
					</li>
				))}
			</ol>
		</>
	)
}

const listed = async () =>
	(await screen.findAllByRole("listitem")).map((item) => item.textContent)

// A reload waits out the burst window first, so allow well over a second.
const listedAfterReload = (expected: string[]) =>
	waitFor(
		() =>
			expect(
				screen.getAllByRole("listitem").map((item) => item.textContent)
			).toEqual(expected),
		{ timeout: 4000 }
	)

describe("useTowerStandings", () => {
	it("ranks on locked runs only", async () => {
		servePhase([
			entrant("B", 2, [run(1, 850), run(2, 950, { locked: false })]),
			entrant("A", 1, [run(1, 900)])
		])
		renderWithProviders(<Standings />)

		expect(await listed()).toEqual(["A 900.00 0.00", "B 850.00 -50.00"])
	})

	it("leaves off an athlete with no final run", async () => {
		servePhase([
			entrant("A", 1, [run(1, 900)]),
			entrant("Judging", 2, [run(1, 950, { locked: false })])
		])
		renderWithProviders(<Standings />)

		expect(await listed()).toEqual(["A 900.00 0.00"])
		expect(screen.getByText("2 entered")).toBeInTheDocument()
	})

	it("leaves off an athlete whose only final run is did-not-start", async () => {
		servePhase([
			entrant("A", 1, [run(1, 900)]),
			entrant("Absent", 2, [run(1, 0, { didNotStart: true })])
		])
		renderWithProviders(<Standings />)

		expect(await listed()).toEqual(["A 900.00 0.00"])
	})

	it("totals the best two of three", async () => {
		servePhase([entrant("A", 1, [run(1, 300), run(2, 500), run(3, 400)])], {
			runs: 3,
			scoringRuns: 2
		})
		renderWithProviders(<Standings />)

		expect(await listed()).toEqual(["A 900.00 0.00"])
	})

	it("keeps the server's order for equal totals", async () => {
		servePhase([
			entrant("Second", 9, [run(1, 700)]),
			entrant("First", 1, [run(1, 700)])
		])
		renderWithProviders(<Standings />)

		expect(await listed()).toEqual([
			"Second 700.00 0.00",
			"First 700.00 0.00"
		])
	})
})

describe("useTowerStandings reloads", () => {
	// The served field, changed by a test to stand for what the head judge did.
	let field: Entrant[]
	let scoreRequests: { count: number }
	beforeEach(() => {
		field = [entrant("A", 1, [run(1, 900)]), entrant("B", 2, [run(1, 800)])]
		scoreRequests = servePhase(() => field)
	})

	const renderLoaded = async () => {
		renderWithProviders(<Standings />)
		expect(await listed()).toEqual(["A 900.00 0.00", "B 800.00 -100.00"])
	}

	it("redraws when a run is marked did-not-start", async () => {
		await renderLoaded()
		field = [
			entrant("A", 1, [run(1, 0, { didNotStart: true }), run(2, 700)]),
			field[1]
		]
		broadcast("athlete-A", { locked: false, didNotStart: true })

		await listedAfterReload(["B 800.00 0.00", "A 700.00 -100.00"])
	})

	it("redraws when a run is unlocked", async () => {
		await renderLoaded()
		field = [entrant("A", 1, [run(1, 900, { locked: false })]), field[1]]
		broadcast("athlete-A", { locked: false })

		await listedAfterReload(["B 800.00 0.00"])
	})

	it("reloads once for several locks at once", async () => {
		await renderLoaded()
		field = [
			...field,
			entrant("C", 3, [run(1, 950)]),
			entrant("D", 4, [run(1, 850)]),
			entrant("E", 5, [run(1, 750)])
		]
		broadcast("athlete-C")
		broadcast("athlete-D")
		broadcast("athlete-E")

		await listedAfterReload([
			"C 950.00 0.00",
			"A 900.00 -50.00",
			"D 850.00 -100.00",
			"B 800.00 -150.00",
			"E 750.00 -200.00"
		])
		expect(scoreRequests.count).toBe(2)
	})

	it("reloads after reconnecting, to catch a missed lock", async () => {
		await renderLoaded()
		act(() => socketHub.emit("run_status", "connect"))
		field = [...field, entrant("C", 3, [run(1, 950)])]
		act(() => socketHub.emit("run_status", "connect"))

		await listedAfterReload([
			"C 950.00 0.00",
			"A 900.00 -50.00",
			"B 800.00 -150.00"
		])
	})

	it("makes no requests while nothing happens", async () => {
		// Installed before rendering, so a poll would be on the fake clock.
		modernTimers.useFakeTimers({ advanceTimers: true })
		try {
			await renderLoaded()
			await act(async () => {
				await modernTimers.advanceTimersByTimeAsync(5 * 60 * 1000)
			})
		} finally {
			jest.useRealTimers()
		}

		expect(scoreRequests.count).toBe(1)
	})
})
