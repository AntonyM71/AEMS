import { render, screen } from "@testing-library/react"
import Score from "../index"

describe("Score Page", () => {
	it("renders gotchas section", () => {
		render(<Score />)

		// Check for main text
		expect(screen.getByText("Gotchas:")).toBeInTheDocument()

		// Check for all three bullet points
		expect(
			screen.getByText(
				/Please don't put paddlers with different numbers of runs/
			)
		).toBeInTheDocument()
		expect(
			screen.getByText(
				/Tiebreak engine doesn't give a detailled breakdown/
			)
		).toBeInTheDocument()
		expect(
			screen.getByText(/Once a scoresheet has been used in a competition/)
		).toBeInTheDocument()
	})
})
