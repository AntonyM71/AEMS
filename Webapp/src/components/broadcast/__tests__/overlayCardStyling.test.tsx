import { ThemeProvider } from "@mui/material/styles"
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { competitionInitialState } from "../../../redux/atoms/competitions"
import { setupStore } from "../../../redux/store"
import { defaultOverlayControllerState } from "../../Interfaces"
import { EventTitle } from "../Cards/EventTitle"
import { HeatSummaryTable } from "../Cards/HeatSummaryTable"
import { PhaseScoreTable } from "../Cards/PhaseResultsTable"
import { lightTheme } from "../overlayTheme"
import { closestPaper } from "./cardStylingTestHelpers"

// Characterization tests for the BROADCAST OVERLAY.
//
// These pin the styling the overlay renders today, so that refactoring the
// shared Card components (which the arena screen also uses) cannot silently
// change what goes to air. Every expected value here was captured from a real
// run against the pre-refactor code.
//
// If one of these fails during a refactor, the overlay has moved: fix the theme
// so the value comes back, never "update" the expectation to match.

const renderOverlay = (ui: React.ReactElement) =>
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
			<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>
		</Provider>
	)

describe("broadcast overlay card styling (characterization)", () => {
	describe("HeatSummaryTable", () => {
		it("renders a transparent, shadow-less card", async () => {
			renderOverlay(<HeatSummaryTable />)
			const heading = await screen.findByText("Test Heat")

			expect(closestPaper(heading)).toHaveStyle({
				backgroundColor: "transparent",
				boxShadow: "none",
				maxWidth: "1150px",
				margin: "16px auto",
				padding: "1em"
			})
		})

		it("renders the heat name white, right-aligned, at h4", async () => {
			renderOverlay(<HeatSummaryTable />)
			const heading = await screen.findByText("Test Heat")

			expect(heading).toHaveStyle({ color: "white" })
			expect(heading.tagName).toBe("H4")
			// eslint-disable-next-line testing-library/no-node-access
			expect(heading.parentElement).toHaveStyle({
				justifyContent: "flex-end"
			})
		})

		it("keeps the 85px artwork clearance spacer above the table", async () => {
			renderOverlay(<HeatSummaryTable />)
			const heading = await screen.findByText("Test Heat")
			const paper = closestPaper(heading)
			// Stack children: [HeatDetails, spacer, BasicTable]
			// eslint-disable-next-line testing-library/no-node-access
			const spacer = paper?.querySelector(":scope > div > :nth-child(2)")

			expect(spacer).toHaveStyle({ height: "85px" })
		})
	})

	describe("PhaseScoreTable", () => {
		const renderPhase = () =>
			renderOverlay(
				<PhaseScoreTable
					overlayControlState={defaultOverlayControllerState}
				/>
			)

		it("renders a transparent, shadow-less card", async () => {
			renderPhase()
			const detail = await screen.findByText("Runs: 2")

			expect(closestPaper(detail)).toHaveStyle({
				backgroundColor: "transparent",
				boxShadow: "none",
				maxWidth: "1150px"
			})
		})

		it("renders the phase details white and right-aligned in two fixed rows", async () => {
			renderPhase()
			const eventName = await screen.findByText("Test Event")
			const runs = screen.getByText("Runs: 2")

			expect(runs).toHaveStyle({ color: "white" })
			expect(eventName).toHaveStyle({ color: "white" })

			// eslint-disable-next-line testing-library/no-node-access
			expect(eventName.parentElement).toHaveStyle({
				justifyContent: "flex-end",
				height: "54px"
			})
			// eslint-disable-next-line testing-library/no-node-access
			expect(runs.parentElement).toHaveStyle({
				justifyContent: "flex-end",
				height: "60px"
			})
		})

		it("gives table body cells the blue underline and fixed row height", async () => {
			renderPhase()
			const nameCell = await screen.findByText("John DOE")
			// eslint-disable-next-line testing-library/no-node-access
			const cell = nameCell.closest("td")

			expect(cell).toHaveStyle({
				borderBottom: "1px solid #1976d2",
				height: "61px",
				padding: "0px"
			})
			expect(nameCell).toHaveStyle({
				fontSize: "20px",
				lineHeight: "61px"
			})
		})

		it("keeps the 23px artwork clearance spacer above the table", async () => {
			renderPhase()
			const detail = await screen.findByText("Runs: 2")
			const paper = closestPaper(detail)
			// eslint-disable-next-line testing-library/no-node-access
			const spacer = paper?.querySelector(":scope > div > :nth-child(2)")

			expect(spacer).toHaveStyle({ height: "23px" })
		})
	})

	describe("EventTitle", () => {
		it("absolutely positions the heading and run-count groups over the art", async () => {
			renderOverlay(<EventTitle />)
			const title = await screen.findByText("Competition 1")

			// eslint-disable-next-line testing-library/no-node-access
			const groups = document.querySelectorAll(
				'.MuiStack-root > div[class*="MuiBox-root"]'
			)

			expect(groups).toHaveLength(2)
			// The heading group must be the one that positions the title, so
			// the percentages resolve against the full-screen card.
			// eslint-disable-next-line testing-library/no-node-access
			expect(groups[0]).toContainElement(title)
			expect(groups?.[0]).toHaveStyle({
				position: "absolute",
				left: "27%",
				top: "53%",
				maxWidth: "72%"
			})
			expect(groups?.[1]).toHaveStyle({
				position: "absolute",
				left: "43%",
				top: "76%",
				maxWidth: "60%"
			})
		})

		it("renders the competition name white at h2 and the event line at h5", async () => {
			renderOverlay(<EventTitle />)
			const title = await screen.findByText("Competition 1")
			const eventLine = screen.getByText("Event : Test Event")

			// `white` and the original `#ffffff` are the same colour; the value
			// now reaches these nodes from palette.text.primary.
			expect(title).toHaveStyle({ color: "white" })
			expect(title.tagName).toBe("H2")
			expect(eventLine).toHaveStyle({
				color: "white",
				textTransform: "uppercase"
			})
			expect(eventLine.tagName).toBe("H5")
		})

		it("leaves the run counts on the theme's ICF dark blue", async () => {
			renderOverlay(<EventTitle />)

			expect(await screen.findByText("Runs : 2")).toHaveStyle({
				color: "rgb(12, 40, 80)"
			})
		})
	})
})
