import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import DeleteIcon from "@mui/icons-material/Delete"

import Grid from "@mui/material/Grid2"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { includes } from "lodash"
import { Dispatch, SetStateAction, useState } from "react"
import toast from "react-hot-toast"

export const ScoresheetBuilderHeader = ({
	bonuses,
	setBonuses,
	deleteBonus,
	setUniqueBonusNamesList
}: {
	bonuses: string[]
	setBonuses: (b: string) => void
	deleteBonus: (b: string) => void
	setUniqueBonusNamesList: Dispatch<SetStateAction<string[]>>
}) => {
	const [newBonus, setNewBonus] = useState<string>("")

	const bonusAlreadyExists = includes(bonuses, newBonus)
	const handleSubmit = () => {
		if (!newBonus) {
			toast.error("Please Add a bonus name")
		} else if (!bonusAlreadyExists) {
			setBonuses(newBonus)
			setNewBonus("")
		} else {
			toast.error("Bonus already exists")
		}
	}
	function handleMoveItem(
		array: string[],
		index: number,
		direction: "left" | "right"
	) {
		// Check if the move is valid
		if (direction === "left" && index > 0) {
			// Swap the current item with the one on the left
			;[array[index], array[index - 1]] = [array[index - 1], array[index]]
		} else if (direction === "right" && index < array.length - 1) {
			// Swap the current item with the one on the right
			;[array[index], array[index + 1]] = [array[index + 1], array[index]]
		} else {
			toast.error("Invalid move")
		}

		setUniqueBonusNamesList([...array])
	}

	return (
		<Grid container spacing={2} alignItems="center">
			<Grid size={2}>
				<Typography>Name</Typography>
			</Grid>
			<Grid size={1}>
				<Typography>Direction</Typography>
			</Grid>
			<Grid size={1}>
				<Typography>F/R Score</Typography>
			</Grid>
			<Grid size={1}>
				<Typography>L/B Score</Typography>
			</Grid>
			{bonuses.map((b, i) => (
				<Grid key={b} size={1}>
					<Paper>
						<Grid
							container
							justifyContent="space-between"
							alignItems="center"
						>
							<Grid size={6}>
								<Typography>{b}</Typography>
							</Grid>
							<Grid>
								<IconButton
									onClick={() => deleteBonus(b)}
									color="error"
									data-testid={`delete-bonus-${b}`}
								>
									<DeleteIcon />
								</IconButton>
							</Grid>
							<Grid>
								<IconButton
									onClick={() =>
										handleMoveItem(bonuses, i, "left")
									}
									data-testid={`move-bonus-left-${b}`}
								>
									<ChevronLeft />
								</IconButton>
							</Grid>
							<Grid>
								<IconButton
									onClick={() =>
										handleMoveItem(bonuses, i, "right")
									}
									data-testid={`move-bonus-right-${b}`}
								>
									<ChevronRight />
								</IconButton>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			))}
			<Grid size={2}>
				<TextField
					label="Add New Bonus"
					error={bonusAlreadyExists}
					fullWidth
					variant="outlined"
					onChange={(
						event: React.ChangeEvent<HTMLInputElement>
					): void => setNewBonus(event.target.value)}
					onKeyDown={(e) => {
						if (e.code === "Enter") {
							handleSubmit()
						}
					}}
					value={newBonus}
				/>
			</Grid>
		</Grid>
	)
}
