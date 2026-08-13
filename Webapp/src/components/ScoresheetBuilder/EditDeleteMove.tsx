import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import DeleteIcon from "@mui/icons-material/Delete"
import Grid from "@mui/material/Grid2"
import IconButton from "@mui/material/IconButton"
import { EditMove, MoveData } from "./EditMove"
export const EditDeleteMove = ({
	moveData,
	updateMove,
	deleteMove,
	moveUp,
	moveDown,
	canMoveUp,
	canMoveDown
}: {
	moveData: MoveData
	updateMove: (m: MoveData) => void
	deleteMove: (m: MoveData) => void
	moveUp: () => void
	moveDown: () => void
	canMoveUp: boolean
	canMoveDown: boolean
}) => {
	const setMoveData = (newMoveData: MoveData) => {
		updateMove(newMoveData)
	}

	const handleDelete = () => {
		deleteMove(moveData)
	}

	return (
		<Grid container spacing={2} alignItems="center">
			<EditMove moveData={moveData} setMoveData={setMoveData} />
			<Grid size={1}>
				<IconButton
					onClick={moveUp}
					data-testid="move-up-button"
					aria-label="Move up"
					disabled={!canMoveUp}
				>
					<KeyboardArrowUp />
				</IconButton>
				<IconButton
					onClick={moveDown}
					data-testid="move-down-button"
					aria-label="Move down"
					disabled={!canMoveDown}
				>
					<KeyboardArrowDown />
				</IconButton>
				<IconButton
					onClick={handleDelete}
					color="error"
					data-testid="delete-button"
				>
					<DeleteIcon />
				</IconButton>
			</Grid>
		</Grid>
	)
}
