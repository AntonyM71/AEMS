import { render, screen } from "@testing-library/react"
import LiveTimerArena from "../liveTimerArena"

describe("LiveTimerArena", () => {
	it("renders the timer label and LiveTimerLogic", () => {
		render(<LiveTimerArena />)
		expect(screen.getByText(/Time:/i)).toBeInTheDocument()
		// LiveTimerLogic renders an element with textSize h1, but may be dynamic
		// Check for the testid from Paper wrapper
		expect(screen.getByTestId("final-score")).toBeInTheDocument()
	})
})
