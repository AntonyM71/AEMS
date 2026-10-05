import { act, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { http, HttpResponse } from "msw"
import { Provider } from "react-redux"
import toast from "react-hot-toast"
import { socketHub } from "../../../mocks/socketHub"
import { server } from "../../../mocks/server"
import {
	competitionInitialState,
	updateSelectedHeat
} from "../../../redux/atoms/competitions"
import { setupStore } from "../../../redux/store"
import { renderWithProviders } from "../../../testUtils"
import Arena from "../../arena/arena"
import OverlayController from "../controller"

jest.mock("../../roles/headJudge/WebSocketConnections")

beforeEach(() => {
	socketHub.reset()
	server.use(
		http.get("/api/heat/:id", ({ params }) =>
			HttpResponse.json({
				// Distinct from the global /api/heat *list* fixture ("Heat 1"/…)
				// so a future test with a selected competition can't collide.
				id: params.id,
				name: `Heat detail ${String(params.id)}`
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

	it("carries the pre-selected competition, event and heat into the first broadcast", async () => {
		render(
			<Provider
				store={setupStore({
					competitions: {
						...competitionInitialState,
						selectedCompetition: "comp-1",
						selectedEvent: "event-1",
						selectedHeat: "heat-1"
					}
				})}
			>
				<OverlayController />
			</Provider>
		)

		await waitFor(() =>
			expect(socketHub.emittedOn("broadcast_control")).toContainEqual([
				"broadcast_control",
				expect.objectContaining({
					selectedCompetition: "comp-1",
					selectedEvent: "event-1",
					selectedHeat: "heat-1"
				})
			])
		)
	})

	it("emits the ICF-logo toggle to subscribers", async () => {
		const user = userEvent.setup({ delay: null })
		render(
			<Provider store={setupStore()}>
				<OverlayController />
			</Provider>
		)
		await waitFor(() =>
			expect(socketHub.openCount("broadcast_control")).toBeGreaterThan(0)
		)

		// Precondition: the default (and the mount emit) has the logo ON, so
		// asserting OFF below is a genuine state change, not just the default.
		await waitFor(() =>
			expect(socketHub.emittedOn("broadcast_control")).toContainEqual([
				"broadcast_control",
				expect.objectContaining({ showImageCard: true })
			])
		)

		await user.click(screen.getByRole("button", { name: "Show ICF Logo" }))

		await waitFor(() =>
			expect(socketHub.emittedOn("broadcast_control")).toContainEqual([
				"broadcast_control",
				expect.objectContaining({ showImageCard: false })
			])
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
		expect(await screen.findByText("Heat detail 1")).toBeInTheDocument()

		await user.click(summaryButton)
		await waitFor(() =>
			expect(screen.queryByText("Heat detail 1")).not.toBeInTheDocument()
		)
	})

	it("refuses to show the athlete overview until an athlete is selected", async () => {
		const user = userEvent.setup({ delay: null })
		renderWithProviders(<OverlayController />)

		await user.click(
			screen.getByRole("button", { name: "Show Athlete Overview" })
		)

		expect(toast.error).toHaveBeenCalledWith(
			"Please select an athlete to use this feature"
		)
		expect(socketHub.emittedOn("broadcast_control")).not.toContainEqual([
			"broadcast_control",
			expect.objectContaining({ showAthleteOverview: true })
		])
	})

	it("shows the athlete overview for the selected athlete without touching other toggles", async () => {
		const user = userEvent.setup({ delay: null })
		renderWithProviders(<OverlayController />, {
			preloadedState: { competitions: { selectedHeat: "heat-1" } }
		})
		await waitFor(() =>
			expect(socketHub.emittedOn("broadcast_control")).toContainEqual([
				"broadcast_control",
				expect.objectContaining({
					selectedAthlete: expect.objectContaining({
						id: "athlete-1"
					})
				})
			])
		)

		await user.click(
			screen.getByRole("button", { name: "Show Athlete Overview" })
		)

		await waitFor(() =>
			expect(socketHub.emittedOn("broadcast_control")).toContainEqual([
				"broadcast_control",
				expect.objectContaining({
					showAthleteOverview: true,
					showLiveRunScore: false,
					showImageCard: true
				})
			])
		)
	})

	it("no longer offers a separate timer toggle", () => {
		renderWithProviders(<OverlayController />)

		expect(
			screen.queryByRole("button", { name: "Show Timer" })
		).not.toBeInTheDocument()
	})

	it("refuses to show the competition overview until a competition is selected", async () => {
		const user = userEvent.setup({ delay: null })
		renderWithProviders(<OverlayController />)

		await user.click(
			screen.getByRole("button", { name: "Show Competition Overview" })
		)

		expect(toast.error).toHaveBeenCalledWith(
			"Please select a competition to use this feature"
		)
		expect(socketHub.emittedOn("broadcast_control")).not.toContainEqual([
			"broadcast_control",
			expect.objectContaining({ showCompetitionOverview: true })
		])
	})

	it("relays the operator's choice to list heats in the competition overview", async () => {
		const user = userEvent.setup({ delay: null })
		renderWithProviders(<OverlayController />, {
			preloadedState: { competitions: { selectedCompetition: "1" } }
		})

		await user.click(screen.getByRole("button", { name: "Heats" }))
		await user.click(
			screen.getByRole("button", { name: "Show Competition Overview" })
		)

		await waitFor(() =>
			expect(socketHub.emittedOn("broadcast_control")).toContainEqual([
				"broadcast_control",
				expect.objectContaining({
					competitionOverviewList: "heats",
					showCompetitionOverview: true,
					selectedCompetition: "1"
				})
			])
		)
	})
})
