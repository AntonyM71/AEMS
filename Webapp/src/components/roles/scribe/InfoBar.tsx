import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Modal from "@mui/material/Modal"
import Paper from "@mui/material/Paper"
import Skeleton from "@mui/material/Skeleton"
import Typography from "@mui/material/Typography"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { getScoredBonuses, getScoredMoves } from "../../../redux/atoms/scoring"

import { useGetManyAvailablebonusesGetQuery } from "../../../redux/services/aemsApi"
import { calculateSingleJudgeRunScore } from "../../../utils/scoringUtils"
import { HeatScoreTable } from "../../competition/HeatScoreTable"
import { SelectorDisplay } from "../../competition/MainSelector"
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
	scoresheet: string
}
export const InfoBar = ({
	paddlerInfo,
	availableMoves,
	isFetchingScoredMoves
}: propsType) => {
	const dispatch = useDispatch()
	const [open, setOpen] = React.useState(false)

	const scoredMoves = useSelector(getScoredMoves)

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	const bonusList = useGetManyAvailablebonusesGetQuery({
		sheetIdListComparisonOperator: "Equal",
		sheetIdList: [paddlerInfo.scoresheet]
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
			<Grid container spacing={1}>
				<Grid item xs={10}>
					<SelectorDisplay
						showDetailed={false}
						showEvent={false}
						showPhase={false}
					/>
				</Grid>
				<Grid item xs={2}>
					<Button
						onClick={handleOpen}
						variant="contained"
						fullWidth
						sx={{ height: "100%" }}
					>
						Heat Summary
					</Button>
				</Grid>
				<Grid item xs={3}>
					<Paper
						sx={{
							padding: "1em",
							height: "100%"
						}}
					>
						<Typography>Score:</Typography>
						<div style={{ textAlign: "center" }}>
							<Typography>{currentScore.score}</Typography>
						</div>
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<PaddlerSelector paddlerInfo={paddlerInfo} />
				</Grid>
				<Grid item xs={3}>
					<RunSelector />
				</Grid>
				<Grid item xs={4}>
					<Typography>Move Listing</Typography>
				</Grid>
			</Grid>
			<Grid
				container
				spacing={1}
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
