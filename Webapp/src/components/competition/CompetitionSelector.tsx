import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import Skeleton from "@material-ui/lab/Skeleton"
import React, { useEffect, useState } from "react"
import { useRecoilState, useResetRecoilState } from "recoil"
import { competitionsListType } from "../../competitiondata/Competitions"
import {
	selectedCompetitionState,
	selectedEventState,
	selectedHeatState,
	selectedPhaseState
} from "../../recoil/atoms/competitions"
import { getWithAuth } from "../../services/api"

export const CompetitionSelector = () => {
	// const competitions = getCompetitions()
	const [competitions, setCompetitions] = useState<competitionsListType[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	useEffect(() => {
		const getComps = async () => {
			setCompetitions((await getWithAuth("competitions")).data)
		}

		void getComps()
		setIsLoading(false)
	}, [])

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
	if (isLoading) {
		return <Skeleton variant="rect" />
	} else {
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
}

export default CompetitionSelector
