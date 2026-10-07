import { act, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { http, HttpResponse } from "msw"
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
import HeadJudge from "../../roles/headJudge/headJudge"
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
	it("explains that a heat has no athletes instead of crashing", async () => {
		server.use(
			http.get("/api/getHeatInfo/:id", () => HttpResponse.json([]))
		)
		renderWithProviders(<OverlayController />, {
			preloadedState: {
				competitions: {
					selectedCompetition: "comp-1",
					selectedEvent: "event-1",
					selectedHeat: "heat-1"
				}
			}
		})

		expect(
			await screen.findByText(/This heat has no athletes/)
		).toBeInTheDocument()
	})

	it("closes its broadcast socket when it unmounts", async () => {
		const { unmount } = renderWithProviders(<OverlayController />)

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
		renderWithProviders(<OverlayController />, {
			preloadedState: {
				competitions: {
					selectedCompetition: "comp-1",
					selectedEvent: "event-1",
					selectedHeat: "heat-1"
				}
			}
		})

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
		renderWithProviders(<OverlayController />)
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

		const logoTile = screen.getByRole("button", { name: "ICF logo" })
		expect(logoTile).toHaveAttribute("aria-pressed", "true")
		expect(within(logoTile).getByText("On air")).toBeInTheDocument()

		await user.click(logoTile)

		expect(logoTile).toHaveAttribute("aria-pressed", "false")
		expect(within(logoTile).getByText("Off")).toBeInTheDocument()

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

		const { store: controllerStore } = renderWithProviders(
			<OverlayController />
		)
		renderWithProviders(<Arena />)

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
			name: "Heat summary"
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
			screen.getByRole("button", { name: "Athlete overview" })
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
			screen.getByRole("button", { name: "Athlete overview" })
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
			screen.getByRole("button", { name: "Competition overview" })
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
			screen.getByRole("button", { name: "Competition overview" })
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

	describe("Follow head judge mode", () => {
		const headJudgePosition = {
			competitionId: "comp-1",
			heatId: "heat-9",
			athlete: {
				id: "athlete-2",
				first_name: "Sam",
				last_name: "Jones",
				bib: "7",
				scoresheet: "sheet-1"
			},
			runNumber: 1
		}

		const lastBroadcast = () =>
			socketHub
				.emittedOn("broadcast_control")
				.filter(([event]) => event === "broadcast_control")
				.at(-1)?.[1]

		const mountController = () => {
			renderWithProviders(<OverlayController />, {
				preloadedState: {
					competitions: {
						selectedCompetition: "comp-1"
					}
				}
			})

			return userEvent.setup({ delay: null })
		}

		it("switching to Follow emits followHeadJudge with the visibility flags unchanged", async () => {
			const user = mountController()
			await waitFor(() =>
				expect(lastBroadcast()).toEqual(
					expect.objectContaining({
						followHeadJudge: false,
						showImageCard: true
					})
				)
			)

			await user.click(
				screen.getByRole("button", { name: "Follow head judge" })
			)

			await waitFor(() =>
				expect(lastBroadcast()).toEqual(
					expect.objectContaining({
						followHeadJudge: true,
						showImageCard: true,
						showLiveRunScore: false
					})
				)
			)
		})

		it("disables competition, heat, paddler and run but not event and phase", async () => {
			const user = mountController()
			await screen.findByText("Select Event")

			await user.click(
				screen.getByRole("button", { name: "Follow head judge" })
			)

			const followedPickers = await screen.findAllByTestId(
				"followed-picker"
			)
			const followedText = followedPickers
				.map((picker) => picker.textContent)
				.join(" ")
			followedPickers.forEach((picker) =>
				expect(picker).toHaveAttribute("inert")
			)
			expect(followedText).toContain("Select Competition")
			expect(followedText).toContain("No Heats in Competition")
			expect(followedText).not.toContain("Select Event")
			expect(followedText).not.toContain("Select Phase")
			expect(screen.getByText("Select Event")).toBeInTheDocument()
			expect(screen.getByRole("alert")).toHaveTextContent(
				"Waiting for head judge"
			)
		})

		it("names the head judge's athlete and run in the info message", async () => {
			const user = mountController()
			await user.click(
				screen.getByRole("button", { name: "Follow head judge" })
			)
			await waitFor(() =>
				expect(
					socketHub.openCount("head_judge_selection")
				).toBeGreaterThan(0)
			)

			act(() => {
				socketHub.emit(
					"head_judge_selection",
					"head_judge_selection",
					headJudgePosition
				)
			})

			await waitFor(() =>
				expect(screen.getByRole("alert")).toHaveTextContent(
					"Sam Jones, run 2"
				)
			)
		})

		it("shows the heat summary from the controller's own heat until a head judge position arrives", async () => {
			const store = setupStore({
				competitions: {
					...competitionInitialState,
					selectedCompetition: "comp-1",
					selectedHeat: "heat-1"
				}
			})
			renderWithProviders(<OverlayController />, { store })
			const user = userEvent.setup({ delay: null })
			await user.click(
				screen.getByRole("button", { name: "Follow head judge" })
			)
			await screen.findAllByTestId("followed-picker")

			await user.click(
				screen.getByRole("button", { name: "Heat summary" })
			)

			await waitFor(() =>
				expect(lastBroadcast()).toEqual(
					expect.objectContaining({
						followHeadJudge: true,
						showHeatSummary: true
					})
				)
			)
		})

		it("switching back to Manual re-enables every picker and turns following off", async () => {
			const user = mountController()
			await user.click(
				screen.getByRole("button", { name: "Follow head judge" })
			)
			await screen.findAllByTestId("followed-picker")

			await user.click(screen.getByRole("button", { name: "Manual" }))

			await waitFor(() =>
				expect(lastBroadcast()).toEqual(
					expect.objectContaining({ followHeadJudge: false })
				)
			)
			expect(screen.queryAllByTestId("followed-picker")).toHaveLength(0)
			expect(screen.queryByRole("alert")).not.toBeInTheDocument()
			expect(screen.getByText("Select Competition")).toBeInTheDocument()
		})
	})

	it("re-sends its current state when a display asks for it", async () => {
		const user = userEvent.setup({ delay: null })
		renderWithProviders(<OverlayController />)
		await user.click(
			screen.getByRole("button", { name: "Follow head judge" })
		)
		const broadcasts = () =>
			socketHub
				.emittedOn("broadcast_control")
				.filter(([event]) => event === "broadcast_control")
		await waitFor(() =>
			expect(broadcasts().at(-1)?.[1]).toEqual(
				expect.objectContaining({ followHeadJudge: true })
			)
		)
		const sentBeforeRequest = broadcasts().length

		act(() => {
			socketHub.emit("broadcast_control", "request_broadcast_control")
		})

		await waitFor(() =>
			expect(broadcasts().length).toBeGreaterThan(sentBeforeRequest)
		)
		expect(broadcasts().at(-1)?.[1]).toEqual(
			expect.objectContaining({ followHeadJudge: true })
		)
	})

	// The controller, head judge and arena each run on their own store, as on
	// separate devices; the echoing hub stands in for the server relay.
	it("a reloaded arena recovers Follow mode and shows the head judge's athlete", async () => {
		socketHub.enableEcho("broadcast_control")
		socketHub.enableEcho("head_judge_selection")
		const user = userEvent.setup({ delay: null })

		renderWithProviders(<OverlayController />)
		renderWithProviders(<HeadJudge />, {
			preloadedState: {
				competitions: {
					selectedCompetition: "comp-1",
					selectedHeat: "heat-1"
				}
			}
		})
		await user.click(
			screen.getByRole("button", { name: "Follow head judge" })
		)
		await screen.findByTestId("head-judge-page")
		// The controller and head judge each hold a head_judge_selection
		// socket; wait for both so the arena's own socket is the next one.
		await waitFor(() =>
			expect(socketHub.openCount("head_judge_selection")).toBe(2)
		)

		// The arena opens after the controller and head judge have settled,
		// as a display reloaded mid-event would.
		renderWithProviders(<Arena />)
		act(() => {
			socketHub.emit("broadcast_control", "connect")
		})
		await waitFor(() =>
			expect(socketHub.openCount("head_judge_selection")).toBe(3)
		)
		act(() => {
			socketHub.emit("head_judge_selection", "connect")
		})

		// "SMITH" also appears on the head judge's own paddler picker.
		await waitFor(() =>
			expect(screen.getAllByText("SMITH").length).toBeGreaterThan(1)
		)
	})
})
