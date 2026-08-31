import { act, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { http, HttpResponse } from "msw"
import { Provider } from "react-redux"
import { socketHub } from "../../../mocks/socketHub"
import { server } from "../../../mocks/server"
import { updateSelectedHeat } from "../../../redux/atoms/competitions"
import { setupStore } from "../../../redux/store"
import Arena from "../../arena/arena"
import OverlayController from "../controller"

jest.mock("../../roles/headJudge/WebSocketConnections")

beforeEach(() => {
	socketHub.reset()
	server.use(
		http.get("/api/heat/:id", ({ params }) =>
			HttpResponse.json({
				id: params.id,
				name: `Heat ${String(params.id)}`
			})
		)
	)
})

describe("OverlayController", () => {
	it("closes its broadcast socket when it unmounts", async () => {
		const { unmount } = render(
			<Provider store={setupStore()}>
				<OverlayController />
			</Provider>
		)

		await waitFor(() =>
			expect(socketHub.openCount("broadcast_control")).toBeGreaterThan(0)
		)
		unmount()

		await waitFor(() =>
			expect(
				socketHub.disconnectedCount("broadcast_control")
			).toBeGreaterThan(0)
		)
	})

	// Proves the client contract only — the controller emits what the arena
	// knows how to consume. The real server broadcast is covered by
	// e2e/tests/websocket.spec.ts.
	it("pushes the operator's changes through to the arena screen", async () => {
		socketHub.enableEcho("broadcast_control")
		const user = userEvent.setup({ delay: null })
		const controllerStore = setupStore()

		render(
			<>
				<Provider store={controllerStore}>
					<OverlayController />
				</Provider>
				<Provider store={setupStore()}>
					<Arena />
				</Provider>
			</>
		)

		await waitFor(() =>
			expect(
				socketHub.openCount("broadcast_control")
			).toBeGreaterThanOrEqual(2)
		)

		// The operator selects a heat on the controller.
		act(() => {
			controllerStore.dispatch(updateSelectedHeat("1"))
		})
		// Held as a ref: opening the modal marks the rest of the DOM
		// aria-hidden, so a role query can't find the button a second time.
		const summaryButton = screen.getByRole("button", {
			name: "Show Heat Summary Modal"
		})
		await user.click(summaryButton)

		// The arena, on its own separate store, shows the heat the operator picked.
		expect(await screen.findByText("Heat 1")).toBeInTheDocument()

		await user.click(summaryButton)
		await waitFor(() =>
			expect(screen.queryByText("Heat 1")).not.toBeInTheDocument()
		)
	})
})
