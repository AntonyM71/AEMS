import { screen, within } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { server } from "../../../mocks/server"
import { defaultOverlayControllerState } from "../../Interfaces"
import { renderWithProviders } from "../../../testUtils"
import { PhaseScoreTable } from "./PhaseResultsTable"

describe("PhaseScoreTable", () => {
	it("renders nothing when isVisible is false, even once data has loaded", () => {
		const { container } = renderWithProviders(
			<PhaseScoreTable
				overlayControlState={defaultOverlayControllerState}
				isVisible={false}
			/>,
			{
				preloadedState: {
					competitions: { selectedPhase: "1" }
				}
			}
		)

		expect(container).toBeEmptyDOMElement()
	})

	it("renders the phase results once data has loaded when isVisible is true", async () => {
		renderWithProviders(
			<PhaseScoreTable
				overlayControlState={defaultOverlayControllerState}
				isVisible={true}
			/>,
			{
				preloadedState: {
					competitions: { selectedPhase: "1" }
				}
			}
		)

		expect(await screen.findByText("Runs: 2")).toBeInTheDocument()
	})

	it("shows '-' for a run nobody has scored, and 0.00 for a judged or locked run that scored nothing", async () => {
		const run = (
			meanRunScore: number,
			judgeScores: number[],
			locked = false
		) => ({
			locked,
			did_not_start: false,
			mean_run_score: meanRunScore,
			judge_scores: judgeScores.map((score, index) => ({
				judge_id: String(index + 1),
				score_info: { score }
			}))
		})
		server.use(
			http.get("/api/phase/:id", ({ params }) =>
				HttpResponse.json({
					id: params.id,
					name: "Test Phase",
					number_of_runs: 4
				})
			),
			http.get("/api/getPhaseScores/:phaseId", () =>
				HttpResponse.json({
					scores: [
						{
							bib_number: "123",
							first_name: "John",
							last_name: "Doe",
							ranking: 1,
							total_score: 85.5,
							run_scores: [
								run(85.5, [85, 86]),
								run(0, [0, 0]),
								run(0, []),
								run(0, [], true)
							]
						}
					]
				})
			)
		)

		renderWithProviders(
			<PhaseScoreTable
				overlayControlState={defaultOverlayControllerState}
			/>,
			{ preloadedState: { competitions: { selectedPhase: "1" } } }
		)

		const row = await screen.findByRole("row", { name: /John DOE/ })
		const cells = within(row)
			.getAllByRole("cell")
			.map((cell) => cell.textContent)
		expect(cells).toEqual([
			"1",
			"John DOE",
			"123",
			"",
			"85.50",
			"0.00",
			"-",
			"0.00",
			"85.50"
		])
	})
})
