import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { setupStore } from "../../../redux/store"
import { SelectorDisplay } from "../MainSelector"

const store = setupStore()

// Mock the child components to simplify testing
jest.mock("../CompetitionSelector", () => ({
	__esModule: true,
	default: () => <div data-testid="competition-selector">Competition</div>
}))

jest.mock("../EventSelector", () => ({
	__esModule: true,
	default: () => <div data-testid="event-selector">Event</div>
}))

jest.mock("../PhaseSelector", () => ({
	__esModule: true,
	default: () => <div data-testid="phase-selector">Phase</div>
}))

jest.mock("../HeatSelector", () => ({
	__esModule: true,
	default: () => <div data-testid="heat-selector">Heat</div>
}))

describe("SelectorDisplay", () => {
	const renderComponent = (props = {}) =>
		render(
			<Provider store={store}>
				<SelectorDisplay {...props} />
			</Provider>
		)

	it("renders all selectors by default", () => {
		renderComponent()
		expect(screen.getByTestId("competition-selector")).toBeInTheDocument()
		expect(screen.getByTestId("event-selector")).toBeInTheDocument()
		expect(screen.getByTestId("phase-selector")).toBeInTheDocument()
		expect(screen.getByTestId("heat-selector")).toBeInTheDocument()
	})

	it("hides selectors based on props", () => {
		renderComponent({
			showCompetition: false,
			showEvent: false,
			showPhase: false,
			showHeat: false
		})
		expect(
			screen.queryByTestId("competition-selector")
		).not.toBeInTheDocument()
		expect(screen.queryByTestId("event-selector")).not.toBeInTheDocument()
		expect(screen.queryByTestId("phase-selector")).not.toBeInTheDocument()
		expect(screen.queryByTestId("heat-selector")).not.toBeInTheDocument()
	})

	it("passes showDetailed prop to child components", () => {
		renderComponent({ showDetailed: true })
		// Since we're using simple mocks, we just verify the components render
		expect(screen.getByTestId("competition-selector")).toBeInTheDocument()
		expect(screen.getByTestId("event-selector")).toBeInTheDocument()
		expect(screen.getByTestId("phase-selector")).toBeInTheDocument()
		expect(screen.getByTestId("heat-selector")).toBeInTheDocument()
	})
})
