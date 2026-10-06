import { setupStore } from "../../../redux/store"
import { renderWithProviders } from "../../../testUtils"
import { HeatSummaryTable } from "./HeatSummaryTable"

describe("HeatSummaryTable", () => {
	it("renders nothing when isVisible is false", () => {
		const store = setupStore()
		const { container } = renderWithProviders(
			<HeatSummaryTable isVisible={false} />,
			{ store }
		)

		expect(container).toBeEmptyDOMElement()
	})

	it("renders the table container when isVisible is true (default)", () => {
		const store = setupStore()
		const { container } = renderWithProviders(<HeatSummaryTable />, {
			store
		})

		expect(container).not.toBeEmptyDOMElement()
	})
})
