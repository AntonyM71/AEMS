import { act, screen, waitFor } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { renderWithProviders } from "../../../testUtils"
import { socketHub } from "../../../mocks/socketHub"
import { server } from "../../../mocks/server"
import { defaultOverlayControllerState } from "../../Interfaces"
import Arena from "../arena"

jest.mock("../../roles/headJudge/WebSocketConnections")

const broadcast = (state: Partial<typeof defaultOverlayControllerState>) =>
	act(() => {
		socketHub.emit("broadcast_control", "broadcast_control", {
			...defaultOverlayControllerState,
			...state
		})
	})

const selectedAthlete = {
	id: "athlete-1",
	first_name: "Jo",
	last_name: "Rivera",
	bib: "42",
	scoresheet: "sheet-1"
}

describe("Arena", () => {
	beforeEach(() => {
		socketHub.reset()
		server.use(
			http.get("/api/heat/:id", ({ params }) =>
				HttpResponse.json({
					// Distinct from the global /api/heat *list* fixture
					// ("Heat 1"/…) so a name query here can't collide.
					id: params.id,
					name: `Heat detail ${String(params.id)}`
				})
			)
		)
	})

	it("shows the athlete and heat the broadcast operator pushes to the screen", async () => {
		renderWithProviders(<Arena />)

		await waitFor(() =>
			expect(socketHub.openCount("broadcast_control")).toBeGreaterThan(0)
		)

		broadcast({
			selectedHeat: "1",
			selectedAthlete,
			showLiveRunScore: true,
			showHeatSummary: true
		})

		// AthleteInfo renders the surname in caps, always visible on the arena
		expect(await screen.findByText("RIVERA")).toBeInTheDocument()
		// The heat summary modal now shows the selected heat's name
		expect(await screen.findByText("Heat detail 1")).toBeInTheDocument()

		broadcast({
			selectedHeat: "1",
			selectedAthlete,
			showLiveRunScore: true,
			showHeatSummary: false
		})

		await waitFor(() =>
			expect(screen.queryByText("Heat detail 1")).not.toBeInTheDocument()
		)
		expect(screen.getByText("RIVERA")).toBeInTheDocument()
	})
})
