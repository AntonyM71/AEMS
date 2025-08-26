import { render, screen } from "@testing-library/react"
import SlidingWrapper from "../SlidingWrapper"

describe("SlidingWrapper", () => {
	it("renders children when show is true", () => {
		render(
			<SlidingWrapper show={true}>
				<div data-testid="wrapper-child">Hello Wrapper</div>
			</SlidingWrapper>
		)
		expect(screen.getByTestId("wrapper-child")).toBeInTheDocument()
	})

	it("does not render children when show is false", () => {
		render(
			<SlidingWrapper show={false}>
				<div data-testid="wrapper-child">Hello Wrapper</div>
			</SlidingWrapper>
		)
		expect(screen.queryByTestId("wrapper-child")).not.toBeInTheDocument()
	})
})
