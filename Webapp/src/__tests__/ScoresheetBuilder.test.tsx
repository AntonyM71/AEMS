import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import ScoresheetBuilderPage from "../pages/ScoresheetBuilder"
import { setupStore } from "../redux/store"

// Mock the dynamic import
jest.mock("next/dynamic", () => () => () => (
	<div data-testid="scoresheet-builder">Scoresheet Builder Component</div>
))

describe("ScoresheetBuilder Page", () => {
	it("renders scoresheet builder component", () => {
		render(
			<Provider store={setupStore()}>
				<ScoresheetBuilderPage />
			</Provider>
		)

		expect(screen.getByTestId("scoresheet-builder")).toBeInTheDocument()
	})
})
