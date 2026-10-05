import { ThemeProvider } from "@mui/material/styles"
import { screen, waitFor } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { server } from "../../../mocks/server"
import { renderWithProviders } from "../../../testUtils"
import { AthleteOverviewModal } from "../Cards/AthleteOverview"
import { CompetitionOverviewModal } from "../Cards/CompetitionOverview"
import { HeatListModal } from "../Cards/HeatListModal"
import { defaultOverlayControllerState } from "../../Interfaces"
import { icfWhite, lightTheme } from "../overlayTheme"

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

const hexToRgb = (hex: string): string => {
	const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))

	return `rgb(${r}, ${g}, ${b})`
}

// The fallback backdrop targets card class names; if a card refactor renames
// them, the panels silently vanish on air. This test renders a real card to catch it.
describe("FullscreenPixiOverlay fallback backdrop", () => {
	it("puts the heat summary's rows on a light ICF panel when the graphics server is down", async () => {
		server.use(
			http.get(
				"/componentInfo/startList",
				() => new HttpResponse(null, { status: 502 })
			)
		)

		renderWithProviders(
			<ThemeProvider theme={lightTheme}>
				<HeatListModal isVisible />
			</ThemeProvider>,
			{ preloadedState: { competitions: { selectedHeat: "1" } } }
		)

		const athleteCell = await screen.findByText("John SMITH")
		// eslint-disable-next-line testing-library/no-node-access
		const fallbackRoot = athleteCell.closest(".AemsOverlay-fallback")
		await waitFor(() =>
			expect(fallbackRoot).toHaveAttribute("data-visible", "true")
		)

		// Only the table body is asserted: jsdom resolves styles by source order,
		// not specificity, so the card's navy loses to MUI's later Paper rule here
		// even though it wins in a browser.
		// eslint-disable-next-line testing-library/no-node-access
		expect(athleteCell.closest("tbody")).toHaveStyle({
			backgroundColor: hexToRgb(icfWhite)
		})
	})

	it("puts the athlete overview's runs on a light ICF panel when the graphics server is down", async () => {
		server.use(
			http.get(
				"/componentInfo/athleteOverview",
				() => new HttpResponse(null, { status: 502 })
			)
		)

		renderWithProviders(
			<ThemeProvider theme={lightTheme}>
				<AthleteOverviewModal
					overlayControlState={{
						...defaultOverlayControllerState,
						selectedHeat: "1",
						showAthleteOverview: true,
						selectedAthlete: {
							id: "athlete-1",
							first_name: "Robert",
							last_name: "Geary",
							bib: "14",
							scoresheet: "sheet-1",
							affiliation: "IRL"
						}
					}}
				/>
			</ThemeProvider>
		)

		const name = await screen.findByText("Robert GEARY")
		await waitFor(() =>
			// eslint-disable-next-line testing-library/no-node-access
			expect(name.closest(".AemsOverlay-fallback")).toHaveAttribute(
				"data-visible",
				"true"
			)
		)
		// eslint-disable-next-line testing-library/no-node-access
		expect(document.querySelector(".AemsAthleteOverview-runs")).toHaveStyle(
			{
				backgroundColor: hexToRgb(icfWhite)
			}
		)
	})

	it("puts the competition overview's rail on a light ICF band when the graphics server is down", async () => {
		server.use(
			http.get(
				"/componentInfo/competitionOverview",
				() => new HttpResponse(null, { status: 502 })
			),
			http.get("/api/heat", () =>
				HttpResponse.json([
					{ id: "heat-1", name: "Heat 1", competition_id: "1" },
					{ id: "heat-2", name: "Heat 2", competition_id: "1" }
				])
			)
		)

		renderWithProviders(
			<ThemeProvider theme={lightTheme}>
				<CompetitionOverviewModal
					overlayControlState={{
						...defaultOverlayControllerState,
						selectedCompetition: "1",
						selectedHeat: "heat-2",
						competitionOverviewList: "heats",
						showCompetitionOverview: true
					}}
				/>
			</ThemeProvider>
		)

		const current = await screen.findByText("Heat 2")
		await waitFor(() =>
			// eslint-disable-next-line testing-library/no-node-access
			expect(current.closest(".AemsOverlay-fallback")).toHaveAttribute(
				"data-visible",
				"true"
			)
		)

		// eslint-disable-next-line testing-library/no-node-access
		const rail = document.querySelector(".AemsCompetitionOverview-rail")
		expect(rail).toHaveStyle({ backgroundColor: hexToRgb(icfWhite) })
	})
})
