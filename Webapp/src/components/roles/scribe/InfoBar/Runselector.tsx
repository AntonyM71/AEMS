import { ChevronLeft, ChevronRight } from "@mui/icons-material"

import Grid from "@mui/material/Grid2"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { useDispatch, useSelector } from "react-redux"
import { getSelectedHeat } from "../../../../redux/atoms/competitions"
import {
	getCurrentPaddlerIndex,
	getSelectedRun,
	updateRun
} from "../../../../redux/atoms/scoring"
import { useGetHeatInfoGetHeatInfoHeatIdGetQuery } from "../../../../redux/services/aemsApi"
import {
	calculateNewIndex,
	getMaxNumberOfRunsInHeat,
	isRunOutOfRangeForAthlete
} from "../InfoBar"

export const RunSelector = () => {
	const dispatch = useDispatch()
	const selectedRun = useSelector(getSelectedRun)
	const setselectedRun = (newRun: number) => dispatch(updateRun(newRun))
	const selectedHeat = useSelector(getSelectedHeat)
	const athletes = useGetHeatInfoGetHeatInfoHeatIdGetQuery(
		{
			heatId: selectedHeat
		},
		{ skip: !selectedHeat }
	)
	const numberOfRuns = getMaxNumberOfRunsInHeat(athletes.data ?? [])
	const changeRun = (number: number) => {
		const newRun = calculateNewIndex(selectedRun + number, numberOfRuns)

		setselectedRun(newRun)
	}

	const currentPaddlerIndex = useSelector(getCurrentPaddlerIndex)
	const selectedAthlete = athletes.data
		? athletes.data[currentPaddlerIndex]
		: undefined

	return (
		<Paper
			sx={{
				padding: "0.5em",
				height: "100%"
			}}
		>
			<Grid container alignItems="center" justifyContent="space-between">
				<Grid size={12}>
					<Typography variant="h5">Run:</Typography>
				</Grid>

				<Grid alignItems="right" size={4}>
					<IconButton
						edge="start"
						onClick={() => changeRun(-1)}
						data-testid={"button-prev-run"}
					>
						<ChevronLeft />
					</IconButton>
				</Grid>
				<Grid alignContent="center" textAlign="center" size={4}>
					<Typography
						fontWeight={"fontWeightBold"}
						variant="h5"
						color={
							isRunOutOfRangeForAthlete(selectedRun, selectedAthlete)
								? "red"
								: "default"
						}
					>
						{selectedRun + 1}
					</Typography>
				</Grid>
				<Grid size={4}>
					<IconButton
						onClick={() => changeRun(1)}
						data-testid={"button-next-run"}
					>
						<ChevronRight />
					</IconButton>
				</Grid>
			</Grid>
		</Paper>
	)
}
