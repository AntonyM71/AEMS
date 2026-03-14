/* eslint-disable complexity */
import { Application, Assets, Sprite, Texture } from "pixi.js"
import React, {
	CSSProperties,
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState
} from "react"

type PlaybackPhase = "loading" | "intro" | "hold" | "outro" | "done"

interface RemoteFrameSequenceConfig {
	path?: string
	frameCount?: number
	holdImage?: number | string
	fps?: number
	fileNamePrefix?: string
	fileNamePadding?: number
	fileExtension?: string
	frameUrls?: string[]
}

export interface PixiFrameSequenceOverlayProps {
	configName?: string
	configEndpointBase?: string
	basePath?: string
	frameCount?: number
	holdImage?: number | string
	isVisible: boolean
	children?: ReactNode
	fps?: number
	fileNamePrefix?: string
	fileNamePadding?: number
	fileExtension?: string
	frameUrls?: string[]
	className?: string
	style?: CSSProperties
	onExitComplete?: () => void
}

const normalizeBasePath = (basePath: string): string =>
	basePath.endsWith("/") ? basePath.slice(0, -1) : basePath

const joinEndpointPath = (base: string, name: string): string => {
	const trimmed = base.endsWith("/") ? base.slice(0, -1) : base

	return `${trimmed}/${encodeURIComponent(name)}`
}

const buildFrameUrls = ({
	basePath,
	frameCount,
	fileNamePrefix,
	fileNamePadding,
	fileExtension
}: {
	basePath: string
	frameCount: number
	fileNamePrefix: string
	fileNamePadding: number
	fileExtension: string
}): string[] => {
	const safeBasePath = normalizeBasePath(basePath)

	return Array.from({ length: Math.max(frameCount, 0) }, (_, index) => {
		const frameId = String(index + 1).padStart(fileNamePadding, "0")

		return `${safeBasePath}/${fileNamePrefix}${frameId}.${fileExtension}`
	})
}

const resolveHoldIndex = (
	holdImage: number | string,
	frameUrls: string[]
): number => {
	if (typeof holdImage === "number") {
		if (frameUrls.length === 0) {
			return 0
		}

		return Math.min(Math.max(holdImage, 0), frameUrls.length - 1)
	}

	const matchIndex = frameUrls.findIndex((url) => url.endsWith(holdImage))
	if (matchIndex >= 0) {
		return matchIndex
	}

	return Math.max(Math.floor(frameUrls.length / 2), 0)
}

const resolveAbsoluteAssetUrl = (
	urlOrPath: string,
	configResponseUrl: string
): string => new URL(urlOrPath, configResponseUrl).toString()

const SEQUENCE_FADE_MS = 180
const CONTENT_FADE_MS = 320

const PixiFrameSequenceOverlay = ({
	configName,
	configEndpointBase = "/componentInfo",
	basePath,
	frameCount,
	holdImage,
	isVisible,
	children,
	fps = 30,
	fileNamePrefix = "frame_",
	fileNamePadding = 4,
	fileExtension = "png",
	frameUrls,
	className,
	style,
	onExitComplete
}: PixiFrameSequenceOverlayProps): React.JSX.Element => {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const appRef = useRef<Application | null>(null)
	const spriteRef = useRef<Sprite | null>(null)
	const texturesRef = useRef<Texture[]>([])
	const holdIndexRef = useRef<number>(0)
	const currentFrameRef = useRef<number>(0)
	const phaseRef = useRef<PlaybackPhase>("loading")
	const exitRequestedRef = useRef<boolean>(false)
	const onExitCompleteRef =
		useRef<PixiFrameSequenceOverlayProps["onExitComplete"]>(onExitComplete)

	const [isReady, setIsReady] = useState<boolean>(false)
	const [isAppReady, setIsAppReady] = useState<boolean>(false)
	const [phase, setPhase] = useState<PlaybackPhase>("loading")
	const [remoteConfig, setRemoteConfig] =
		useState<RemoteFrameSequenceConfig | null>(null)

	const resolvedBasePath = basePath ?? remoteConfig?.path ?? ""
	const resolvedFrameCount = frameCount ?? remoteConfig?.frameCount ?? 0
	const resolvedHoldImage = holdImage ?? remoteConfig?.holdImage ?? 0
	const resolvedFps = fps ?? remoteConfig?.fps ?? 30
	const resolvedFileNamePrefix =
		fileNamePrefix ?? remoteConfig?.fileNamePrefix ?? "frame_"
	const resolvedFileNamePadding =
		fileNamePadding ?? remoteConfig?.fileNamePadding ?? 4
	const resolvedFileExtension =
		fileExtension ?? remoteConfig?.fileExtension ?? "png"
	const resolvedRemoteFrameUrls = remoteConfig?.frameUrls

	const resolvedFrameUrls = useMemo(() => {
		if (Array.isArray(frameUrls) && frameUrls.length > 0) {
			return frameUrls
		}

		if (
			Array.isArray(resolvedRemoteFrameUrls) &&
			resolvedRemoteFrameUrls.length > 0
		) {
			return resolvedRemoteFrameUrls
		}

		if (!resolvedBasePath || resolvedFrameCount <= 0) {
			return []
		}

		return buildFrameUrls({
			basePath: resolvedBasePath,
			frameCount: resolvedFrameCount,
			fileNamePrefix: resolvedFileNamePrefix,
			fileNamePadding: resolvedFileNamePadding,
			fileExtension: resolvedFileExtension
		})
	}, [
		frameUrls,
		resolvedBasePath,
		resolvedFileExtension,
		resolvedFileNamePadding,
		resolvedFileNamePrefix,
		resolvedFrameCount,
		resolvedRemoteFrameUrls
	])

	const setPlaybackPhase = useCallback((nextPhase: PlaybackPhase) => {
		phaseRef.current = nextPhase
		setPhase(nextPhase)
	}, [])

	const fitSpriteToContainer = useCallback((texture: Texture) => {
		const sprite = spriteRef.current
		const container = containerRef.current

		if (
			!sprite ||
			!container ||
			texture.width <= 0 ||
			texture.height <= 0
		) {
			return
		}

		const width = container.clientWidth
		const height = container.clientHeight
		if (width <= 0 || height <= 0) {
			return
		}

		sprite.position.set(width / 2, height / 2)
		const scale = Math.max(width / texture.width, height / texture.height)
		sprite.width = texture.width * scale
		sprite.height = texture.height * scale
	}, [])

	const setFrame = useCallback(
		(frameIndex: number) => {
			const textures = texturesRef.current
			if (textures.length === 0) {
				return
			}

			const boundedIndex = Math.min(
				Math.max(frameIndex, 0),
				textures.length - 1
			)
			currentFrameRef.current = boundedIndex

			const texture = textures[boundedIndex]
			const sprite = spriteRef.current
			if (!sprite) {
				return
			}

			sprite.texture = texture
			fitSpriteToContainer(texture)
		},
		[fitSpriteToContainer]
	)

	const finishPlayback = useCallback(() => {
		setPlaybackPhase("done")
		exitRequestedRef.current = false
		onExitCompleteRef.current?.()
	}, [setPlaybackPhase])

	const startOutro = useCallback(() => {
		const textures = texturesRef.current
		if (textures.length === 0) {
			finishPlayback()

			return
		}

		const startFrame = Math.min(
			holdIndexRef.current + 1,
			textures.length - 1
		)

		if (startFrame >= textures.length - 1) {
			setFrame(textures.length - 1)
			finishPlayback()

			return
		}

		setPlaybackPhase("outro")
		setFrame(startFrame)
	}, [finishPlayback, setFrame, setPlaybackPhase])

	const startIntro = useCallback(() => {
		const textures = texturesRef.current
		if (textures.length === 0) {
			finishPlayback()

			return
		}

		exitRequestedRef.current = false
		setPlaybackPhase("intro")
		setFrame(0)
	}, [finishPlayback, setFrame, setPlaybackPhase])

	useEffect(() => {
		onExitCompleteRef.current = onExitComplete
	}, [onExitComplete])

	useEffect(() => {
		if (!configName) {
			setRemoteConfig(null)

			return
		}

		let isDisposed = false
		const abortController = new AbortController()

		const loadConfig = async (): Promise<void> => {
			try {
				const response = await fetch(
					joinEndpointPath(configEndpointBase, configName),
					{ signal: abortController.signal }
				)

				if (!response.ok) {
					throw new Error(
						`Failed to load overlay config '${configName}' (${response.status})`
					)
				}

				const data =
					(await response.json()) as RemoteFrameSequenceConfig

				if (isDisposed) {
					return
				}

				const resolvedPath = data.path
					? resolveAbsoluteAssetUrl(data.path, response.url)
					: undefined

				const resolvedUrls = Array.isArray(data.frameUrls)
					? data.frameUrls.map((url) =>
							resolveAbsoluteAssetUrl(url, response.url)
					  )
					: undefined

				setRemoteConfig({
					...data,
					path: resolvedPath,
					frameUrls: resolvedUrls
				})
			} catch (error) {
				if (!isDisposed && !abortController.signal.aborted) {
					console.error("Unable to load frame sequence config", error)
					setRemoteConfig(null)
				}
			}
		}

		void loadConfig()

		return () => {
			isDisposed = true
			abortController.abort()
		}
	}, [configEndpointBase, configName])

	useEffect(() => {
		let isDisposed = false

		const initPixiApp = async (): Promise<void> => {
			const container = containerRef.current
			if (!container || appRef.current) {
				return
			}

			const app = new Application()
			await app.init({
				antialias: true,
				backgroundAlpha: 0,
				resizeTo: container,
				autoDensity: true
			})

			if (isDisposed) {
				app.destroy(true, { children: true, texture: false })

				return
			}

			appRef.current = app
			container.appendChild(app.canvas)

			const sprite = new Sprite(Texture.EMPTY)
			sprite.anchor.set(0.5)
			spriteRef.current = sprite
			app.stage.addChild(sprite)
			setIsAppReady(true)
		}

		void initPixiApp()

		return () => {
			isDisposed = true
			setIsAppReady(false)
			spriteRef.current = null
			if (appRef.current) {
				appRef.current.destroy(true, { children: true, texture: false })
				appRef.current = null
			}
		}
	}, [])

	useEffect(() => {
		const handleResize = () => {
			const texture = texturesRef.current[currentFrameRef.current]
			if (texture) {
				fitSpriteToContainer(texture)
			}
		}

		window.addEventListener("resize", handleResize)

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [fitSpriteToContainer])

	useEffect(() => {
		let isDisposed = false

		const loadFrames = async (): Promise<void> => {
			if (!isAppReady || resolvedFrameUrls.length === 0) {
				texturesRef.current = []
				holdIndexRef.current = 0
				setIsReady(false)
				setPlaybackPhase("done")

				return
			}

			setPlaybackPhase("loading")
			setIsReady(false)

			await Promise.allSettled(
				resolvedFrameUrls.map((url) => Assets.load(url))
			)

			if (isDisposed) {
				return
			}

			const loadedTextures = resolvedFrameUrls.map((url) =>
				Texture.from(url)
			)
			texturesRef.current = loadedTextures
			holdIndexRef.current = resolveHoldIndex(
				resolvedHoldImage,
				resolvedFrameUrls
			)
			setIsReady(true)

			if (isVisible) {
				startIntro()
			} else {
				setPlaybackPhase("done")
			}
		}

		void loadFrames()

		return () => {
			isDisposed = true
		}
	}, [
		isAppReady,
		resolvedFrameUrls,
		resolvedHoldImage,
		setPlaybackPhase,
		startIntro
	])

	useEffect(() => {
		if (!isReady) {
			return
		}

		if (isVisible) {
			if (phaseRef.current === "done") {
				startIntro()
			}

			return
		}

		if (phaseRef.current === "hold") {
			startOutro()

			return
		}

		if (phaseRef.current === "intro") {
			exitRequestedRef.current = true
		}
	}, [isReady, isVisible, startIntro, startOutro])

	useEffect(() => {
		if (!isReady) {
			return
		}

		const safeFps = resolvedFps > 0 ? resolvedFps : 30
		const frameDuration = 1000 / safeFps
		const intervalId = globalThis.setInterval(() => {
			const textures = texturesRef.current
			if (textures.length === 0) {
				return
			}

			const holdIndex = holdIndexRef.current
			const lastFrame = textures.length - 1

			switch (phaseRef.current) {
				case "intro": {
					const nextFrame = Math.min(
						currentFrameRef.current + 1,
						holdIndex
					)
					setFrame(nextFrame)
					if (nextFrame >= holdIndex) {
						if (exitRequestedRef.current) {
							startOutro()
						} else {
							setPlaybackPhase("hold")
						}
					}
					break
				}
				case "hold": {
					if (!isVisible) {
						startOutro()
					}
					break
				}
				case "outro": {
					const nextFrame = currentFrameRef.current + 1
					if (nextFrame > lastFrame) {
						finishPlayback()
					} else {
						setFrame(nextFrame)
					}
					break
				}
				default:
					break
			}
		}, frameDuration)

		return () => {
			globalThis.clearInterval(intervalId)
		}
	}, [
		finishPlayback,
		isReady,
		isVisible,
		resolvedFps,
		setFrame,
		setPlaybackPhase,
		startOutro
	])

	const shouldRenderSequence = isVisible || phase !== "done"
	const isAnimationActive =
		phase === "loading" || phase === "intro" || phase === "outro"
	const shouldShowChildren = isVisible && !isAnimationActive

	return (
		<div
			className={className}
			style={{
				position: "relative",
				width: "100%",
				height: "100%",
				overflow: "hidden",
				...style
			}}
		>
			<div
				ref={containerRef}
				style={{
					position: "absolute",
					inset: 0,
					opacity: shouldRenderSequence ? 1 : 0,
					transition: `opacity ${SEQUENCE_FADE_MS}ms ease-in-out`,
					willChange: "opacity",
					pointerEvents: "none"
				}}
			/>
			<div
				style={{
					position: "relative",
					zIndex: 1,
					width: "100%",
					height: "100%",
					opacity: shouldShowChildren ? 1 : 0,
					transition: `opacity ${CONTENT_FADE_MS}ms ease-in-out`,
					willChange: "opacity",
					pointerEvents: "none"
				}}
			>
				{children}
			</div>
		</div>
	)
}

export default PixiFrameSequenceOverlay
