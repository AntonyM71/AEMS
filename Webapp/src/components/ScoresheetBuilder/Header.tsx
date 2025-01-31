import DeleteIcon from "@mui/icons-material/Delete"

import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { includes } from "lodash"
import { useState } from "react"
import toast from "react-hot-toast"

export const ScoresheetBuilderHeader = ({
	bonuses,
	setBonuses,
	deleteBonus
}: {
	bonuses: string[]
	setBonuses: (b: string) => void
	deleteBonus: (b: string) => void
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

	return (
		<Grid container spacing="2" alignItems="center">
			<Grid item xs={2}>
				<Typography>Name</Typography>
			</Grid>
			<Grid item xs={1}>
				<Typography>Direction</Typography>
			</Grid>
			<Grid item xs={1}>
				<Typography>F/R Score</Typography>
			</Grid>
			<Grid item xs={1}>
				<Typography>L/B Score</Typography>
			</Grid>

			{bonuses.map((b) => (
				<Grid item key={b} xs={1}>
					<Grid
						container
						justifyContent="space-between"
						alignItems="center"
						wrap="nowrap"
					>
						<Grid item xs={6}>
							<Typography>{b}</Typography>
						</Grid>
						<Grid item xs={6}>
							<IconButton
								onClick={() => deleteBonus(b)}
								color="error"
								data-testid={`delete-bonus-${b}`}
							>
								<DeleteIcon />
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
			))}
			<Grid item xs={2}>
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
