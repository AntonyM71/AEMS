import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import Modal from "@mui/material/Modal"
import Paper from "@mui/material/Paper"
import Skeleton from "@mui/material/Skeleton"
import Typography from "@mui/material/Typography"
import React from "react"
import { useSelector } from "react-redux"
import { v4 } from "uuid"
import { getSelectedHeat } from "../../../redux/atoms/competitions"
import {
	getCurrentPaddlerIndex,
	getSelectedRun
} from "../../../redux/atoms/scoring"
import {
	useGetAthleteMovesAndBonnusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberJudgeIdGetQuery,
	useGetHeatInfoGetHeatInfoHeatIdGetQuery,
	useGetHeatPhasesGetHeatInfoHeatIdPhaseGetQuery,
	useGetManyAvailablebonusesGetQuery,
	useGetManyAvailablemovesGetQuery,
	useGetManyRunStatusGetQuery,
	useInsertManyRunStatusPostMutation,
	usePartialUpdateOneByPrimaryKeyRunStatusIdPatchMutation
} from "../../../redux/services/aemsApi"
import { calculateSingleJudgeRunScore } from "../../../utils/scoringUtils"
import { HeatScoreTable } from "../../competition/HeatScoreTable"
import { HeatSummaryTable } from "../../competition/HeatSummaryTable"
import { SelectorDisplay } from "../../competition/MainSelector"
import { AthleteInfo, CurrentScore } from "../scribe/InfoBar"
import { PaddlerSelector } from "../scribe/InfoBar/PaddlerSelector"
import { RunSelector } from "../scribe/InfoBar/Runselector"
import ScoredMove, { AvailableBonusType } from "../scribe/InfoBar/ScoredMove"
import { directionType, movesType, scoredMovesType } from "../scribe/Interfaces"

export default () => {
	const [scoresOpen, setScoresOpen] = React.useState(false)

	const handleScoresOpen = () => setScoresOpen(true)
	const handleScoresClose = () => setScoresOpen(false)

	const [listOpen, setListOpen] = React.useState(false)

	const handleListOpen = () => setListOpen(true)
	const handleListClose = () => setListOpen(false)
	const selectedHeat = useSelector(getSelectedHeat)

	const [postUpdateRunStatus] =
		usePartialUpdateOneByPrimaryKeyRunStatusIdPatchMutation()
	const [postNewRunStatus] = useInsertManyRunStatusPostMutation()
	const { data: phaseData, isLoading: isPhaseDataLoading } =
		useGetHeatPhasesGetHeatInfoHeatIdPhaseGetQuery(
			{ heatId: selectedHeat },
			{ skip: !selectedHeat }
		)
	const maxJudges =
		Math.max(...phaseData.map((p) => p.number_of_judges), 1) ?? 1
	const judgeNumberArray = new Array(maxJudges)
		.fill(null)
		.map((_, i) => i + 1)

	const athletes = useGetHeatInfoGetHeatInfoHeatIdGetQuery(
		{
			heatId: selectedHeat
		},
		{ skip: !selectedHeat }
	)
	// const selectedPhaseData = phaseData?.filter(p => p.athlete_id)
	const currentPaddlerIndex = useSelector(getCurrentPaddlerIndex)
	const selectedRun = useSelector(getSelectedRun)

	const selectedAthlete: AthleteInfo | undefined = athletes.data
		? {
				id: athletes.data[currentPaddlerIndex].athlete_id,
				first_name: athletes.data[currentPaddlerIndex].first_name,
				last_name: athletes.data[currentPaddlerIndex].last_name,
				bib: athletes.data[currentPaddlerIndex].bib,
				scoresheet: athletes.data[currentPaddlerIndex].scoresheet
		  }
		: undefined

	if (selectedAthlete && !isPhaseDataLoading) {
		const runStatus = useGetManyRunStatusGetQuery({
			heatIdList: [selectedHeat],
			athleteIdList: [selectedAthlete.id],
			runNumberList: [selectedRun]
		})
		const updateRunStatus = async (
			locked?: boolean,
			did_not_start?: boolean
		) => {
			console.log(did_not_start)
			if (runStatus?.data?.[0]) {
				const existingStatus = runStatus?.data?.[0]
				await postUpdateRunStatus({
					id: existingStatus.id ?? "",
					bodyPartialUpdateOneByPrimaryKeyRunStatusIdPatch: {
						run_number: existingStatus.run_number,
						phase_id: existingStatus.phase_id,
						heat_id: existingStatus.heat_id,
						athlete_id: existingStatus.athlete_id,
						locked: locked ?? existingStatus.locked,
						did_not_start:
							did_not_start ?? existingStatus.did_not_start
					}
				})
			} else {
				await postNewRunStatus({
					body: [
						{
							id: v4().toString(),
							locked: locked ?? false,
							did_not_start: did_not_start ?? false,

							run_number: selectedRun,
							phase_id:
								athletes?.data?.[currentPaddlerIndex]
									.phase_id ?? "",
							heat_id: selectedHeat,
							athlete_id: selectedAthlete.id
						}
					]
				})
			}
			await runStatus.refetch()
		}

		return (
			<>
				InsertManyRunStatusPostApiArg
				<Modal
					open={scoresOpen}
					onClose={handleScoresClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Paper sx={style}>
						<HeatScoreTable defaultShowJudgeScores={true} />
					</Paper>
				</Modal>
				<Modal
					open={listOpen}
					onClose={handleListClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Paper sx={style}>
						<HeatSummaryTable />
					</Paper>
				</Modal>
				<Grid
					container
					spacing={2}
					alignItems={"stretch"}
					sx={{ marginTop: "0.5em" }}
				>
					<Grid item xs={6}>
						<SelectorDisplay
							showDetailed={false}
							showEvent={false}
							showPhase={false}
						/>
					</Grid>
					<Grid item xs={2}>
						<PaddlerSelector paddlerInfo={selectedAthlete} />
					</Grid>
					<Grid item xs={1}>
						<RunSelector />
					</Grid>{" "}
					<Grid item xs={1}>
						<Button
							onClick={handleListOpen}
							variant="contained"
							fullWidth
							sx={{ height: "100%" }}
						>
							Heat List
						</Button>
					</Grid>
					<Grid item xs={1}>
						<Button
							onClick={handleScoresOpen}
							variant="contained"
							fullWidth
							sx={{ height: "100%" }}
						>
							Heat Scores
						</Button>
					</Grid>
					<Grid item xs={1}>
						<Button
							variant="contained"
							fullWidth
							disabled={runStatus.isFetching}
							sx={{ height: "100%" }}
							onClick={() =>
								void updateRunStatus(
									!runStatus?.data?.[0].locked
								)
							}
						>
							{runStatus?.data?.[0].locked
								? "Unlock Run"
								: "Lock Run"}
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Divider />
					</Grid>
					{judgeNumberArray.map((jn) => (
						<Grid item key={jn} xs={Math.floor(12 / maxJudges)}>
							<JudgeCard
								judgeNumber={jn}
								selectedAthlete={selectedAthlete}
							/>
						</Grid>
					))}
				</Grid>
			</>
		)
	}

	return <Skeleton />
}

const JudgeCard = ({
	judgeNumber,
	selectedAthlete
}: {
	judgeNumber: number
	selectedAthlete: AthleteInfo
}) => {
	const selectedRun = useSelector(getSelectedRun)
	const selectedHeat = useSelector(getSelectedHeat)

	const availableBonuses = useGetManyAvailablebonusesGetQuery({
		sheetIdListComparisonOperator: "Equal",
		sheetIdList: [selectedAthlete.scoresheet]
	})
	const availableMoves = useGetManyAvailablemovesGetQuery(
		{
			sheetIdListComparisonOperator: "Equal",
			sheetIdList: [selectedAthlete?.scoresheet ?? ""]
		},
		{ skip: !selectedAthlete?.scoresheet }
	)
	const {
		data: moveAndBonusdata,
		isFetching: isMoveAndBonusFetching,
		isUninitialized
	} = useGetAthleteMovesAndBonnusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberJudgeIdGetQuery(
		{
			runNumber: selectedRun.toString(),
			athleteId: selectedAthlete?.id ?? "",
			judgeId: judgeNumber.toString(),
			heatId: selectedHeat
		},
		{
			skip: !selectedAthlete?.id,
			pollingInterval: 1000
		}
	)

	const scoredMoves = moveAndBonusdata?.moves
		? moveAndBonusdata.moves.map((m) => ({
				moveId: m.move_id,
				id: m.id,
				direction: m.direction as directionType
		  }))
		: []

	const scoredBonuses = moveAndBonusdata?.bonuses
		? moveAndBonusdata.bonuses.map((b) => ({
				id: b.id,

				moveId: b.move_id,
				bonusId: b.bonus_id
		  }))
		: []
	const currentScore = calculateSingleJudgeRunScore(
		scoredMoves,
		scoredBonuses,
		(availableMoves.data as movesType[]) || [],
		(availableBonuses.data as AvailableBonusType[]) || []
	)
	if (!isUninitialized) {
		return (
			<Grid container spacing={1} alignItems={"stretch"}>
				<Grid item xs={6}>
					<Paper
						sx={{
							padding: "1em",
							height: "100%"
						}}
					>
						<Typography>{`Judge: ${judgeNumber}`}</Typography>
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<CurrentScore currentScore={currentScore} />
				</Grid>

				{[...scoredMoves] // put these into a new array so that reverse works
					.reverse()
					.map((scoredMove: scoredMovesType) => (
						<Grid item xs={12} key={scoredMove.id}>
							<ScoredMove
								key={scoredMove.id}
								scoredMove={scoredMove}
								scoredMovesList={scoredMoves}
								scoredBonuses={scoredBonuses}
								chipActionsDisabled={true}
							/>
						</Grid>
					))}
			</Grid>
		)
	}

	return <Skeleton />
}

const style = {
	position: "absolute" as const,
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "70%",
	height: "80%",
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4
}
