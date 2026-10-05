import { ThemeProvider } from "@mui/material/styles"
import { act, screen, waitFor, within } from "@testing-library/react"
import { delay, http, HttpResponse } from "msw"
import { server } from "../../../mocks/server"
import { socketHub } from "../../../mocks/socketHub"
import { renderWithProviders } from "../../../testUtils"
import { defaultOverlayControllerState } from "../../Interfaces"
import { AthleteOverview } from "../Cards/AthleteOverview"
import { lightTheme } from "../overlayTheme"

jest.mock("../../roles/headJudge/WebSocketConnections")

const athlete = {
	id: "athlete-1",
	first_name: "Robert",
	last_name: "Geary",
	bib: "14",
	scoresheet: "sheet-1",
	affiliation: "IRL"
}

const run = (
	runNumber: number,
	meanRunScore: number,
	options: { didNotStart?: boolean; locked?: boolean } = {}
) => ({
	run_number: runNumber,
	mean_run_score: meanRunScore,
	did_not_start: options.didNotStart ?? false,
	locked: options.locked ?? true,
	highest_scoring_move: 0,
	judge_scores: [{ judge_id: "1", score_info: { score: meanRunScore } }]
})

// The server's total also counts runs still being judged, so it is set to a
// value the card must never show.
const servePhaseScores = (runScores: ReturnType<typeof run>[]) =>
	server.use(
		http.get("/api/getPhaseScores/:phaseId", () =>
			HttpResponse.json({
				phase_id: "phase-1",
				scores: [
					{
						athlete_id: athlete.id,
						first_name: athlete.first_name,
						last_name: athlete.last_name,
						bib_number: 14,
						highest_scoring_move: 0,
						total_score: 999.99,
						run_scores: runScores
					}
				]
			})
		)
	)

const renderOverview = () =>
	renderWithProviders(
		<ThemeProvider theme={lightTheme}>
			<AthleteOverview
				overlayControlState={{
					...defaultOverlayControllerState,
					selectedHeat: "heat-1",
					selectedAthlete: athlete,
					showAthleteOverview: true
				}}
			/>
		</ThemeProvider>
	)

const runCells = () => {
	// eslint-disable-next-line testing-library/no-node-access
	const runsRow = document.querySelector(".AemsAthleteOverview-runs")

	return within(runsRow as HTMLElement)
}

const runHeaders = () =>
	runCells()
		.getAllByText(/^Run \d$/)
		.map((label) => label.textContent)

describe("AthleteOverview", () => {
	beforeEach(() => {
		socketHub.reset()
	})

	it("shows locked runs and their best-two total, with a dash for a run still being judged", async () => {
		servePhaseScores([
			run(1, 512.5),
			run(0, 340),
			run(2, 777, { locked: false })
		])

		renderOverview()

		expect(await screen.findByText("852.50")).toBeInTheDocument()
		expect(screen.getByText("Robert GEARY")).toBeInTheDocument()
		expect(screen.getByText("14")).toBeInTheDocument()
		expect(screen.getByText("IRL")).toBeInTheDocument()
		expect(runHeaders()).toEqual(["Run 1", "Run 2", "Run 3"])
		expect(runCells().getByText("340.00")).toBeInTheDocument()
		expect(runCells().getByText("512.50")).toBeInTheDocument()
		expect(runCells().getByText("-")).toBeInTheDocument()
		expect(screen.queryByText("777.00")).not.toBeInTheDocument()
		expect(screen.queryByText("999.99")).not.toBeInTheDocument()
	})

	it("shows DNS for a did-not-start run, counting it as zero", async () => {
		servePhaseScores([run(0, 340), run(1, 0, { didNotStart: true })])

		renderOverview()

		expect(await runCells().findByText("DNS")).toBeInTheDocument()
		// One cell and the total (340.00 + DNS as 0).
		expect(screen.getAllByText("340.00")).toHaveLength(2)
	})

	it("shows a locked run that scored nothing as 0.00, not a dash", async () => {
		servePhaseScores([run(0, 0)])

		renderOverview()

		expect(await runCells().findByText("0.00")).toBeInTheDocument()
		expect(runCells().getAllByText("-")).toHaveLength(2)
		expect(runCells().queryByText("DNS")).not.toBeInTheDocument()
		expect(screen.getAllByText("0.00")).toHaveLength(2)
	})

	it("drops the previous selection's runs while the new heat loads", async () => {
		servePhaseScores([run(0, 340)])
		const state = {
			...defaultOverlayControllerState,
			selectedHeat: "heat-1",
			selectedAthlete: athlete,
			showAthleteOverview: true
		}
		const { rerender } = renderWithProviders(
			<ThemeProvider theme={lightTheme}>
				<AthleteOverview overlayControlState={state} />
			</ThemeProvider>
		)
		expect(await runCells().findByText("340.00")).toBeInTheDocument()
		server.use(
			http.get("/api/getHeatInfo/heat-2", async () => {
				await delay("infinite")
			})
		)

		rerender(
			<ThemeProvider theme={lightTheme}>
				<AthleteOverview
					overlayControlState={{ ...state, selectedHeat: "heat-2" }}
				/>
			</ThemeProvider>
		)

		await waitFor(() =>
			expect(screen.queryByText("340.00")).not.toBeInTheDocument()
		)
	})

	it("shows a header for every run before any run is final", async () => {
		servePhaseScores([])

		renderOverview()

		await waitFor(() =>
			expect(runHeaders()).toEqual(["Run 1", "Run 2", "Run 3"])
		)
		expect(runCells().getAllByText("-")).toHaveLength(3)
	})

	it("shows a cell for every run of a five-run phase", async () => {
		server.use(
			http.get("/api/getHeatInfo/:heatId", () =>
				HttpResponse.json([
					{
						athlete_heat_id: "ah-1",
						heat_id: "heat-1",
						athlete_id: athlete.id,
						phase_id: "phase-1",
						number_of_runs: 5,
						number_of_runs_for_score: 2,
						scoresheet: "sheet-1",
						first_name: athlete.first_name,
						last_name: athlete.last_name,
						bib: athlete.bib,
						event_name: "Men's K1"
					}
				])
			)
		)
		servePhaseScores([0, 1, 2, 3, 4].map((n) => run(n, 100 + n)))

		renderOverview()

		expect(await runCells().findByText("Run 5")).toBeInTheDocument()
		expect(runHeaders()).toHaveLength(5)
		expect(await screen.findByText("207.00")).toBeInTheDocument()
	})

	it("shows a run the moment the head judge locks it", async () => {
		let run2Locked = false
		server.use(
			http.get("/api/getPhaseScores/:phaseId", () =>
				HttpResponse.json({
					phase_id: "phase-1",
					scores: [
						{
							athlete_id: athlete.id,
							first_name: athlete.first_name,
							last_name: athlete.last_name,
							bib_number: 14,
							highest_scoring_move: 0,
							total_score: 999.99,
							run_scores: [
								run(0, 340),
								run(1, 512.5, { locked: run2Locked })
							]
						}
					]
				})
			)
		)

		renderOverview()
		expect(await runCells().findByText("340.00")).toBeInTheDocument()
		await waitFor(() =>
			expect(socketHub.openCount("run_status")).toBeGreaterThan(0)
		)

		run2Locked = true
		act(() => {
			socketHub.emit("run_status", "run_status", {
				heat_id: "heat-1",
				athlete_id: athlete.id,
				run_number: 1,
				locked: true,
				did_not_start: false
			})
		})

		// Well inside the 30 s backstop poll, so only the stream can explain it.
		expect(await runCells().findByText("512.50")).toBeInTheDocument()
		expect(screen.getByText("852.50")).toBeInTheDocument()
	})
})
