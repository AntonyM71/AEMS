import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import { BrowserRouter } from "react-router-dom"
import { RecoilRoot } from "recoil"
import { preferDarkState } from "../../recoil/atoms"
import { RecoilObserver } from "../../RecoilObserver"
import Header from "./Header"

describe("The preferDark state should", () => {
	test("change when the user enters a name.", () => {
		const onChange = jest.fn()

		render(
			<RecoilRoot>
				<BrowserRouter>
					<RecoilObserver
						node={preferDarkState}
						onChange={onChange}
					/>
					<Header />
				</BrowserRouter>
			</RecoilRoot>
		)

		const component = screen.getByTestId("darkModeButton")

		fireEvent.click(component)

		expect(onChange).toHaveBeenCalledTimes(2)
		expect(onChange).toHaveBeenCalledWith(false) // Initial state on render.
		expect(onChange).toHaveBeenCalledWith(true) // New value on change.
	})
})
