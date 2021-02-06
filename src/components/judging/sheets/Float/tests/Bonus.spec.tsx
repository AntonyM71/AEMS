import React from "react"
import { fireEvent, render } from "@testing-library/react"
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
	it("matches the SnapShot", () => {
		const wrapper = render(<Bonus {...BonusProps} />)
		expect(wrapper).toMatchSnapshot()
	})
	it("calls addScoredBonus when clicked", () => {
		const wrapper = render(<Bonus {...BonusProps} />)
		const wantedCall = ["Air", "1234"]
		expect(addScoredBonusSpy).toHaveBeenCalledTimes(0)

		fireEvent.click(wrapper.getByLabelText("addBonus"), {
			button: 1
		})
		expect(addScoredBonusSpy).toHaveBeenCalledTimes(1)
		expect(addScoredBonusSpy).toHaveBeenCalledWith(...wantedCall)
	})
})
