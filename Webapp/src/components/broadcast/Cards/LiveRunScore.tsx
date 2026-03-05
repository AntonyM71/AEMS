import Collapse from "@mui/material/Collapse"
import { Variant } from "@mui/material/styles/createTypography"
import { useEffect, useState } from "react"
import {
	ScoredMovesAndBonusesResponse,
	useGetHeatPhasesGetHeatInfoHeatIdPhaseGetQuery,
	useGetManyAvailablebonusesGetQuery,
	useGetManyAvailablemovesGetQuery
} from "../../../redux/services/aemsApi"
import { useAthleteMovesAndBonusesStreamQuery } from "../../../redux/services/streamingApi"
import { OverlayControlState } from "../../Interfaces"
import { FinalScore } from "../../roles/headJudge/FinalScore"
import { calculateMoveAndBonusScore } from "../../roles/headJudge/headJudge"
import { AvailableBonusType } from "../../roles/scribe/InfoBar/ScoredMove"
import { movesType } from "../../roles/scribe/Interfaces"
export const LiveRunScoreSpace = ({
	overlayControlState,
	textSize = "h5"
}: {
	overlayControlState: OverlayControlState
	textSize?: Variant
}) => (
	<Collapse
		in={overlayControlState.showLiveRunScore}
		orientation="horizontal"
		sx={{ display: "flex", justifyContent: "flex-end" }}
	>
		<SubscribedFinalScore
			overlayControlState={overlayControlState}
			textSize={textSize}
		/>
	</Collapse>
)


export const SubscribedFinalScore = ({
	overlayControlState,
	textSize = "h5"
}: {
	overlayControlState: OverlayControlState
	textSize?: Variant
}) => {
	const [allJudgeScores, setAllJudgeScores] = useState<
		Record<string, number>
	>({})

	const scoresheet = overlayControlState.selectedAthlete?.scoresheet
	const selectedHeat = overlayControlState.selectedHeat
	const selectedAthleteId = overlayControlState?.selectedAthlete?.id ?? ""
	const selectedRun = overlayControlState.selectedRun

	const availableMoves = useGetManyAvailablemovesGetQuery(
		{
			sheetIdListComparisonOperator: "Equal",
			sheetIdList: [scoresheet ?? ""]
		},
		{ skip: !scoresheet }
	)
	const availableBonuses = useGetManyAvailablebonusesGetQuery(
		{
			sheetIdListComparisonOperator: "Equal",
			sheetIdList: [scoresheet ?? ""]
		},
		{ skip: !scoresheet }
	)
	const { data: phaseData } = useGetHeatPhasesGetHeatInfoHeatIdPhaseGetQuery(
		{ heatId: selectedHeat },
		{ skip: !selectedHeat }
	)
	const maxJudges =
		(phaseData &&
			Math.max(...phaseData.map((p) => p.number_of_judges), 1)) ??
		1

	const { data: streamMoveData } = useAthleteMovesAndBonusesStreamQuery(
		{
			heatId: selectedHeat,
			athleteId: selectedAthleteId,
			runNumber: selectedRun
		},
		{ skip: !selectedHeat || !selectedAthleteId }
	)

	useEffect(() => {
		if (!streamMoveData) {
			return
		}
		const judgeNumbers = new Array(maxJudges)
			.fill(null)
			.map((_, i) => String(i + 1))
		const newScores: Record<string, number> = {}
		judgeNumbers.forEach((jid) => {
			const filteredData: ScoredMovesAndBonusesResponse = {
				moves:
					streamMoveData.moves?.filter((m) => m.judge_id === jid) ??
					[],
				bonuses:
					streamMoveData.bonuses?.filter(
						(b) => b.judge_id === jid
					) ?? []
			}
			newScores[jid] = calculateMoveAndBonusScore(
				filteredData,
				(availableMoves.data ?? []) as movesType[],
				(availableBonuses.data ?? []) as AvailableBonusType[]
			)
		})
		setAllJudgeScores(newScores)
	}, [streamMoveData, maxJudges, availableMoves.data, availableBonuses.data])

	return (
		<FinalScore
			allJudgeScores={allJudgeScores}
			locked={false}
			did_not_start={false}
			textSize={textSize}
			direction="row"
		/>
	)
}
