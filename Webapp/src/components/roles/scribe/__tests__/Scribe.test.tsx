import { screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { http, HttpResponse } from "msw"
import { server } from "../../../../mocks/server"
import { socketHub } from "../../../../mocks/socketHub"
import { competitionInitialState } from "../../../../redux/atoms/competitions"
import { renderWithProviders } from "../../../../testUtils"
import Scribe from "../Scribe"

jest.mock("../../headJudge/WebSocketConnections")

const move = {
	id: "test-move-1",
	name: "Cartwheel",
	fl_score: 10,
	rb_score: 20,
	direction: "LR",
	sheet_id: "sheet-1"
}

interface ScorePost {
	heatId: string
	athleteId: string
	moves: { move_id: string; direction: string }[]
}
let scorePosts: ScorePost[]

const renderScribe = () =>
	renderWithProviders(<Scribe scribeNumber="1" />, {
		preloadedState: {
			competitions: { ...competitionInitialState, selectedHeat: "heat-1" }
		}
	})

/** The scored-move list element, once the page is past its "loading" state. */
const moveListEl = () => screen.findByTestId("scored-move-list")

beforeEach(() => {
	socketHub.reset()
	scorePosts = []
	server.use(
		http.get("/api/availablemoves", () => HttpResponse.json([move])),
		http.post(
			"/api/addUpdateAthleteScore/:heatId/:athleteId/:runNumber/:judgeId",
			async ({ params, request }) => {
				const body = (await request.json()) as {
					moves: { move_id: string; direction: string }[]
				}
				scorePosts.push({
					heatId: String(params.heatId),
					athleteId: String(params.athleteId),
					moves: body.moves ?? []
				})

				return HttpResponse.json({ success: true })
			}
		)
	)
})

describe("Scribe", () => {
	it("records a move on the judge's screen when its direction is tapped", async () => {
		const user = userEvent.setup({ delay: null })
		renderScribe()

		await user.click(await screen.findByTestId("button-test-move-1-l"))

		const list = within(await moveListEl())
		expect(await list.findByText("Cartwheel")).toBeInTheDocument()
		expect(list.getByText("L")).toBeInTheDocument()

		// A POST carrying the tapped move reaches the server — not just the
		// empty mount-time save (known issue #6).
		await waitFor(() =>
			expect(
				scorePosts.some(
					(p) =>
						p.heatId === "heat-1" &&
						p.athleteId === "athlete-1" &&
						p.moves.some(
							(m) =>
								m.move_id === "test-move-1" &&
								m.direction === "L"
						)
				)
			).toBe(true)
		)
	})

	it("blocks scoring and shows a notice while the run is locked", async () => {
		server.use(
			http.get("/api/run_status/", () =>
				HttpResponse.json([
					{
						id: "status-1",
						heat_id: "heat-1",
						run_number: 0,
						phase_id: "phase-1",
						athlete_id: "athlete-1",
						locked: true,
						did_not_start: false
					}
				])
			)
		)
		renderScribe()

		expect(
			await screen.findByText("Run has been locked by head judge")
		).toBeInTheDocument()
		expect(screen.getByTestId("button-test-move-1-l")).toBeDisabled()

		const list = within(await moveListEl())
		expect(list.queryByText("Cartwheel")).not.toBeInTheDocument()
		expect(scorePosts).toHaveLength(0)
	})

	it("shows the judge's previously recorded moves when the page opens", async () => {
		server.use(
			http.get(
				"/api/getAthleteMovesAndBonuses/:heatId/:athleteId/:runNumber",
				() =>
					HttpResponse.json({
						moves: [
							{
								id: "existing-1",
								move_id: "test-move-1",
								heat_id: "heat-1",
								run_number: 0,
								phase_id: "phase-1",
								judge_id: "1",
								athlete_id: "athlete-1",
								direction: "L"
							}
						],
						bonuses: []
					})
			)
		)
		renderScribe()

		const list = within(await moveListEl())
		expect(await list.findByText("Cartwheel")).toBeInTheDocument()
		expect(list.getByText("L")).toBeInTheDocument()
	})

	// The load effect populates the store from the server; that must not trip
	// the auto-submit effect into echoing the same data straight back (two
	// scribe devices on one judge would otherwise stomp each other).
	it("does not re-save the judge's scores merely for loading them", async () => {
		server.use(
			http.get(
				"/api/getAthleteMovesAndBonuses/:heatId/:athleteId/:runNumber",
				() =>
					HttpResponse.json({
						moves: [
							{
								id: "existing-1",
								move_id: "test-move-1",
								heat_id: "heat-1",
								run_number: 0,
								phase_id: "phase-1",
								judge_id: "1",
								athlete_id: "athlete-1",
								direction: "L"
							}
						],
						bonuses: []
					})
			)
		)
		renderScribe()

		const list = within(await moveListEl())
		expect(await list.findByText("Cartwheel")).toBeInTheDocument()

		await new Promise((resolve) => setTimeout(resolve, 300))
		expect(scorePosts).toHaveLength(0)
	})
})
