import { screen } from "@testing-library/react"
import ScoresheetBuilderPage from "../pages/ScoresheetBuilder"
import { renderWithProviders } from "../testUtils"

// Mock the dynamic import
jest.mock("next/dynamic", () => () => () => (
	<div data-testid="scoresheet-builder">Scoresheet Builder Component</div>
))

describe("ScoresheetBuilder Page", () => {
	it("renders scoresheet builder component", () => {
		renderWithProviders(<ScoresheetBuilderPage />)

		expect(screen.getByTestId("scoresheet-builder")).toBeInTheDocument()
	})
})
