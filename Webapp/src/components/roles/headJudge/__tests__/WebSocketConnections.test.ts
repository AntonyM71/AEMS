import { io } from "socket.io-client"

import {
	connectBroadcastControlSocket,
	connectCurrentScoreStatusSocket,
	connectTimerSocket,
	connectWebRunStatusSocket
} from "../WebSocketConnections"

// jest.mock is hoisted above the imports, so `io` above is already the mock.
jest.mock("socket.io-client", () => ({
	io: jest.fn(() => ({}))
}))

describe("WebSocketConnections", () => {
	beforeEach(() => {
		;(io as jest.Mock).mockClear()
	})

	const connectors = [
		["run status", connectWebRunStatusSocket, "/run_status"],
		["timer", connectTimerSocket, "/timer"],
		["current scores", connectCurrentScoreStatusSocket, "/current_scores"],
		[
			"broadcast control",
			connectBroadcastControlSocket,
			"/broadcast_control"
		]
	] as const

	it.each(connectors)(
		"the %s socket connects over websocket only",
		(_name, connect, namespace) => {
			connect()

			const [url, options] = (io as jest.Mock).mock.calls[0]
			expect(url).toContain(namespace)
			expect((options as Record<string, unknown>).transports).toEqual([
				"websocket"
			])
		}
	)
})
