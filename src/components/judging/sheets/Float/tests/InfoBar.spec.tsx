import { fireEvent, render, screen, within } from "@testing-library/react"
import React from "react"
import { BrowserRouter } from "react-router-dom"
import { RecoilRoot } from "recoil"
import {
	selectedPaddlerState,
	selectedRunState
} from "../../../../../recoil/atoms/scoring"
import { RecoilObserver } from "../../../../../RecoilObserver"
import { calculateNewIndex, InfoBar } from "../InfoBar"

test.each([
	[1, 2, 1],
	[-1, 2, 1],
	[2, 2, 0]
])(".returns the correct value with %i and %i)", (a, b, want) => {
	const got = calculateNewIndex(a, b)
	expect(got).toBe(want)
})

const mockAddscoredMove = jest.fn()
const mockAddScoredBonus = jest.fn
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
					<InfoBar
						addScoredBonus={mockAddScoredBonus}
						addScoredMove={mockAddscoredMove}
					/>
				</BrowserRouter>
			</RecoilRoot>
		)

		const component = screen.getByTestId("button-next-paddler")
		const { getByText } = within(screen.getByTestId("display-paddler-name"))
		// assert it displays the right paddler initially
		expect(getByText("Emily")).toBeInTheDocument()
		expect(getByText("JACKSON")).toBeInTheDocument()

		// assertit moves to the next paddler on click
		fireEvent.click(component)

		expect(getByText("Jordan")).toBeInTheDocument()
		expect(getByText("POFFENBERGER")).toBeInTheDocument()
		expect(onChange).toHaveBeenCalledWith(1) // New value on change.
		// assert it circles round to the first paddler again
		fireEvent.click(component)

		expect(getByText("Emily")).toBeInTheDocument()
		expect(getByText("JACKSON")).toBeInTheDocument()
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
					<InfoBar
						addScoredBonus={mockAddScoredBonus}
						addScoredMove={mockAddscoredMove}
					/>
				</BrowserRouter>
			</RecoilRoot>
		)

		const component = screen.getByTestId("button-prev-paddler")
		const paddlerNameDisplay = within(
			screen.getByTestId("display-paddler-name")
		)
		const bibNumberDisplay = within(
			screen.getByTestId("display-bib-number")
		)
		// assert it displays the right paddler initially
		expect(paddlerNameDisplay.getByText("Emily")).toBeInTheDocument()
		expect(paddlerNameDisplay.getByText("JACKSON")).toBeInTheDocument()
		expect(
			bibNumberDisplay.getByText("70", { exact: false })
		).toBeInTheDocument()
		// assert it moves to the last paddler on click
		fireEvent.click(component)

		expect(paddlerNameDisplay.getByText("Jordan")).toBeInTheDocument()
		expect(paddlerNameDisplay.getByText("POFFENBERGER")).toBeInTheDocument()
		expect(
			bibNumberDisplay.getByText("127", { exact: false })
		).toBeInTheDocument()
		expect(onChange).toHaveBeenCalledWith(1) // New value on change.
		// assert it increments back to the first paddler again
		fireEvent.click(component)

		expect(paddlerNameDisplay.getByText("Emily")).toBeInTheDocument()
		expect(paddlerNameDisplay.getByText("JACKSON")).toBeInTheDocument()
		expect(
			bibNumberDisplay.getByText("70", { exact: false })
		).toBeInTheDocument()
		expect(onChange).toHaveBeenCalledWith(0) // original value again
	})
})

describe("The currentRun state should change when the user clicks the run navigation buttons", () => {
	// Based on the default of 3 runs per paddler, for other events we can change this and test that seperately.
	it("updates the state and display upwards when  `Next Run` button is clicked", () => {
		const onChange = jest.fn()
		render(
			<RecoilRoot>
				<BrowserRouter>
					<RecoilObserver
						node={selectedRunState}
						onChange={onChange}
					/>
					<InfoBar
						addScoredBonus={mockAddScoredBonus}
						addScoredMove={mockAddscoredMove}
					/>
				</BrowserRouter>
			</RecoilRoot>
		)

		const component = screen.getByTestId("button-next-run")
		const { getByText } = within(screen.getByTestId("display-run-box"))
		// assert it displays the right run initially
		expect(getByText("1")).toBeInTheDocument()

		// assert it moves to the next run on click
		fireEvent.click(component)

		expect(getByText("2")).toBeInTheDocument()
		expect(onChange).toHaveBeenCalledWith(1)
		// assert it increments to the last Run
		fireEvent.click(component)

		expect(getByText("3")).toBeInTheDocument()
		expect(onChange).toHaveBeenCalledWith(2)

		fireEvent.click(component)

		expect(getByText("1")).toBeInTheDocument()
		expect(onChange).toHaveBeenCalledWith(0) // original value again
	})
	it("updates the state and display upwards when `Previous Run` button is clicked", () => {
		const onChange = jest.fn()
		render(
			<RecoilRoot>
				<BrowserRouter>
					<RecoilObserver
						node={selectedRunState}
						onChange={onChange}
					/>
					<InfoBar
						addScoredBonus={mockAddScoredBonus}
						addScoredMove={mockAddscoredMove}
					/>
				</BrowserRouter>
			</RecoilRoot>
		)

		const component = screen.getByTestId("button-prev-run")
		const { getByText } = within(screen.getByTestId("display-run-box"))
		// assert it displays the right paddler initially
		expect(getByText("1")).toBeInTheDocument()

		// assert it moves to the last run on click
		fireEvent.click(component)

		expect(getByText("3")).toBeInTheDocument()
		expect(onChange).toHaveBeenCalledWith(2) // New value on change.
		// assert it increments back to the second run
		fireEvent.click(component)

		expect(getByText("2")).toBeInTheDocument()
		expect(onChange).toHaveBeenCalledWith(1)
		// back to the original value

		fireEvent.click(component)

		expect(getByText("1")).toBeInTheDocument()
		expect(onChange).toHaveBeenCalledWith(0)
	})
})
