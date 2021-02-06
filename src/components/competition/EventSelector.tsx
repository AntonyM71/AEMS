import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import React, { Fragment } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { selectedCompetitionState, selectedEventState } from "../../atoms"
import { competitionsType, eventType } from "../../Competitions"

interface propsType {
	competitions: competitionsType[]
}
const EventSelector = (props: propsType) => {
	const selectedCompetition = useRecoilValue(selectedCompetitionState)
	const [selectedEvent, setSelectedEvent] = useRecoilState(selectedEventState)

	const onSelect = (
		event: React.ChangeEvent<{
			name?: string | undefined
			value: unknown
		}>
	) => {
		setSelectedEvent(event.target.value as string)
	}
	if (selectedCompetition !== "") {
		const competitionObject = props.competitions.filter(
			(c) => c.id === selectedCompetition
		)[0]

		if (competitionObject && competitionObject.events) {
			return (
				<FormControl fullWidth={true}>
					<InputLabel>Select Event</InputLabel>
					<Select
						value={selectedEvent}
						onChange={onSelect}
						variant="outlined"
					>
						{competitionObject.events.map((event: eventType) => (
							<MenuItem key={event.id} value={event.id}>
								{event.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			)
		} else {
			return <Fragment>No Events Available</Fragment>
		}
	} else {
		return <> </>
	}
}

export default EventSelector
