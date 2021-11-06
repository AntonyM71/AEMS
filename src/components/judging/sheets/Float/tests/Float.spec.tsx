import { fireEvent, render, screen, within } from "@testing-library/react"
import React from "react"
import { BrowserRouter } from "react-router-dom"
import { RecoilRoot } from "recoil"
import { selectedPaddlerState } from "../../../../../recoil/atoms"
import { RecoilObserver } from "../../../../../RecoilObserver"
import Float from "../Float"

describe("The currentPaddler state should change when the user clicks the paddler navigation buttons", () => {
	it("updates the state and display upwards when  `Next Paddler` button is clicked", () => {
		const onChange = jest.fn()
		render(
			<RecoilRoot>
				<BrowserRouter>
					<RecoilObserver
						node={selectedPaddlerState}
						onChange={onChange}
					/>
					<Float />
				</BrowserRouter>
			</RecoilRoot>
		)

		const component = screen.getByTestId("button-next-paddler")
		const { getByText } = within(screen.getByTestId("display-paddler-name"))
		// assert it displays the right paddler initially
		expect(getByText("Emily")).toBeTruthy()
		expect(getByText("JACKSON")).toBeTruthy()

		// assertit moves to the next paddler on click
		fireEvent.click(component)

		expect(getByText("Jordan")).toBeTruthy()
		expect(getByText("POFFENBERGER")).toBeTruthy()
		expect(onChange).toHaveBeenCalledWith(1) // New value on change.
		// assert it circles round to the first paddler again
		fireEvent.click(component)

		expect(getByText("Emily")).toBeTruthy()
		expect(getByText("JACKSON")).toBeTruthy()
		expect(onChange).toHaveBeenCalledWith(0) // original value again
	})
	it("updates the state and display upwards when `Previous Paddler` button is clicked", () => {
		const onChange = jest.fn()
		render(
			<RecoilRoot>
				<BrowserRouter>
					<RecoilObserver
						node={selectedPaddlerState}
						onChange={onChange}
					/>
					<Float />
				</BrowserRouter>
			</RecoilRoot>
		)

		const component = screen.getByTestId("button-prev-paddler")
		const { getByText } = within(screen.getByTestId("display-paddler-name"))
		// assert it displays the right paddler initially
		expect(getByText("Emily")).toBeTruthy()
		expect(getByText("JACKSON")).toBeTruthy()

		// assert it moves to the last paddler on click
		fireEvent.click(component)

		expect(getByText("Jordan")).toBeTruthy()
		expect(getByText("POFFENBERGER")).toBeTruthy()
		expect(onChange).toHaveBeenCalledWith(1) // New value on change.
		// assert it increments back to the first paddler again
		fireEvent.click(component)

		expect(getByText("Emily")).toBeTruthy()
		expect(getByText("JACKSON")).toBeTruthy()
		expect(onChange).toHaveBeenCalledWith(0) // original value again
	})
})
