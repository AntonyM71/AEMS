import { screen } from "@testing-library/react"
import ScribePage from "../../pages/scribe/[id]"
import { renderWithProviders } from "../../testUtils"

// Mock the Next.js router
jest.mock("next/router", () => ({
	useRouter: () => ({
		query: { id: "123" }
	})
}))

// Mock the Scribe component
jest.mock("../../components/roles/scribe/ScribePage", () => ({
	__esModule: true,
	default: () => <div data-testid="scribe-page">Scribe Page Component</div>
}))

describe("Scribe Page", () => {
	it("renders scribe component", () => {
		renderWithProviders(<ScribePage />)

		expect(screen.getByTestId("scribe-page")).toBeInTheDocument()
	})
})
