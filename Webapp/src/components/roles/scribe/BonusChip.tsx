import Chip from "@mui/material/Chip"
import Grid from "@mui/material/Grid2"
import { v4 as uuidv4 } from "uuid"
import { AvailableBonusType } from "./InfoBar/ScoredMove"
import { scoredBonusType, scoredMovesType } from "./Interfaces"
export const BonusChip = ({
	availableBonus,
	scoredMoveBonuses,
	scoredMove,
	chipActionsDisabled,
	updateScoredMoveBonuses
}: BonusChipProps) => {
	const filteredBonuses = scoredMoveBonuses.find(
		(b) => b.bonusId === availableBonus.id && b.moveId === scoredMove.id
	)

	const isScored = !!filteredBonuses

	const splitIntoWords = (name: string): string[] =>
		name
			.replace(/([a-z0-9])([A-Z])/g, "$1 $2") // camelCase: superClean -> super Clean
			.replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") // acronym run: HTMLParser -> HTML Parser
			.replace(/[_-]+/g, " ") // snake_case / kebab-case -> spaces
			.split(/\s+/)
			.map((word) => word.replace(/[^a-zA-Z0-9]/g, ""))
			.filter(Boolean)

	const words = splitIntoWords(availableBonus.name ?? "")
	const acronym = (words.length ? words.map((w) => w[0]) : ["?"])
		.join("")
		.toUpperCase()

	const updateScoredBonuses = () => {
		if (!chipActionsDisabled) {
			const bonusAlreadyScored = scoredMoveBonuses.find(
				(b) => b.bonusId === availableBonus.id
			)
			if (bonusAlreadyScored) {
				updateScoredMoveBonuses(
					scoredMoveBonuses.filter(
						(b) => b.bonusId !== availableBonus.id
					)
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
	}

	const BONUS_CHIP_DIAMETER = 32

	return (
		<Grid key={availableBonus.id}>
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
				sx={{
					width: BONUS_CHIP_DIAMETER,
					height: BONUS_CHIP_DIAMETER,
					borderRadius: "50%",
					"& .MuiChip-label": {
						padding: 0
					}
				}}
			/>
		</Grid>
	)
}

export interface BonusChipProps {
	availableBonus: AvailableBonusType
	scoredMoveBonuses: scoredBonusType[]
	scoredMove: scoredMovesType
	chipActionsDisabled: boolean
	updateScoredMoveBonuses: (newMoveBonusList: scoredBonusType[]) => void
}
