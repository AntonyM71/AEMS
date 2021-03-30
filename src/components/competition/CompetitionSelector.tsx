import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import React from "react"
import { useRecoilState, useResetRecoilState } from "recoil"
import { competitionsType } from "../../competitiondata/Competitions"
import {
	selectedCompetitionState,
	selectedEventState,
	selectedHeatState,
	selectedPhaseState
} from "../../recoil/atoms"

interface propsType {
	competitions: competitionsType[]
}

export const CompetitionSelector = ({ competitions }: propsType) => {
	const [selectedCompetition, setSelectedCompetition] = useRecoilState(
		selectedCompetitionState
	)
	const resetSelectedPhase = useResetRecoilState(selectedPhaseState)
	const resetSelectedEvent = useResetRecoilState(selectedEventState)
	const resetSelectedHeat = useResetRecoilState(selectedHeatState)
	const onSelect = (
		event: React.ChangeEvent<{
			name?: string | undefined
			value: unknown
		}>
	) => {
		resetSelectedHeat()
		resetSelectedEvent()
		resetSelectedPhase()
		setSelectedCompetition(event.target.value as string)
	}

	return (
		<FormControl fullWidth={true}>
			<InputLabel>Select Competition</InputLabel>
			<Select
				value={selectedCompetition}
				onChange={onSelect}
				variant="outlined"
				// fullWidth={true}
			>
				{competitions.map((competition) => (
					<MenuItem key={competition.id} value={competition.id}>
						{competition.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default CompetitionSelector
