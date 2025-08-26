import { render, screen } from "@testing-library/react"
import { FinalScore } from "./FinalScore"

describe("FinalScore", () => {
	it("should display DNS when did_not_start is true", () => {
		render(
			<FinalScore
				allJudgeScores={{}}
				locked={false}
				did_not_start={true}
			/>
		)

		expect(screen.getByText("DNS")).toBeInTheDocument()
	})

	it("should display average score when did_not_start is false", () => {
		render(
			<FinalScore
				allJudgeScores={{ judge1: 10, judge2: 20, judge3: 30 }}
				locked={false}
				did_not_start={false}
			/>
		)

		expect(screen.getByText("20.00")).toBeInTheDocument()
	})
})
