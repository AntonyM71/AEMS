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
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuid4 } from "uuid"
import {
	getSelectedCompetition,
	getSelectedHeat,
	updateSelectedHeat
} from "../../redux/atoms/competitions"
import { updatePaddler, updateRun } from "../../redux/atoms/scoring"
import {
	useGetManyCompetitionGetQuery,
	useGetManyHeatGetQuery,
	useInsertManyHeatPostMutation
} from "../../redux/services/aemsApi"
import { HandlePostResponse } from "../../utils/rtkQueryHelper"

const HeatsSelector = ({
	showDetailed = false
}: {
	showDetailed?: boolean
}) => {
	const dispatch = useDispatch()
	const selectedCompetition = useSelector(getSelectedCompetition)
	const setSelectedHeat = (newHeat: string) =>
		dispatch(updateSelectedHeat(newHeat))
	const selectedHeat = useSelector(getSelectedHeat)

	const { data, isLoading, isSuccess, refetch } = useGetManyHeatGetQuery(
		{
			competitionIdList: [selectedCompetition],
			competitionIdListComparisonOperator: "Equal"
		},
		{ skip: !selectedCompetition }
	)
	const setCurrentPaddler = (newPaddler: number) =>
		dispatch(updatePaddler(newPaddler))
	const setselectedRun = (newRun: number) => dispatch(updateRun(newRun))
	const onSelect = (event: SelectChangeEvent<string>) => {
		setSelectedHeat(event.target.value)
		setCurrentPaddler(0)
		setselectedRun(0)
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
			<Paper sx={{ padding: "1em", height: "100%" }}>
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
	} else if (data) {
		return (
			<Paper sx={{ padding: "1em" }}>
				<Grid container spacing="2">
					{showDetailed ? (
						<Grid item xs={12}>
							<h4>Select an Heat</h4>
						</Grid>
					) : (
						<></>
					)}
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
					{showDetailed ? (
						<Grid item>
							<AddHeat refetch={refetch} />
						</Grid>
					) : (
						<></>
					)}
				</Grid>
			</Paper>
		)
	} else {
		return <Fragment>No Heats Available</Fragment>
	}
}

const AddHeat = ({ refetch }: { refetch: () => Promise<any> }) => {
	const [heatName, setHeatName] = useState<string>("")
	const selectedCompetition = useSelector(getSelectedCompetition)
	const [competitionId, setCompetitionId] =
		useState<string>(selectedCompetition)
	const [postNewHeat] = useInsertManyHeatPostMutation()
	const { data } = useGetManyCompetitionGetQuery({})

	const options: CompetitionOptions[] | undefined = data
		?.filter((d) => !!d.id && !!d.name)
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		.map((d) => ({ value: d.id!, label: d.name! }))

	const submitNewHeat = async () => {
		HandlePostResponse(
			await postNewHeat({
				body: [
					// eslint-disable-next-line camelcase
					{
						name: heatName,
						id: uuid4(),
						competition_id: competitionId
					}
				]
			})
		)
		await refetch()
		setHeatName("")
		setCompetitionId("")
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
					error={!!heatName}
					label="New Heat"
					variant="outlined"
					fullWidth
					onChange={(
						event: React.ChangeEvent<HTMLInputElement>
					): void => setHeatName(event.target.value)}
					value={heatName}
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
				<Button
					variant="contained"
					fullWidth
					onClick={() => void submitNewHeat()}
				>
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
