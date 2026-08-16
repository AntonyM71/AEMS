import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import Grid from "@mui/material/Grid2"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import { DoubleClickDeleteButton } from "../DoubleClickDeleteButton"
import { EditMove, MoveData } from "./EditMove"
export const EditDeleteMove = ({
	moveData,
	updateMove,
	deleteMove,
	moveUp,
	moveDown,
	canMoveUp,
	canMoveDown,
	highlighted = false
}: {
	moveData: MoveData
	updateMove: (m: MoveData) => void
	deleteMove: (m: MoveData) => void
	moveUp: () => void
	moveDown: () => void
	canMoveUp: boolean
	canMoveDown: boolean
	highlighted?: boolean
}) => {
	const setMoveData = (newMoveData: MoveData) => {
		updateMove(newMoveData)
	}

	const handleDelete = () => {
		deleteMove(moveData)
	}

	return (
		<Grid
			container
			spacing={2}
			alignItems="center"
			data-testid={`move-row-${moveData.id}`}
			data-highlighted={highlighted}
			sx={{
				transition: "background-color 400ms ease",
				backgroundColor: highlighted
					? "action.selected"
					: "transparent",
				borderRadius: 1,
				paddingY: 1
			}}
		>
			<EditMove moveData={moveData} setMoveData={setMoveData} />
			<Grid size="auto">
				<Stack direction="row" sx={{ flexWrap: "nowrap" }}>
					<IconButton
						onClick={moveUp}
						size="small"
						data-testid="move-up-button"
						aria-label="Move up"
						disabled={!canMoveUp}
					>
						<KeyboardArrowUp />
					</IconButton>
					<IconButton
						onClick={moveDown}
						size="small"
						data-testid="move-down-button"
						aria-label="Move down"
						disabled={!canMoveDown}
					>
						<KeyboardArrowDown />
					</IconButton>
					<DoubleClickDeleteButton
						onDelete={handleDelete}
						testId="delete-button"
						color="error"
						size="small"
					/>
				</Stack>
			</Grid>
		</Grid>
	)
}
