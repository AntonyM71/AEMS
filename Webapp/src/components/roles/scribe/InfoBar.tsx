import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Skeleton from "@mui/material/Skeleton"
import { useDispatch, useSelector } from "react-redux"
import {
	getScoredBonuses,
	getScoredMoves,
	updateCurrentMove,
	updateScoredMovesAndBonuses
} from "../../../redux/atoms/scoring"

import { useGetManyAvailablebonusesGetQuery } from "../../../redux/services/aemsApi"
import { calculateSingleJudgeRunScore } from "../../../utils/scoringUtils"
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

export const calculateNewIndex = (n: number, m: number) => ((n % m) + m) % m
