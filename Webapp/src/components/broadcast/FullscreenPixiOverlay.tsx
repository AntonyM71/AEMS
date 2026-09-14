import dynamic from "next/dynamic"
import { ReactNode } from "react"

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
	configName: string
	isVisible: boolean
}

const FullscreenPixiOverlay = ({
	children,
	configName,
	isVisible
}: FullscreenPixiOverlayProps): React.JSX.Element => (
	<PixiFrameSequenceOverlay
		configName={configName}
		isVisible={isVisible}
		style={fullscreenOverlayStyle}
	>
		{children}
	</PixiFrameSequenceOverlay>
)

export default FullscreenPixiOverlay
