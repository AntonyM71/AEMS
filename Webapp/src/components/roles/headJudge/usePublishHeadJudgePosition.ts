import { useEffect } from "react"
import {
	useEmitHeadJudgePositionMutation,
	useHeadJudgeSelectionRequestStreamQuery
} from "../../../redux/services/streamingApi"
import { HeadJudgePosition } from "../../Interfaces"

/** Also re-publishes whenever a display asks. Pass undefined to publish nothing. */
const usePublishHeadJudgePosition = (
	position: HeadJudgePosition | undefined
): void => {
	const { data: requestCount } = useHeadJudgeSelectionRequestStreamQuery(
		undefined,
		{ skip: !position }
	)
	const [emitHeadJudgePosition] = useEmitHeadJudgePositionMutation()

	useEffect(() => {
		if (position) {
			void emitHeadJudgePosition(position)
		}
	}, [position, requestCount, emitHeadJudgePosition])
}

export default usePublishHeadJudgePosition
