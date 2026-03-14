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

export interface PixiFrameSequenceOverlayProps {
	basePath: string
	frameCount: number
	holdImage: number | string
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

const PixiFrameSequenceOverlay = ({
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
	const [phase, setPhase] = useState<PlaybackPhase>("loading")

	const resolvedFrameUrls = useMemo(() => {
		if (Array.isArray(frameUrls) && frameUrls.length > 0) {
			return frameUrls
		}

		return buildFrameUrls({
			basePath,
			frameCount,
			fileNamePrefix,
			fileNamePadding,
			fileExtension
		})
	}, [
		basePath,
		fileExtension,
		fileNamePadding,
		fileNamePrefix,
		frameCount,
		frameUrls
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
		}

		void initPixiApp()

		return () => {
			isDisposed = true
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
			if (!appRef.current || resolvedFrameUrls.length === 0) {
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
				holdImage,
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
	}, [holdImage, isVisible, resolvedFrameUrls, setPlaybackPhase, startIntro])

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

		const safeFps = fps > 0 ? fps : 30
		const frameDuration = 1000 / safeFps
		const intervalId = window.setInterval(() => {
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
			window.clearInterval(intervalId)
		}
	}, [
		finishPlayback,
		fps,
		isReady,
		isVisible,
		setFrame,
		setPlaybackPhase,
		startOutro
	])

	const shouldRenderSequence = isVisible || phase !== "done"

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
					pointerEvents: "none"
				}}
			/>
			{shouldRenderSequence ? (
				<div
					style={{
						position: "relative",
						zIndex: 1,
						width: "100%",
						height: "100%"
					}}
				>
					{children}
				</div>
			) : null}
		</div>
	)
}

export default PixiFrameSequenceOverlay
