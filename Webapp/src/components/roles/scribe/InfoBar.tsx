import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Modal from "@mui/material/Modal"
import Paper from "@mui/material/Paper"
import Skeleton from "@mui/material/Skeleton"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	getScoredBonuses,
	getScoredMoves,
	updateCurrentMove,
	updateScoredMovesAndBonuses
} from "../../../redux/atoms/scoring"

import { useGetManyAvailablebonusesGetQuery } from "../../../redux/services/aemsApi"
import { calculateSingleJudgeRunScore } from "../../../utils/scoringUtils"
import { HeatScoreTable } from "../../competition/HeatScoreTable"
import { PaddlerSelector } from "./InfoBar/PaddlerSelector"
import { RunSelector } from "./InfoBar/Runselector"
import ScoredMove, { AvailableBonusType } from "./InfoBar/ScoredMove"
import { movesType, scoredMovesType } from "./Interfaces"

interface propsType {
	paddlerInfo: AthleteInfo
	availableMoves: movesType[]
	isFetchingScoredMoves: boolean
}

export interface AthleteInfo {
	id: string
	first_name: string
	last_name: string
	bib: string
	scoresheetId: string
}
export const InfoBar = ({
	paddlerInfo,
	availableMoves,
	isFetchingScoredMoves
}: propsType) => {
	const dispatch = useDispatch()
	const [open, setOpen] = React.useState(false)

	const scoredMoves = useSelector(getScoredMoves)
	const resetScoredMovesAndBonuses = () => {
		dispatch(updateScoredMovesAndBonuses({ moves: [], bonuses: [] }))
	}

	const setCurrentMove = (newMove: string) =>
		dispatch(updateCurrentMove(newMove))

	const clearRun = () => {
		resetScoredMovesAndBonuses()
		setCurrentMove("")
	}
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	const bonusList = useGetManyAvailablebonusesGetQuery({
		sheetIdListComparisonOperator: "Equal",
		sheetIdList: [paddlerInfo.scoresheetId]
	})

	const scoredBonuses = useSelector(getScoredBonuses)
	const currentScore = calculateSingleJudgeRunScore(
		scoredMoves,
		scoredBonuses,
		availableMoves || [],
		(bonusList.data as AvailableBonusType[]) || []
	)

	return (
		<div style={{ height: "100%" }}>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<HeatScoreTable />
				</Box>
			</Modal>
			<Grid container spacing={2} alignItems="stretch">
				<Grid item xs={2}>
					<Paper sx={{ height: "max-content" }}>
						<h4>Run Score </h4>
						<div className="score" id="runScore">
							{currentScore.score}
						</div>
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<PaddlerSelector paddlerInfo={paddlerInfo} />
				</Grid>
				<Grid item xs={4}>
					<RunSelector />
				</Grid>
				<Grid item xs={4}>
					<h4>Move Listing</h4>
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
				<Grid item xs={4}>
					<Button onClick={handleOpen} variant="contained" fullWidth>
						Heat Summary
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
				{isFetchingScoredMoves ? (
					<Skeleton sx={{ width: "100%", height: "100%" }} />
				) : (
					[...scoredMoves] // put these into a new array so that reverse works
						.reverse()
						.map((scoredMove: scoredMovesType) => (
							<Grid item xs={12} key={scoredMove.id}>
								<ScoredMove
									key={scoredMove.id}
									scoredMove={scoredMove}
								/>
							</Grid>
						))
				)}
			</Grid>
		</div>
	)
}
const style = {
	position: "absolute" as const,
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "70%",
	height: "80%",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4
}
export const calculateNewIndex = (newNumber: number, maxNumber: number) => {
	if (newNumber >= maxNumber) {
		return 0
	} else if (newNumber < 0) {
		return maxNumber - 1
	} else {
		return newNumber
	}
}
