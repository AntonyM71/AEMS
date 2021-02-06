import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import React from "react"
import { useRecoilState } from "recoil"
import { selectedCompetitionState } from "../../atoms"
import { competitionsType } from "../../Competitions"

interface propsType {
	competitions: competitionsType[]
}

const CompetitionSelector = ({ competitions }: propsType) => {
	const [selectedCompetition, setSelectedCompetition] = useRecoilState(
		selectedCompetitionState
	)
	const onSelect = (
		event: React.ChangeEvent<{
			name?: string | undefined
			value: unknown
		}>
	) => {
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
