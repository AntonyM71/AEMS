import { fireEvent, render, screen } from "@testing-library/react"
import { RefreshButton } from "../RefreshIconButton"

describe("RefreshButton Component", () => {
	it("renders without crashing", () => {
		const mockRefetch = jest.fn()
		render(<RefreshButton refetch={mockRefetch} />)

		// Verify the button exists
		const button = screen.getByRole("button")
		expect(button).toBeInTheDocument()
	})

	it("displays a refresh icon", () => {
		const mockRefetch = jest.fn()
		render(<RefreshButton refetch={mockRefetch} />)

		// Material-UI icons use SVG, so we can check for that
		const icon = screen.getByTestId("RefreshIcon")
		expect(icon).toBeInTheDocument()
	})

	it("calls refetch function when clicked", () => {
		const mockRefetch = jest.fn().mockResolvedValue({})
		render(<RefreshButton refetch={mockRefetch} />)

		const button = screen.getByRole("button")
		fireEvent.click(button)

		expect(mockRefetch).toHaveBeenCalledTimes(1)
	})
})
