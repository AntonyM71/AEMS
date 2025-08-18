import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import { setupStore } from "../../../redux/store"
import * as wsConnections from "../../roles/headJudge/WebSocketConnections"
import OverlayController from "../controller"

// Mock WebSocket and connectBroadcastControlSocket
let mockSend: jest.Mock<unknown, unknown[]>
let mockClose: jest.Mock<unknown[], any>
let mockReadyState: number
class MockWebSocket {
	public onclose: (() => void) | null = null
	public onerror: ((error: unknown) => void) | null = null
	public readyState = mockReadyState
	public send = (...args: unknown[]) => {
		mockSend(...args)
	}
	public close = (...args: unknown[]) => {
		mockClose(...args)
	}
}

jest.mock("../../roles/headJudge/WebSocketConnections", () => ({
	connectBroadcastControlSocket: jest.fn(() => new MockWebSocket())
}))

describe("OverlayController WebSocket interactions", () => {
	let store: ReturnType<typeof setupStore>
	beforeEach(() => {
		mockSend = jest.fn()
		mockClose = jest.fn()
		mockReadyState = 1 // WebSocket.OPEN
		store = setupStore()
		jest.clearAllMocks()
	})

	it("sends overlayControlState on state change", async () => {
		render(
			<Provider store={store}>
				<OverlayController />
			</Provider>
		)
		fireEvent.click(screen.getByText("Show ICF Logo"))
		await waitFor(() => {
			expect(mockSend).toHaveBeenCalled()
		})
		expect(mockSend.mock.calls[0][0]).toContain("showImageCard")
	})

	it("closes WebSocket on error", () => {
		render(
			<Provider store={store}>
				<OverlayController />
			</Provider>
		)
		const wsInstance = (
			wsConnections.connectBroadcastControlSocket as jest.Mock
		).mock.results[0].value as MockWebSocket
		wsInstance.onerror?.(new Error("Test error"))
		expect(mockClose).toHaveBeenCalled()
	})
})
