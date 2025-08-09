import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Slide from "@mui/material/Slide"

interface SlidingWrapperProps {
	children: React.ReactNode
	show: boolean
	direction?: "up" | "down" | "left" | "right" // Allow customization of slide direction
	size?: number
}

const SlidingModal: React.FC<SlidingWrapperProps> = ({
	children,
	show,
	direction = "up", // Default slide direction
	size = 70
}) => (
	<Modal open={show} disableAutoFocus={true}>
		<Slide direction={direction} in={show}>
			<Box
				sx={{
					position: "absolute",
					top: `${(100 - size) / 2}%`, // Center vertically
					left: `${(100 - size) / 2}%`, // Center horizontally
					transform: "translate(-50%, -50%)", // Adjust for both axes
					width: `${size}%`,
					height: `${size}%`,
					justifyContent: "center",
					alignItems: "center",

					display: "flex",
					flexDirection: "column",
					"& > *": { width: "calc(100% - 2em)" },
					border: "none" // Transparent border
				}}
			>
				{children}
			</Box>
		</Slide>
	</Modal>
)

export default SlidingModal
