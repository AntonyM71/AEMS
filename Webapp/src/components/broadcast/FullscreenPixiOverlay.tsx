import Box from "@mui/material/Box"
import dynamic from "next/dynamic"
import { ReactNode } from "react"
import { OVERLAY_FALLBACK_EXIT_MS, overlayFallbackSx } from "./overlayFallback"

const PixiFrameSequenceOverlay = dynamic(
	() => import("./PixiFrameSequenceOverlay"),
	{ ssr: false }
)

const fullscreenOverlayStyle = {
	position: "fixed",
	inset: 0,
	width: "100vw",
	height: "100vh",
	zIndex: 1400
} as const

interface FullscreenPixiOverlayProps {
	children: ReactNode
	/** Shown instead of `children` when the graphics can't be loaded. */
	fallbackContent?: ReactNode
	configName: string
	isVisible: boolean
}

const FullscreenPixiOverlay = ({
	children,
	fallbackContent,
	configName,
	isVisible
}: FullscreenPixiOverlayProps): React.JSX.Element => (
	<Box sx={overlayFallbackSx}>
		<PixiFrameSequenceOverlay
			configName={configName}
			isVisible={isVisible}
			style={fullscreenOverlayStyle}
			fallbackExitMs={OVERLAY_FALLBACK_EXIT_MS}
			fallbackContent={fallbackContent}
		>
			{children}
		</PixiFrameSequenceOverlay>
	</Box>
)

export default FullscreenPixiOverlay
