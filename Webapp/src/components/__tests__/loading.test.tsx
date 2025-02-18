import { render, screen } from "@testing-library/react"
import Loading from "../loading"

describe("Loading Component", () => {
	it("renders without crashing", () => {
		render(<Loading />)

		// Find the skeleton element using test-id
		const skeletonElement = screen.getByTestId("loading-skeleton")

		// Verify it exists
		expect(skeletonElement).toBeInTheDocument()

		// Verify the styles are applied correctly
		expect(skeletonElement).toHaveStyle({
			height: "100%",
			width: "100%"
		})
	})
})
