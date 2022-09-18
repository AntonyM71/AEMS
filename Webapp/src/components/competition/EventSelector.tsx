import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Skeleton from "@mui/material/Skeleton"
import { Fragment, useEffect, useState } from "react"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"
import { eventType, getCompetitions } from "../../competitiondata/Competitions"
import {
	selectedCompetitionState,
	selectedEventState,
	selectedHeatState,
	selectedPhaseState
} from "../../recoil/atoms/competitions"

const EventSelector = () => {
	const selectedCompetition = useRecoilValue(selectedCompetitionState)
	const [selectedEvent, setSelectedEvent] = useRecoilState(selectedEventState)
	const resetSelectedPhase = useResetRecoilState(selectedPhaseState)
	const resetSelectedHeat = useResetRecoilState(selectedHeatState)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [events, setEvents] = useState<eventType[]>([])
	useEffect(() => {
		const getComps = () => {
			const comps = getCompetitions()
			const selectedCompetitionData = comps.find(
				(c) => c.id === selectedCompetition
			)
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			setEvents(selectedCompetitionData!.events)
		}

		void getComps()
		setIsLoading(false)
	}, [selectedCompetition])

	const onSelect = (event: SelectChangeEvent<string>) => {
		resetSelectedHeat()
		resetSelectedPhase()
		setSelectedEvent(event.target.value)
	}

	if (isLoading) {
		return <Skeleton variant="rectangular" />
	}
	if (selectedCompetition !== "") {
		if (events) {
			return (
				<FormControl fullWidth={true}>
					<InputLabel>Select Event</InputLabel>
					<Select
						value={selectedEvent}
						onChange={onSelect}
						variant="outlined"
					>
						{events.map((event: eventType) => (
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
function uuid4(): string {
	throw new Error("Function not implemented.")
}
