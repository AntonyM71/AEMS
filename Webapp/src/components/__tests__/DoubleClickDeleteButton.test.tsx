import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import toast from "react-hot-toast"
import { DoubleClickDeleteButton } from "../DoubleClickDeleteButton"

describe("DoubleClickDeleteButton", () => {
	it("shows a hint toast and does not delete on a single click", async () => {
		const onDelete = jest.fn()
		render(
			<DoubleClickDeleteButton onDelete={onDelete} testId="delete-btn" />
		)

		fireEvent.click(screen.getByTestId("delete-btn"))

		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith("Double Click to delete")
		})
		expect(onDelete).not.toHaveBeenCalled()
	})

	it("deletes without a toast on a double click", () => {
		const onDelete = jest.fn()
		render(
			<DoubleClickDeleteButton onDelete={onDelete} testId="delete-btn" />
		)

		fireEvent.doubleClick(screen.getByTestId("delete-btn"))

		expect(onDelete).toHaveBeenCalledTimes(1)
		expect(toast.error).not.toHaveBeenCalled()
	})

	it("cancels the pending hint when clicked twice in quick succession", async () => {
		const onDelete = jest.fn()
		render(
			<DoubleClickDeleteButton onDelete={onDelete} testId="delete-btn" />
		)

		const button = screen.getByTestId("delete-btn")
		fireEvent.click(button)
		fireEvent.click(button)

		await new Promise((resolve) => setTimeout(resolve, 250))

		expect(toast.error).not.toHaveBeenCalled()
		expect(onDelete).not.toHaveBeenCalled()
	})

	it("does not show a stray hint toast when a click is immediately followed by a double click", async () => {
		const onDelete = jest.fn()
		render(
			<DoubleClickDeleteButton onDelete={onDelete} testId="delete-btn" />
		)

		const button = screen.getByTestId("delete-btn")
		// A real double click in the browser fires click, then dblclick.
		// If the pending single-click hint timeout weren't cleared here,
		// it would still fire and show a misleading toast after deletion.
		fireEvent.click(button)
		fireEvent.doubleClick(button)

		expect(onDelete).toHaveBeenCalledTimes(1)

		await new Promise((resolve) => setTimeout(resolve, 250))
		expect(toast.error).not.toHaveBeenCalled()
	})
})
