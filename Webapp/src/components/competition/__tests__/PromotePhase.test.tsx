import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { http, HttpResponse } from "msw"
import { server } from "../../../mocks/server"
import { competitionInitialState } from "../../../redux/atoms/competitions"
import { renderWithProviders } from "../../../testUtils"
import { PromotePhase } from "../PromotePhase"

let promoteBodies: Record<string, unknown>[]

const renderPromotePhase = () =>
	renderWithProviders(<PromotePhase />, {
		preloadedState: {
			competitions: {
				...competitionInitialState,
				selectedCompetition: "1",
				selectedEvent: "1",
				selectedPhase: "phase-1"
			}
		}
	})

beforeEach(() => {
	promoteBodies = []
	server.use(
		http.get("/api/event/:eventPkId/phase", () =>
			HttpResponse.json([{ id: "phase-1", name: "Semi", event_id: "1" }])
		),
		http.post(
			"/api/competition_management/promote_phase",
			async ({ request }) => {
				promoteBodies.push(
					(await request.json()) as Record<string, unknown>
				)

				return HttpResponse.json({ id: "phase-2" })
			}
		)
	)
})

describe("PromotePhase", () => {
	it("keeps Create Phase disabled until a name and a heat are given", async () => {
		const user = userEvent.setup({ delay: null })
		renderPromotePhase()

		const create = await screen.findByRole("button", {
			name: "Create Phase"
		})
		expect(create).toBeDisabled()

		await user.type(
			screen.getByRole("textbox", { name: "New Phase Name" }),
			"Final"
		)
		// A phase name alone is not enough — there is still no heat.
		expect(create).toBeDisabled()
		expect(promoteBodies).toHaveLength(0)
	})

	it("promotes the phase with the entered heat names", async () => {
		const user = userEvent.setup({ delay: null })
		renderPromotePhase()

		await user.type(
			await screen.findByRole("textbox", { name: "New Phase Name" }),
			"Final"
		)
		await user.type(
			screen.getByRole("textbox", { name: "New Heat Name" }),
			"Heat A{Enter}"
		)

		const create = screen.getByRole("button", { name: "Create Phase" })
		await waitFor(() => expect(create).toBeEnabled())
		await user.click(create)

		await waitFor(() => expect(promoteBodies).toHaveLength(1))
		expect(promoteBodies[0]).toMatchObject({
			new_phase_name: "Final",
			new_heat_names: ["Heat A"],
			phase_id: "phase-1"
		})
	})
})
