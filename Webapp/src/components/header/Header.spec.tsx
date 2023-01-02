import { fireEvent, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { renderWithProviders } from "../../testUtils"
import Header from "./Header"

describe("The preferDark state should", () => {
	test("change when the user enters a name.", () => {
		const { store } = renderWithProviders(
			<BrowserRouter>
				<Header />
			</BrowserRouter>
		)

		const component = screen.getByTestId("darkModeButton")

		fireEvent.click(component)
		const newStore = store.getState()
		expect(newStore.)
	})
})
