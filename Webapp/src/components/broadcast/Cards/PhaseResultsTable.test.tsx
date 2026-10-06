import { screen } from "@testing-library/react"
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
})
