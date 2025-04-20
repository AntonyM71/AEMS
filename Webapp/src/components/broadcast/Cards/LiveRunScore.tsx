import { useGetManyAvailablemovesGetQuery } from "../../../redux/services/aemsApi"
import { OverlayControlState } from "../../Interfaces"
import { CurrentScoreCalculation } from "../../roles/scribe/InfoBar"
import { movesType } from "../../roles/scribe/Interfaces"
import SlidingWrapper from "../SlidingWrapper"

export const LiveRunScoreSpace = ({
	overlayControlState
}: {
	overlayControlState: OverlayControlState
}) => {
	const scoresheet = overlayControlState.selectedAthlete?.scoresheet
	const availableMoves = useGetManyAvailablemovesGetQuery(
		{
			sheetIdListComparisonOperator: "Equal",
			sheetIdList: [scoresheet ?? ""]
		},
		{ skip: !scoresheet }
	)

	return (
		<SlidingWrapper
			show={overlayControlState.showLiveRunScore && !!scoresheet}
			gridSize={1}
		>
			<CurrentScoreCalculation
				availableMoves={availableMoves.data as movesType[]}
				scoresheet={scoresheet ?? ""}
			/>
		</SlidingWrapper>
	)
}
