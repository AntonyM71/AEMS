import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import React, { Fragment } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import {
	heatsListState,
	selectedCompetitionState,
	selectedEventState,
	selectedPhaseState
} from "../../atoms"
import { competitionsType, phaseType } from "../../Competitions"

interface propsType {
	competitions: competitionsType[]
}
const PhaseSelector = ({ competitions }: propsType) => {
	const selectedCompetition = useRecoilValue(selectedCompetitionState)
	const selectedEvent = useRecoilValue(selectedEventState)
	const [selectedPhase, setSelectedPhase] = useRecoilState(selectedPhaseState)
	const setHeatsList = useSetRecoilState(heatsListState)

	if (selectedCompetition !== "" && selectedEvent !== "") {
		const competitionObject = competitions.filter(
			(c) => c.id === selectedCompetition
		)[0]
		if (competitionObject) {
			const eventObject = competitionObject.events.filter(
				(e) => e.id === selectedEvent
			)[0]
			const onSelect = (
				event: React.ChangeEvent<{
					name?: string | undefined
					value: unknown
				}>
			) => {
				setSelectedPhase(event.target.value as string)
				setHeatsList(
					eventObject.phases.filter(
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
					>
						{eventObject.phases.map((phase) => (
							<MenuItem key={phase.id} value={phase.id}>
								{phase.name}
							</MenuItem>
						))}
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
