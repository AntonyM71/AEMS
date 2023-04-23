import DeleteIcon from "@mui/icons-material/Delete"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import { EditMove, MoveData } from "./EditMove"
export const EditDeleteMove = ({
	moveData,
	updateMove,
	deleteMove
}: {
	moveData: MoveData
	updateMove: (m: MoveData) => void
	deleteMove: (m: MoveData) => void
}) => {
	const setMoveData = (newMoveData: MoveData) => {
		updateMove(newMoveData)
	}

	const handleDelete = () => {
		deleteMove(moveData)
	}

	return (
		<Grid container spacing="2" alignItems="center">
			<EditMove moveData={moveData} setMoveData={setMoveData} />
			<Grid item xs={1}>
				<IconButton onClick={handleDelete} color="error">
					<DeleteIcon />
				</IconButton>
			</Grid>
		</Grid>
	)
}
