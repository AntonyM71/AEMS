import { ThemeProvider } from "@mui/material/styles"
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { competitionInitialState } from "../../../redux/atoms/competitions"
import { setupStore } from "../../../redux/store"
import { EventTitle } from "../../broadcast/Cards/EventTitle"
import { HeatSummaryTable } from "../../broadcast/Cards/HeatSummaryTable"
import { PhaseScoreTable } from "../../broadcast/Cards/PhaseResultsTable"
import { closestPaper } from "../../broadcast/__tests__/cardStylingTestHelpers"
import { defaultOverlayControllerState } from "../../Interfaces"
import { darkTheme } from "../arenaTheme"

// The mirror of overlayCardStyling.test.tsx: the same shared Cards, rendered
// under the arena's theme, must come out as self-contained dark panels with
// none of the broadcast frame's geometry (no clearance spacers, no absolute
// positioning, no fixed row heights, no blank padding rows).

const renderArena = (ui: React.ReactElement) =>
	render(
		<Provider
			store={setupStore({
				competitions: {
					...competitionInitialState,
					selectedCompetition: "1",
					selectedEvent: "1",
					selectedPhase: "1",
					selectedHeat: "1"
				}
			})}
		>
			<ThemeProvider theme={darkTheme}>{ui}</ThemeProvider>
		</Provider>
	)

describe("arena card styling", () => {
	describe("HeatSummaryTable", () => {
		it("renders an opaque dark card, not a transparent overlay card", async () => {
			renderArena(<HeatSummaryTable />)
			const heading = await screen.findByText("Test Heat")

			expect(closestPaper(heading)).toHaveStyle({
				backgroundColor: "rgb(34, 34, 34)",
				borderRadius: "8px"
			})
		})

		it("spreads the heat name across the card instead of pinning it right", async () => {
			renderArena(<HeatSummaryTable />)
			const heading = await screen.findByText("Test Heat")

			// eslint-disable-next-line testing-library/no-node-access
			expect(heading.parentElement).toHaveStyle({
				justifyContent: "space-between"
			})
			// The overlay's frame-clearance padding must not follow it here.
			expect(heading).not.toHaveStyle({ paddingRight: "32px" })
		})

		it("uses a real divider rather than the overlay's 85px clearance gap", async () => {
			renderArena(<HeatSummaryTable />)
			const heading = await screen.findByText("Test Heat")
			// eslint-disable-next-line testing-library/no-node-access
			const divider = closestPaper(heading)?.querySelector("hr")

			expect(divider).toBeInTheDocument()
			expect(divider).not.toHaveStyle({ height: "85px" })
		})
	})

	describe("PhaseScoreTable", () => {
		const renderPhase = () =>
			renderArena(
				<PhaseScoreTable
					overlayControlState={defaultOverlayControllerState}
				/>
			)

		it("keeps the phase details on a single spread row", async () => {
			renderPhase()
			const eventName = await screen.findByText("Test Event")
			const runs = screen.getByText("Runs: 2")

			// eslint-disable-next-line testing-library/no-node-access
			expect(eventName.parentElement).toBe(runs.parentElement)
			// eslint-disable-next-line testing-library/no-node-access
			expect(eventName.parentElement).toHaveStyle({
				justifyContent: "space-between"
			})
		})

		it("lets the table size to its content, with no blue frame rules", async () => {
			renderPhase()
			const nameCell = await screen.findByText("John DOE")
			// eslint-disable-next-line testing-library/no-node-access
			const cell = nameCell.closest("td")

			expect(cell).not.toHaveStyle({ height: "61px" })
			expect(cell).not.toHaveStyle({
				borderBottom: "1px solid #1976d2"
			})
			expect(cell).toHaveStyle({ fontSize: "2rem" })
		})

		it("does not pad short pages with blank rows", async () => {
			renderPhase()
			await screen.findByText("John DOE")
			// One athlete in the fixture, so one body row.
			// eslint-disable-next-line testing-library/no-node-access
			const bodyRows = document.querySelectorAll("tbody tr")

			expect(bodyRows).toHaveLength(1)
		})
	})

	describe("EventTitle", () => {
		it("lays the title out in normal flow at venue scale", async () => {
			renderArena(<EventTitle />)
			const title = await screen.findByText("Competition 1")

			expect(title.tagName).toBe("H1")
			expect(title).toHaveStyle({ color: "#fff" })
			// eslint-disable-next-line testing-library/no-node-access
			expect(title.parentElement).not.toHaveStyle({
				position: "absolute"
			})
		})

		it("shows the run counts in the same white as the rest of the card", async () => {
			renderArena(<EventTitle />)

			expect(await screen.findByText("Runs : 2")).toHaveStyle({
				color: "#fff"
			})
		})
	})
})
