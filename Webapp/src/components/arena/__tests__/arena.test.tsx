import { act, screen, waitFor } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { renderWithProviders } from "../../../testUtils"
import { socketHub } from "../../../mocks/socketHub"
import { server } from "../../../mocks/server"
import { defaultOverlayControllerState } from "../../Interfaces"
import Arena from "../arena"

jest.mock("../../roles/headJudge/WebSocketConnections")

const broadcast = (state: Partial<typeof defaultOverlayControllerState>) =>
	act(() => {
		socketHub.emit("broadcast_control", "broadcast_control", {
			...defaultOverlayControllerState,
			...state
		})
	})

const selectedAthlete = {
	id: "athlete-1",
	first_name: "Jo",
	last_name: "Rivera",
	bib: "42",
	scoresheet: "sheet-1"
}

describe("Arena", () => {
	beforeEach(() => {
		socketHub.reset()
		server.use(
			http.get("/api/phase/:id", ({ params }) =>
				HttpResponse.json({
					id: params.id,
					name: `Phase detail ${String(params.id)}`,
					number_of_runs: 2
				})
			),
			http.get("/api/heat/:id", ({ params }) =>
				HttpResponse.json({
					// Distinct from the global /api/heat *list* fixture
					// ("Heat 1"/…) so a name query here can't collide.
					id: params.id,
					name: `Heat detail ${String(params.id)}`
				})
			)
		)
	})

	it("shows the athlete and heat the broadcast operator pushes to the screen", async () => {
		renderWithProviders(<Arena />)

		await waitFor(() =>
			expect(socketHub.openCount("broadcast_control")).toBeGreaterThan(0)
		)

		broadcast({
			selectedHeat: "1",
			selectedAthlete,
			showLiveRunScore: true,
			showHeatSummary: true
		})

		// AthleteInfo renders the surname in caps, always visible on the arena
		expect(await screen.findByText("RIVERA")).toBeInTheDocument()
		// The heat summary modal now shows the selected heat's name
		expect(await screen.findByText("Heat detail 1")).toBeInTheDocument()

		broadcast({
			selectedHeat: "1",
			selectedAthlete,
			showLiveRunScore: true,
			showHeatSummary: false
		})

		await waitFor(() =>
			expect(screen.queryByText("Heat detail 1")).not.toBeInTheDocument()
		)
		expect(screen.getByText("RIVERA")).toBeInTheDocument()
	})

	it("slides the phase results in and out as the broadcast operator toggles them", async () => {
		renderWithProviders(<Arena />)
		await waitFor(() =>
			expect(socketHub.openCount("broadcast_control")).toBeGreaterThan(0)
		)

		broadcast({ selectedPhase: "phase-1", showPhaseResults: true })

		expect(
			await screen.findByText("Phase detail phase-1")
		).toBeInTheDocument()
		expect(await screen.findByText("John DOE")).toBeInTheDocument()

		broadcast({ selectedPhase: "phase-1", showPhaseResults: false })

		await waitFor(() =>
			expect(
				screen.queryByText("Phase detail phase-1")
			).not.toBeInTheDocument()
		)
	})

	it("slides the event title in and out as the broadcast operator toggles it", async () => {
		server.use(
			http.get("/api/competition", ({ request }) => {
				const id = new URL(request.url).searchParams.get("id____list")

				return HttpResponse.json([
					{ id, name: `Competition detail ${String(id)}` }
				])
			}),
			http.get("/api/event/:id", ({ params }) =>
				HttpResponse.json({
					id: params.id,
					name: `Event detail ${String(params.id)}`
				})
			)
		)
		renderWithProviders(<Arena />)
		await waitFor(() =>
			expect(socketHub.openCount("broadcast_control")).toBeGreaterThan(0)
		)
		const titleState = {
			selectedCompetition: "1",
			selectedEvent: "event-1",
			selectedPhase: "phase-1"
		}

		broadcast({ ...titleState, showEventTitle: true })

		expect(
			await screen.findByText("Competition detail 1")
		).toBeInTheDocument()
		expect(
			screen.getByText("Event : Event detail event-1")
		).toBeInTheDocument()
		expect(
			screen.getByText("Phase : Phase detail phase-1")
		).toBeInTheDocument()

		broadcast({ ...titleState, showEventTitle: false })

		await waitFor(() =>
			expect(
				screen.queryByText("Competition detail 1")
			).not.toBeInTheDocument()
		)
	})

	it("shows DNS on the live score when the head judge marks the run did-not-start", async () => {
		renderWithProviders(<Arena />)
		await waitFor(() =>
			expect(socketHub.openCount("broadcast_control")).toBeGreaterThan(0)
		)

		broadcast({
			selectedHeat: "1",
			selectedAthlete,
			showLiveRunScore: true
		})

		// SubscribedFinalScore subscribes to run status for the shown athlete.
		await waitFor(() =>
			expect(socketHub.openCount("run_status")).toBeGreaterThan(0)
		)
		await waitFor(() =>
			expect(screen.getByTestId("final-score-value")).toHaveTextContent(
				"0.00"
			)
		)

		act(() => {
			socketHub.emit("run_status", "run_status", {
				heat_id: "1",
				athlete_id: "athlete-1",
				run_number: 0,
				locked: false,
				did_not_start: true
			})
		})

		await waitFor(() =>
			expect(screen.getByTestId("final-score-value")).toHaveTextContent(
				"DNS"
			)
		)
	})

	describe("following the head judge", () => {
		const headJudgeAthlete = {
			id: "athlete-2",
			first_name: "Sam",
			last_name: "Jones",
			bib: "7",
			scoresheet: "sheet-1"
		}
		const headJudgePosition = {
			competitionId: "comp-1",
			heatId: "2",
			athlete: headJudgeAthlete,
			runNumber: 1
		}

		const publishPosition = (position = headJudgePosition) =>
			act(() => {
				socketHub.emit(
					"head_judge_selection",
					"head_judge_selection",
					position
				)
			})

		const renderFollowingArena = async (
			state: Partial<typeof defaultOverlayControllerState> = {}
		) => {
			renderWithProviders(<Arena />)
			await waitFor(() =>
				expect(
					socketHub.openCount("broadcast_control")
				).toBeGreaterThan(0)
			)
			broadcast({
				selectedHeat: "1",
				selectedAthlete,
				followHeadJudge: true,
				...state
			})
			await waitFor(() =>
				expect(
					socketHub.openCount("head_judge_selection")
				).toBeGreaterThan(0)
			)
		}

		it("shows the head judge's paddler without the controller emitting anything", async () => {
			await renderFollowingArena()

			publishPosition()

			expect(await screen.findByText("JONES")).toBeInTheDocument()
			expect(screen.queryByText("RIVERA")).not.toBeInTheDocument()
		})

		it("shows the controller's athlete until a head judge position arrives", async () => {
			await renderFollowingArena()

			expect(await screen.findByText("RIVERA")).toBeInTheDocument()
		})

		it("asks the head judge for its position on entering follow, and adopts the answer", async () => {
			await renderFollowingArena()

			act(() => {
				socketHub.emit("head_judge_selection", "connect")
			})
			expect(socketHub.emittedOn("head_judge_selection")).toContainEqual([
				"request_head_judge_selection"
			])

			publishPosition()
			expect(await screen.findByText("JONES")).toBeInTheDocument()
		})

		it("shows the head judge's heat in the heat summary", async () => {
			await renderFollowingArena({ showHeatSummary: true })

			publishPosition()

			expect(await screen.findByText("Heat detail 2")).toBeInTheDocument()
			expect(screen.queryByText("Heat detail 1")).not.toBeInTheDocument()
		})

		it("keeps the operator's phase in the phase results", async () => {
			await renderFollowingArena({
				selectedPhase: "operator-phase",
				showPhaseResults: true
			})

			publishPosition()
			await screen.findByText("JONES")

			expect(
				await screen.findByText("Phase detail operator-phase")
			).toBeInTheDocument()
		})

		it("ignores the head judge's athlete and heat after returning to Manual", async () => {
			await renderFollowingArena({
				selectedHeat: "",
				showHeatSummary: true
			})
			publishPosition()
			expect(await screen.findByText("JONES")).toBeInTheDocument()
			expect(await screen.findByText("Heat detail 2")).toBeInTheDocument()

			broadcast({
				selectedHeat: "",
				selectedAthlete,
				showHeatSummary: true
			})
			publishPosition()

			expect(await screen.findByText("RIVERA")).toBeInTheDocument()
			expect(screen.queryByText("JONES")).not.toBeInTheDocument()
			await waitFor(() =>
				expect(
					screen.queryByText("Heat detail 2")
				).not.toBeInTheDocument()
			)
		})
	})

	it("asks for the current control state when it connects", async () => {
		renderWithProviders(<Arena />)
		await waitFor(() =>
			expect(socketHub.openCount("broadcast_control")).toBeGreaterThan(0)
		)

		act(() => {
			socketHub.emit("broadcast_control", "connect")
		})

		expect(socketHub.emittedOn("broadcast_control")).toContainEqual([
			"request_broadcast_control"
		])
	})
})
