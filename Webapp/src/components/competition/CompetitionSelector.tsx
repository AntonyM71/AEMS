import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
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
		event: any
	) => {
		resetSelectedHeat()
		resetSelectedEvent()
		resetSelectedPhase()
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
