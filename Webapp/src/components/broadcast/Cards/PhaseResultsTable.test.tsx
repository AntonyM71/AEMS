import { screen } from "@testing-library/react"
import { competitionInitialState } from "../../../redux/atoms/competitions"
import { setupStore } from "../../../redux/store"
import { defaultOverlayControllerState } from "../../Interfaces"
import { renderWithProviders } from "../../../testUtils"
import { PhaseScoreTable } from "./PhaseResultsTable"

describe("PhaseScoreTable", () => {
	it("renders nothing when isVisible is false, even once data has loaded", () => {
		const store = setupStore({
			competitions: { ...competitionInitialState, selectedPhase: "1" }
		})
		const { container } = renderWithProviders(
			<PhaseScoreTable
				overlayControlState={defaultOverlayControllerState}
				isVisible={false}
			/>,
			{ store }
		)

		expect(container).toBeEmptyDOMElement()
	})

	it("renders the phase results once data has loaded when isVisible is true", async () => {
		const store = setupStore({
			competitions: { ...competitionInitialState, selectedPhase: "1" }
		})
		renderWithProviders(
			<PhaseScoreTable
				overlayControlState={defaultOverlayControllerState}
				isVisible={true}
			/>,
			{ store }
		)

		expect(await screen.findByText("Runs: 2")).toBeInTheDocument()
	})
})
