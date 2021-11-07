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
	numberOfRunsInHeatState,
	scoredMovesState,
	selectedPaddlerState,
	selectedRunState
} from "../../../../recoil/atoms"
import {
	currentPaddlerInfo,
	currentScore,
	numberOfPaddlersInHeat
} from "../../../../recoil/Selectors"
import { useStyles } from "../../../../style/Styles"
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
	const classes = useStyles()

	const [currentPaddler, setCurrentPaddler] = useRecoilState(
		selectedPaddlerState
	)
	const numberOfPaddlers = useRecoilValue(numberOfPaddlersInHeat)
	const [currentRun, setCurrentRun] = useRecoilState(selectedRunState)
	const numberOfRuns = useRecoilValue(numberOfRunsInHeatState)

	const paddlerInfo = useRecoilValue(currentPaddlerInfo)
	const [scoredMoves, setScoredMoves] = useRecoilState(scoredMovesState)
	const ressetScoredMoves = useResetRecoilState(scoredMovesState)
	const setCurrentMove = useSetRecoilState(currentMoveState)

	const changePaddler = (number: number) => {
		const newPaddlerIndex = calculateNewIndex(
			currentPaddler + number,
			numberOfPaddlers
		)

		setCurrentPaddler(newPaddlerIndex)
		setScoredMoves([])
	}

	const changeRun = (number: number) => {
		const newRun = calculateNewIndex(currentRun + number, numberOfRuns)

		setCurrentRun(newRun)
		setScoredMoves([])
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
		<div style={{ height: "100%" }}>
			<Grid container spacing={2} alignItems="stretch">
				<Grid item xs={2}>
					<Paper className={classes.moveBox}>
						<h4>Run Score </h4>
						<div className="score" id="runScore">
							{useRecoilValue(currentScore)}
						</div>
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper className={classes.moveBox}>
						<h4 data-testid="display-bib-number">
							Paddler No: {paddlerInfo.Bib}
						</h4>
						<div className="score" id="heatScore">
							<Grid
								container
								direction="row"
								alignContent="space-between"
							>
								<Grid item xs={3}>
									<IconButton
										onClick={() => changePaddler(-1)}
										data-testid={"button-prev-paddler"}
									>
										<ChevronLeft />
									</IconButton>
								</Grid>
								<Grid
									item
									xs={6}
									data-testid={"display-paddler-name"}
								>
									<div style={{ textAlign: "center" }}>
										{paddlerInfo.GivenName}
									</div>
									<div style={{ textAlign: "center" }}>
										{paddlerInfo.FamilyName.toUpperCase()}
									</div>
								</Grid>
								<Grid item xs={3}>
									<IconButton
										onClick={() => changePaddler(1)}
										data-testid={"button-next-paddler"}
									>
										<ChevronRight />
									</IconButton>
								</Grid>
							</Grid>
						</div>
					</Paper>
				</Grid>
				<Grid item xs={4}>
					<Paper className={classes.moveBox}>
						<h4>Run</h4>
						<div className="score" id="heatScore" data-testid="display-run-box">
							<IconButton
								onClick={() => changeRun(-1)}
								data-testid={"button-prev-run"}
							>
								<ChevronLeft />
							</IconButton>
							{currentRun + 1}
							<IconButton
								onClick={() => changeRun(1)}
								data-testid={"button-next-run"}
							>
								<ChevronRight />
							</IconButton>
						</div>
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<h2>Move Listing</h2>
				</Grid>
				<Grid item xs={6}>
					<Button
						onClick={clearRun}
						variant="contained"
						fullWidth
						data-testid={"button-clear-run"}
					>
						Clear Run
					</Button>
				</Grid>
			</Grid>
			<Grid
				container
				spacing={2}
				direction="row"
				style={{
					maxHeight: "calc(100vh - 410px)", // this is a bit fragile,
					overflow: "auto"
				}}
			>
				{[...scoredMoves] // put these into a new array so that reverse works
					.reverse()
					.map((scoredMove: scoredMovesType, index: number) => (
						<Grid item xs={12}>
							<ScoredMove
								key={scoredMove.id}
								scoredMove={scoredMove}
								scoredMoveIndex={index}
								removeScoredMove={removeScoredMove}
								addScoredMove={addScoredMove}
								addScoredBonus={addScoredBonus}
								data-testid={"scored-move-" + scoredMove.id}
							/>
						</Grid>
					))}
			</Grid>
		</div>
	)
}

export const calculateNewIndex = (n: number, m: number) => ((n % m) + m) % m
