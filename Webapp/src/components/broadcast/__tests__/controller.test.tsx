import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import { setupStore } from "../../../redux/store"
import * as wsConnections from "../../roles/headJudge/WebSocketConnections"
import OverlayController from "../controller"

// Mock Socket.IO socket and connectBroadcastControlSocket
let mockEmit: jest.Mock<unknown, unknown[]>
let mockDisconnect: jest.Mock<unknown[], unknown[]>
let mockConnected: boolean

class MockSocket {
	public connected = mockConnected
	public on = jest.fn()
	public off = jest.fn()
	public emit = (...args: unknown[]) => {
		mockEmit(...args)
	}
	public disconnect = (...args: unknown[]) => {
		mockDisconnect(...args)
	}
}

jest.mock("../../roles/headJudge/WebSocketConnections", () => ({
	connectBroadcastControlSocket: jest.fn(() => new MockSocket())
}))

describe("OverlayController Socket.IO interactions", () => {
	let store: ReturnType<typeof setupStore>
	beforeEach(() => {
		mockEmit = jest.fn()
		mockDisconnect = jest.fn()
		mockConnected = true
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
			expect(mockEmit).toHaveBeenCalled()
		})
		const [eventName, payload] = mockEmit.mock.calls[0] as [
			string,
			unknown
		]
		expect(eventName).toBe("broadcast_control")
		expect(JSON.stringify(payload)).toContain("showImageCard")
	})

	it("disconnects Socket.IO on component unmount", () => {
		const { unmount } = render(
			<Provider store={store}>
				<OverlayController />
			</Provider>
		)
		unmount()
		expect(mockDisconnect).toHaveBeenCalled()
	})
})
