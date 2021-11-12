import { fireEvent, render, screen, within } from "@testing-library/react"
import React from "react"
import { BrowserRouter } from "react-router-dom"
import { RecoilRoot } from "recoil"
import * as uuid from "uuid"
import {
	availableMovesListState,
	scoredMovesState
} from "../../../../../recoil/atoms"
import { RecoilObserver } from "../../../../../RecoilObserver"
import Float from "../Float"
import { movesType } from "../Interfaces"
import { testMoves } from "./TestData"

describe("The test-move cards are rendered", () => {
	it("updates the state with the list of available moves, and renders them", () => {
		const onChange = jest.fn()
		render(
			<RecoilRoot>
				<BrowserRouter>
					<RecoilObserver
						node={availableMovesListState}
						onChange={onChange}
					/>
					<Float />
				</BrowserRouter>
			</RecoilRoot>
		)
		// Assert initial setup
		expect(onChange).toHaveBeenCalledWith(testMoves)

		testMoves.forEach((move: movesType) => {
			// get all buttons wiht the move id in their test id
			const components = screen.getAllByTestId("button-" + move.id, {
				exact: false
			})
			expect(components).toBeTruthy()
		})
	})
})

// We access moves by their UUID in the infobar, make a spy so we can hard code these each test
// const mockUuid = jest.fn().mockImplementation(() => "000-000-000")
// jest.mock("uuid", () => mockUuid
jest.mock("uuid")
const mockUuid = jest.spyOn(uuid, "v4")
describe("Add moves", () => {
	it("adds moves to the state and displays them in the infobar when the move card buttons are pressed", () => {
		const onChange = jest.fn()
		render(
			<RecoilRoot>
				<BrowserRouter>
					<RecoilObserver
						node={scoredMovesState}
						onChange={onChange}
					/>
					<Float />
				</BrowserRouter>
			</RecoilRoot>
		)
		// Assert initial setup
		expect(onChange).toHaveBeenCalledWith([])

		testMoves.forEach((move: movesType) => {
			// get all buttons wiht the move id in their test id
			const components = screen.getAllByTestId("button-" + move.id, {
				exact: false
			})

			components.forEach(
				(
					component: Document | Node | Element | Window,
					index: number
				) => {
					mockUuid.mockReturnValue(move.id + "-" + index.toString())
					// uuidSpy.mockImplementation(() => mockMoveUUID)
					fireEvent.click(component)

					// Assert the state has been updated
					expect(onChange).toHaveBeenCalledWith(
						expect.arrayContaining([
							expect.objectContaining({
								bonuses: [],
								id: move.id + "-" + index.toString(),
								moveId: move.id,
								status: "active"
							})
						])
					)
					const scoredMoveCard = screen.getByTestId(
						"scored-move-" + move.id + "-" + index.toString()
					)
					// Assert there is a card for the move
					expect(scoredMoveCard).toBeTruthy()

					const { getByText } = within(scoredMoveCard)
					expect(getByText(move.name)).toBeTruthy()
					// Assert the card has the right name
				}
			)
		})
	})
})
