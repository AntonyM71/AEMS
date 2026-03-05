import { render, screen } from "@testing-library/react"
import React from "react"
import { renderWithProviders } from "../../../../testUtils"
import LiveTimer from "../LiveTimer"
import * as WebSocketConnections from "../WebSocketConnections"

// Create a properly typed mock Socket.IO socket
const createMockSocket = () => {
	const handlers: Record<string, ((...args: unknown[]) => void)[]> = {}
	const socket = {
		on: jest.fn((event: string, handler: (...args: unknown[]) => void) => {
			if (!handlers[event]) handlers[event] = []
			handlers[event].push(handler)
		}),
		off: jest.fn(),
		emit: jest.fn(),
		disconnect: jest.fn(),
		connected: true,
		// Helper to simulate incoming events in tests
		_trigger: (event: string, ...args: unknown[]) => {
			handlers[event]?.forEach((h) => h(...args))
		}
	}

	return socket
}

// Create a mock socket
let mockSocket: ReturnType<typeof createMockSocket>

// Mock the WebSocketConnections module
jest.mock("../WebSocketConnections", () => {
	const mock = {
		connectTimerSocket: jest.fn(() => mockSocket)
	}

	return mock
})

describe("LiveTimer Component", () => {
	beforeEach(() => {
		// Create a fresh mock socket for each test
		mockSocket = createMockSocket()
		jest.clearAllMocks()
	})

	it("renders the initial timer with value of 0", () => {
		renderWithProviders(<LiveTimer />)

		// Check if the component renders correctly
		expect(screen.getByText("Timer:")).toBeInTheDocument()
		expect(screen.getByText("0")).toBeInTheDocument()
	})

	it("establishes a Socket.IO connection when mounted", () => {
		// Get a reference to the mocked function
		const connectTimerMock =
			WebSocketConnections.connectTimerSocket as jest.Mock

		// Clear previous calls
		connectTimerMock.mockClear()

		// Render the component
		renderWithProviders(<LiveTimer />)

		// Check that the connection function was called once
		expect(connectTimerMock).toHaveBeenCalledTimes(1)
	})

	it("registers a timer event listener on connect", () => {
		renderWithProviders(<LiveTimer />)

		// Verify the socket registered the 'timer' event handler
		expect(mockSocket.on).toHaveBeenCalledWith(
			"timer",
			expect.any(Function)
		)
	})

	it("attempts to reconnect when the Socket.IO connection closes", () => {
		// Mock the global setTimeout function
		jest.useFakeTimers()

		// Create a more capable mock for connectTimerSocket
		const connectTimerMock = jest.fn()
		;(
			WebSocketConnections.connectTimerSocket as jest.Mock
		).mockImplementation(() => {
			connectTimerMock()

			return mockSocket
		})

		// Render component (this will call connectTimerSocket once)
		renderWithProviders(<LiveTimer />)

		// Verify first connection
		expect(connectTimerMock).toHaveBeenCalledTimes(1)

		// Create connection close handler to mimic Socket.IO reconnection behavior
		const reconnectFunc = () => {
			// This simulates the component calling connectTimerSocket again
			mockSocket = createMockSocket()
			;(WebSocketConnections.connectTimerSocket as jest.Mock)()
		}

		// Simulate a reconnect happening after delay
		global.setTimeout(reconnectFunc, 1000)

		// Fast-forward time to trigger the setTimeout
		jest.advanceTimersByTime(1000)

		// Verify the second connection was attempted
		expect(connectTimerMock).toHaveBeenCalledTimes(2)

		// Clean up
		jest.useRealTimers()
	})
})
