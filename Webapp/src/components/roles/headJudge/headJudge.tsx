import {
	Button,
	Divider,
	Grid,
	Modal,
	Paper,
	Skeleton,
	Typography
} from "@mui/material"
import React from "react"
import { useSelector } from "react-redux"
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
	useGetManyAvailablemovesGetQuery
} from "../../../redux/services/aemsApi"
import { calculateSingleJudgeRunScore } from "../../../utils/scoringUtils"
import { HeatScoreTable } from "../../competition/HeatScoreTable"
import { SelectorDisplay } from "../../competition/MainSelector"
import { AthleteInfo, CurrentScore } from "../scribe/InfoBar"
import { PaddlerSelector } from "../scribe/InfoBar/PaddlerSelector"
import { RunSelector } from "../scribe/InfoBar/Runselector"
import ScoredMove, { AvailableBonusType } from "../scribe/InfoBar/ScoredMove"
import { directionType, movesType, scoredMovesType } from "../scribe/Interfaces"

export default () => {
	const [open, setOpen] = React.useState(false)

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	const selectedHeat = useSelector(getSelectedHeat)
	const { data: phaseData, isLoading: isPhaseDataLoading } =
		useGetHeatPhasesGetHeatInfoHeatIdPhaseGetQuery(
			{ heatId: selectedHeat },
			{ skip: !selectedHeat }
		)
	const maxJudges = phaseData
		? Math.max(...phaseData.map((p) => p.number_of_judges))
		: 3
	const judgeNumberArray = new Array(maxJudges)
		.fill(null)
		.map((_, i) => i + 1)

	const athletes = useGetHeatInfoGetHeatInfoHeatIdGetQuery({
		heatId: selectedHeat
	})

	const currentPaddlerIndex = useSelector(getCurrentPaddlerIndex)
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
		return (
			<>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Paper sx={style}>
						<HeatScoreTable defaultShowJudgeScores={true} />
					</Paper>
				</Modal>
				<Grid container spacing={2} alignItems={"stretch"}>
					<Grid item xs={6}>
						<SelectorDisplay
							showDetailed={false}
							showEvent={false}
							showPhase={false}
						/>
					</Grid>

					<Grid item xs={3}>
						<PaddlerSelector paddlerInfo={selectedAthlete} />
					</Grid>
					<Grid item xs={2}>
						<RunSelector />
					</Grid>
					<Grid item xs={1}>
						<Button
							onClick={handleOpen}
							variant="contained"
							fullWidth
							sx={{ height: "100%" }}
						>
							Heat Summary
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
			pollingInterval: 5000
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
