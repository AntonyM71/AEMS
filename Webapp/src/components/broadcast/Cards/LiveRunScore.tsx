import Collapse from "@mui/material/Collapse"
import { useState } from "react"
import {
	useGetManyAvailablebonusesGetQuery,
	useGetManyAvailablemovesGetQuery,
	useGetOneByPrimaryKeyPhaseIdGetQuery
} from "../../../redux/services/aemsApi"
import { OverlayControlState } from "../../Interfaces"
import { FinalScore } from "../../roles/headJudge/FinalScore"
import { MoveSubscriberUpdater } from "../../roles/headJudge/JudgeCard"
import { AvailableBonusType } from "../../roles/scribe/InfoBar/ScoredMove"
import { movesType } from "../../roles/scribe/Interfaces"

export const LiveRunScoreSpace = ({
	overlayControlState
}: {
	overlayControlState: OverlayControlState
}) => {
	const [allJudgeScores, setAllJudgeScores] = useState<number[]>([])
	const updateSingleJudgeScore = (newScore: number, judgeNumber: number) => {
		setAllJudgeScores((prevAllScores) => {
			const newAllScores = [...prevAllScores]
			newAllScores[judgeNumber] = newScore

			return newAllScores
		})
	}
	const { data } = useGetOneByPrimaryKeyPhaseIdGetQuery(
		{
			id: overlayControlState.selectedPhase
		},
		{ skip: !overlayControlState.selectedPhase }
	)
	const scoresheet = overlayControlState.selectedAthlete?.scoresheet
	const availableMoves = useGetManyAvailablemovesGetQuery(
		{
			sheetIdListComparisonOperator: "Equal",
			sheetIdList: [scoresheet ?? ""]
		},
		{ skip: !scoresheet }
	)
	const availableBonuses = useGetManyAvailablebonusesGetQuery({
		sheetIdListComparisonOperator: "Equal",
		sheetIdList: [scoresheet ?? ""]
	})
	const judgeNumberArray = new Array(data?.number_of_judges)
		.fill(null)
		.map((_, i) => i + 1)

	return (
		<Collapse
			in={overlayControlState.showLiveRunScore}
			orientation="horizontal"
			sx={{ display: "flex", justifyContent: "flex-end" }}
		>
			{judgeNumberArray.map((judge) => (
				<MoveSubscriberUpdater
					key={judge}
					selectedHeat={overlayControlState.selectedHeat}
					selectedRun={overlayControlState.selectedRun}
					selectedAthleteId={
						overlayControlState?.selectedAthlete?.id ?? ""
					}
					availableBonuses={
						(availableBonuses.data ?? []) as AvailableBonusType[]
					}
					availableMoves={(availableMoves.data ?? []) as movesType[]}
					updateHeadJudgeScore={updateSingleJudgeScore}
					judge={judge}
				/>
			))}

			<FinalScore
				allJudgeScores={allJudgeScores}
				locked={false}
				did_not_start={false}
			/>
		</Collapse>
	)
}
