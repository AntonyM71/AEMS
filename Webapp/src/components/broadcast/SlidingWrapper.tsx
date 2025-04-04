import Grid from "@mui/material/Grid2"
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
	direction = "up", // Default slide direction
	gridSize = 2 // Default Grid item size
}) => (
	<Slide direction={direction} in={show} mountOnEnter unmountOnExit>
		<Grid size={gridSize}>{children}</Grid>
	</Slide>
)

export default SlidingWrapper
