import EditNoteIcon from "@mui/icons-material/EditNote"

import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid2"
import IconButton from "@mui/material/IconButton"
import Skeleton from "@mui/material/Skeleton"
import TextField from "@mui/material/TextField"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import { useState } from "react"
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
import { IdNameAutocomplete } from "./IdNameAutocomplete"
import { SelectorPanel } from "./SelectorPanel"
import { SelectScoresheet } from "./ScoresheetSelector"

const PhasesSelector = ({
	showDetailed = false
}: {
	showDetailed?: boolean
}) => {
	const [open, setOpen] = useState<boolean>(false)
	const handleClose = () => setOpen(false)
	const dispatch = useDispatch()
	const selectedEvent = useSelector(getSelectedEvent)
	const selectedPhase = useSelector(getSelectedPhase)

	const { data, isLoading, isSuccess, refetch } =
		useGetManyByPkFromPhaseEventEventPkIdPhaseGetQuery(
			{
				eventPkId: selectedEvent,
				joinForeignTable: ["event"]
			},
			{ skip: !selectedEvent, refetchOnMountOrArgChange: true }
		)

	const onSelect = (newPhase: string) => {
		dispatch(updateSelectedPhase(""))
		dispatch(updateSelectedPhase(newPhase))
	}
	if (!selectedEvent) {
		return <></>
	}
	if (isLoading) {
		return (
			<Skeleton
				variant="rectangular"
				data-testid="phase-selector-loading"
			/>
		)
	}

	return (
		<>
			<EditPhaseDialog
				refetch={refetch}
				open={open}
				handleClose={handleClose}
				selectedPhase={selectedPhase}
			/>
			<SelectorPanel
				entityLabel="Phase"
				items={(data ?? []).map((phase) => ({
					id: phase.id ?? "",
					name: phase.name ?? ""
				}))}
				selectedValue={selectedPhase}
				onSelect={onSelect}
				isLoading={false}
				isError={!isSuccess}
				refetch={refetch}
				showDetailed={showDetailed}
				emptyMessage="No phases in event"
				selectTestId="phase-select"
				addForm={<AddPhase refetch={refetch} />}
				endAdornment={
					showDetailed && selectedPhase ? (
						<Tooltip title="Edit Selected Phase">
							<IconButton
								aria-label="Edit selected phase"
								onClick={() => setOpen(true)}
							>
								<EditNoteIcon />
							</IconButton>
						</Tooltip>
					) : undefined
				}
			/>
		</>
	)
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
	} = useGetOneByPrimaryKeyPhaseIdGetQuery(
		{
			id: selectedPhase
		},
		{ skip: !selectedPhase }
	)
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
					<Typography
						variant="h5"
						data-testid="edit-phase-dialog-title"
					>
						Edit Phase
					</Typography>

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

const initialPhaseFields = (existing: ExistingPhaseData = {}) => ({
	name: existing.name ?? "",
	scoresheet: existing.scoresheet ?? "",
	...initialRunCounts(existing)
})

const initialRunCounts = (existing: ExistingPhaseData) => ({
	numberOfRuns: existing.number_of_runs ?? 3,
	numberOfJudges: existing.number_of_judges ?? 3,
	numberOfScoringRuns: existing.number_of_runs_for_score ?? 2
})

const NumberField = ({
	label,
	testId,
	value,
	onChange,
	error = false,
	helperText
}: {
	label: string
	testId: string
	value: number
	onChange: (value: number) => void
	error?: boolean
	helperText?: string
}) => (
	<TextField
		label={label}
		variant="outlined"
		fullWidth
		type="number"
		data-testid={testId}
		error={error}
		helperText={error && helperText}
		onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
			onChange(Number(event.target.value))
		}
		value={value}
	/>
)

const AddPhase = ({
	refetch,
	existingPhaseData
}: {
	refetch: () => Promise<any>
	existingPhaseData?: ExistingPhaseData
}) => {
	const initial = initialPhaseFields(existingPhaseData)
	const [phaseName, setPhaseName] = useState<string>(initial.name)
	const [numberOfRuns, setNumberOfRuns] = useState<number>(
		initial.numberOfRuns
	)
	const [numberOfJudges, setNumberOfJudges] = useState<number>(
		initial.numberOfJudges
	)
	const [numberOfScoringRuns, setNumberOfScoringRuns] = useState<number>(
		initial.numberOfScoringRuns
	)
	const [selectedScoresheet, setSelectedScoresheet] = useState<string>(
		initial.scoresheet
	)
	const selectedCompetition = useSelector(getSelectedCompetition)
	const selectedEvent = useSelector(getSelectedEvent)
	const [eventId, setEventId] = useState<string>(selectedEvent || "")
	const { data: events } =
		useGetManyByPkFromEventCompetitionCompetitionPkIdEventGetQuery({
			competitionPkId: selectedCompetition,
			joinForeignTable: ["competition"]
		})
	const [postNewPhase] = useInsertManyPhasePostMutation()
	const [updateExistingPhase] =
		usePartialUpdateOneByPrimaryKeyPhaseIdPatchMutation()
	const phaseFields = {
		name: phaseName,
		event_id: eventId,
		number_of_runs: numberOfRuns,
		number_of_runs_for_score: numberOfScoringRuns,
		scoresheet: selectedScoresheet,
		number_of_judges: numberOfJudges
	}

	const submitNewPhase = async () => {
		if (!existingPhaseData) {
			HandlePostResponse(
				await postNewPhase({
					phases: [{ ...phaseFields, id: uuid4() }]
				})
			)
			setPhaseName("")
		} else {
			HandlePostResponse(
				await updateExistingPhase({
					id: existingPhaseData.id ?? "",
					phaseUpdate: phaseFields
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
		!selectedScoresheet ||
		numberOfScoringRuns > numberOfRuns

	return (
		<Grid container spacing={2}>
			<Grid size={12}>
				<Divider sx={{ margin: "0.5em" }} />
			</Grid>
			{!existingPhaseData && (
				<Grid size={12}>
					<h4>{"Add New Phase"}</h4>
				</Grid>
			)}
			<Grid size={12}>
				<TextField
					error={!phaseName}
					label={existingPhaseData ? "Phase name" : "New Phase"}
					variant="outlined"
					fullWidth
					data-testid="edit-phase-name-input"
					onChange={(
						event: React.ChangeEvent<HTMLInputElement>
					): void => setPhaseName(event.target.value)}
					value={phaseName}
				/>
			</Grid>
			<Grid size={12}>
				<IdNameAutocomplete
					items={events}
					value={eventId}
					onChange={setEventId}
					label="Event"
				/>
			</Grid>
			<Grid size="grow">
				<SelectScoresheet
					selectedScoresheet={selectedScoresheet}
					setSelectedScoresheet={setSelectedScoresheet}
				/>
			</Grid>
			<Grid size={12}>
				<NumberField
					label="Number of Runs"
					testId="number-of-runs-input"
					value={numberOfRuns}
					onChange={setNumberOfRuns}
				/>
			</Grid>
			<Grid size={12}>
				<NumberField
					label="Number of Scoring Runs"
					testId="number-of-scoring-runs-input"
					value={numberOfScoringRuns}
					onChange={setNumberOfScoringRuns}
					error={numberOfScoringRuns > numberOfRuns}
					helperText={`Cannot have more scoring runs per paddler than total runs (${numberOfRuns})`}
				/>
			</Grid>
			<Grid size={12}>
				<NumberField
					label="Number of Judges"
					testId="number-of-judges-input"
					value={numberOfJudges}
					onChange={setNumberOfJudges}
				/>
			</Grid>
			<Grid size={12}>
				<Button
					variant="contained"
					fullWidth
					data-testid="submit-phase-button"
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
	name?: string
	id?: string
	event_id?: string
	number_of_runs?: number
	number_of_runs_for_score?: number
	scoresheet?: string
	number_of_judges?: number
}
export default PhasesSelector
