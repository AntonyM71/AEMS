import CardMedia from "@mui/material/CardMedia"
import Paper from "@mui/material/Paper"
import { OverlayControlState } from "../../Interfaces"
import SlidingWrapper from "../SlidingWrapper"

export const SlidingImageCard = ({
	overlayControlState
}: {
	overlayControlState: OverlayControlState
}) => (
	<SlidingWrapper
		show={overlayControlState.showImageCard}
		direction="down"
		gridSize={1}
	>
		<Paper>
			<CardMedia
				component="img"
				image="/images/icf.png" // Path to your image
				alt="ICF Logo"
				style={{
					objectFit: "cover" // Ensure the image covers the card
				}}
			/>
		</Paper>
	</SlidingWrapper>
)
