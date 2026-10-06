import Alert from "@mui/material/Alert"
import AlertTitle from "@mui/material/AlertTitle"
import Button from "@mui/material/Button"
import { useDispatch, useSelector } from "react-redux"
import {
	getSelectedHeat,
	updateSelectedCompetition,
	updateSelectedHeat
} from "../../../redux/atoms/competitions"
import {
	getCurrentPaddlerIndex,
	getSelectedRun,
	updatePaddlerAndRun
} from "../../../redux/atoms/scoring"
import { useGetHeatInfoGetHeatInfoHeatIdGetQuery } from "../../../redux/services/aemsApi"
import { useHeadJudgePositionStreamQuery } from "../../../redux/services/streamingApi"

/**
 * Warns the scribe when their heat, athlete or run differs from the head
 * judge's, and offers a one-tap jump to the head judge's position.
 */
export const HeadJudgeMismatchBanner = () => {
	const dispatch = useDispatch()
	const { data: headJudge } = useHeadJudgePositionStreamQuery()
	const selectedHeat = useSelector(getSelectedHeat)
	const selectedRun = useSelector(getSelectedRun)
	const currentPaddlerIndex = useSelector(getCurrentPaddlerIndex)
	const { data: athletes } = useGetHeatInfoGetHeatInfoHeatIdGetQuery(
		{ heatId: selectedHeat },
		{ skip: !selectedHeat }
	)

	if (!headJudge || !athletes) {
		return null
	}

	const isDifferentHeat = headJudge.heatId !== selectedHeat
	const myAthlete = athletes[currentPaddlerIndex]
	const isDifferentAthlete = myAthlete?.athlete_id !== headJudge.athlete.id
	const isDifferentRun = selectedRun !== headJudge.runNumber

	if (!isDifferentHeat && !isDifferentAthlete && !isDifferentRun) {
		return null
	}

	const headJudgeHeatName = `${headJudge.athlete.first_name} ${headJudge.athlete.last_name}`
	const myName = `${myAthlete.first_name} ${myAthlete.last_name}`

	const jumpToHeadJudge = () => {
		if (isDifferentHeat) {
			dispatch(updateSelectedCompetition(headJudge.competitionId))
			dispatch(updateSelectedHeat(headJudge.heatId))
		}
		const headJudgeAthleteIndex = athletes.findIndex(
			(a) => a.athlete_id === headJudge.athlete.id
		)
		dispatch(
			updatePaddlerAndRun({
				paddler: Math.max(headJudgeAthleteIndex, 0),
				run: headJudge.runNumber
			})
		)
	}

	return (
		<Alert
			severity="warning"
			data-testid="head-judge-mismatch-banner"
			sx={{ marginBottom: "0.5em" }}
			action={
				<Button
					color="inherit"
					variant="outlined"
					size="small"
					onClick={jumpToHeadJudge}
				>
					{isDifferentHeat ? "Switch heat" : "Go to head judge's run"}
				</Button>
			}
		>
			<AlertTitle>
				{isDifferentHeat
					? "Head judge is scoring a different heat"
					: `Head judge is on ${headJudgeHeatName}, run ${
							headJudge.runNumber + 1
					  }`}
			</AlertTitle>
			{!isDifferentHeat &&
				`You are scoring ${myName}, run ${selectedRun + 1}`}
		</Alert>
	)
}
