import Collapse from "@mui/material/Collapse"
import { Variant } from "@mui/material/styles/createTypography"
import { useEffect, useState } from "react"
import {
	ScoredMovesAndBonusesResponse,
	useGetHeatPhasesGetHeatInfoHeatIdPhaseGetQuery,
	useGetManyAvailablebonusesGetQuery,
	useGetManyAvailablemovesGetQuery
} from "../../../redux/services/aemsApi"
import { OverlayControlState } from "../../Interfaces"
import { FinalScore } from "../../roles/headJudge/FinalScore"
import { calculateMoveAndBonusScore } from "../../roles/headJudge/headJudge"
import {
	HTTPMoveSubscriberUpdater,
	WebsocketMoveSubscriberUpdater
} from "../../roles/headJudge/JudgeCard"
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

	const updateJudgeData = (
		movesAndBonuses: ScoredMovesAndBonusesResponse,
		clear: boolean = false
	) => {
		if (clear) {
			setAllJudgeScores((prevScores) =>
				Object.fromEntries(
					Object.keys(prevScores).map((jid) => [jid, 0])
				)
			)
		}
		const judgeIds = Array.from(
			new Set([
				...(movesAndBonuses.moves?.map((m) => m.judge_id) ?? []),
				...(movesAndBonuses.bonuses?.map((b) => b.judge_id) ?? [])
			])
		)
		const judgeInfo: Record<
			string,
			{ score: number; movesAndBonuses: ScoredMovesAndBonusesResponse }
		> = {}
		judgeIds.forEach((jid: string) => {
			const filteredMovesAndBonuses: ScoredMovesAndBonusesResponse = {
				moves:
					movesAndBonuses.moves?.filter((m) => m.judge_id === jid) ??
					[],
				bonuses:
					movesAndBonuses.bonuses?.filter(
						(b) => b.judge_id === jid
					) ?? []
			}
			const score = calculateMoveAndBonusScore(
				filteredMovesAndBonuses,
				(availableMoves.data ?? []) as movesType[],
				(availableBonuses.data ?? []) as AvailableBonusType[]
			)

			judgeInfo[jid] = { score, movesAndBonuses: filteredMovesAndBonuses }
		})

		setAllJudgeScores((prevScores) => ({
			...prevScores,
			...Object.fromEntries(
				Object.entries(judgeInfo).map(([jid, value]) => [
					jid,
					value.score
				])
			)
		}))
	}

	const scoresheet = overlayControlState.selectedAthlete?.scoresheet
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
	const { data: phaseData, isLoading: isPhaseDataLoading } =
		useGetHeatPhasesGetHeatInfoHeatIdPhaseGetQuery(
			{ heatId: overlayControlState.selectedHeat },
			{ skip: !overlayControlState.selectedHeat }
		)
	const maxJudges =
		(phaseData &&
			Math.max(...phaseData.map((p) => p.number_of_judges), 1)) ??
		1

	useEffect(() => {
		// Example: get judgeIds from phaseData or another source
		const judgeIds: string[] = Array.from({ length: maxJudges }, (_, i) =>
			String(i + 1)
		)

		const initialScores: Record<string, number> = {}
		judgeIds.forEach((jid) => {
			initialScores[jid] = 0
		})
		setAllJudgeScores(initialScores)
	}, [maxJudges, phaseData])

	return (
		<>
			<WebsocketMoveSubscriberUpdater
				selectedHeat={overlayControlState.selectedHeat}
				selectedRun={overlayControlState.selectedRun}
				selectedAthleteId={
					overlayControlState?.selectedAthlete?.id ?? ""
				}
				updateJudgeData={updateJudgeData}
			/>
			<HTTPMoveSubscriberUpdater
				selectedHeat={overlayControlState.selectedHeat}
				selectedRun={overlayControlState.selectedRun}
				selectedAthleteId={
					overlayControlState?.selectedAthlete?.id ?? ""
				}
				updateJudgeData={updateJudgeData}
			/>

			<FinalScore
				allJudgeScores={allJudgeScores}
				locked={false}
				did_not_start={false}
				textSize={textSize}
				direction="row"
			/>
		</>
	)
}
