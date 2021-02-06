import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid/Grid"
import IconButton from "@material-ui/core/IconButton"
import Paper from "@material-ui/core/Paper/Paper"
import { ChevronLeft, ChevronRight } from "@material-ui/icons"
import React from "react"
import {
	useRecoilState,
	useRecoilValue,
	useResetRecoilState,
	useSetRecoilState
} from "recoil"
import { v4 as uuidv4 } from "uuid"
import {
	currentMoveState,
	scoredMovesState,
	selectedPaddlerState
} from "../../../../atoms"
import {
	currentPaddlerInfo,
	currentScore,
	numberOfPaddlersInHeat
} from "../../../../Selectors"
import { useFloatStyles } from "./FloatStyles"
import {
	addScoredBonusType,
	addScoredMoveType,
	removeScoredMoveType,
	scoredMovesType
} from "./Interfaces"
import ScoredMove from "./ScoredMove"

interface propsType {
	addScoredMove: addScoredMoveType
	addScoredBonus: addScoredBonusType
}
export const InfoBar = ({ addScoredMove, addScoredBonus }: propsType) => {
	const classes = useFloatStyles()

	const [currentPaddler, setCurrentPaddler] = useRecoilState(
		selectedPaddlerState
	)
	const numberOfPaddlers = useRecoilValue(numberOfPaddlersInHeat)
	const paddlerInfo = useRecoilValue(currentPaddlerInfo)

	const currentRun = 0
	const [scoredMoves, setScoredMoves] = useRecoilState(scoredMovesState)
	const ressetScoredMoves = useResetRecoilState(scoredMovesState)
	const setCurrentMove = useSetRecoilState(currentMoveState)

	const changePaddler = (number: number) => {
		const newPaddlerIndex = currentPaddler + number
		if (newPaddlerIndex === -1) {
			setCurrentPaddler(numberOfPaddlers - 1)
		} else if (newPaddlerIndex === numberOfPaddlers) {
			setCurrentPaddler(0)
		} else {
			setCurrentPaddler(newPaddlerIndex)
		}
	}
	const removeScoredMove: removeScoredMoveType = (id: string) => {
		// eslint-disable-next-line no-console
		console.log("Removing Move", id)
		const newMoveId = uuidv4()
		const newScoredMoves: scoredMovesType[] = scoredMoves.filter(
			(scoredMove: scoredMovesType) => scoredMove.id !== id
		)
		setScoredMoves(newScoredMoves)
	}
	const clearRun = () => {
		ressetScoredMoves()
		setCurrentMove("")
	}

	return (
		<Grid container spacing={2} alignItems="flex-start">
			<Grid item xs={3}>
				<Paper className={classes.paperBox}>
					<h4>Run Score </h4>
					<div className="score" id="runScore">
						{useRecoilValue(currentScore)}
					</div>
				</Paper>
			</Grid>
			<Grid item xs={6}>
				<Paper className={classes.paperBox}>
					<h4>Paddler</h4>
					<div className="score" id="heatScore">
						<IconButton onClick={() => changePaddler(-1)}>
							<ChevronLeft />
						</IconButton>
						{paddlerInfo.GivenName}
						{paddlerInfo.FamilyName}
						{paddlerInfo.Bib}
						<IconButton onClick={() => changePaddler(1)}>
							<ChevronRight />
						</IconButton>
					</div>
				</Paper>
			</Grid>
			<Grid item xs={3}>
				<Paper className={classes.paperBox}>
					<h4>Run</h4>
					<div className="score" id="heatScore">
						{currentRun}
					</div>
				</Paper>
			</Grid>
			<Grid item xs={6} alignContent="center">
				<h3>Move Listing</h3>
			</Grid>
			<Grid item xs={6}>
				<Button onClick={clearRun} variant="contained">
					Clear Run
				</Button>
			</Grid>
			<Grid
				item
				xs={12}
				alignContent={"flex-start"}
				alignItems={"flex-start"}
			>
				<Grid
					container
					spacing={2}
					// alignItems="flex-end"
					// alignContent={"flex-end"}
					direction="column-reverse"
				>
					{scoredMoves.map(
						(scoredMove: scoredMovesType, index: number) => (
							<Grid item>
								<Paper>
									<ScoredMove
										key={scoredMove.id}
										scoredMove={scoredMove}
										scoredMoveIndex={index}
										removeScoredMove={removeScoredMove}
										addScoredMove={addScoredMove}
										addScoredBonus={addScoredBonus}
									/>
								</Paper>
							</Grid>
						)
					)}
				</Grid>
			</Grid>
		</Grid>
	)
}
