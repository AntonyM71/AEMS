import { Paper, Grid, Typography, Chip } from "@material-ui/core"
import React, { useState } from "react"
import {
	addScoredMoveType,
	addScoredBonusType,
	scoredMovesType,
	removeScoredMoveType,
	movesType
} from "./Interfaces"
import { moves, bonuses } from "./demoMoves"
import { useFloatStyles } from "./Float"

interface ScoredMovePropsType {
	scoredMove: scoredMovesType
	addScoredMove: addScoredMoveType
	removeScoredMove: removeScoredMoveType
	addScoredBonus: addScoredBonusType
	scoredMoveIndex: number
	key: string
}
const ScoredMove = (props: ScoredMovePropsType) => {
	const filteredMoves = moves.filter(
		(move: movesType) => move.id === props.scoredMove.moveId
	)
	const classes = useFloatStyles()
	if (filteredMoves.length === 1) {
		const scoredMove = filteredMoves[0]

		return (
			<Paper className={classes.moveBox}>
				<Grid container spacing={1} justify="space-around">
					<Grid item xs={3}>
						<Typography align="center">
							{props.scoredMove.direction !== "A"
								? props.scoredMove.direction
								: "-"}
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography align="center">
							{scoredMove.name}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Chip
							onClick={() =>
								props.removeScoredMove(props.scoredMove.id)
							}
							color="default"
							label="D"
						/>
					</Grid>
					{bonuses.map((bonus) => {
						const filteredBonuses = props.scoredMove.bonuses.filter(
							(b) => b.bonusId === bonus.id
						)
						let className = "scoreableBonus"
						if (filteredBonuses.length >= 1) {
							className = "scoreableBonus scoredBonus"
						}
						const [isScored, setIsScored] = useState(false)

						return (
							<Grid item xs={2}>
								<Chip
									// variant="contained"
									// fullWidth
									color={isScored ? "primary" : "default"}
									key={bonus.id}
									className={className}
									onClick={() => {
										props.addScoredBonus(
											props.scoredMove.id,
											bonus.id
										)
										setIsScored(!isScored)
									}}
									label={bonus.shortName}
								/>
							</Grid>
						)
					})}
				</Grid>
			</Paper>
		)
	}

	return <div className="scoredMove">Unknown Move</div>
}
export default ScoredMove
