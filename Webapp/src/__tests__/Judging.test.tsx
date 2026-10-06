import { screen } from "@testing-library/react"
import JudgingPage from "../pages/Judging"
import { renderWithProviders } from "../testUtils"

// Mock the dynamic import
jest.mock("next/dynamic", () => () => () => (
	<div data-testid="judging-page">Judging Page Component</div>
))

describe("Judging Page", () => {
	it("renders judging page component", () => {
		renderWithProviders(<JudgingPage />)

		expect(screen.getByTestId("judging-page")).toBeInTheDocument()
	})
})
