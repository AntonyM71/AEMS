import Autocomplete from "@mui/material/Autocomplete"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Paper from "@mui/material/Paper"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Skeleton from "@mui/material/Skeleton"
import TextField from "@mui/material/TextField"
import { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuid4 } from "uuid"
import {
	getSelectedCompetition,
	getSelectedEvent,
	getSelectedPhase,
	updateSelectedPhase
} from "../../redux/atoms/competitions"
import {
	useGetManyByPkFromEventCompetitionCompetitionPkIdEventGetQuery,
	useGetManyByPkFromPhaseEventEventPkIdPhaseGetQuery,
	useInsertManyPhasePostMutation
} from "../../redux/services/aemsApi"

const PhasesSelector = () => {
	const dispatch = useDispatch()
	const selectedEvent = useSelector(getSelectedEvent)
	const selectedCompetition = useSelector(getSelectedCompetition)
	const setSelectedPhase = (newPhase: string) =>
		dispatch(updateSelectedPhase(newPhase))
	const selectedPhase = useSelector(getSelectedPhase)

	const resetSelectedPhase = () => dispatch(updateSelectedPhase(""))
	const { data, isLoading, isSuccess, refetch } =
		useGetManyByPkFromPhaseEventEventPkIdPhaseGetQuery({
			eventPkId: selectedEvent,
			joinForeignTable: ["event"]
		})

	const onSelect = (event: SelectChangeEvent<string>) => {
		resetSelectedPhase()
		setSelectedPhase(event.target.value)
	}

	if (isLoading) {
		return <Skeleton variant="rectangular" />
	} else if (!isSuccess) {
		return <h4>Failed to get data from the server</h4>
	} else if (!data) {
		return (
			<Paper sx={{ padding: "1em" }}>
				<Grid container spacing="2">
					<Grid item xs={12}>
						<h4>No phases in event</h4>
					</Grid>
					<Grid container spacing="2">
						<AddPhase refetch={refetch} />
					</Grid>
				</Grid>
			</Paper>
		)
	} else {
		if (data) {
			return (
				<Paper sx={{ padding: "1em" }}>
					<Grid container spacing="2">
						{" "}
						<Grid item xs={12}>
							<h4>Select an Phase</h4>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth={true}>
								<InputLabel>Select Phase</InputLabel>
								<Select
									value={selectedPhase}
									onChange={onSelect}
									variant="outlined"
								>
									{data.map((Phase) => (
										<MenuItem
											key={Phase.id}
											value={Phase.id}
										>
											{Phase.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item>
							<Divider />
						</Grid>
						<Grid item>
							<AddPhase refetch={refetch} />
						</Grid>
					</Grid>
				</Paper>
			)
		} else {
			return <Fragment>No Phases Available</Fragment>
		}
	}
}

const AddPhase = ({ refetch }: { refetch: () => Promise<any> }) => {
	const [PhaseName, setPhaseName] = useState<string>("")
	const selectedCompetition = useSelector(getSelectedCompetition)
	const [phaseId, setPhaseId] = useState<string>(selectedCompetition)
	const [postNewPhase] = useInsertManyPhasePostMutation()
	const { data, isLoading, isSuccess } =
		useGetManyByPkFromEventCompetitionCompetitionPkIdEventGetQuery({
			competitionPkId: selectedCompetition,
			joinForeignTable: ["competition"]
		})
	const options: CompetitionOptions[] | undefined = data
		?.filter((d) => !!d.id && !!d.name)
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		.map((d) => ({ value: d.id, label: d.name! }))
	const submitNewPhase = async () => {
		await postNewPhase({
			body: [
				// eslint-disable-next-line camelcase
				{ name: PhaseName, id: uuid4(), event_id: phaseId }
			]
		})
		await refetch()
		setPhaseName("")
		setPhaseId("")
	}

	return (
		<Grid container spacing="2">
			<Grid item xs={12}>
				<hr></hr>
			</Grid>
			<Grid item xs={12}>
				<h4>Add New Phase</h4>
			</Grid>
			<Grid item xs={12}>
				<TextField
					error={!!PhaseName}
					label="New Phase"
					variant="outlined"
					fullWidth
					onChange={(
						event: React.ChangeEvent<HTMLInputElement>
					): void => setPhaseName(event.target.value)}
					value={PhaseName}
				/>
			</Grid>
			<Grid item xs={12}>
				{options ? (
					<Autocomplete
						// error={!!phaseId}
						options={options}
						fullWidth
						renderInput={(params) => (
							<TextField {...params} label="Competition" />
						)}
						onChange={(event, newValue) => {
							if (newValue) {
								setPhaseId(newValue.value)
							}
						}}
					/>
				) : (
					<> </>
				)}
			</Grid>
			<Grid item xs={12}>
				<Button variant="contained" fullWidth onClick={submitNewPhase}>
					Add Phase
				</Button>
			</Grid>
		</Grid>
	)
}

interface CompetitionOptions {
	value: string
	label: string
}
export default PhasesSelector
