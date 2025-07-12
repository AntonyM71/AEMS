import Slide from "@mui/material/Slide"
import React from "react"

interface SlidingWrapperProps {
	children: React.ReactNode
	show: boolean
	direction?: "up" | "down" | "left" | "right" // Allow customization of slide direction
	gridSize?: number // Allow customization of Grid item size
}

const SlidingWrapper: React.FC<SlidingWrapperProps> = ({
	children,
	show,
	direction = "up" // Default slide direction
}) => {
	const containerRef = React.useRef<HTMLElement>(null)

	return (
		<Slide
			direction={direction}
			in={show}
			container={containerRef.current}
			mountOnEnter
			unmountOnExit
		>
			<div>{children}</div>
		</Slide>
	)
}

export default SlidingWrapper
