import Chip from "@mui/material/Chip"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import React from "react"
import { useSelector } from "react-redux"
import { getAvailableMoves } from "../../../../redux/atoms/scoring"

import {
	addScoredBonusType,
	addScoredMoveType,
	movesType,
	removeScoredMoveType,
	scoredMovesType
} from "./Interfaces"
import { bonuses } from "./demoMoves"

interface ScoredMovePropsType {
	scoredMove: scoredMovesType
	addScoredMove: addScoredMoveType
	removeScoredMove: removeScoredMoveType
	addScoredBonus: addScoredBonusType
	scoredMoveIndex: number
	key: string
}

const ScoredMove = React.memo((props: ScoredMovePropsType) => {
	const movesList = useSelector(getAvailableMoves)
	const filteredMoves = movesList.filter(
		(move: movesType) => move.id === props.scoredMove.moveId
	)

	if (filteredMoves.length === 1) {
		const moveData = filteredMoves[0]

		return (
			<Paper data-testid={"scored-move-" + props.scoredMove.id}>
				<Grid container spacing={1} justifyContent="space-around">
					<Grid item>
						<Chip
							onClick={() =>
								props.removeScoredMove(props.scoredMove.id)
							}
							color="default"
							label="X"
							data-testid={"scored-remove-" + props.scoredMove.id}
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
							{moveData.name}
						</Typography>
					</Grid>

					{bonuses.map((bonus) => {
						const filteredBonuses = props.scoredMove.bonuses.filter(
							(b) => b.bonusId === bonus.id
						)

						const isScored =
							filteredBonuses.length === 1 ? true : false

						return (
							<Grid item key={bonus.id}>
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
									data-testid={
										"scored-remove-" +
										props.scoredMove.id +
										"-" +
										bonus.id
									}
								/>
							</Grid>
						)
					})}
				</Grid>
			</Paper>
		)
	} else {
		return <div>Unknown</div>
	}
})
export default ScoredMove
