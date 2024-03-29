import Chip from "@mui/material/Chip"
import Grid from "@mui/material/Grid"
import { v4 as uuidv4 } from "uuid"
import { AvailableBonusType } from "./InfoBar/ScoredMove"
import { scoredBonusType, scoredMovesType } from "./Interfaces"
export const BonusChip = ({
	availableBonus,
	scoredMoveBonuses,
	scoredMove,
	updateScoredMoveBonuses
}: BonusChipProps) => {
	const filteredBonuses = scoredMoveBonuses.find(
		(b) => b.bonusId === availableBonus.id && b.moveId === scoredMove.id
	)

	const isScored = !!filteredBonuses
	const matches = availableBonus.name?.match(/\b(\w)/g) || ["?"] // ['J','S','O','N']
	const acronym = matches.join("").toUpperCase() // JSON

	const updateScoredBonuses = () => {
		const bonusAlreadyScored = scoredMoveBonuses.find(
			(b) => b.bonusId === availableBonus.id
		)
		if (bonusAlreadyScored) {
			updateScoredMoveBonuses(
				scoredMoveBonuses.filter((b) => b.bonusId !== availableBonus.id)
			)
		} else {
			updateScoredMoveBonuses([
				...scoredMoveBonuses,
				{
					id: uuidv4(),
					moveId: scoredMove.id,
					bonusId: availableBonus.id
				}
			])
		}
	}

	return (
		<Grid item key={availableBonus.id}>
			<Chip
				color={isScored ? "primary" : "default"}
				key={availableBonus.id}
				onClick={() => {
					updateScoredBonuses()
				}}
				label={acronym}
				data-testid={
					"scored-remove-" + scoredMove.id + "-" + availableBonus.id
				}
				disabled={!availableBonus.score}
			/>
		</Grid>
	)
}

export interface BonusChipProps {
	availableBonus: AvailableBonusType
	scoredMoveBonuses: scoredBonusType[]
	scoredMove: scoredMovesType
	updateScoredMoveBonuses: (newMoveBonusList: scoredBonusType[]) => void
}
