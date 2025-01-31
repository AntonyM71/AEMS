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
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import { useState } from "react"
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
import { RefreshButton } from "./RefreshIconButton"

const HeatSelector = ({ showDetailed = false }: { showDetailed?: boolean }) => {
	const dispatch = useDispatch()
	const selectedCompetition = useSelector(getSelectedCompetition)
	const setSelectedHeat = (newHeat: string) =>
		dispatch(updateSelectedHeat(newHeat))
	const selectedHeat = useSelector(getSelectedHeat)

	const { data, isLoading, isError, refetch } = useGetManyHeatGetQuery(
		{
			competitionIdList: [selectedCompetition],
			competitionIdListComparisonOperator: "Equal"
		},
		{
			skip: !selectedCompetition,
			refetchOnMountOrArgChange: true
		}
	)

	const setCurrentPaddler = (newPaddler: number) =>
		dispatch(updatePaddler(newPaddler))
	const setSelectedRun = (newRun: number) => dispatch(updateRun(newRun))

	const onSelect = (event: SelectChangeEvent<string>) => {
		const newHeat = event.target.value
		setSelectedHeat(newHeat)
		setCurrentPaddler(0)
		setSelectedRun(0)
	}

	if (!selectedCompetition) {
		return <></>
	}

	if (isLoading) {
		return <Skeleton variant="rectangular" data-testid="skeleton" />
	}

	if (isError) {
		return (
			<Paper sx={{ padding: "1em" }}>
				<h4>Failed to get data from the server</h4>
			</Paper>
		)
	}

	if (!data) {
		return (
			<Paper sx={{ padding: "1em", height: "100%" }}>
				<Stack
					direction="row"
					sx={{
						alignItems: "center"
					}}
				>
					<RefreshButton refetch={refetch} />
					<h4>No Heats in Competition</h4>
				</Stack>

				<AddHeat refetch={refetch} />
			</Paper>
		)
	} else {
		return (
			<Paper sx={{ padding: "1em" }}>
				<Grid container spacing="2">
					{showDetailed ? (
						<Grid item xs={12}>
							<h4>Select a Heat</h4>
						</Grid>
					) : (
						<></>
					)}
					<Grid item xs={12}>
						<FormControl fullWidth={true}>
							<InputLabel id="heat-select-label">
								Select Heat
							</InputLabel>
							<Select
								value={selectedHeat}
								onChange={onSelect}
								variant="outlined"
								labelId="heat-select-label"
								id="heat-select"
								label="Select Heat"
								data-testid="heat-select"
								inputProps={{
									"aria-label": "Select Heat"
								}}
								startAdornment={
									<RefreshButton refetch={refetch} />
								}
							>
								{data.map((heat) =>
									heat.name ? (
										<MenuItem
											key={heat.id}
											value={heat.id}
											data-testid={`heat-option-${heat.name
												.toLowerCase()
												.replace(/\s+/g, "-")}`}
										>
											{heat.name}
										</MenuItem>
									) : null
								)}
							</Select>
						</FormControl>
					</Grid>
					{showDetailed ? (
						<>
							<Grid item>
								<AddHeat refetch={refetch} />
							</Grid>
						</>
					) : (
						<></>
					)}
				</Grid>
			</Paper>
		)
	}
}

const AddHeat = ({
	refetch
}: {
	refetch: ReturnType<typeof useGetManyHeatGetQuery>["refetch"]
}) => {
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
		try {
			const response = await postNewHeat({
				body: [
					{
						name: heatName,
						id: uuid4(),
						competition_id: competitionId
					}
				]
			})

			if ("error" in response) {
				throw new Error("Failed to add heat")
			}

			HandlePostResponse(response)
			setHeatName("")
			await refetch()
		} catch (error) {
			console.error("Error adding heat:", error)
		}
	}

	return (
		<Grid container spacing="2">
			<Grid item xs={12}>
				<Divider sx={{ margin: "0.5em" }} />
			</Grid>
			<Grid item xs={12}>
				<h4>Add New Heat</h4>
			</Grid>
			<Grid item xs={12}>
				<TextField
					error={!heatName}
					label="New Heat"
					variant="outlined"
					fullWidth
					data-testid="new-heat-input"
					onChange={(
						event: React.ChangeEvent<HTMLInputElement>
					): void => setHeatName(event.target.value)}
					value={heatName}
				/>
			</Grid>
			<Grid item xs={12}>
				{options ? (
					<Autocomplete
						options={options}
						value={
							options.find((s) => s.value === competitionId) ??
							null
						}
						inputValue={
							options.find((s) => s.value === competitionId)
								?.label ?? ""
						}
						fullWidth
						renderInput={(params) => (
							<TextField
								{...params}
								label="Competition"
								data-testid="competition-input"
							/>
						)}
						onChange={(event, newValue) => {
							if (newValue) {
								setCompetitionId(newValue.value)
							}
						}}
					/>
				) : (
					<></>
				)}
			</Grid>
			<Grid item xs={12}>
				<Button
					variant="contained"
					fullWidth
					onClick={() => void submitNewHeat()}
					disabled={!heatName}
					data-testid="add-heat-button"
				>
					Add Heat
				</Button>
			</Grid>
		</Grid>
	)
}

export default HeatSelector

interface CompetitionOptions {
	value: string
	label: string
}
