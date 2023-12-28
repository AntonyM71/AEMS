import { ChevronLeft, ChevronRight } from "@mui/icons-material"

import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { useDispatch, useSelector } from "react-redux"
import {
	getNumberOfRuns,
	getSelectedPhase
} from "../../../../redux/atoms/competitions"
import { getSelectedRun, updateRun } from "../../../../redux/atoms/scoring"
import { calculateNewIndex } from "../InfoBar"

export const RunSelector = () => {
	const dispatch = useDispatch()
	const selectedRun = useSelector(getSelectedRun)
	const currentPhase = useSelector(getSelectedPhase)
	const numberOfRuns = useSelector(getNumberOfRuns)
	const setselectedRun = (newRun: number) => dispatch(updateRun(newRun))
	const changeRun = (number: number) => {
		const newRun = calculateNewIndex(selectedRun + number, numberOfRuns)

		setselectedRun(newRun)
	}

	return (
		<Paper
			sx={{
				padding: "1em",
				height: "100%"
			}}
		>
			<Typography variant="h6">Run:</Typography>
			<div style={{ textAlign: "center" }}>
				<IconButton
					onClick={() => changeRun(-1)}
					data-testid={"button-prev-run"}
				>
					<ChevronLeft />
				</IconButton>
				{selectedRun + 1}
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
