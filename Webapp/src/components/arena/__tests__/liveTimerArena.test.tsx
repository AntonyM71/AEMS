import { render, screen } from "@testing-library/react"
import { renderWithProviders } from "../../../testUtils"
import LiveTimerArena from "../liveTimerArena"

jest.mock("../../roles/headJudge/WebSocketConnections", () => ({
	connectTimerSocket: jest.fn(() => ({
		on: jest.fn(),
		off: jest.fn(),
		emit: jest.fn(),
		disconnect: jest.fn(),
		connected: true
	}))
}))

describe("LiveTimerArena", () => {
	it("renders the timer label and LiveTimerLogic", () => {
		renderWithProviders(<LiveTimerArena />)
		expect(screen.getByText(/Time:/i)).toBeInTheDocument()
		// LiveTimerLogic renders an element with textSize h1, but may be dynamic
		// Check for the testid from Paper wrapper
		expect(screen.getByTestId("final-score")).toBeInTheDocument()
	})
})
