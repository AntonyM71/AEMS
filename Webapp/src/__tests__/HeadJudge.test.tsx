import { screen } from "@testing-library/react"
import HeadJudge from "../pages/HeadJudge"
import { renderWithProviders } from "../testUtils"

jest.mock("../components/roles/headJudge/WebSocketConnections", () => {
	const createSocket = () => ({
		on: jest.fn(),
		off: jest.fn(),
		emit: jest.fn(),
		disconnect: jest.fn(),
		connected: true
	})

	return {
		connectWebRunStatusSocket: jest.fn(createSocket),
		connectTimerSocket: jest.fn(createSocket),
		connectCurrentScoreStatusSocket: jest.fn(createSocket),
		connectBroadcastControlSocket: jest.fn(createSocket)
	}
})

describe("HeadJudge Page", () => {
	it("renders head judge component", async () => {
		renderWithProviders(<HeadJudge />)

		expect(
			await screen.findByTestId("loading-skeleton")
		).toBeInTheDocument()
	})
})
