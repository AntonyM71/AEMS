import { act, screen, waitFor } from "@testing-library/react"
import { renderWithProviders } from "../../../../testUtils"
import { socketHub } from "../../../../mocks/socketHub"
import LiveTimer from "../LiveTimer"

jest.mock("../WebSocketConnections")

describe("LiveTimer", () => {
	beforeEach(() => socketHub.reset())

	it("starts at 0 before any timer event arrives", () => {
		renderWithProviders(<LiveTimer />)

		expect(screen.getByText("Timer:")).toBeInTheDocument()
		expect(screen.getByText("0")).toBeInTheDocument()
	})

	it("shows the remaining seconds sent by the server", async () => {
		renderWithProviders(<LiveTimer />)

		await waitFor(() =>
			expect(socketHub.openCount("timer")).toBeGreaterThan(0)
		)

		act(() => {
			socketHub.emit("timer", "timer", { time_remaining: 30 })
		})
		expect(await screen.findByText("30")).toBeInTheDocument()

		act(() => {
			socketHub.emit("timer", "timer", { time_remaining: 12 })
		})
		expect(await screen.findByText("12")).toBeInTheDocument()
		expect(screen.queryByText("30")).not.toBeInTheDocument()
	})
})
