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
import { HeadJudgePosition } from "../../Interfaces"

interface Named {
	first_name: string
	last_name: string
}

const useJumpToHeadJudge = (
	headJudge: HeadJudgePosition,
	isDifferentHeat: boolean
) => {
	const dispatch = useDispatch()
	const { currentData: headJudgeHeatAthletes } =
		useGetHeatInfoGetHeatInfoHeatIdGetQuery({ heatId: headJudge.heatId })
	const headJudgeAthleteIndex =
		headJudgeHeatAthletes?.findIndex(
			(a) => a.athlete_id === headJudge.athlete.id
		) ?? -1

	const jump = () => {
		if (isDifferentHeat) {
			dispatch(updateSelectedCompetition(headJudge.competitionId))
			dispatch(updateSelectedHeat(headJudge.heatId))
		}
		dispatch(
			updatePaddlerAndRun({
				paddler: headJudgeAthleteIndex,
				run: headJudge.runNumber
			})
		)
	}

	return { canJump: headJudgeAthleteIndex >= 0, jump }
}

const fullName = (athlete: Named) =>
	`${athlete.first_name} ${athlete.last_name}`

const MismatchText = ({
	headJudge,
	isDifferentHeat,
	myAthlete,
	selectedRun
}: {
	headJudge: HeadJudgePosition
	isDifferentHeat: boolean
	myAthlete: Named | undefined
	selectedRun: number
}) => {
	if (isDifferentHeat) {
		return <AlertTitle>Head judge is scoring a different heat</AlertTitle>
	}

	return (
		<>
			<AlertTitle>
				{`Head judge is on ${fullName(headJudge.athlete)}, run ${
					headJudge.runNumber + 1
				}`}
			</AlertTitle>
			{myAthlete &&
				`You are scoring ${fullName(myAthlete)}, run ${
					selectedRun + 1
				}`}
		</>
	)
}

const MismatchAlert = ({ headJudge }: { headJudge: HeadJudgePosition }) => {
	const selectedHeat = useSelector(getSelectedHeat)
	const selectedRun = useSelector(getSelectedRun)
	const currentPaddlerIndex = useSelector(getCurrentPaddlerIndex)
	// currentData, not data: data keeps the previous heat's roster while a new
	// heat loads, which would pair the new heat with the wrong athletes.
	const { currentData: athletes } = useGetHeatInfoGetHeatInfoHeatIdGetQuery(
		{ heatId: selectedHeat },
		{ skip: !selectedHeat }
	)
	const isDifferentHeat = headJudge.heatId !== selectedHeat
	const { canJump, jump } = useJumpToHeadJudge(headJudge, isDifferentHeat)

	const myAthlete = athletes?.[currentPaddlerIndex]
	const isMismatched =
		isDifferentHeat ||
		myAthlete?.athlete_id !== headJudge.athlete.id ||
		selectedRun !== headJudge.runNumber

	if (!athletes || !isMismatched) {
		return null
	}

	return (
		<Alert
			severity="error"
			variant="filled"
			data-testid="head-judge-mismatch-banner"
			sx={{ marginBottom: "0.5em" }}
			action={
				<Button
					color="inherit"
					variant="outlined"
					size="small"
					disabled={!canJump}
					onClick={jump}
				>
					{isDifferentHeat ? "Switch heat" : "Go to head judge's run"}
				</Button>
			}
		>
			<MismatchText
				headJudge={headJudge}
				isDifferentHeat={isDifferentHeat}
				myAthlete={myAthlete}
				selectedRun={selectedRun}
			/>
		</Alert>
	)
}

/**
 * Warns the scribe when their heat, athlete or run differs from the head
 * judge's, and offers a one-tap jump to the head judge's position.
 */
export const HeadJudgeMismatchBanner = () => {
	const { data: headJudge } = useHeadJudgePositionStreamQuery()

	return headJudge ? <MismatchAlert headJudge={headJudge} /> : null
}
