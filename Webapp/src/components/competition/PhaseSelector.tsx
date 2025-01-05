import EditNoteIcon from "@mui/icons-material/EditNote"

import RefreshIcon from "@mui/icons-material/Refresh"
import Autocomplete from "@mui/material/Autocomplete"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import Divider from "@mui/material/Divider"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Paper from "@mui/material/Paper"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Skeleton from "@mui/material/Skeleton"
import TextField from "@mui/material/TextField"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
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
	useGetOneByPrimaryKeyPhaseIdGetQuery,
	useInsertManyPhasePostMutation,
	usePartialUpdateOneByPrimaryKeyPhaseIdPatchMutation
} from "../../redux/services/aemsApi"
import { HandlePostResponse } from "../../utils/rtkQueryHelper"
import { SelectScoresheet } from "../judging/ScoresheetSelector"

const PhasesSelector = ({
	showDetailed = false
}: {
	showDetailed?: boolean
}) => {
	const [open, setOpen] = useState<boolean>(false)
	const handleClose = () => setOpen(false)
	const dispatch = useDispatch()
	const selectedEvent = useSelector(getSelectedEvent)
	const setSelectedPhase = (newPhase: string) =>
		dispatch(updateSelectedPhase(newPhase))
	const selectedPhase = useSelector(getSelectedPhase)

	const resetSelectedPhase = () => dispatch(updateSelectedPhase(""))
	const { data, isLoading, isSuccess, refetch } =
		useGetManyByPkFromPhaseEventEventPkIdPhaseGetQuery(
			{
				eventPkId: selectedEvent,
				joinForeignTable: ["event"]
			},
			{ skip: !selectedEvent }
		)

	const onSelect = (event: SelectChangeEvent<string>) => {
		resetSelectedPhase()
		setSelectedPhase(event.target.value)
	}
	if (!selectedEvent) {
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
						<h4>No phases in event</h4>
					</Grid>
					<Grid container spacing="2">
						<AddPhase refetch={refetch} />
					</Grid>
				</Grid>
			</Paper>
		)
	} else if (data) {
		return (
			<Paper sx={{ padding: "1em" }}>
				<EditPhaseDialog
					refetch={refetch}
					open={open}
					handleClose={handleClose}
					selectedPhase={selectedPhase}
				/>
				<Grid container spacing="2">
					{showDetailed ? (
						<Grid item xs={12}>
							<h4>Select a Phase</h4>
						</Grid>
					) : (
						<></>
					)}
					<Grid item xs={12}>
						<FormControl fullWidth={true}>
							<InputLabel>Select Phase</InputLabel>

							<Select
								value={selectedPhase}
								onChange={onSelect}
								variant="outlined"
								startAdornment={
									<IconButton onClick={() => void refetch()}>
										<RefreshIcon />
									</IconButton>
								}
								endAdornment={
									showDetailed && selectedPhase ? (
										<IconButton
											aria-label="toggle password visibility"
											onClick={() => setOpen(true)}
										>
											<Tooltip title="Edit Selected Phase">
												<EditNoteIcon />
											</Tooltip>
										</IconButton>
									) : undefined
								}
							>
								{data.map((Phase) => (
									<MenuItem key={Phase.id} value={Phase.id}>
										{Phase.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					{showDetailed ? (
						<Grid item>
							<AddPhase refetch={refetch} />
						</Grid>
					) : (
						<></>
					)}
				</Grid>
			</Paper>
		)
	} else {
		return <Fragment>No Phases Available</Fragment>
	}
}

const EditPhaseDialog = ({
	open,
	handleClose,
	refetch,
	selectedPhase
}: {
	open: boolean
	handleClose: () => void
	refetch: () => Promise<any>
	selectedPhase: string
}) => {
	const {
		data,
		isSuccess,
		refetch: refetchPhaseInfo
	} = useGetOneByPrimaryKeyPhaseIdGetQuery({
		id: selectedPhase
	})
	const refetchPhaseListAndPhaseInfo = async () => {
		await refetch()
		await refetchPhaseInfo()
	}

	return (
		<Dialog onClose={handleClose} open={open}>
			{isSuccess ? (
				<div
					style={{
						padding: "1em"
					}}
				>
					<Typography variant="h5">Edit Phase</Typography>

					<AddPhase
						refetch={refetchPhaseListAndPhaseInfo}
						existingPhaseData={data}
					/>
				</div>
			) : (
				<Skeleton />
			)}
		</Dialog>
	)
}

// eslint-disable-next-line complexity
const AddPhase = ({
	refetch,
	existingPhaseData
}: {
	refetch: () => Promise<any>
	existingPhaseData?: ExistingPhaseData
}) => {
	const [phaseName, setPhaseName] = useState<string>(
		existingPhaseData?.name ?? ""
	)
	const [numberOfRuns, setNumberOfRuns] = useState<number>(
		existingPhaseData?.number_of_runs ?? 3
	)
	const [numberOfJudges, setNumberOfJudges] = useState<number>(
		existingPhaseData?.number_of_judges ?? 3
	)
	const [numberOfScoringRuns, setNumberOfScoringRuns] = useState<number>(
		existingPhaseData?.number_of_runs_for_score ?? 2
	)
	const [selectedScoresheet, setSelectedScoresheet] = useState<string>(
		existingPhaseData?.scoresheet ?? ""
	)
	const selectedCompetition = useSelector(getSelectedCompetition)
	const selectedEvent = useSelector(getSelectedEvent)
	const [eventId, setEventId] = useState<string>(selectedEvent)
	const [postNewPhase] = useInsertManyPhasePostMutation()
	const [updateExistingPhase] =
		usePartialUpdateOneByPrimaryKeyPhaseIdPatchMutation()
	const { data } =
		useGetManyByPkFromEventCompetitionCompetitionPkIdEventGetQuery({
			competitionPkId: selectedCompetition,
			joinForeignTable: ["competition"]
		})
	const options: CompetitionOptions[] | undefined = data
		?.filter((d) => !!d.id && !!d.name)

		.map((d) => ({ value: d.id, label: d.name }))
	const submitNewPhase = async () => {
		if (!existingPhaseData) {
			HandlePostResponse(
				await postNewPhase({
					body: [
						// eslint-disable-next-line camelcase
						{
							name: phaseName,
							id: uuid4(),
							event_id: eventId,
							number_of_runs: numberOfRuns,
							number_of_runs_for_score: numberOfScoringRuns,
							scoresheet: selectedScoresheet,
							number_of_judges: numberOfJudges
						}
					]
				})
			)
			setPhaseName("")
		} else {
			HandlePostResponse(
				await updateExistingPhase({
					id: existingPhaseData.id,
					bodyPartialUpdateOneByPrimaryKeyPhaseIdPatch:
						// eslint-disable-next-line camelcase
						{
							name: phaseName,
							event_id: eventId,
							number_of_runs: numberOfRuns,
							number_of_runs_for_score: numberOfScoringRuns,
							scoresheet: selectedScoresheet,
							number_of_judges: numberOfJudges
						}
				})
			)
		}
		await refetch()
	}

	const disableSubmit =
		!phaseName ||
		!eventId ||
		!numberOfJudges ||
		!numberOfRuns ||
		!numberOfJudges ||
		!selectedScoresheet ||
		numberOfScoringRuns > numberOfRuns

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Divider sx={{ margin: "0.5em" }} />
			</Grid>
			{!existingPhaseData && (
				<Grid item xs={12}>
					<h4>{"Add New Phase"}</h4>
				</Grid>
			)}
			<Grid item xs={12}>
				<TextField
					error={!phaseName}
					label="New Phase"
					variant="outlined"
					fullWidth
					onChange={(
						event: React.ChangeEvent<HTMLInputElement>
					): void => setPhaseName(event.target.value)}
					value={phaseName}
				/>
			</Grid>
			<Grid item xs={12}>
				{options ? (
					<Autocomplete
						// error={!!phaseId}
						options={options}
						value={options.find((s) => s.value === eventId)}
						inputValue={
							options.find((s) => s.value === eventId)?.label ??
							""
						}
						fullWidth
						renderInput={(params) => (
							<TextField {...params} label="Event" />
						)}
						onChange={(event, newValue) => {
							if (newValue) {
								setEventId(newValue.value)
							}
						}}
					/>
				) : (
					<> </>
				)}
			</Grid>
			<Grid item xs>
				<SelectScoresheet
					selectedScoresheet={selectedScoresheet}
					setSelectedScoresheet={setSelectedScoresheet}
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					label="Number of Runs"
					variant="outlined"
					fullWidth
					type="number"
					onChange={(
						event: React.ChangeEvent<HTMLInputElement>
					): void =>
						setNumberOfRuns(event.target.value as unknown as number)
					}
					value={numberOfRuns}
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					label="Number of Scoring Runs"
					variant="outlined"
					fullWidth
					type="number"
					error={numberOfScoringRuns > numberOfRuns}
					helperText={
						numberOfScoringRuns > numberOfRuns &&
						`Cannot have more scoring runs per paddler than total runs (${numberOfRuns})`
					}
					onChange={(
						event: React.ChangeEvent<HTMLInputElement>
					): void =>
						setNumberOfScoringRuns(
							event.target.value as unknown as number
						)
					}
					value={numberOfScoringRuns}
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					label="Number of Judges"
					variant="outlined"
					fullWidth
					type="number"
					onChange={(
						event: React.ChangeEvent<HTMLInputElement>
					): void =>
						setNumberOfJudges(
							event.target.value as unknown as number
						)
					}
					value={numberOfJudges}
				/>
			</Grid>
			<Grid item xs={12}>
				<Button
					variant="contained"
					fullWidth
					onClick={() => void submitNewPhase()}
					disabled={disableSubmit}
				>
					{existingPhaseData ? "Edit Phase" : "Add Phase"}
				</Button>
			</Grid>
		</Grid>
	)
}

interface ExistingPhaseData {
	name: string
	id: string
	event_id: string
	number_of_runs?: number
	number_of_runs_for_score?: number
	scoresheet: string
	number_of_judges?: number
}
interface CompetitionOptions {
	value: string
	label: string
}
export default PhasesSelector
