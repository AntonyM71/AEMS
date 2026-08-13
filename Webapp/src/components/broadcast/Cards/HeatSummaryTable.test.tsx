import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { setupStore } from "../../../redux/store"
import { HeatSummaryTable } from "./HeatSummaryTable"

describe("HeatSummaryTable", () => {
	it("renders nothing when isVisible is false", () => {
		const store = setupStore()
		const { container } = render(
			<Provider store={store}>
				<HeatSummaryTable isVisible={false} />
			</Provider>
		)

		expect(container).toBeEmptyDOMElement()
	})

	it("renders the table container when isVisible is true (default)", () => {
		const store = setupStore()
		const { container } = render(
			<Provider store={store}>
				<HeatSummaryTable />
			</Provider>
		)

		expect(container).not.toBeEmptyDOMElement()
	})
})
