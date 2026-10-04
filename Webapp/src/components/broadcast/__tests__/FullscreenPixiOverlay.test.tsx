import { ThemeProvider } from "@mui/material/styles"
import { render, screen, waitFor } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { Provider } from "react-redux"
import { server } from "../../../mocks/server"
import { competitionInitialState } from "../../../redux/atoms/competitions"
import { setupStore } from "../../../redux/store"
import { HeatListModal } from "../Cards/HeatListModal"
import { icfWhite, lightTheme } from "../overlayTheme"

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

const hexToRgb = (hex: string): string => {
	const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))

	return `rgb(${r}, ${g}, ${b})`
}

// The fallback backdrop targets card class names; if a card refactor renames
// them, the panels silently vanish on air. This test renders a real card to catch it.
describe("FullscreenPixiOverlay fallback backdrop", () => {
	it("puts the heat summary's rows on a light ICF panel when the graphics server is down", async () => {
		server.use(
			http.get(
				"/componentInfo/startList",
				() => new HttpResponse(null, { status: 502 })
			)
		)

		render(
			<Provider
				store={setupStore({
					competitions: {
						...competitionInitialState,
						selectedHeat: "1"
					}
				})}
			>
				<ThemeProvider theme={lightTheme}>
					<HeatListModal isVisible />
				</ThemeProvider>
			</Provider>
		)

		const athleteCell = await screen.findByText("John SMITH")
		// eslint-disable-next-line testing-library/no-node-access
		const fallbackRoot = athleteCell.closest(".AemsOverlay-fallback")
		await waitFor(() =>
			expect(fallbackRoot).toHaveAttribute("data-visible", "true")
		)

		// Only the table body is asserted: jsdom resolves styles by source order,
		// not specificity, so the card's navy loses to MUI's later Paper rule here
		// even though it wins in a browser.
		// eslint-disable-next-line testing-library/no-node-access
		expect(athleteCell.closest("tbody")).toHaveStyle({
			backgroundColor: hexToRgb(icfWhite)
		})
	})
})
