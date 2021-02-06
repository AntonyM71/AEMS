import Chip from "@material-ui/core/Chip"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import React from "react"
import { bonuses, moves } from "./demoMoves"
import { useFloatStyles } from "./FloatStyles"
import {
	addScoredBonusType,
	addScoredMoveType,
	movesType,
	removeScoredMoveType,
	scoredMovesType
} from "./Interfaces"

interface ScoredMovePropsType {
	scoredMove: scoredMovesType
	addScoredMove: addScoredMoveType
	removeScoredMove: removeScoredMoveType
	addScoredBonus: addScoredBonusType
	scoredMoveIndex: number
	key: string
}

const ScoredMove = React.memo((props: ScoredMovePropsType) => {
	const filteredMoves = moves.filter(
		(move: movesType) => move.id === props.scoredMove.moveId
	)
	const classes = useFloatStyles()
	if (filteredMoves.length === 1) {
		const scoredMove = filteredMoves[0]

		return (
			<Paper className={classes.moveBox}>
				<Grid container spacing={1} justify="space-around">
					<Grid item>
						<Chip
							onClick={() =>
								props.removeScoredMove(props.scoredMove.id)
							}
							color="default"
							label="X"
						/>
					</Grid>
					<Grid item xs>
						<Typography align="center">
							{props.scoredMove.direction !== "A"
								? props.scoredMove.direction
								: "-"}
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography align="center" display="inline">
							{scoredMove.name}
						</Typography>
					</Grid>

					{bonuses.map((bonus) => {
						const filteredBonuses = props.scoredMove.bonuses.filter(
							(b) => b.bonusId === bonus.id
						)

						const isScored =
							filteredBonuses.length === 1 ? true : false

						return (
							<Grid item xs>
								<Chip
									color={isScored ? "primary" : "default"}
									key={bonus.id}
									onClick={() => {
										props.addScoredBonus(
											props.scoredMove.id,
											bonus.id
										)
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
})
export default ScoredMove
