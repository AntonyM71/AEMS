import { render, screen } from "@testing-library/react"
import SlidingModal from "../SlidingModal"

describe("SlidingModal", () => {
	it("renders children when show is true", () => {
		render(
			<SlidingModal show={true}>
				<div data-testid="modal-child">Hello Modal</div>
			</SlidingModal>
		)
		expect(screen.getByTestId("modal-child")).toBeInTheDocument()
	})

	it("does not render children when show is false", () => {
		render(
			<SlidingModal show={false}>
				<div data-testid="modal-child">Hello Modal</div>
			</SlidingModal>
		)
		// Modal should not be open, so child should not be in document
		expect(screen.queryByTestId("modal-child")).not.toBeInTheDocument()
	})
})
