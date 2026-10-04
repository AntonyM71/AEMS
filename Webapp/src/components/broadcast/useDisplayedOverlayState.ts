import { useMemo } from "react"
import {
	useBroadcastControlStreamQuery,
	useHeadJudgePositionStreamQuery
} from "../../redux/services/streamingApi"
import {
	defaultOverlayControllerState,
	OverlayControlState
} from "../Interfaces"

/**
 * The control state a display page renders: the relayed broadcast_control
 * state, with competition, heat, athlete and run taken from the head judge's
 * position while the controller has `followHeadJudge` on.
 */
const useDisplayedOverlayState = (): OverlayControlState => {
	const { data: controlState = defaultOverlayControllerState } =
		useBroadcastControlStreamQuery()
	const { data: headJudgePosition } = useHeadJudgePositionStreamQuery(
		undefined,
		{ skip: !controlState.followHeadJudge }
	)

	return useMemo(
		() =>
			controlState.followHeadJudge && headJudgePosition
				? {
						...controlState,
						selectedCompetition: headJudgePosition.competitionId,
						selectedHeat: headJudgePosition.heatId,
						selectedAthlete: headJudgePosition.athlete,
						selectedRun: headJudgePosition.runNumber
				  }
				: controlState,
		[controlState, headJudgePosition]
	)
}

export default useDisplayedOverlayState
