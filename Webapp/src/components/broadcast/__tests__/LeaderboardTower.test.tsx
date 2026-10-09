/* eslint-disable testing-library/no-node-access -- the tower's rows are
   located by their class names, as the other broadcast card tests do. */
import { act, screen, waitFor, within } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { modernTimers } from "../../../mocks/modernTimers"
import { server } from "../../../mocks/server"
import { socketHub } from "../../../mocks/socketHub"
import {
	entrant,
	Entrant,
	fieldOf,
	run,
	servePhase
} from "../../../mocks/towerPhase"
import { renderWithProviders } from "../../../testUtils"
import {
	defaultOverlayControllerState,
	OverlayControlState
} from "../../Interfaces"
import {
	LeaderboardTower,
	LeaderboardTowerModal
} from "../Cards/LeaderboardTower"
import Overlay from "../overlay"

jest.mock("../../roles/headJudge/WebSocketConnections")
jest.mock(
	"next/dynamic",
	() =>
		jest.requireActual<typeof import("../../../mocks/nextDynamicPixiMock")>(
			"../../../mocks/nextDynamicPixiMock"
		).nextDynamicPixiMock
)
jest.mock(
	"pixi.js",
	() =>
		jest.requireActual<typeof import("../../../mocks/pixiMock")>(
			"../../../mocks/pixiMock"
		).pixiMock
)

const towerState = (
	state: Partial<OverlayControlState> = {}
): OverlayControlState => ({
	...defaultOverlayControllerState,
	selectedPhase: "phase-1",
	showLeaderboardTower: true,
	...state
})

const broadcast = (state: Partial<OverlayControlState>) =>
	act(() =>
		socketHub.emit(
			"broadcast_control",
			"broadcast_control",
			towerState(state)
		)
	)

const rows = (container: ParentNode = document) =>
	Array.from(container.querySelectorAll(".AemsTower-row"))

const placesShown = () =>
	rows().map((row) => row.querySelector(".AemsTower-place")?.textContent)

const rowAtPlace = (place: number) =>
	rows().find(
		(row) =>
			row.querySelector(".AemsTower-place")?.textContent === `${place}`
	)

beforeEach(() => {
	socketHub.reset()
	server.use(
		http.get(
			"/componentInfo/:name",
			() => new HttpResponse(null, { status: 502 })
		)
	)
})

describe("Leaderboard tower on the overlay", () => {
	const renderOverlay = async () => {
		renderWithProviders(<Overlay />)
		await waitFor(() =>
			expect(socketHub.openCount("broadcast_control")).toBeGreaterThan(0)
		)
	}

	it("pins the medals and the bubble around the cut line", async () => {
		servePhase(fieldOf(26))
		await renderOverlay()
		broadcast({ towerPlacesThrough: 10 })

		expect(await screen.findByText("Top 10 through")).toBeInTheDocument()
		const tower = within(
			document.querySelector(".AemsTower-root") as HTMLElement
		)
		expect(await tower.findByText("Men's K1")).toBeInTheDocument()
		expect(tower.getByText("Preliminaries")).toBeInTheDocument()
		expect(tower.getByText("26/26")).toBeInTheDocument()
		expect(rows().length).toBeLessThanOrEqual(18)
		expect(placesShown().slice(0, 12)).toEqual(
			Array.from({ length: 12 }, (_, i) => `${i + 1}`)
		)
		expect(rowAtPlace(1)).toHaveTextContent("ATHLETE1")
		expect(rowAtPlace(1)).toHaveTextContent("Leader")
		expect(rowAtPlace(2)).toHaveTextContent("−10.00")
	})

	it("moves the run corner inwards only while the tower is on air", async () => {
		servePhase(fieldOf(5))
		await renderOverlay()
		const runCornerLayer = () =>
			document.querySelector(".AemsRunCorner-layer") as HTMLElement

		broadcast({ showLiveRunScore: true, showLeaderboardTower: false })
		await waitFor(() =>
			expect(runCornerLayer()).toHaveStyle({ transform: "none" })
		)

		broadcast({ showLiveRunScore: true })
		await waitFor(() =>
			expect(runCornerLayer()).toHaveStyle({
				transform: "translateX(-336px)"
			})
		)

		broadcast({ showLiveRunScore: true, showLeaderboardTower: false })
		await waitFor(() =>
			expect(runCornerLayer()).toHaveStyle({ transform: "none" })
		)
	})

	it("slides in when shown and is removed once hidden", async () => {
		servePhase(fieldOf(5))
		await renderOverlay()

		broadcast({})
		expect(await screen.findByText("ATHLETE1")).toBeInTheDocument()

		broadcast({ showLeaderboardTower: false })
		await waitFor(() =>
			expect(screen.queryByText("ATHLETE1")).not.toBeInTheDocument()
		)
	})
})

describe("Leaderboard tower climbs", () => {
	// The served field, changed by a test to stand for the head judge's locks.
	let field: Entrant[]
	beforeEach(() => {
		field = fieldOf(26)
		servePhase(() => field)
		modernTimers.useFakeTimers({ advanceTimers: true })
	})
	afterEach(() => jest.useRealTimers())

	const lock = (athleteId: string, runNumber = 0) =>
		act(() =>
			socketHub.emit("run_status", "run_status", {
				id: `status-${athleteId}-${runNumber}`,
				heat_id: "heat-1",
				phase_id: "phase-1",
				athlete_id: athleteId,
				run_number: runNumber,
				locked: true,
				did_not_start: false
			})
		)
	const elapse = (ms: number) =>
		act(() => modernTimers.advanceTimersByTimeAsync(ms))
	const climber = () => document.querySelector(".AemsTower-climber")
	const climberPlace = () =>
		climber()?.querySelector(".AemsTower-place")?.textContent
	const renderTower = async (state: Partial<OverlayControlState> = {}) => {
		renderWithProviders(
			<LeaderboardTower
				overlayControlState={towerState({
					towerPlacesThrough: 10,
					...state
				})}
			/>
		)
		await screen.findByText("ATHLETE1")
	}
	// Athlete9 has 920 and Athlete8 930, so 925 lands in 9th.
	const newcomerScoring = (score: number) =>
		entrant("Newcomer", 99, [run(0, score)])

	it("climbs a new athlete from below the last place into the bubble", async () => {
		await renderTower()
		field = [...field, newcomerScoring(925)]
		lock("athlete-Newcomer")
		await elapse(1500)

		expect(climberPlace()).toBe("27")
		await elapse(1000)
		expect(climber()).toHaveTextContent("First Newcomer")
		expect(climber()).toHaveTextContent("Run 1")
		expect(climber()).toHaveTextContent("925.00")

		await elapse(8000)
		expect(climberPlace()).toBe("9")
		expect(rowAtPlace(11)).toHaveTextContent("ATHLETE10")
		expect(rowAtPlace(11)).toHaveClass("AemsTower-pushedOut")

		await elapse(4000)
		expect(climber()).toBeNull()
		expect(rowAtPlace(9)).toHaveTextContent("NEWCOMER")
		expect(rowAtPlace(9)).toHaveClass("AemsTower-justClimbed")

		await elapse(3500)
		expect(rowAtPlace(9)).not.toHaveClass("AemsTower-justClimbed")
	})

	it("climbs from the old place on a second-run improvement", async () => {
		await renderTower()
		field = field.map((athlete, i) =>
			i === 14
				? { ...athlete, run_scores: [run(0, 860), run(1, 975)] }
				: athlete
		)
		lock("athlete-Athlete15", 1)
		await elapse(1500)

		expect(climberPlace()).toBe("15")
		expect(climber()).toHaveTextContent("Run 2")
		expect(climber()).toHaveTextContent("975.00")
		await elapse(8000)
		expect(climberPlace()).toBe("4")
	})

	it("redraws in place when the climb is switched off", async () => {
		await renderTower({ towerClimb: false })
		field = [...field, newcomerScoring(925)]
		lock("athlete-Newcomer")
		await elapse(1500)

		expect(climber()).toBeNull()
		expect(rowAtPlace(9)).toHaveTextContent("NEWCOMER")
	})

	it("plays a lock that arrives mid-climb after the current climb", async () => {
		await renderTower()
		field = [...field, newcomerScoring(925)]
		lock("athlete-Newcomer")
		await elapse(1500)
		field = field.map((athlete, i) =>
			i === 19
				? { ...athlete, run_scores: [run(0, 815), run(1, 995)] }
				: athlete
		)
		lock("athlete-Athlete20", 1)
		await elapse(1500)

		expect(climber()).toHaveTextContent("NEWCOMER")
		await elapse(12000)
		expect(climber()).toHaveTextContent("ATHLETE20")
	})

	it("climbs only the last of two locks within a second", async () => {
		await renderTower()
		field = [
			...field.map((athlete, i) =>
				i === 19
					? { ...athlete, run_scores: [run(0, 815), run(1, 995)] }
					: athlete
			),
			newcomerScoring(925)
		]
		lock("athlete-Athlete20", 1)
		lock("athlete-Newcomer")
		await elapse(1500)

		expect(climber()).toHaveTextContent("NEWCOMER")
		expect(rowAtPlace(2)).toHaveTextContent("ATHLETE20")
		await elapse(14000)
		expect(climber()).toBeNull()
	})

	it("starts the next queued climb from that climber's own place", async () => {
		await renderTower()
		// Every place the climbing row is drawn at, in order, per athlete.
		const drawnAt: Record<string, string[]> = {}
		const observer = new MutationObserver(() => {
			const row = climber()
			const name = row?.querySelector(".AemsTower-name")?.textContent
			const place = climberPlace()
			if (name && place && drawnAt[name]?.at(-1) !== place) {
				drawnAt[name] = [...(drawnAt[name] ?? []), place]
			}
		})
		observer.observe(document.body, {
			subtree: true,
			childList: true,
			characterData: true,
			attributes: true
		})
		field = [...field, newcomerScoring(925)]
		lock("athlete-Newcomer")
		await elapse(1500)
		field = field.map((athlete, i) =>
			i === 19
				? { ...athlete, run_scores: [run(0, 815), run(1, 995)] }
				: athlete
		)
		lock("athlete-Athlete20", 1)
		await elapse(14000)
		observer.disconnect()

		// 21st, not 20th: the newcomer has joined above Athlete20 by then.
		expect(drawnAt.ATHLETE20?.[0]).toBe("21")
	})

	it("drops a lock from the previous phase when the operator changes phase", async () => {
		const phaseTwo = fieldOf(5).map((athlete) => ({
			...athlete,
			last_name: `Semi${athlete.last_name}`
		}))
		const scoreRequests: Record<string, number> = {}
		server.use(
			http.get("/api/getPhaseScores/:phaseId", ({ params }) => {
				const phaseId = String(params.phaseId)
				scoreRequests[phaseId] = (scoreRequests[phaseId] ?? 0) + 1

				return HttpResponse.json({
					phase_id: phaseId,
					scores: phaseId === "phase-2" ? phaseTwo : field
				})
			})
		)
		const { rerender } = renderWithProviders(
			<LeaderboardTowerModal
				overlayControlState={towerState({ towerPlacesThrough: 10 })}
			/>
		)
		await screen.findByText("ATHLETE1")
		field = [...field, newcomerScoring(925)]
		lock("athlete-Newcomer")
		await elapse(300)

		rerender(
			<LeaderboardTowerModal
				overlayControlState={towerState({
					towerPlacesThrough: 10,
					selectedPhase: "phase-2"
				})}
			/>
		)
		expect(await screen.findByText("SEMIATHLETE1")).toBeInTheDocument()
		await elapse(3000)

		expect(climber()).toBeNull()
		expect(scoreRequests["phase-2"]).toBe(1)
	})
})

describe("Leaderboard tower styles", () => {
	it("draws the athletes below the cut line as not going through", async () => {
		servePhase(fieldOf(12))
		renderWithProviders(
			<LeaderboardTower
				overlayControlState={towerState({
					towerStyle: "waterline",
					towerPlacesThrough: 10
				})}
			/>
		)
		await screen.findByText("Top 10 through")

		expect(document.querySelector(".AemsTower-waterline")).not.toBeNull()
		const out = rows()
			.filter((row) => row.classList.contains("AemsTower-out"))
			.map((row) => row.querySelector(".AemsTower-place")?.textContent)
		expect(out).toEqual(["11", "12"])
	})

	it("keeps a rotating window on its page when the style changes", async () => {
		servePhase(fieldOf(26))
		modernTimers.useFakeTimers({ advanceTimers: true })
		try {
			const { rerender } = renderWithProviders(
				<LeaderboardTower
					overlayControlState={towerState({ towerPlacesThrough: 10 })}
				/>
			)
			await screen.findByText("ATHLETE13")
			await act(() => modernTimers.advanceTimersByTimeAsync(5000))
			expect(await screen.findByText("ATHLETE19")).toBeInTheDocument()

			rerender(
				<LeaderboardTower
					overlayControlState={towerState({
						towerPlacesThrough: 10,
						towerStyle: "waterline"
					})}
				/>
			)

			expect(screen.getByText("ATHLETE19")).toBeInTheDocument()
			expect(screen.queryByText("ATHLETE13")).not.toBeInTheDocument()
		} finally {
			jest.useRealTimers()
		}
	})
})
