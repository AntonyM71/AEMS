import { ChevronLeft, ChevronRight } from "@mui/icons-material"

import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import { useDispatch, useSelector } from "react-redux"
import { getSelectedPhase } from "../../../../redux/atoms/competitions"
import { getCurrentRun, updateRun } from "../../../../redux/atoms/scoring"
import { useGetOneByPrimaryKeyPhaseIdGetQuery } from "../../../../redux/services/aemsApi"
import { calculateNewIndex } from "../InfoBar"

export const RunSelector = () => {
	const dispatch = useDispatch()
	const currentRun = useSelector(getCurrentRun)
	const currentPhase = useSelector(getSelectedPhase)
	const phaseInfo = useGetOneByPrimaryKeyPhaseIdGetQuery({ id: currentPhase })
	const numberOfRuns = phaseInfo.data?.number_of_runs || 0
	const setCurrentRun = (newRun: number) => dispatch(updateRun(newRun))
	const changeRun = (number: number) => {
		const newRun = calculateNewIndex(currentRun + number, numberOfRuns)

		setCurrentRun(newRun)
	}

	return (
		<Paper sx={{ flex: "true" }}>
			<h4>Run</h4>
			<div className="score" id="heatScore" data-testid="display-run-box">
				<IconButton
					onClick={() => changeRun(-1)}
					data-testid={"button-prev-run"}
				>
					<ChevronLeft />
				</IconButton>
				{currentRun + 1}
				<IconButton
					onClick={() => changeRun(1)}
					data-testid={"button-next-run"}
				>
					<ChevronRight />
				</IconButton>
			</div>
		</Paper>
	)
}
