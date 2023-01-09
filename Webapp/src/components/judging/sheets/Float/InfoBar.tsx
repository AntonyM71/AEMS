import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import {
	getCurrentPaddlerIndex,
	getCurrentRun,
	getCurrentScore,
	getScoredMoves,
	updateCurrentMove,
	updatePaddler,
	updateRun,
	updateScoredMoves
} from "../../../../redux/atoms/scoring"

import {
	getCurrentHeatInfo,
	getNumberOfPaddlersInCurrentHeat,
	getNumberOfRunsInCurrentHeat
} from "../../../../redux/atoms/competitions"
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
	const dispatch = useDispatch()
	let fetchedMoves: scoredMovesType[] = [] // let to allow population on mount, do not change manually
	useEffect(() => {
		fetchedMoves = fetchedScoredMoves()
	}, [])

	const fetchedScoredMoves = () => []

	const currentPaddler = useSelector(getCurrentPaddlerIndex)
	const numberOfPaddlers = useSelector(getNumberOfPaddlersInCurrentHeat)
	const currentRun = useSelector(getCurrentRun)
	const numberOfRuns = useSelector(getNumberOfRunsInCurrentHeat)
	const paddlersInHeat = useSelector(getCurrentHeatInfo)
	const paddlerInfo = paddlersInHeat.athletes[currentPaddler]
	const scoredMoves = useSelector(getScoredMoves)
	const ressetScoredMoves = () => dispatch(updateScoredMoves([]))
	const setCurrentMove = (newMove: string) =>
		dispatch(updateCurrentMove(newMove))
	const setCurrentPaddler = (newPaddler: number) =>
		dispatch(updatePaddler(newPaddler))
	const setCurrentRun = (newRun: number) => dispatch(updateRun(newRun))
	const currentScore = useSelector(getCurrentScore)
	const setScoredMoves = (movesList: scoredMovesType[]) =>
		dispatch(updateScoredMoves(movesList))
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
	const resetRun = () => {
		setScoredMoves(fetchedMoves)
		setCurrentMove("")
	}

	return (
		<div style={{ height: "100%" }}>
			<Grid container spacing={2} alignItems="stretch">
				<Grid item xs={2}>
					<Paper>
						<h4>Run Score </h4>
						<div className="score" id="runScore">
							{currentScore}
						</div>
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper>
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
					<Paper>
						<h4>Run</h4>
						<div
							className="score"
							id="heatScore"
							data-testid="display-run-box"
						>
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
				<Grid item xs={4}>
					<h2>Move Listing</h2>
				</Grid>
				<Grid item xs={4}>
					<Button
						onClick={resetRun}
						variant="contained"
						fullWidth
						data-testid={"button-clear-run"}
					>
						Reset Run
					</Button>
				</Grid>
				<Grid item xs={4}>
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
						<Grid item xs={12} key={scoredMove.id}>
							<ScoredMove
								key={scoredMove.id}
								scoredMove={scoredMove}
								scoredMoveIndex={index}
								removeScoredMove={removeScoredMove}
								addScoredMove={addScoredMove}
								addScoredBonus={addScoredBonus}
							/>
						</Grid>
					))}
			</Grid>
		</div>
	)
}

export const calculateNewIndex = (n: number, m: number) => ((n % m) + m) % m
