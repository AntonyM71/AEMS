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
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuid4 } from "uuid"
import {
	getSelectedCompetition,
	getSelectedEvent,
	getSelectedHeat,
	getSelectedPhase,
	updateSelectedHeat,
	updateSelectedPhase
} from "../../redux/atoms/competitions"
import {
	useGetManyByPkFromHeatPhasePhasePkIdHeatGetQuery,
	useGetManyByPkFromPhaseEventEventPkIdPhaseGetQuery,
	useInsertManyHeatPostMutation
} from "../../redux/services/aemsApi"

const HeatsSelector = () => {
	const dispatch = useDispatch()
	const selectedPhase = useSelector(getSelectedPhase)
	const selectedCompetition = useSelector(getSelectedCompetition)
	const setSelectedHeat = (newHeat: string) =>
		dispatch(updateSelectedHeat(newHeat))
	const selectedHeat = useSelector(getSelectedHeat)
	const resetSelectedPhase = () => dispatch(updateSelectedPhase(""))

	const resetSelectedHeat = () => dispatch(updateSelectedHeat(""))
	const { data, isLoading, isSuccess, refetch } =
		useGetManyByPkFromHeatPhasePhasePkIdHeatGetQuery({
			phasePkId: selectedPhase,
			joinForeignTable: ["phase"]
		})

	const onSelect = (event: SelectChangeEvent<string>) => {
		setSelectedHeat(event.target.value)
	}
	if (!selectedPhase) {
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
						<h4>No Heats in phase</h4>
					</Grid>
					<Grid container spacing="2">
						<AddHeat refetch={refetch} />
					</Grid>
				</Grid>
			</Paper>
		)
	} else {
		if (data) {
			return (
				<Paper sx={{ padding: "1em" }}>
					<Grid container spacing="2">
						<Grid item xs={12}>
							<h4>Select an Heat</h4>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth={true}>
								<InputLabel>Select Heat</InputLabel>
								<Select
									value={selectedHeat}
									onChange={onSelect}
									variant="outlined"
								>
									{data.map((Heat) => (
										<MenuItem key={Heat.id} value={Heat.id}>
											{Heat.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item>
							<Divider />
						</Grid>
						<Grid item>
							<AddHeat refetch={refetch} />
						</Grid>
					</Grid>
				</Paper>
			)
		} else {
			return <Fragment>No Heats Available</Fragment>
		}
	}
}

const AddHeat = ({ refetch }: { refetch: () => Promise<any> }) => {
	const [HeatName, setHeatName] = useState<string>("")
	const selectedCompetition = useSelector(getSelectedCompetition)
	const selectedEvent = useSelector(getSelectedEvent)
	const [competitionId, setCompetitionId] =
		useState<string>(selectedCompetition)
	const [postNewHeat] = useInsertManyHeatPostMutation()
	const { data, isLoading, isSuccess } =
		useGetManyByPkFromPhaseEventEventPkIdPhaseGetQuery({
			eventPkId: selectedEvent,
			joinForeignTable: ["event"]
		})
	const options: CompetitionOptions[] | undefined = data
		?.filter((d) => !!d.id && !!d.name)
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		.map((d) => ({ value: d.id, label: d.name! }))
	const submitNewHeat = async () => {
		await postNewHeat({
			body: [
				// eslint-disable-next-line camelcase
				{ name: HeatName, id: uuid4(), phase_id: competitionId }
			]
		})
		await refetch()
		setHeatName("")
		setCompetitionId("")
		toast.success("Successfully added heat")
	}

	return (
		<Grid container spacing="2">
			<Grid item xs={12}>
				<hr></hr>
			</Grid>
			<Grid item xs={12}>
				<h4>Add New Heat</h4>
			</Grid>
			<Grid item xs={12}>
				<TextField
					error={!!HeatName}
					label="New Heat"
					variant="outlined"
					fullWidth
					onChange={(
						event: React.ChangeEvent<HTMLInputElement>
					): void => setHeatName(event.target.value)}
					value={HeatName}
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
				<Button variant="contained" fullWidth onClick={submitNewHeat}>
					Add Heat
				</Button>
			</Grid>
		</Grid>
	)
}

interface CompetitionOptions {
	value: string
	label: string
}
export default HeatsSelector
