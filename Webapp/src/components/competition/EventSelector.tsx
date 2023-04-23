import Autocomplete from "@mui/material/Autocomplete"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Paper from "@mui/material/Paper"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Skeleton from "@mui/material/Skeleton"
import TextField from "@mui/material/TextField"
import { Fragment, useState } from "react"
import toast from "react-hot-toast"
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
		useGetManyByPkFromEventCompetitionCompetitionPkIdEventGetQuery({
			competitionPkId: selectedCompetition,
			joinForeignTable: ["competition"]
		})

	const onSelect = (event: SelectChangeEvent<string>) => {
		resetSelectedHeat()
		resetSelectedPhase()
		setSelectedEvent(event.target.value)
	}

	if (!selectedCompetition) {
		return <></>
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
						<h4>No Events in competition</h4>
					</Grid>
					<Grid container spacing="2">
						<AddEvent refetch={refetch} />
					</Grid>
				</Grid>
			</Paper>
		)
	} else {
		if (data) {
			return (
				<Paper sx={{ padding: "1em" }}>
					<Grid container spacing="2">
						{showDetailed ? (
							<Grid item xs={12}>
								<h4>Select an Event</h4>
							</Grid>
						) : (
							<></>
						)}
						<Grid item xs={12}>
							<FormControl fullWidth={true}>
								<InputLabel>Select Event</InputLabel>
								<Select
									value={selectedEvent}
									onChange={onSelect}
									variant="outlined"
								>
									{data.map((event) => (
										<MenuItem
											key={event.id}
											value={event.id}
										>
											{event.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						{showDetailed ? (
							<Grid item>
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
}

const AddEvent = ({ refetch }: { refetch: () => Promise<any> }) => {
	const [eventName, setEventName] = useState<string>("")
	const selectedCompetition = useSelector(getSelectedCompetition)
	const [competitionId, setCompetitionId] =
		useState<string>(selectedCompetition)
	const [postNewEvent] = useInsertManyEventPostMutation()
	const { data, isLoading, isSuccess } = useGetManyCompetitionGetQuery({})
	const options: CompetitionOptions[] | undefined = data
		?.filter((d) => !!d.id && !!d.name)
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		.map((d) => ({ value: d.id!, label: d.name! }))
	const submitNewEvent = async () => {
		await postNewEvent({
			body: [
				// eslint-disable-next-line camelcase
				{ name: eventName, id: uuid4(), competition_id: competitionId }
			]
		})
		await refetch()
		setEventName("")
		setCompetitionId("")
		toast.success("Successfully added event")
	}

	return (
		<Grid container spacing="2">
			<Grid item xs={12}>
				<hr></hr>
			</Grid>
			<Grid item xs={12}>
				<h4>Add New Event</h4>
			</Grid>
			<Grid item xs={12}>
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
			<Grid item xs={12}>
				{options ? (
					<Autocomplete
						// error={!!competitionId}
						options={options}
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
			<Grid item xs={12}>
				<Button variant="contained" fullWidth onClick={submitNewEvent}>
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
