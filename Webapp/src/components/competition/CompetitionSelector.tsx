import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import Skeleton from "@mui/material/Skeleton"
import { useEffect, useState } from "react"
import { useRecoilState, useResetRecoilState } from "recoil"
import {
	competitionsListType,
	getCompetitions
} from "../../competitiondata/Competitions"
import {
	selectedCompetitionState,
	selectedEventState,
	selectedHeatState,
	selectedPhaseState
} from "../../recoil/atoms/competitions"

export const CompetitionSelector = () => {
	// const competitions = getCompetitions()
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

	const [selectedCompetition, setSelectedCompetition] = useRecoilState(
		selectedCompetitionState
	)
	const resetSelectedPhase = useResetRecoilState(selectedPhaseState)
	const resetSelectedEvent = useResetRecoilState(selectedEventState)
	const resetSelectedHeat = useResetRecoilState(selectedHeatState)
	const onSelect = (event: any) => {
		resetSelectedHeat()
		resetSelectedEvent()
		resetSelectedPhase()
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		setSelectedCompetition(event.target.value as string)
	}
	if (isLoading) {
		return <Skeleton variant="rectangular" />
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
