import { ChevronLeft, ChevronRight } from "@mui/icons-material"

import Grid from "@mui/material/Grid2"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { useDispatch, useSelector } from "react-redux"
import {
	getNumberOfRuns,
	getSelectedHeat
} from "../../../../redux/atoms/competitions"
import {
	getCurrentPaddlerIndex,
	getSelectedRun,
	updatePaddlerAndRun
} from "../../../../redux/atoms/scoring"
import { useGetHeatInfoGetHeatInfoHeatIdGetQuery } from "../../../../redux/services/aemsApi"
import { AthleteInfo, calculateNewIndex } from "../InfoBar"

export const PaddlerSelector = ({ paddlerInfo }: propsType) => {
	const dispatch = useDispatch()
	const setCurrentPaddlerAndRun = (newPaddler: number, newRun: number) =>
		dispatch(updatePaddlerAndRun({ paddler: newPaddler, run: newRun }))

	const numberOfRuns = useSelector(getNumberOfRuns)
	const currentPaddler = useSelector(getCurrentPaddlerIndex)
	const currentRun = useSelector(getSelectedRun)
	const currentHeat = useSelector(getSelectedHeat)

	const athletes = useGetHeatInfoGetHeatInfoHeatIdGetQuery(
		{
			heatId: currentHeat
		},
		{ skip: !currentHeat }
	)
	const paddlersInHeat = athletes.data ?? []
	const numberOfPaddlers = paddlersInHeat.length
	const changePaddler = (number: number) => {
		const newPaddlerIndex = calculateNewIndex(
			currentPaddler + number,
			numberOfPaddlers
		)

		let newRun = currentRun
		if (number > 0 && newPaddlerIndex < currentPaddler) {
			newRun = calculateNewIndex(currentRun + 1, numberOfRuns)
		} else if (number < 0 && newPaddlerIndex > currentPaddler) {
			newRun = calculateNewIndex(currentRun - 1, numberOfRuns)
		}
		setCurrentPaddlerAndRun(newPaddlerIndex, newRun)
	}

	return (
		<Paper
			sx={{
				padding: "0.5em",
				height: "100%"
			}}
		>
			<Typography variant="h5" data-testid="display-bib-number">
				Bib No: <strong>{paddlerInfo.bib}</strong>
			</Typography>
			<div style={{ textAlign: "center" }}>
				<Grid
					container
					direction="row"
					justifyContent="space-between"
					alignContent="space-between"
				>
					<Grid>
						<IconButton
							onClick={() => changePaddler(-1)}
							data-testid={"button-prev-paddler"}
						>
							<ChevronLeft />
						</IconButton>
					</Grid>
					<Grid data-testid={"display-paddler-name"}>
						<div style={{ textAlign: "center" }}>
							{paddlerInfo.first_name}
						</div>
						<div style={{ textAlign: "center" }}>
							{paddlerInfo.last_name.toUpperCase()}
						</div>
					</Grid>
					<Grid>
						<IconButton
							onClick={() => changePaddler(1)}
							data-testid={"button-next-paddler"}
						>
							<ChevronRight />
						</IconButton>
					</Grid>
				</Grid>
			</div>
		</Paper>
	)
}

interface propsType {
	paddlerInfo: AthleteInfo
}
