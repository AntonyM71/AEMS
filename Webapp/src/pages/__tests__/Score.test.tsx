import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { setupStore } from "../../redux/store"
import Score from "../Score"

// Mock the PhaseScoreTable component
jest.mock("../../components/competition/PhaseScoretable", () => ({
	PhaseScoreTable: () => (
		<div data-testid="phase-score-table">Phase Score Table Component</div>
	)
}))

describe("Score Page", () => {
	it("renders phase score table component", () => {
		render(
			<Provider store={setupStore()}>
				<Score />
			</Provider>
		)

		expect(screen.getByTestId("phase-score-table")).toBeInTheDocument()
	})
})
