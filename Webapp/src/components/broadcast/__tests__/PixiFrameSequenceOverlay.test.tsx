import { act, render, screen, waitFor } from "@testing-library/react"
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
// before any of this file's own top-level statements), so the mock functions
// are smuggled out through the module's exports and read back once here.
const {
	__mockTextureFrom: mockTextureFrom,
	Application: mockApplication,
	Assets: { load: mockAssetsLoad }
} = jest.requireMock<{
	__mockTextureFrom: jest.Mock
	Application: jest.Mock
	Assets: { load: jest.Mock }
}>("pixi.js")

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
		await waitFor(() =>
			expect(contentWrapper()).toHaveStyle({ opacity: 1 })
		)

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
		await waitFor(() =>
			expect(contentWrapper()).toHaveStyle({ opacity: 1 })
		)

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

		render(
			<PixiFrameSequenceOverlay configName="pack1" isVisible={false} />
		)

		await waitFor(() => expect(mockTextureFrom).toHaveBeenCalledTimes(2))
		expect(mockTextureFrom).toHaveBeenCalledWith(
			"https://graphics.local/packs/pack1/frame_01.png"
		)
		expect(mockTextureFrom).toHaveBeenCalledWith(
			"https://graphics.local/packs/pack1/frame_02.png"
		)
	})
})

const pack1Config = {
	path: "https://graphics.local/packs/pack1",
	frameCount: 2,
	fileNamePadding: 2,
	holdImage: 0
}

const expectFallbackShown = async () => {
	await waitFor(() =>
		expect(contentWrapper()).toHaveClass("AemsOverlay-fallback")
	)
	expect(contentWrapper()).toHaveAttribute("data-visible", "true")
	expect(contentWrapper()).toHaveStyle({ opacity: 1 })
}

const failPixiInit = () => {
	mockApplication.mockImplementationOnce(() => ({
		canvas: document.createElement("canvas"),
		stage: { addChild: jest.fn() },
		init: () => Promise.reject(new Error("WebGL unavailable")),
		destroy: () => undefined
	}))
}

describe("PixiFrameSequenceOverlay fallback mode", () => {
	afterEach(() => {
		jest.clearAllMocks()
		jest.useRealTimers()
		mockAssetsLoad.mockImplementation(() => Promise.resolve())
	})

	it.each([
		[
			"the config request fails",
			() => new HttpResponse(null, { status: 500 })
		],
		["the graphics server is unreachable", () => HttpResponse.error()]
	])("shows its content in fallback mode when %s", async (_, respond) => {
		server.use(http.get("/componentInfo/pack1", respond))

		render(
			<PixiFrameSequenceOverlay configName="pack1" isVisible>
				<div data-testid="content">Content</div>
			</PixiFrameSequenceOverlay>
		)

		await expectFallbackShown()
	})

	it("falls back instead of playing blank frames when a frame fails to load", async () => {
		server.use(
			http.get("/componentInfo/pack1", () =>
				HttpResponse.json(pack1Config)
			)
		)
		mockAssetsLoad.mockImplementation((url: string) =>
			url.endsWith("frame_02.png")
				? Promise.reject(new Error("404"))
				: Promise.resolve()
		)

		render(
			<PixiFrameSequenceOverlay configName="pack1" isVisible>
				<div data-testid="content">Content</div>
			</PixiFrameSequenceOverlay>
		)

		await expectFallbackShown()
		expect(mockAssetsLoad).toHaveBeenCalledTimes(2)
		expect(mockTextureFrom).not.toHaveBeenCalled()
	})

	it("shows its content in fallback mode when the renderer fails to start", async () => {
		failPixiInit()

		render(
			<PixiFrameSequenceOverlay frameUrls={["a.png", "b.png"]} isVisible>
				<div data-testid="content">Content</div>
			</PixiFrameSequenceOverlay>
		)

		await expectFallbackShown()
	})

	it("reports exit completion once the given fallback exit time has passed", async () => {
		failPixiInit()
		const onExitComplete = jest.fn()
		const props = {
			frameUrls: ["a.png", "b.png"],
			fallbackExitMs: 640,
			onExitComplete
		}

		const { rerender } = render(
			<PixiFrameSequenceOverlay {...props} isVisible>
				<div data-testid="content">Content</div>
			</PixiFrameSequenceOverlay>
		)
		await expectFallbackShown()

		jest.useFakeTimers()
		rerender(
			<PixiFrameSequenceOverlay {...props} isVisible={false}>
				<div data-testid="content">Content</div>
			</PixiFrameSequenceOverlay>
		)

		expect(contentWrapper()).toHaveAttribute("data-visible", "false")
		act(() => {
			jest.advanceTimersByTime(600)
		})
		expect(onExitComplete).not.toHaveBeenCalled()
		act(() => {
			jest.advanceTimersByTime(40)
		})
		expect(onExitComplete).toHaveBeenCalledTimes(1)
	})

	it("retries its config on the next show and plays frames once the graphics server is back", async () => {
		let configRequests = 0
		server.use(
			http.get("/componentInfo/pack1", () => {
				configRequests += 1

				return configRequests === 1
					? new HttpResponse(null, { status: 503 })
					: HttpResponse.json(pack1Config)
			})
		)
		const overlay = (isVisible: boolean) => (
			<PixiFrameSequenceOverlay
				configName="pack1"
				isVisible={isVisible}
				fps={1000}
			>
				<div data-testid="content">Content</div>
			</PixiFrameSequenceOverlay>
		)

		const { rerender } = render(overlay(true))
		await expectFallbackShown()

		rerender(overlay(false))
		rerender(overlay(true))

		await waitFor(() => expect(mockTextureFrom).toHaveBeenCalledTimes(2))
		expect(configRequests).toBe(2)
		expect(mockTextureFrom).toHaveBeenCalledWith(
			"https://graphics.local/packs/pack1/frame_02.png"
		)
		await waitFor(() =>
			expect(contentWrapper()).not.toHaveClass("AemsOverlay-fallback")
		)
	})

	it("loads frames from the retried config, not the stale one, after a frame failure", async () => {
		let configRequests = 0
		server.use(
			http.get("/componentInfo/pack1", () => {
				configRequests += 1

				return HttpResponse.json(
					configRequests === 1
						? pack1Config
						: {
								...pack1Config,
								path: "https://graphics.local/packs/pack2"
						  }
				)
			})
		)
		mockAssetsLoad.mockImplementation((url: string) =>
			url.endsWith("pack1/frame_02.png")
				? Promise.reject(new Error("404"))
				: Promise.resolve()
		)
		const overlay = (isVisible: boolean) => (
			<PixiFrameSequenceOverlay
				configName="pack1"
				isVisible={isVisible}
				fps={1000}
			>
				<div data-testid="content">Content</div>
			</PixiFrameSequenceOverlay>
		)

		const { rerender } = render(overlay(true))
		await expectFallbackShown()

		rerender(overlay(false))
		rerender(overlay(true))

		await waitFor(() =>
			expect(contentWrapper()).not.toHaveClass("AemsOverlay-fallback")
		)
		const loadedUrls = (mockAssetsLoad.mock.calls as [string][]).map(
			([url]) => url
		)
		expect(loadedUrls).toEqual([
			"https://graphics.local/packs/pack1/frame_01.png",
			"https://graphics.local/packs/pack1/frame_02.png",
			"https://graphics.local/packs/pack2/frame_01.png",
			"https://graphics.local/packs/pack2/frame_02.png"
		])
		expect(mockTextureFrom).not.toHaveBeenCalledWith(
			"https://graphics.local/packs/pack1/frame_01.png"
		)
	})

	it("shows its fallback content while the graphics are down and its children once they load", async () => {
		let configRequests = 0
		server.use(
			http.get("/componentInfo/pack1", () => {
				configRequests += 1

				return configRequests === 1
					? new HttpResponse(null, { status: 503 })
					: HttpResponse.json(pack1Config)
			})
		)
		const overlay = (isVisible: boolean) => (
			<PixiFrameSequenceOverlay
				configName="pack1"
				isVisible={isVisible}
				fps={1000}
				fallbackContent={<div>Backup layout</div>}
			>
				<div data-testid="content">Content</div>
			</PixiFrameSequenceOverlay>
		)

		const { rerender } = render(overlay(true))
		expect(await screen.findByText("Backup layout")).toBeInTheDocument()
		expect(screen.queryByTestId("content")).not.toBeInTheDocument()

		rerender(overlay(false))
		rerender(overlay(true))

		expect(await screen.findByTestId("content")).toBeInTheDocument()
		expect(screen.queryByText("Backup layout")).not.toBeInTheDocument()
	})

	it("shows content without fallback mode when no frame source is given", async () => {
		render(
			<PixiFrameSequenceOverlay isVisible>
				<div data-testid="content">Content</div>
			</PixiFrameSequenceOverlay>
		)

		await waitFor(() =>
			expect(contentWrapper()).toHaveStyle({ opacity: 1 })
		)
		expect(contentWrapper()).not.toHaveClass("AemsOverlay-fallback")
		expect(contentWrapper()).not.toHaveAttribute("data-visible")
	})
})
