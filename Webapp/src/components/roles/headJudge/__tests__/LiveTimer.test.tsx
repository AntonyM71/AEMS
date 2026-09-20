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

	it("shows the remaining seconds while the timer is running", async () => {
		renderWithProviders(<LiveTimer />)

		await waitFor(() =>
			expect(socketHub.openCount("timer")).toBeGreaterThan(0)
		)

		act(() => {
			socketHub.emit("timer", "timer", {
				time_remaining: 20,
				status: "running"
			})
		})
		expect(await screen.findByText("20")).toBeInTheDocument()
	})

	it("shows 0 once the timer finishes normally", async () => {
		renderWithProviders(<LiveTimer />)

		await waitFor(() =>
			expect(socketHub.openCount("timer")).toBeGreaterThan(0)
		)

		act(() => {
			socketHub.emit("timer", "timer", {
				time_remaining: 0,
				status: "finished"
			})
		})
		expect(await screen.findByText("0")).toBeInTheDocument()
	})

	it("shows Cancelled instead of a number when the run is cancelled", async () => {
		renderWithProviders(<LiveTimer />)

		await waitFor(() =>
			expect(socketHub.openCount("timer")).toBeGreaterThan(0)
		)

		act(() => {
			socketHub.emit("timer", "timer", {
				time_remaining: 0,
				status: "cancelled"
			})
		})
		expect(await screen.findByText("Cancelled")).toBeInTheDocument()
		expect(screen.queryByText("0")).not.toBeInTheDocument()
	})
})
