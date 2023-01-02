import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"

import Select, { SelectChangeEvent } from "@mui/material/Select"
import Skeleton from "@mui/material/Skeleton"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	competitionsListType,
	getCompetitions
} from "../../competitiondata/Competitions"
import {
	getSelectedCompetition,
	updateSelectedCompetition,
	updateSelectedEvent,
	updateSelectedHeat,
	updateSelectedPhase
} from "../../recoil/atoms/competitions"

export const CompetitionSelector = () => {
	// const competitions = getCompetitions()
	const dispatch = useDispatch()
	const [competitions, setCompetitions] = useState<competitionsListType[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	useEffect(() => {
		const getComps = () => {
			const comps = getCompetitions()
			setCompetitions(comps)
		}

		void getComps()
		setIsLoading(false)
	}, [])

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
						{competitions.map((competition) => (
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
