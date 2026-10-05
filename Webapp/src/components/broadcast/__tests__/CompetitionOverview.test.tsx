import { ThemeProvider } from "@mui/material/styles"
import { screen, within } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { server } from "../../../mocks/server"
import { renderWithProviders } from "../../../testUtils"
import { defaultOverlayControllerState } from "../../Interfaces"
import { CompetitionOverview } from "../Cards/CompetitionOverview"
import { lightTheme } from "../overlayTheme"

const serveCompetition = (events: string[], heats: string[]) =>
	server.use(
		http.get("/api/competition", () =>
			HttpResponse.json([
				{ id: "comp-1", name: "Nottingham Freestyle Open 2026" }
			])
		),
		http.get("/api/event", () =>
			HttpResponse.json(
				events.map((name, i) => ({
					id: `event-${i + 1}`,
					name,
					competition_id: "comp-1"
				}))
			)
		),
		http.get("/api/heat", () =>
			HttpResponse.json(
				heats.map((name, i) => ({
					id: `heat-${i + 1}`,
					name,
					competition_id: "comp-1"
				}))
			)
		)
	)

const renderOverview = (state: Partial<typeof defaultOverlayControllerState>) =>
	renderWithProviders(
		<ThemeProvider theme={lightTheme}>
			<CompetitionOverview
				overlayControlState={{
					...defaultOverlayControllerState,
					selectedCompetition: "comp-1",
					showCompetitionOverview: true,
					...state
				}}
			/>
		</ThemeProvider>
	)

const rail = () => {
	// eslint-disable-next-line testing-library/no-node-access
	const railElement = document.querySelector<HTMLElement>(
		".AemsCompetitionOverview-rail"
	)

	return within(railElement as HTMLElement)
}

const stepNames = () => {
	// eslint-disable-next-line testing-library/no-node-access
	const steps = document.querySelectorAll(".AemsCompetitionOverview-step")

	return Array.from(steps, (step) => step.textContent)
}

describe("CompetitionOverview", () => {
	it("lists the competition's events in name order, marking the current one and those before it", async () => {
		serveCompetition(["Men's K1", "Women's K1", "Men's C1"], [])

		renderOverview({
			competitionOverviewList: "events",
			selectedEvent: "event-2"
		})

		expect(
			await screen.findByText("Nottingham Freestyle Open 2026")
		).toBeInTheDocument()
		expect(screen.getByText("Events")).toBeInTheDocument()
		expect(await rail().findByText("Women's K1")).toHaveClass(
			"AemsCompetitionOverview-current"
		)
		expect(stepNames()).toEqual(["Men's C1", "Men's K1", "Women's K1"])
		expect(rail().getByText("Men's C1")).toHaveClass(
			"AemsCompetitionOverview-past"
		)
		expect(rail().getByText("Men's K1")).toHaveClass(
			"AemsCompetitionOverview-past"
		)
	})

	it("lists heats in number order", async () => {
		serveCompetition([], ["Heat 10", "Heat 2", "Heat 1"])

		renderOverview({
			competitionOverviewList: "heats",
			selectedHeat: "heat-2"
		})

		expect(await screen.findByText("Heats")).toBeInTheDocument()
		expect(await rail().findByText("Heat 2")).toHaveClass(
			"AemsCompetitionOverview-current"
		)
		expect(stepNames()).toEqual(["Heat 1", "Heat 2", "Heat 10"])
	})

	it("shows a window of eight around the current heat of a long list", async () => {
		serveCompetition(
			[],
			Array.from({ length: 12 }, (_, i) => `Heat ${i + 1}`)
		)

		renderOverview({
			competitionOverviewList: "heats",
			selectedHeat: "heat-7"
		})

		expect(await screen.findByText("4–11 of 12")).toBeInTheDocument()
		expect(stepNames()).toEqual(
			[4, 5, 6, 7, 8, 9, 10, 11].map((n) => `Heat ${n}`)
		)
		expect(rail().getByText("Heat 7")).toHaveClass(
			"AemsCompetitionOverview-current"
		)
	})
})
