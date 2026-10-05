import { act, screen, waitFor } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { server } from "../../../mocks/server"
import { socketHub } from "../../../mocks/socketHub"
import { renderWithProviders } from "../../../testUtils"
import { defaultOverlayControllerState } from "../../Interfaces"
import Overlay from "../overlay"

jest.mock("../../roles/headJudge/WebSocketConnections")
jest.mock(
	"next/dynamic",
	() => () =>
		jest.requireActual<typeof import("../PixiFrameSequenceOverlay")>(
			"../PixiFrameSequenceOverlay"
		).default
)
jest.mock("pixi.js", () => ({
	__esModule: true,
	Application: jest.fn(() => ({
		canvas: document.createElement("canvas"),
		stage: { addChild: jest.fn() },
		init: () => Promise.resolve(),
		destroy: () => undefined
	})),
	Sprite: jest.fn(() => ({ anchor: { set: jest.fn() } })),
	Texture: { EMPTY: {}, from: jest.fn() },
	Assets: { load: jest.fn(() => Promise.resolve()) }
}))

const athlete = {
	id: "athlete-1",
	first_name: "Robert",
	last_name: "Geary",
	bib: "14",
	scoresheet: "sheet-1",
	affiliation: "IRL"
}

const broadcast = (state: Partial<typeof defaultOverlayControllerState>) =>
	act(() => {
		socketHub.emit("broadcast_control", "broadcast_control", {
			...defaultOverlayControllerState,
			selectedHeat: "heat-1",
			selectedEvent: "event-1",
			selectedAthlete: athlete,
			...state
		})
	})

const overlayVisibility = (className: string) => {
	// eslint-disable-next-line testing-library/no-node-access
	const card = document.querySelector(`.${className}`)

	// eslint-disable-next-line testing-library/no-node-access
	return card?.closest(".AemsOverlay-fallback")?.getAttribute("data-visible")
}

describe("Broadcast overlay page", () => {
	beforeEach(() => {
		socketHub.reset()
		server.use(
			http.get(
				"/componentInfo/:name",
				() => new HttpResponse(null, { status: 502 })
			)
		)
	})

	it.each([
		[
			"showAthleteOverview",
			"AemsAthleteOverview-root",
			"AemsRunCorner-root"
		],
		["showLiveRunScore", "AemsRunCorner-root", "AemsAthleteOverview-root"]
	] as const)(
		"shows only the matching lower third when %s is relayed",
		async (flag, shownCard, hiddenCard) => {
			renderWithProviders(<Overlay />)
			await waitFor(() =>
				expect(
					socketHub.openCount("broadcast_control")
				).toBeGreaterThan(0)
			)

			broadcast({ [flag]: true })

			expect(await screen.findAllByText("Robert GEARY")).toHaveLength(2)
			await waitFor(() =>
				expect(overlayVisibility(shownCard)).toBe("true")
			)
			expect(overlayVisibility(hiddenCard)).toBe("false")
		}
	)

	it("shows the competition overview only while showCompetitionOverview is relayed", async () => {
		renderWithProviders(<Overlay />)
		await waitFor(() =>
			expect(socketHub.openCount("broadcast_control")).toBeGreaterThan(0)
		)

		broadcast({ selectedCompetition: "1", showCompetitionOverview: true })

		expect(await screen.findByText("Competition 1")).toBeInTheDocument()
		await waitFor(() =>
			expect(overlayVisibility("AemsCompetitionOverview-root")).toBe(
				"true"
			)
		)
		expect(overlayVisibility("AemsAthleteOverview-root")).toBe("false")

		broadcast({ selectedCompetition: "1", showCompetitionOverview: false })

		await waitFor(() =>
			expect(overlayVisibility("AemsCompetitionOverview-root")).toBe(
				"false"
			)
		)
	})
})
