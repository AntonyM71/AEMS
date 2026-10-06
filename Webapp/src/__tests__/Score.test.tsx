import { screen } from "@testing-library/react"
import Score from "../pages/Score"
import { renderWithProviders } from "../testUtils"

// Mock the PhaseScoreTable component
jest.mock("../components/competition/PhaseScoretable", () => ({
	PhaseScoreTable: () => (
		<div data-testid="phase-score-table">Phase Score Table Component</div>
	)
}))

describe("Score Page", () => {
	it("renders phase score table component", () => {
		renderWithProviders(<Score />)

		expect(screen.getByTestId("phase-score-table")).toBeInTheDocument()
	})
})
