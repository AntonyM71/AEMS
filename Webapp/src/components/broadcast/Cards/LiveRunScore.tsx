import Collapse from "@mui/material/Collapse"
import { Variant } from "@mui/material/styles/createTypography"
import { useEffect, useState } from "react"
import {
	ScoredMovesAndBonusesResponse,
	useGetHeatPhasesGetHeatInfoHeatIdPhaseGetQuery,
	useGetManyAvailablebonusesGetQuery,
	useGetManyAvailablemovesGetQuery
} from "../../../redux/services/aemsApi"
import {
	useAthleteMovesAndBonusesStreamQuery,
	useRunStatusStreamQuery
} from "../../../redux/services/streamingApi"
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

	const { selectedHeat, selectedRun } = overlayControlState
	const selectedAthlete = overlayControlState.selectedAthlete
	const scoresheet = selectedAthlete?.scoresheet
	const selectedAthleteId = selectedAthlete?.id ?? ""
	const sheetIdList = [scoresheet ?? ""]
	const canQuery = Boolean(selectedHeat && selectedAthleteId)

	const availableMoves = useGetManyAvailablemovesGetQuery(
		{ sheetIdList },
		{ skip: !scoresheet }
	)
	const availableBonuses = useGetManyAvailablebonusesGetQuery(
		{ sheetIdList },
		{ skip: !scoresheet }
	)
	const { data: phaseData } = useGetHeatPhasesGetHeatInfoHeatIdPhaseGetQuery(
		{ heatId: selectedHeat },
		{ skip: !selectedHeat }
	)
	const maxJudges = Math.max(
		...(phaseData ?? []).map((p) => p.number_of_judges),
		1
	)

	const streamArgs = {
		heatId: selectedHeat,
		athleteId: selectedAthleteId,
		runNumber: selectedRun
	}
	const { data: streamMoveData } = useAthleteMovesAndBonusesStreamQuery(
		streamArgs,
		{ skip: !canQuery }
	)
	const { data: runStatus } = useRunStatusStreamQuery(streamArgs, {
		skip: !canQuery
	})

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

	const status = runStatus ?? { locked: false, did_not_start: false }

	return (
		<FinalScore
			allJudgeScores={allJudgeScores}
			locked={status.locked}
			did_not_start={status.did_not_start}
			textSize={textSize}
			direction="row"
		/>
	)
}
