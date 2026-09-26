import { render, screen, waitFor } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { server } from "../../../mocks/server"
import PixiFrameSequenceOverlay from "../PixiFrameSequenceOverlay"

jest.mock("pixi.js", () => {
	const createTexture = () => ({ width: 100, height: 100 })
	const textureFrom = jest.fn(() => createTexture())
	const assetsLoad = jest.fn(() => Promise.resolve())
	const createSprite = (texture: unknown) => ({
		anchor: { set: jest.fn() },
		position: { set: jest.fn() },
		width: 0,
		height: 0,
		texture
	})
	const createApplication = () => ({
		canvas: document.createElement("canvas"),
		stage: { addChild: jest.fn() },
		init: () => Promise.resolve(),
		destroy: () => undefined
	})

	return {
		__esModule: true,
		Application: jest.fn(createApplication),
		Sprite: jest.fn(createSprite),
		Texture: { EMPTY: createTexture(), from: textureFrom },
		Assets: { load: assetsLoad },
		__mockTextureFrom: textureFrom
	}
})

// jest.mock's factory must be self-contained (it runs during module import,
// before any of this file's own top-level statements), so the mock function
// is smuggled out through the module's exports and read back once here.
const { __mockTextureFrom: mockTextureFrom } = jest.requireMock("pixi.js")

const contentWrapper = () =>
	// eslint-disable-next-line testing-library/no-node-access
	screen.getByTestId("content").parentElement

// Wait for the frames to actually finish loading before checking the render
// state, so the assertion reflects real playback progress rather than a
// coincidental match against an earlier render.
const waitForFramesLoaded = async (count: number) => {
	await waitFor(() => expect(mockTextureFrom).toHaveBeenCalledTimes(count))
}

describe("PixiFrameSequenceOverlay", () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	it("plays the intro once and settles into the looping hold frame", async () => {
		render(
			<PixiFrameSequenceOverlay
				frameUrls={["a.png", "b.png", "c.png"]}
				holdImage={1}
				fps={1000}
				isVisible
			>
				<div data-testid="content">Content</div>
			</PixiFrameSequenceOverlay>
		)

		// Synchronous initial render, before Pixi/frame loading resolves.
		expect(contentWrapper()).toHaveStyle({ opacity: 0 })

		await waitForFramesLoaded(3)
		await waitFor(() => expect(contentWrapper()).toHaveStyle({ opacity: 1 }))

		// Further ticks on the hold frame must not replay the intro.
		await new Promise((resolve) => setTimeout(resolve, 30))
		expect(contentWrapper()).toHaveStyle({ opacity: 1 })
	})

	it("plays the outro when the card is hidden and reports completion", async () => {
		const onExitComplete = jest.fn()
		const props = {
			frameUrls: ["a.png", "b.png", "c.png", "d.png"],
			holdImage: 1,
			fps: 1000,
			onExitComplete
		}

		const { rerender } = render(
			<PixiFrameSequenceOverlay {...props} isVisible>
				<div data-testid="content">Content</div>
			</PixiFrameSequenceOverlay>
		)

		await waitForFramesLoaded(4)
		await waitFor(() => expect(contentWrapper()).toHaveStyle({ opacity: 1 }))

		rerender(
			<PixiFrameSequenceOverlay {...props} isVisible={false}>
				<div data-testid="content">Content</div>
			</PixiFrameSequenceOverlay>
		)

		await waitFor(() => expect(onExitComplete).toHaveBeenCalledTimes(1))
	})

	it("resolves frame urls from a mocked /componentInfo/{name} response", async () => {
		server.use(
			http.get("/componentInfo/pack1", () =>
				HttpResponse.json({
					path: "https://graphics.local/packs/pack1",
					frameCount: 2,
					fileNamePrefix: "frame_",
					fileNamePadding: 2,
					fileExtension: "png",
					holdImage: 0
				})
			)
		)

		render(<PixiFrameSequenceOverlay configName="pack1" isVisible={false} />)

		await waitFor(() =>
			expect(mockTextureFrom).toHaveBeenCalledTimes(2)
		)
		expect(mockTextureFrom).toHaveBeenCalledWith(
			"https://graphics.local/packs/pack1/frame_01.png"
		)
		expect(mockTextureFrom).toHaveBeenCalledWith(
			"https://graphics.local/packs/pack1/frame_02.png"
		)
	})
})
