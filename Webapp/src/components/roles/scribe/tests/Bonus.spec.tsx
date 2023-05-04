import { fireEvent, screen } from "@testing-library/react"
import { renderWithProviders } from "../../../../testUtils"
import { Bonus } from "../Bonus"
import { BonusPropsType } from "../Interfaces"

describe("Bonus", () => {
	const addScoredMoveSpy = jest.fn()
	const addScoredBonusSpy = jest.fn()
	const BonusProps: BonusPropsType = {
		bonus: {
			id: "1234",
			name: "Air",
			shortName: "A"
		},
		addScoredMove: addScoredMoveSpy,
		addScoredBonus: addScoredBonusSpy
	}

	it("calls addScoredBonus when clicked", () => {
		const view = renderWithProviders(<Bonus {...BonusProps} />)
		const wantedCall = ["Air", "1234"]
		expect(addScoredBonusSpy).toHaveBeenCalledTimes(0)

		fireEvent.click(screen.getByLabelText("addBonus"), {
			button: 1
		})
		expect(addScoredBonusSpy).toHaveBeenCalledTimes(1)
		expect(addScoredBonusSpy).toHaveBeenCalledWith(...wantedCall)
	})
})
