// Manual mock used by tests that call jest.mock("../WebSocketConnections") with
// no factory. Routes every connect*Socket call through the shared socketHub so a
// test can emit inbound events and assert on the rendered result.
import { socketHub } from "../../../../mocks/socketHub"

export const connectTimerSocket = jest.fn(() => socketHub.connect("timer"))
export const connectWebRunStatusSocket = jest.fn(() =>
	socketHub.connect("run_status")
)
export const connectCurrentScoreStatusSocket = jest.fn(() =>
	socketHub.connect("current_scores")
)
export const connectBroadcastControlSocket = jest.fn(() =>
	socketHub.connect("broadcast_control")
)
