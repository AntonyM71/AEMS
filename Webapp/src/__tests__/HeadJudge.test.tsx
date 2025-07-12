import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import HeadJudge from "../pages/HeadJudge"
import { setupStore } from "../redux/store"

describe("HeadJudge Page", () => {
	it("renders head judge component", async () => {
		render(
			<Provider store={setupStore()}>
				<HeadJudge />
			</Provider>
		)

		expect(
			await screen.findByTestId("loading-skeleton")
		).toBeInTheDocument()
	})
})
