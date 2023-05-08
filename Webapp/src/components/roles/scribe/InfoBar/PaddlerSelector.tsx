import { ChevronLeft, ChevronRight } from "@mui/icons-material"

import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import { useDispatch, useSelector } from "react-redux"
import { getSelectedHeat } from "../../../../redux/atoms/competitions"
import {
	getCurrentPaddlerIndex,
	updatePaddler
} from "../../../../redux/atoms/scoring"
import { useGetManyAthleteheatGetQuery } from "../../../../redux/services/aemsApi"
import { AthleteInfo, calculateNewIndex } from "../InfoBar"

export const PaddlerSelector = ({ paddlerInfo }: propsType) => {
	const dispatch = useDispatch()
	const setCurrentPaddler = (newPaddler: number) =>
		dispatch(updatePaddler(newPaddler))
	const currentPaddler = useSelector(getCurrentPaddlerIndex)

	const currentHeat = useSelector(getSelectedHeat)
	const athletes = useGetManyAthleteheatGetQuery({
		heatIdListComparisonOperator: "Equal",
		heatIdList: [currentHeat]
	})
	const paddlersInHeat = athletes.data || []
	const numberOfPaddlers = paddlersInHeat.length
	const changePaddler = (number: number) => {
		const newPaddlerIndex = calculateNewIndex(
			currentPaddler + number,
			numberOfPaddlers
		)

		setCurrentPaddler(newPaddlerIndex)
	}

	return (
		<Paper sx={{ flex: "true" }}>
			<h4 data-testid="display-bib-number">
				Paddler No: {paddlerInfo.bib}
			</h4>
			<div className="score" id="heatScore">
				<Grid container direction="row" alignContent="space-between">
					<Grid item xs={3}>
						<IconButton
							onClick={() => changePaddler(-1)}
							data-testid={"button-prev-paddler"}
						>
							<ChevronLeft />
						</IconButton>
					</Grid>
					<Grid item xs={6} data-testid={"display-paddler-name"}>
						<div style={{ textAlign: "center" }}>
							{paddlerInfo.first_name}
						</div>
						<div style={{ textAlign: "center" }}>
							{paddlerInfo.last_name.toUpperCase()}
						</div>
					</Grid>
					<Grid item xs={3}>
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
