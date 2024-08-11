import Divider from "@mui/material/Divider"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Paper from "@mui/material/Paper"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Skeleton from "@mui/material/Skeleton"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuid4 } from "uuid"
import {
	getSelectedCompetition,
	updateSelectedCompetition,
	updateSelectedEvent,
	updateSelectedHeat,
	updateSelectedPhase
} from "../../redux/atoms/competitions"
import {
	useGetManyCompetitionGetQuery,
	useInsertManyCompetitionPostMutation
} from "../../redux/services/aemsApi"
import { HandlePostResponse } from "../../utils/rtkQueryHelper"

export const CompetitionSelector = ({
	showDetailed = false
}: {
	showDetailed?: boolean
}) => {
	// const competitions = getCompetitions()
	const dispatch = useDispatch()

	const { data, isLoading, isSuccess } = useGetManyCompetitionGetQuery({})
	const selectedCompetition = useSelector(getSelectedCompetition)

	const setSelectedCompetition = (newComp: string) =>
		dispatch(updateSelectedCompetition(newComp))
	const resetSelectedPhase = () => dispatch(updateSelectedPhase(""))
	const resetSelectedEvent = () => dispatch(updateSelectedEvent(""))
	const resetSelectedHeat = () => dispatch(updateSelectedHeat(""))
	const handleSelect = (event: SelectChangeEvent<string>) => {
		resetSelectedHeat()
		resetSelectedEvent()
		resetSelectedPhase()

		setSelectedCompetition(event.target.value)
	}
	if (isLoading) {
		return <Skeleton variant="rectangular" />
	} else if (!isSuccess) {
		return <h4>Failed to get data from the server</h4>
	} else if (!data) {
		return (
			<Paper sx={{ padding: "1em" }}>
				<h4>No Competitions</h4>
				<AddCompetition />
			</Paper>
		)
	} else {
		return (
			<Paper sx={{ padding: "1em", height: "100%" }}>
				<Grid container spacing="2">
					{showDetailed ? (
						<Grid item xs={12}>
							<h4>Select a Competition</h4>
						</Grid>
					) : (
						<></>
					)}
					<Grid item xs={12}>
						<FormControl fullWidth={true}>
							<InputLabel>Select Competition</InputLabel>
							<Select
								value={selectedCompetition}
								onChange={handleSelect}
								variant="outlined"
								fullWidth={true}
								label="Competition"
							>
								{data.map((competition) => {
									if (competition.id) {
										return (
											<MenuItem
												key={competition.id}
												value={competition.id}
											>
												{competition.name ?? ""}
											</MenuItem>
										)
									}
								})}
							</Select>
						</FormControl>
					</Grid>
					{showDetailed ? (
						<Grid item xs={12}>
							<AddCompetition />
						</Grid>
					) : (
						<></>
					)}
				</Grid>
			</Paper>
		)
	}
}

const AddCompetition = () => {
	const [postNewCompetition] = useInsertManyCompetitionPostMutation()
	const [competitionName, setCompetitionName] = useState<string>("")
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCompetitionName(event.target.value)
	}
	const { refetch } = useGetManyCompetitionGetQuery({})
	const submitCompetition = async (
		e: React.KeyboardEvent<HTMLDivElement>
	): Promise<void> => {
		if (e.key === "Enter") {
			if (competitionName) {
				HandlePostResponse(
					await postNewCompetition({
						body: [{ name: competitionName, id: uuid4() }]
					})
				)
				await refetch()
			} else {
				toast.error(
					"Please add a name before submitting a new competition"
				)
			}
		}
	}

	return (
		<Grid container spacing={1}>
			<Grid item xs={12}>
				<Divider sx={{ margin: "0.5em" }} />
			</Grid>
			<Grid item xs={12}>
				<h4>Add New Competition</h4>
			</Grid>
			<Grid item xs={12}>
				<TextField
					label="New Competition"
					variant="outlined"
					fullWidth
					onChange={handleChange}
					value={competitionName}
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onKeyUp={submitCompetition}
				/>
			</Grid>
		</Grid>
	)
}

export default CompetitionSelector
