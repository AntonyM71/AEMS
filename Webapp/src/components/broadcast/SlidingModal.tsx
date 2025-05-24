import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Slide from "@mui/material/Slide"

interface SlidingWrapperProps {
	children: React.ReactNode
	show: boolean
	direction?: "up" | "down" | "left" | "right" // Allow customization of slide direction
}

const SlidingModal: React.FC<SlidingWrapperProps> = ({
	children,
	show,
	direction = "up" // Default slide direction
}) => (
	<Modal open={show} disableAutoFocus={true}>
		<Slide direction={direction} in={show}>
			<Box
				sx={{
					position: "absolute",
					top: "10%", // Center vertically
					left: "15%", // Center horizontally
					transform: "translate(-50%, -50%)", // Adjust for both axes
					width: "70%",
					height: "70%",

					border: "none" // Transparent border
				}}
			>
				{children}
			</Box>
		</Slide>
	</Modal>
)

export default SlidingModal
