import Slide from "@mui/material/Slide"
import { ReactNode } from "react"

interface SlidingWrapperProps {
	children: ReactNode
	show: boolean
	direction?: "up" | "down" | "left" | "right"
}

const SlidingWrapper = ({
	children,
	show,
	direction = "up"
}: SlidingWrapperProps): React.JSX.Element => (
	<Slide direction={direction} in={show} mountOnEnter unmountOnExit>
		<div>{children}</div>
	</Slide>
)

export default SlidingWrapper
