import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import JudgingPage from "../pages/Judging"
import { setupStore } from "../redux/store"

// Mock the dynamic import
jest.mock("next/dynamic", () => () => () => (
	<div data-testid="judging-page">Judging Page Component</div>
))

describe("Judging Page", () => {
	it("renders judging page component", () => {
		render(
			<Provider store={setupStore()}>
				<JudgingPage />
			</Provider>
		)

		expect(screen.getByTestId("judging-page")).toBeInTheDocument()
	})
})
