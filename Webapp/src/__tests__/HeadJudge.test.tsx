import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import HeadJudge from "../pages/HeadJudge"
import { setupStore } from "../redux/store"

jest.mock("../components/roles/headJudge/WebSocketConnections", () => {
	const createSocket = () => ({} as WebSocket)

	return {
		connectWebRunStatusSocket: jest.fn(createSocket),
		connectTimerSocket: jest.fn(createSocket),
		connectCurrentScoreStatusSocket: jest.fn(createSocket),
		connectBroadcastControlSocket: jest.fn(createSocket)
	}
})

describe("HeadJudge Page", () => {
	it("renders head judge component", async () => {
		render(
			<Provider store={setupStore()}>
				<HeadJudge />
			</Provider>
		)

		expect(
			await screen.findByTestId("loading-skeleton")
		).toBeInTheDocument()
	})
})
