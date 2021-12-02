import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import Skeleton from "@material-ui/lab/Skeleton"
import React, { Fragment, useEffect, useState } from "react"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"
import { competitionsType, eventType } from "../../competitiondata/Competitions"
import {
	selectedCompetitionState,
	selectedEventState,
	selectedHeatState,
	selectedPhaseState
} from "../../recoil/atoms/competitions"
import { getWithAuth } from "../../services/api"

const EventSelector = () => {
	const selectedCompetition = useRecoilValue(selectedCompetitionState)
	const [selectedEvent, setSelectedEvent] = useRecoilState(selectedEventState)
	const resetSelectedPhase = useResetRecoilState(selectedPhaseState)
	const resetSelectedHeat = useResetRecoilState(selectedHeatState)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [events, setEvents] = useState<eventType[]>([])
	useEffect(() => {
		const getComps = async () => {
			console.log(selectedCompetition)
			const competitionInfo: competitionsType = (
				await getWithAuth("competitions/" + selectedCompetition)
			).data
			setEvents(competitionInfo.events)
		}

		void getComps()
		setIsLoading(false)
	}, [selectedCompetition])

	const onSelect = (
		event: React.ChangeEvent<{
			name?: string | undefined
			value: unknown
		}>
	) => {
		resetSelectedHeat()
		resetSelectedPhase()
		setSelectedEvent(event.target.value as string)
	}

	if (isLoading) {
		return <Skeleton variant="rect" />
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
