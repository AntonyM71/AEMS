import React, { Fragment } from "react"
import { useRecoilState } from "recoil"
import { selectedCompetitionState, selectedEventState } from "../../atoms"
import { competitionsType, eventType } from "../../Competitions"

interface propsType {
	competitions: competitionsType[]
}
const EventSelector = (props: propsType) => {
	const [selectedCompetition] = useRecoilState(selectedCompetitionState)
	const [selectedEvent, setSelectedEvent] = useRecoilState(selectedEventState)

	const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedEvent(event.target.value)
	}
	if (selectedCompetition !== "") {
		const competitionObject = props.competitions.filter(
			(c) => c.id === selectedCompetition
		)[0]

		if (competitionObject) {
			return (
				<Fragment>
					<select value={selectedEvent} onChange={onSelect}>
						<option value="">Select Event</option>
						{competitionObject.events.map((event: eventType) => (
							<option key={event.id} value={event.id}>
								{event.name}
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

export default EventSelector
