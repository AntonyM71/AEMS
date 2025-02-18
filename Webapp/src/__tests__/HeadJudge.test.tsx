import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import HeadJudge from "../pages/HeadJudge"
import { setupStore } from "../redux/store"

// Mock the HeadJudge component
jest.mock("../components/roles/headJudge/headJudge", () => ({
	__esModule: true,
	default: () => <div data-testid="head-judge">Head Judge Component</div>
}))

describe("HeadJudge Page", () => {
	it("renders head judge component", () => {
		render(
			<Provider store={setupStore()}>
				<HeadJudge />
			</Provider>
		)

		expect(screen.getByTestId("head-judge")).toBeInTheDocument()
	})
})
