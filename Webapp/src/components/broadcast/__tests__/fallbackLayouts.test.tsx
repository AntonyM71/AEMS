import { ThemeProvider } from "@mui/material/styles"
import { act, screen, within } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { server } from "../../../mocks/server"
import { renderWithProviders } from "../../../testUtils"
import { defaultOverlayControllerState } from "../../Interfaces"
import { EventTitleModal } from "../Cards/EventTitle"
import { HeatListModal } from "../Cards/HeatListModal"
import { PhaseResultsModal } from "../Cards/PhaseResultsModal"
import { lightTheme } from "../overlayTheme"

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

const selection = {
	selectedCompetition: "1",
	selectedEvent: "event-1",
	selectedPhase: "phase-1",
	selectedHeat: "heat-1"
}

const graphicsServerDown = (configName: string) =>
	server.use(
		http.get(
			`/componentInfo/${configName}`,
			() => new HttpResponse(null, { status: 502 })
		)
	)

const servePhase = (numberOfRuns: number, scoringRuns: number) =>
	server.use(
		http.get("/api/phase/:id", ({ params }) =>
			HttpResponse.json({
				id: params.id,
				event_id: "event-1",
				name: "Semi-final",
				number_of_runs: numberOfRuns,
				number_of_runs_for_score: scoringRuns,
				number_of_judges: 3,
				scoresheet: "sheet-1"
			})
		),
		http.get("/api/event/:id", ({ params }) =>
			HttpResponse.json({ id: params.id, name: "K1 Men" })
		)
	)

const athletes = (count: number) =>
	Array.from({ length: count }, (_, index) => ({
		athlete_heat_id: `ah-${index + 1}`,
		heat_id: "heat-1",
		athlete_id: `athlete-${index + 1}`,
		phase_id: "phase-1",
		number_of_runs: 3,
		number_of_runs_for_score: 2,
		scoresheet: "sheet-1",
		first_name: "Paddler",
		last_name: `Number${index + 1}`,
		affiliation: "GBR",
		bib: String(index + 1),
		event_name: "K1 Men"
	}))

const serveHeat = (count: number) =>
	server.use(
		http.get("/api/getHeatInfo/:heatId", () =>
			HttpResponse.json(athletes(count))
		),
		http.get("/api/heat/:id", ({ params }) =>
			HttpResponse.json({ id: params.id, name: "Heat 2" })
		),
		http.get("/api/getHeatInfo/:heatId/phase", () =>
			HttpResponse.json([
				{
					id: "phase-1",
					event_id: "event-1",
					name: "Semi-final",
					number_of_runs: 3,
					number_of_runs_for_score: 2,
					number_of_judges: 3,
					scoresheet: "sheet-1"
				}
			])
		)
	)

const run = (runNumber: number, meanRunScore: number, didNotStart = false) => ({
	run_number: runNumber,
	mean_run_score: meanRunScore,
	did_not_start: didNotStart,
	locked: true,
	highest_scoring_move: 0,
	judge_scores: []
})

const unriddenRun = (runNumber: number) => ({
	...run(runNumber, 0),
	locked: false,
	judge_scores: []
})

const scoredAthlete = (
	rank: number,
	lastName: string,
	runScores: ReturnType<typeof run>[],
	total: number
) => ({
	athlete_id: `athlete-${rank}`,
	first_name: "Paddler",
	last_name: lastName,
	affiliation: "FRA",
	bib_number: 900 + rank,
	ranking: rank,
	highest_scoring_move: 0,
	total_score: total,
	run_scores: runScores
})

const servePhaseScores = (scores: ReturnType<typeof scoredAthlete>[]) =>
	server.use(
		http.get("/api/getPhaseScores/:phaseId", () =>
			HttpResponse.json({ phase_id: "phase-1", scores })
		)
	)

const renderInOverlay = (ui: React.ReactElement) =>
	renderWithProviders(
		<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>,
		{
			preloadedState: { competitions: selection }
		}
	)

describe("event title backup layout", () => {
	it("shows the competition, event, phase and run format with no field labels", async () => {
		graphicsServerDown("eventTitle")
		servePhase(3, 2)

		renderInOverlay(<EventTitleModal isVisible />)

		expect(
			await screen.findByText("3 runs, best 2 count toward the total")
		).toBeInTheDocument()
		expect(screen.getByText("Competition 1")).toBeInTheDocument()
		expect(screen.getByText("K1 Men")).toBeInTheDocument()
		expect(screen.getByText("Semi-final")).toBeInTheDocument()
		expect(
			screen.queryByText(/Event :|Phase :|Runs :/)
		).not.toBeInTheDocument()
	})
})

describe("heat summary backup layout", () => {
	afterEach(() => {
		jest.useRealTimers()
	})

	it("lists the heat's athletes in bib order under the heat, event and phase names", async () => {
		graphicsServerDown("startList")
		serveHeat(8)

		renderInOverlay(<HeatListModal isVisible />)

		expect(await screen.findByText("Paddler NUMBER8")).toBeInTheDocument()
		expect(screen.getByText("Heat 2")).toBeInTheDocument()
		expect(await screen.findByText("Semi-final")).toBeInTheDocument()
		expect(screen.getByText("K1 Men")).toBeInTheDocument()
		const names = screen
			.getAllByText(/^Paddler NUMBER/)
			.map((name) => name.textContent)
		expect(names).toEqual(
			Array.from({ length: 8 }, (_, i) => `Paddler NUMBER${i + 1}`)
		)
		expect(screen.queryByText(/^Page/)).not.toBeInTheDocument()
	})

	it("pages a heat of twelve ten at a time", async () => {
		jest.useFakeTimers()
		graphicsServerDown("startList")
		serveHeat(12)

		renderInOverlay(<HeatListModal isVisible />)

		expect(await screen.findByText("Page 1/2")).toBeInTheDocument()
		expect(screen.getByText("Paddler NUMBER10")).toBeInTheDocument()
		expect(screen.queryByText("Paddler NUMBER11")).not.toBeInTheDocument()

		act(() => {
			jest.advanceTimersByTime(5000)
		})

		expect(screen.getByText("Page 2/2")).toBeInTheDocument()
		expect(screen.getByText("Paddler NUMBER11")).toBeInTheDocument()
		expect(screen.getByText("Paddler NUMBER12")).toBeInTheDocument()
	})

	it("marks only the selected athlete as on the water", async () => {
		graphicsServerDown("startList")
		serveHeat(8)

		renderInOverlay(
			<HeatListModal isVisible selectedAthleteId="athlete-3" />
		)

		const label = await screen.findByText("On the water")
		expect(screen.getAllByText("On the water")).toHaveLength(1)
		// eslint-disable-next-line testing-library/no-node-access
		const tile = label.closest(".AemsHeatGrid-onWater") as HTMLElement
		expect(within(tile).getByText("Paddler NUMBER3")).toBeInTheDocument()
	})

	it("marks no one when the selected athlete is in another heat", async () => {
		graphicsServerDown("startList")
		serveHeat(8)

		renderInOverlay(
			<HeatListModal isVisible selectedAthleteId="athlete-99" />
		)

		expect(await screen.findByText("Paddler NUMBER8")).toBeInTheDocument()
		expect(screen.queryByText("On the water")).not.toBeInTheDocument()
	})
})

describe("phase results backup layout", () => {
	const renderLeaderboard = () =>
		renderInOverlay(
			<PhaseResultsModal
				isVisible
				overlayControlState={{
					...defaultOverlayControllerState,
					...selection,
					showPhaseResults: true
				}}
			/>
		)

	it("shows each athlete's rank, runs and total, with the counting runs in bold", async () => {
		graphicsServerDown("phaseResults")
		servePhase(3, 2)
		servePhaseScores([
			scoredAthlete(
				1,
				"Moreau",
				[run(0, 812.5), run(1, 1040), run(2, 986.25)],
				2026.25
			),
			scoredAthlete(
				2,
				"Hargreaves",
				[run(0, 890), run(1, 905.5), run(2, 0, true)],
				1795.5
			),
			scoredAthlete(
				3,
				"Lang",
				[run(0, 640), unriddenRun(1), unriddenRun(2)],
				640
			)
		])

		renderLeaderboard()

		expect(await screen.findByText("2026.25")).toBeInTheDocument()
		expect(
			screen.getByText("3 runs, best 2 count toward the total")
		).toBeInTheDocument()
		expect(screen.getByText("Paddler MOREAU")).toBeInTheDocument()
		expect(screen.queryByText("901")).not.toBeInTheDocument()

		const weightOf = (text: string) =>
			// eslint-disable-next-line testing-library/no-node-access
			screen.getByText(text).closest(".AemsLeaderboard-run")
		expect(weightOf("1040.00")).toHaveStyle({ fontWeight: 700 })
		expect(weightOf("986.25")).toHaveStyle({ fontWeight: 700 })
		expect(weightOf("812.50")).toHaveStyle({ fontWeight: 400 })
		expect(weightOf("DNS")).toHaveStyle({ fontWeight: 400 })
		expect(weightOf("905.50")).toHaveStyle({ fontWeight: 700 })
		const unscored = screen.getAllByText("-").map((cell) =>
			// eslint-disable-next-line testing-library/no-node-access
			cell.closest(".AemsLeaderboard-run")
		)
		expect(unscored).toHaveLength(2)
		unscored.forEach((cell) =>
			expect(cell).toHaveStyle({ fontWeight: 400 })
		)
	})

	it("pages more than eight athletes", async () => {
		graphicsServerDown("phaseResults")
		servePhase(3, 2)
		servePhaseScores(
			Array.from({ length: 9 }, (_, i) =>
				scoredAthlete(
					i + 1,
					`Racer${i + 1}`,
					[run(0, 100 - i)],
					100 - i
				)
			)
		)

		renderLeaderboard()

		expect(await screen.findByText("Page 1/2")).toBeInTheDocument()
		expect(screen.getByText("Paddler RACER8")).toBeInTheDocument()
		expect(screen.queryByText("Paddler RACER9")).not.toBeInTheDocument()
	})
})
