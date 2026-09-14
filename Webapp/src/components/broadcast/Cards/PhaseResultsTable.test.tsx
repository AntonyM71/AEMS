import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { competitionInitialState } from "../../../redux/atoms/competitions"
import { setupStore } from "../../../redux/store"
import { defaultOverlayControllerState } from "../../Interfaces"
import { PhaseScoreTable } from "./PhaseResultsTable"

describe("PhaseScoreTable", () => {
	it("renders nothing when isVisible is false, even once data has loaded", () => {
		const store = setupStore({
			competitions: { ...competitionInitialState, selectedPhase: "1" }
		})
		const { container } = render(
			<Provider store={store}>
				<PhaseScoreTable
					overlayControlState={defaultOverlayControllerState}
					isVisible={false}
				/>
			</Provider>
		)

		expect(container).toBeEmptyDOMElement()
	})

	it("renders the phase results once data has loaded when isVisible is true", async () => {
		const store = setupStore({
			competitions: { ...competitionInitialState, selectedPhase: "1" }
		})
		render(
			<Provider store={store}>
				<PhaseScoreTable
					overlayControlState={defaultOverlayControllerState}
					isVisible={true}
				/>
			</Provider>
		)

		expect(await screen.findByText("Runs: 2")).toBeInTheDocument()
	})
})
