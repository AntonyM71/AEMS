import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"

import Select, { SelectChangeEvent } from "@mui/material/Select"
import Skeleton from "@mui/material/Skeleton"
import { useDispatch, useSelector } from "react-redux"
import {
	getSelectedCompetition,
	updateSelectedCompetition,
	updateSelectedEvent,
	updateSelectedHeat,
	updateSelectedPhase
} from "../../redux/atoms/competitions"
import { useGetManyCompetitionGetQuery } from "../../redux/services/aemsApi"

export const CompetitionSelector = () => {
	// const competitions = getCompetitions()
	const dispatch = useDispatch()

	const { data, isLoading } = useGetManyCompetitionGetQuery({})

	const selectedCompetition = useSelector(getSelectedCompetition)

	const age = ""
	const setSelectedCompetition = (newComp: string) =>
		dispatch(updateSelectedCompetition(newComp))
	const resetSelectedPhase = () => dispatch(updateSelectedPhase(""))
	const resetSelectedEvent = () => dispatch(updateSelectedEvent(""))
	const resetSelectedHeat = () => dispatch(updateSelectedHeat(""))
	const handleSelect = (event: SelectChangeEvent<string>) => {
		resetSelectedHeat()
		resetSelectedEvent()
		resetSelectedPhase()
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		setSelectedCompetition(event.target.value)
	}
	if (isLoading) {
		return <Skeleton variant="rectangular" />
	} else if (!data || data.length === 0) {
		return <h4>No Competitions</h4>
	} else {
		return (
			<>
				<FormControl fullWidth={true}>
					<InputLabel>Select Competition</InputLabel>
					<Select
						value={selectedCompetition}
						onChange={handleSelect}
						variant="outlined"
						fullWidth={true}
					>
						{data.map((competition) => (
							<MenuItem
								key={competition.id}
								value={competition.id}
							>
								{competition.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</>
		)
	}
}

export default CompetitionSelector
