import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"

import { Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	getCompetitions,
	heatsType,
	phaseType
} from "../../competitiondata/Competitions"
import {
	getSelectedCompetition,
	getSelectedEvent,
	getSelectedPhase,
	updateHeatsList,
	updateSelectedHeat,
	updateSelectedPhase
} from "../../recoil/atoms/competitions"
const PhaseSelector = () => {
	const dispatch = useDispatch()
	const competitions = getCompetitions()
	const selectedCompetition = useSelector(getSelectedCompetition)
	const selectedEvent = useSelector(getSelectedEvent)
	const selectedPhase = useSelector(getSelectedPhase)
	const setSelectedPhase = (newPhase: string) =>
		dispatch(updateSelectedPhase(newPhase))

	const setHeatsList = (newHeats: heatsType[]) =>
		dispatch(updateHeatsList(newHeats))
	const resetSelectedHeat = () => dispatch(updateSelectedHeat(""))
	if (selectedCompetition !== "" && selectedEvent !== "") {
		const competitionObject = competitions.filter(
			(c) => c.id === selectedCompetition
		)[0]
		if (competitionObject) {
			// console.log(competitionObject)
			const eventObject = competitionObject.events.find(
				(e) => e.id === selectedEvent
			)

			const onSelect = (event: SelectChangeEvent) => {
				resetSelectedHeat()
				setSelectedPhase(event.target.value)
				setHeatsList(
					eventObject!.phases.filter(
						(p: phaseType) => p.id === event.target.value
					)[0].heats
				)
			}

			return (
				<FormControl fullWidth={true}>
					<InputLabel>Select Phase</InputLabel>
					<Select
						value={selectedPhase}
						onChange={onSelect}
						variant="outlined"
						fullWidth
						disabled={!selectedEvent}
					>
						{eventObject!.phases.map((phase) => {
							console.log(phase)

							return (
								<MenuItem key={phase.id} value={phase.id}>
									{phase.name}
								</MenuItem>
							)
						})}
					</Select>
				</FormControl>
			)
		} else {
			return <Fragment></Fragment>
		}
	} else {
		return <Fragment></Fragment>
	}
}

export default PhaseSelector
