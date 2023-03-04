import { fireEvent, screen } from "@testing-library/react"
import { renderWithProviders } from "../../../../../testUtils"
import { AvailableMoveDirections, MovePropsType } from "../Interfaces"
import { MoveCard } from "../MoveCard"

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
			direction: a as AvailableMoveDirections,
			score: 10
		},
		addScoredMove: addScoredMoveSpy,
		addScoredBonus: addScoredBonusSpy
	}

	const view = renderWithProviders(<MoveCard {...MoveProps} />)
	const wantedCall = ["1234", expected]
	expect(addScoredBonusSpy).toHaveBeenCalledTimes(0)

	fireEvent.click(screen.getByLabelText("button" + b.toString()), {
		button: 1
	})
	expect(addScoredMoveSpy).toHaveBeenCalledTimes(1)
	expect(addScoredMoveSpy).toHaveBeenCalledWith(...wantedCall)
})
