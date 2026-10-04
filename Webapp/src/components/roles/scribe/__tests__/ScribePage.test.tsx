import { screen } from "@testing-library/react"
import { renderWithProviders } from "../../../../testUtils"
import Scribe from "../ScribePage"

describe("ScribePage", () => {
	it("renders nothing when no heat is selected", () => {
		renderWithProviders(<Scribe scribeNumber="1" />, {
			preloadedState: { competitions: { selectedHeat: undefined } }
		})

		expect(document.body).toHaveTextContent("")
	})

	it("renders Float component when heat is selected", () => {
		renderWithProviders(<Scribe scribeNumber="1" />, {
			preloadedState: { competitions: { selectedHeat: "heat-1" } }
		})

		expect(screen.getByTestId("scribe-grid")).toBeInTheDocument()
	})

	it("updates userRole in store with correct scribe number", () => {
		const { store } = renderWithProviders(<Scribe scribeNumber="2" />, {
			preloadedState: { competitions: { selectedHeat: "heat-1" } }
		})

		expect(store.getState().score.userRole).toBe("Scribe 2")
	})
})
