import React from "react"
import { fireEvent, render } from "@testing-library/react"
import { Bonus } from "../Bonus"
import { MovePropsType } from "../Interfaces"
import { Move } from "../Move"

test.each([
	["LR", 1, "L"],
	["LR", 2, "R"],
	["FB", 1, "F"],
	["FB", 2, "B"],
	["LRFB", 1, "LF"],
	["LRFB", 2, "RB"],
	["SINGLE", 1, "A"]
])(".simulate button click for %s moves, button %i)", (a, b, expected) => {
	const addScoredMoveSpy = jest.fn()
	const addScoredBonusSpy = jest.fn()
	const MoveProps: MovePropsType = {
		move: {
			id: "1234",
			name: "",
			direction: a,
			score: {
				L: 0,
				R: 0,
				F: 0,
				B: 0,
				LF: 0,
				RB: 0,
				A: 0
			}
		},
		addScoredMove: addScoredMoveSpy,
		addScoredBonus: addScoredBonusSpy
	}

	const wrapper = render(<Move {...MoveProps} />)
	const wantedCall = ["1234", expected]
	expect(addScoredBonusSpy).toHaveBeenCalledTimes(0)

	fireEvent.click(wrapper.getByLabelText("button" + b.toString()), {
		button: 1
	})
	expect(addScoredMoveSpy).toHaveBeenCalledTimes(1)
	expect(addScoredMoveSpy).toHaveBeenCalledWith(...wantedCall)
})
