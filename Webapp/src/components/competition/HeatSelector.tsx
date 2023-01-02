import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"

import { Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	getHeatsList,
	getSelectedHeat,
	getSelectedPhase,
	updateSelectedHeat
} from "../../recoil/atoms/competitions"

export const HeatsSelector = () => {
	const dispatch = useDispatch()
	const selectedPhase = useSelector(getSelectedPhase)
	const selectedHeat = useSelector(getSelectedHeat)
	const heatsList = useSelector(getHeatsList)
	const setSelectedHeat = (newHeat: string) =>
		dispatch(updateSelectedHeat(newHeat))
	if (selectedPhase !== "") {
		if (heatsList) {
			const onSelect = (event: SelectChangeEvent<string>) => {
				const currentHeatDetails = heatsList.find(
					(heat) => heat.id === event.target.value
				)
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				setSelectedHeat(currentHeatDetails!.id)
			}

			return (
				<FormControl fullWidth={true}>
					<InputLabel>Select Heat</InputLabel>
					<Select
						value={selectedHeat}
						onChange={onSelect}
						variant="outlined"
						defaultValue={""}
						fullWidth
					>
						<option value="">Select Heat</option>
						{heatsList.map((heat) => (
							<MenuItem key={heat.id} value={heat.id}>
								{heat.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			)
		} else {
			return <div>This Phase contains no heats</div>
		}
	} else {
		return <Fragment></Fragment>
	}
}
