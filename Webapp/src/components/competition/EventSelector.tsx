import Autocomplete from "@mui/material/Autocomplete"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid2"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Paper from "@mui/material/Paper"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuid4 } from "uuid"
import {
	getSelectedCompetition,
	getSelectedEvent,
	updateSelectedEvent,
	updateSelectedHeat,
	updateSelectedPhase
} from "../../redux/atoms/competitions"
import {
	useGetManyByPkFromEventCompetitionCompetitionPkIdEventGetQuery,
	useGetManyCompetitionGetQuery,
	useInsertManyEventPostMutation
} from "../../redux/services/aemsApi"
import { HandlePostResponse } from "../../utils/rtkQueryHelper"
import { RefreshButton } from "./RefreshIconButton"

const EventSelector = ({
	showDetailed = false
}: {
	showDetailed?: boolean
}) => {
	const dispatch = useDispatch()
	const selectedCompetition = useSelector(getSelectedCompetition)
	const setSelectedEvent = (newevent: string) =>
		dispatch(updateSelectedEvent(newevent))
	const selectedEvent = useSelector(getSelectedEvent)
	const resetSelectedPhase = () => dispatch(updateSelectedPhase(""))

	const resetSelectedHeat = () => dispatch(updateSelectedHeat(""))
	const { data, isLoading, isSuccess, refetch } =
		useGetManyByPkFromEventCompetitionCompetitionPkIdEventGetQuery(
			{
				competitionPkId: selectedCompetition,
				joinForeignTable: ["competition"]
			},
			{ skip: !selectedCompetition }
		)

	const onSelect = (event: SelectChangeEvent<string>) => {
		resetSelectedHeat()
		resetSelectedPhase()
		setSelectedEvent(event.target.value)
	}

	if (!selectedCompetition) {
		return <></>
	}
	if (isLoading) {
		return <Skeleton variant="rectangular" data-testid="skeleton" />
	} else if (!isSuccess) {
		return <h4>Failed to get data from the server</h4>
	} else if (!data || data.length === 0) {
		return (
			<Paper sx={{ padding: "1em", height: "100%" }}>
				<Stack
					direction="row"
					sx={{
						alignItems: "center"
					}}
				>
					<RefreshButton refetch={refetch} />
					<h4>No Events in competition</h4>
				</Stack>

				<AddEvent refetch={refetch} />
			</Paper>
		)
	} else if (data) {
		return (
			<Paper sx={{ padding: "1em" }}>
				<Grid container spacing={2}>
					{showDetailed ? (
						<Grid size={12}>
							<h4>Select an Event</h4>
						</Grid>
					) : (
						<></>
					)}
					<Grid size={12}>
						<FormControl fullWidth={true}>
							<InputLabel>Select Event</InputLabel>
							<Select
								value={selectedEvent}
								onChange={onSelect}
								variant="outlined"
								startAdornment={
									<RefreshButton refetch={refetch} />
								}
							>
								{data.map((event) => (
									<MenuItem key={event.id} value={event.id}>
										{event.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					{showDetailed ? (
						<Grid>
							<AddEvent refetch={refetch} />
						</Grid>
					) : (
						<></>
					)}
				</Grid>
			</Paper>
		)
	} else {
		return <Fragment>No Events Available</Fragment>
	}
}

const AddEvent = ({ refetch }: { refetch: () => Promise<any> }) => {
	const [eventName, setEventName] = useState<string>("")
	const selectedCompetition = useSelector(getSelectedCompetition)
	const [competitionId, setCompetitionId] =
		useState<string>(selectedCompetition)
	const [postNewEvent] = useInsertManyEventPostMutation()
	const { data } = useGetManyCompetitionGetQuery({})
	const options: CompetitionOptions[] | undefined = data
		?.filter((d) => !!d.id && !!d.name)

		.map((d) => ({ value: d.id!, label: d.name! }))
	const submitNewEvent = async () => {
		HandlePostResponse(
			await postNewEvent({
				insert: [
					{
						name: eventName,
						id: uuid4(),
						competition_id: competitionId
					}
				]
			})
		)
		await refetch()
		setEventName("")
	}

	return (
		<Grid container spacing={2}>
			<Grid size={12}>
				<Divider sx={{ margin: "0.5em" }} />
			</Grid>
			<Grid size={12}>
				<h4>Add New Event</h4>
			</Grid>
			<Grid size={12}>
				<TextField
					error={!!eventName}
					label="New event"
					variant="outlined"
					fullWidth
					onChange={(
						event: React.ChangeEvent<HTMLInputElement>
					): void => setEventName(event.target.value)}
					value={eventName}
				/>
			</Grid>
			<Grid size={12}>
				{options ? (
					<Autocomplete
						// error={!!competitionId}
						options={options}
						inputValue={
							options.find((s) => s.value === competitionId)
								?.label ?? ""
						}
						fullWidth
						renderInput={(params) => (
							<TextField {...params} label="Competition" />
						)}
						onChange={(event, newValue) => {
							if (newValue) {
								setCompetitionId(newValue.value)
							}
						}}
					/>
				) : (
					<> </>
				)}
			</Grid>
			<Grid size={12}>
				<Button
					variant="contained"
					fullWidth
					onClick={() => void submitNewEvent()}
					disabled={!eventName}
				>
					Add Event
				</Button>
			</Grid>
		</Grid>
	)
}

interface CompetitionOptions {
	value: string
	label: string
}
export default EventSelector
