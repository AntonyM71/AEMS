import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Slide from "@mui/material/Slide"

interface SlidingModalProps {
	children: React.ReactNode
	show: boolean
	direction?: "up" | "down" | "left" | "right"
	size?: number
}

const SlidingModal: React.FC<SlidingModalProps> = ({
	children,
	show,
	direction = "up",
	size = 70
}) => (
	<Modal open={show} disableAutoFocus={true}>
		<Slide direction={direction} in={show}>
			<Box
				sx={{
					position: "absolute",
					top: `${(100 - size) / 2}%`,
					left: `${(100 - size) / 2}%`,
					width: `${size}%`,
					height: `${size}%`,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					"& > *": { width: "calc(100% - 2em)" }
				}}
			>
				{children}
			</Box>
		</Slide>
	</Modal>
)

export default SlidingModal
