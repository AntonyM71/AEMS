import { fireEvent, screen, within } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import * as uuid from "uuid"

import { renderWithProviders } from "../../../../testUtils"
import { movesType } from "../Interfaces"
import Float from "../Scribe"
import { testMoves } from "./TestData"

describe("The test-move cards are rendered", () => {
	it("updates the state with the list of available moves, and renders them", () => {
		const onChange = jest.fn()
		renderWithProviders(
			<BrowserRouter>
				<Float />
			</BrowserRouter>,
			{}
		)
		// Assert initial setup
		expect(onChange).toHaveBeenCalledWith(testMoves)

		testMoves.forEach((move: movesType) => {
			// get all buttons with the move id in their test id
			const components = screen.getAllByTestId("button-" + move.id, {
				exact: false
			})

			const expectedNumber = move.direction === "SINGLE" ? 1 : 2
			expect(components.length).toEqual(expectedNumber)
		})
	})
})

jest.mock("uuid")
const mockUuid = jest.spyOn(uuid, "v4")
describe("Add moves", () => {
	it("adds moves to the state and displays them in the infobar when the move card buttons are pressed", () => {
		const onChange = jest.fn()
		renderWithProviders(
			<BrowserRouter>
				<Float />
			</BrowserRouter>,
			{}
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
					expect(scoredMoveCard).toBeInTheDocument()

					const { getByText } = within(scoredMoveCard)
					expect(getByText(move.name)).toBeInTheDocument()
					// Assert the card has the right name
				}
			)
		})
	})
})

describe("Deletemoves", () => {
	it("adds moves to the state and displays, then removes them when the delete button is pressed", () => {
		const addedMoveIDs: string[] = []
		const onChange = jest.fn()
		renderWithProviders(
			<BrowserRouter>
				<Float />
			</BrowserRouter>
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
					fireEvent.click(component)
					addedMoveIDs.push(move.id + "-" + index.toString())
					const scoredMoveCard = screen.getByTestId(
						"scored-move-" + move.id + "-" + index.toString()
					)
					// Assert there is a card for the move
					expect(scoredMoveCard).toBeInTheDocument()
				}
			)
		})

		addedMoveIDs.forEach((moveId: string) => {
			const scoredMoveCard = screen.getByTestId("scored-move-" + moveId)
			// Assert there is a card for the move before deleting
			expect(scoredMoveCard).toBeInTheDocument()

			// Find and click delete button
			const deleteButton = screen.getByTestId("scored-remove-" + moveId)
			fireEvent.click(deleteButton)

			// Assert that the move is not in the state after delete is clicked
			expect(onChange).toHaveBeenCalledWith(
				expect.not.arrayContaining([
					expect.objectContaining({
						id: moveId
					})
				])
			)
			// Assert the component has been removed
			const deletedMoveCard = screen.queryByTestId(
				"scored-move-" + moveId
			)
			expect(deletedMoveCard).not.toBeInTheDocument()
		})
	})
})
