import Autocomplete from "@mui/material/Autocomplete"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid2"
import TextField from "@mui/material/TextField"
import { useState } from "react"
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
import { SelectorPanel } from "./SelectorPanel"

const EventSelector = ({
	showDetailed = false
}: {
	showDetailed?: boolean
}) => {
	const dispatch = useDispatch()
	const selectedCompetition = useSelector(getSelectedCompetition)
	const selectedEvent = useSelector(getSelectedEvent)
	const { data, isLoading, isSuccess, refetch } =
		useGetManyByPkFromEventCompetitionCompetitionPkIdEventGetQuery(
			{
				competitionPkId: selectedCompetition,
				joinForeignTable: ["competition"]
			},
			{ skip: !selectedCompetition, refetchOnMountOrArgChange: true }
		)

	const onSelect = (newEvent: string) => {
		dispatch(updateSelectedHeat(""))
		dispatch(updateSelectedPhase(""))
		dispatch(updateSelectedEvent(newEvent))
	}

	if (!selectedCompetition) {
		return <></>
	}

	return (
		<SelectorPanel
			entityLabel="Event"
			items={(data ?? []).map((event) => ({
				id: event.id ?? "",
				name: event.name ?? ""
			}))}
			selectedValue={selectedEvent}
			onSelect={onSelect}
			isLoading={isLoading}
			isError={!isSuccess}
			refetch={refetch}
			showDetailed={showDetailed}
			emptyMessage="No Events in competition"
			sectionHeading="Select an Event"
			addForm={<AddEvent refetch={refetch} />}
		/>
	)
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

		.map((d) => ({ value: d.id, label: d.name }))
	const submitNewEvent = async () => {
		HandlePostResponse(
			await postNewEvent({
				events: [
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
