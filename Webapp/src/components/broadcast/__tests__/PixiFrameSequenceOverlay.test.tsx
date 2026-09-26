import { render, screen, waitFor } from "@testing-library/react"
import PixiFrameSequenceOverlay from "../PixiFrameSequenceOverlay"

jest.mock("pixi.js", () => {
	class MockTexture {
		width = 100
		height = 100
		url?: string
		constructor(url?: string) {
			this.url = url
		}
	}
	const textureFrom = jest.fn((url: string) => new MockTexture(url))
	const assetsLoad = jest.fn(() => Promise.resolve())
	class MockSprite {
		anchor = { set: jest.fn() }
		position = { set: jest.fn() }
		width = 0
		height = 0
		texture: unknown
		constructor(texture: unknown) {
			this.texture = texture
		}
	}
	class MockApplication {
		canvas = document.createElement("canvas")
		stage = { addChild: jest.fn() }
		async init() {}
		destroy() {}
	}

	return {
		__esModule: true,
		Application: MockApplication,
		Sprite: MockSprite,
		Texture: { EMPTY: new MockTexture("empty"), from: textureFrom },
		Assets: { load: assetsLoad },
		__mockTextureFrom: textureFrom
	}
})

const getPixiMocks = () =>
	jest.requireMock("pixi.js") as unknown as {
		__mockTextureFrom: jest.Mock
	}

const getContentOpacity = () =>
	(screen.getByTestId("content").parentElement as HTMLElement).style.opacity

// Mount briefly reports phase "done" (nothing to animate) while the Pixi app
// is still initializing, which also satisfies the "children visible" render
// condition. Waiting for the real frames to load first before checking
// opacity avoids mistaking that transient state for the post-intro hold.
const waitForFramesLoaded = async (count: number) => {
	const { __mockTextureFrom: textureFromMock } = getPixiMocks()
	await waitFor(() => expect(textureFromMock).toHaveBeenCalledTimes(count))
}

describe("PixiFrameSequenceOverlay", () => {
	const originalFetch = global.fetch

	afterEach(() => {
		jest.clearAllMocks()
		global.fetch = originalFetch
	})

	it("keeps children hidden while the Pixi app is still initializing", () => {
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
		expect(getContentOpacity()).toBe("0")
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

		await waitForFramesLoaded(3)
		await waitFor(() => expect(getContentOpacity()).toBe("1"), {
			timeout: 3000
		})

		// Further ticks on the hold frame must not replay the intro.
		await new Promise((resolve) => setTimeout(resolve, 30))
		expect(getContentOpacity()).toBe("1")
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
		await waitFor(() => expect(getContentOpacity()).toBe("1"), {
			timeout: 3000
		})

		rerender(
			<PixiFrameSequenceOverlay {...props} isVisible={false}>
				<div data-testid="content">Content</div>
			</PixiFrameSequenceOverlay>
		)

		await waitFor(() => expect(onExitComplete).toHaveBeenCalledTimes(1), {
			timeout: 3000
		})
	})

	it("resolves frame urls from a mocked /componentInfo/{name} response", async () => {
		const { __mockTextureFrom: textureFromMock } = getPixiMocks()
		const fetchMock = jest.fn().mockResolvedValue({
			ok: true,
			url: "https://graphics.local/componentInfo/pack1",
			json: async () => ({
				path: "https://graphics.local/packs/pack1",
				frameCount: 2,
				fileNamePrefix: "frame_",
				fileNamePadding: 2,
				fileExtension: "png",
				holdImage: 0
			})
		})
		global.fetch = fetchMock as unknown as typeof fetch

		render(<PixiFrameSequenceOverlay configName="pack1" isVisible={false} />)

		await waitFor(() =>
			expect(fetchMock).toHaveBeenCalledWith(
				"/componentInfo/pack1",
				expect.any(Object)
			)
		)

		await waitFor(() => {
			expect(textureFromMock).toHaveBeenCalledWith(
				"https://graphics.local/packs/pack1/frame_01.png"
			)
			expect(textureFromMock).toHaveBeenCalledWith(
				"https://graphics.local/packs/pack1/frame_02.png"
			)
		})
	})
})
