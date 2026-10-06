import { act, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { http, HttpResponse } from "msw"
import { server } from "../../../../mocks/server"
import { socketHub } from "../../../../mocks/socketHub"
import { competitionInitialState } from "../../../../redux/atoms/competitions"
import { renderWithProviders } from "../../../../testUtils"
import { HeadJudgeMismatchBanner } from "../HeadJudgeMismatchBanner"
import Scribe from "../Scribe"

jest.mock("../../headJudge/WebSocketConnections")

const headJudgeAthlete = {
	id: "athlete-1",
	first_name: "John",
	last_name: "Smith",
	bib: "42",
	scoresheet: "sheet-1"
}

const headJudgeMoves = (
	position: { heatId: string; runNumber: number },
	athlete = headJudgeAthlete
) =>
	act(() => {
		socketHub.emit("head_judge_selection", "head_judge_selection", {
			competitionId: "comp-1",
			athlete,
			...position
		})
	})

const renderScribe = () => {
	const view = renderWithProviders(<Scribe scribeNumber="1" />, {
		preloadedState: {
			competitions: { ...competitionInitialState, selectedHeat: "heat-1" }
		}
	})

	return waitFor(() =>
		expect(socketHub.openCount("head_judge_selection")).toBeGreaterThan(0)
	).then(() => view)
}

const athleteInHeat = (
	id: string,
	firstName: string,
	bib: string,
	heatId = "heat-1"
) => ({
	athlete_heat_id: `ah-${id}`,
	heat_id: heatId,
	athlete_id: id,
	phase_id: "phase-1",
	number_of_runs: 3,
	number_of_runs_for_score: 2,
	scoresheet: "sheet-1",
	first_name: firstName,
	last_name: "Smith",
	affiliation: "GBR",
	bib,
	event_name: "Test Event"
})

describe("Scribe head judge mismatch banner", () => {
	beforeEach(() => socketHub.reset())

	it("stays hidden while the scribe is on the head judge's run", async () => {
		await renderScribe()
		await screen.findByTestId("scored-move-list")

		headJudgeMoves({ heatId: "heat-1", runNumber: 0 })

		expect(
			screen.queryByTestId("head-judge-mismatch-banner")
		).not.toBeInTheDocument()
	})

	it("warns when the head judge is on a different run, and the button moves the scribe there", async () => {
		await renderScribe()
		await screen.findByTestId("scored-move-list")

		headJudgeMoves({ heatId: "heat-1", runNumber: 1 })

		const banner = await screen.findByTestId("head-judge-mismatch-banner")
		expect(banner).toHaveTextContent("Head judge is on John Smith, run 2")
		expect(banner).toHaveTextContent("You are scoring John Smith, run 1")

		await userEvent.click(
			screen.getByRole("button", { name: "Go to head judge's run" })
		)

		await waitFor(() =>
			expect(
				screen.queryByTestId("head-judge-mismatch-banner")
			).not.toBeInTheDocument()
		)
	})

	it("warns when the head judge is in a different heat", async () => {
		await renderScribe()
		await screen.findByTestId("scored-move-list")

		headJudgeMoves({ heatId: "heat-2", runNumber: 0 })

		expect(
			await screen.findByText("Head judge is scoring a different heat")
		).toBeInTheDocument()
		expect(
			screen.getByRole("button", { name: "Switch heat" })
		).toBeInTheDocument()
	})

	it("warns when the head judge is on another athlete, and the button moves the scribe to them", async () => {
		server.use(
			http.get("/api/getHeatInfo/:heatId", () =>
				HttpResponse.json([
					athleteInHeat("athlete-2", "Alex", "7"),
					athleteInHeat("athlete-1", "John", "42")
				])
			)
		)
		await renderScribe()
		await waitFor(() =>
			expect(screen.getByTestId("display-bib-number")).toHaveTextContent(
				"7"
			)
		)

		headJudgeMoves({ heatId: "heat-1", runNumber: 0 })

		const banner = await screen.findByTestId("head-judge-mismatch-banner")
		expect(banner).toHaveTextContent("Head judge is on John Smith, run 1")
		expect(banner).toHaveTextContent("You are scoring Alex Smith, run 1")

		await userEvent.click(
			screen.getByRole("button", { name: "Go to head judge's run" })
		)

		await waitFor(() =>
			expect(screen.getByTestId("display-bib-number")).toHaveTextContent(
				"42"
			)
		)
		expect(
			screen.queryByTestId("head-judge-mismatch-banner")
		).not.toBeInTheDocument()
	})

	it("Switch heat selects the head judge's competition and heat", async () => {
		const { store } = await renderScribe()
		await screen.findByTestId("scored-move-list")

		headJudgeMoves({ heatId: "heat-2", runNumber: 0 })
		await userEvent.click(
			await screen.findByRole("button", { name: "Switch heat" })
		)

		expect(store.getState().competitions.selectedHeat).toBe("heat-2")
		expect(store.getState().competitions.selectedCompetition).toBe("comp-1")
	})

	it("Switch heat lands the scribe on the head judge's athlete in the new heat", async () => {
		server.use(
			http.get("/api/getHeatInfo/:heatId", ({ params }) =>
				HttpResponse.json(
					params.heatId === "heat-2"
						? [
								athleteInHeat(
									"athlete-3",
									"Sam",
									"9",
									"heat-2"
								),
								athleteInHeat(
									"athlete-1",
									"John",
									"42",
									"heat-2"
								)
						  ]
						: [athleteInHeat("athlete-2", "Alex", "7")]
				)
			)
		)
		await renderScribe()
		await waitFor(() =>
			expect(screen.getByTestId("display-bib-number")).toHaveTextContent(
				"7"
			)
		)

		headJudgeMoves({ heatId: "heat-2", runNumber: 0 })
		await userEvent.click(
			await screen.findByRole("button", { name: "Switch heat" })
		)

		await waitFor(() =>
			expect(screen.getByTestId("display-bib-number")).toHaveTextContent(
				"42"
			)
		)
		expect(
			screen.queryByTestId("head-judge-mismatch-banner")
		).not.toBeInTheDocument()
	})

	it("disables the jump when the head judge's athlete isn't in their heat's roster", async () => {
		await renderScribe()
		await screen.findByTestId("scored-move-list")

		headJudgeMoves(
			{ heatId: "heat-1", runNumber: 1 },
			{ ...headJudgeAthlete, id: "not-in-heat" }
		)

		await screen.findByTestId("head-judge-mismatch-banner")
		expect(
			screen.getByRole("button", { name: "Go to head judge's run" })
		).toBeDisabled()
	})

	it("shows the head judge's position without crashing when the scribe's paddler index is out of range", async () => {
		renderWithProviders(<HeadJudgeMismatchBanner />, {
			preloadedState: {
				competitions: {
					...competitionInitialState,
					selectedHeat: "heat-1"
				},
				score: { selectedPaddler: 5 }
			}
		})
		await waitFor(() =>
			expect(socketHub.openCount("head_judge_selection")).toBeGreaterThan(
				0
			)
		)

		headJudgeMoves({ heatId: "heat-1", runNumber: 0 })

		const banner = await screen.findByTestId("head-judge-mismatch-banner")
		expect(banner).toHaveTextContent("Head judge is on John Smith, run 1")
		expect(banner).not.toHaveTextContent("You are scoring")
	})
})
