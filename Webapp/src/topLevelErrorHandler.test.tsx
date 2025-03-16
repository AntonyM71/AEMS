import { toast } from "react-hot-toast"
import { handleErrors } from "./topLevelErrorHandler"

describe("handleErrors", () => {
	beforeEach(() => {
		jest.clearAllMocks()
		process.env.NODE_ENV = "development"
	})

	it("should handle string error correctly", () => {
		const error = "This is a string error"
		handleErrors(error)

		expect(toast.error).toHaveBeenCalledWith(JSON.stringify(error))
	})

	it("should handle error with statusText", () => {
		const error = { statusText: "Not Found" }
		handleErrors(error)

		expect(toast.error).toHaveBeenCalledWith(JSON.stringify("Not Found"))
	})

	it("should handle error with message", () => {
		const error = { message: "An error occurred" }
		handleErrors(error)

		expect(toast.error).toHaveBeenCalledWith(
			JSON.stringify("An error occurred")
		)
	})

	it("should handle error with reason.message", () => {
		const error = { reason: { message: "Detailed reason" } }
		handleErrors(error)

		expect(toast.error).toHaveBeenCalledWith(
			JSON.stringify("Detailed reason")
		)
	})

	it("should handle undefined error gracefully", () => {
		handleErrors(undefined)

		expect(toast.error).toHaveBeenCalledWith(
			JSON.stringify("Undefined Error")
		)
	})
})
