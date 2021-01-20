import React, { Fragment } from "react"
import { useRecoilState } from "recoil"
import {
	selectedCompetitionState,
	selectedEventState,
	selectedPhaseState
} from "../../atoms"
import { competitionsType } from "../../Competitions"

interface propsType {
	competitions: competitionsType[]
}
const PhaseSelector = ({ competitions }: propsType) => {
	const [selectedCompetition] = useRecoilState(selectedCompetitionState)
	const [selectedEvent] = useRecoilState(selectedEventState)
	const [selectedPhase, setSelectedPhase] = useRecoilState(selectedPhaseState)

	const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedPhase(event.target.value)
	}
	if (selectedCompetition !== "" && selectedEvent !== "") {
		const competitionObject = competitions.filter(
			(c) => c.id === selectedCompetition
		)[0]
		if (competitionObject) {
			const eventObject = competitionObject.events.filter(
				(e) => e.id === selectedEvent
			)[0]

			return (
				<Fragment>
					<select value={selectedPhase} onChange={onSelect}>
						<option value="Select Phase"></option>
						{eventObject.phases.map((phase) => (
							<option key={phase.id} value={phase.id}>
								{phase.name}
							</option>
						))}
					</select>
				</Fragment>
			)
		} else {
			return <Fragment></Fragment>
		}
	} else {
		return <Fragment></Fragment>
	}
}

export default PhaseSelector
