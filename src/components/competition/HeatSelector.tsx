import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import React, { Fragment } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import {
	heatsListState,
	selectedHeatState,
	selectedPhaseState
} from "../../atoms"

export const HeatsSelector = () => {
	const [selectedPhase] = useRecoilState(selectedPhaseState)
	const [selectedHeat, setSelectedHeat] = useRecoilState(selectedHeatState)
	const heatsList = useRecoilValue(heatsListState)
	if (selectedPhase !== "") {
		if (heatsList) {
			const onSelect = (
				event: React.ChangeEvent<{
					name?: string | undefined
					value: unknown
				}>
			) => {
				const currentHeatDetails = heatsList.find(
					(heat) => heat.id === event.target.value
				)
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				setSelectedHeat(currentHeatDetails!)
			}

			return (
				<FormControl fullWidth={true}>
					<InputLabel>Select Heat</InputLabel>
					<Select
						value={selectedHeat.id}
						onChange={onSelect}
						variant="outlined"
						defaultValue={{ label: "Select Heat", value: "" }}
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
