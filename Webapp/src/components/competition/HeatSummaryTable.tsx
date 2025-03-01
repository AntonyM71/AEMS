

import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
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
import Typography from "@mui/material/Typography"
import {
	DataGrid,
	GridColDef,
	GridRenderCellParams,
	GridRowsProp,
	GridTreeNodeWithRender
} from "@mui/x-data-grid"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { v4 } from "uuid"
import {
	getSelectedCompetition,
	getSelectedHeat
} from "../../redux/atoms/competitions"
import {
	useDeleteManyByQueryScoredmovesDeleteMutation,
	useGetHeatInfoGetHeatInfoHeatIdGetQuery,
	useGetManyEventGetQuery,
	useGetManyHeatGetQuery,
	useGetOneByPrimaryKeyHeatIdGetQuery,
	useInsertManyAthletePostMutation,
	useInsertManyAthleteheatPostMutation,
	usePartialUpdateOneByPrimaryKeyAthleteIdPatchMutation,
	usePartialUpdateOneByPrimaryKeyAthleteheatIdPatchMutation
} from "../../redux/services/aemsApi"
import { HandlePostResponse } from "../../utils/rtkQueryHelper"

export const downloadHeatSummaryPDF = async (heats: string[]) => {
	const searchParams = new URLSearchParams()
	heats.map((h) => {
		searchParams.append("heat_ids", h)
	})
	const response = await axios.get(
		`${
			process.env.NEXT_PUBLIC_API_URL_DEV || "/api/"
		}heat_pdf?${searchParams.toString()}`,
		{
			method: "GET",
			responseType: "blob"
		}
	)
	const file = new Blob([response.data], {
		type: "application/pdf"
	})
	// Build a URL from the file
	const fileURL = URL.createObjectURL(file)
	// Open the URL on new Window
	const pdfWindow = window.open()
	if (pdfWindow) {
		pdfWindow.location.href = fileURL
	}
}
export const downloadHeatResultsPDF = async (heats: string) => {
	const searchParams = new URLSearchParams()

	searchParams.append("heat_id", heats)

	const response = await axios.get(
		`${
			process.env.NEXT_PUBLIC_API_URL_DEV || "/api/"
		}heat_results_pdf?${searchParams.toString()}`,
		{
			method: "GET",
			responseType: "blob"
		}
	)
	const file = new Blob([response.data], {
		type: "application/pdf"
	})
	// Build a URL from the file
	const fileURL = URL.createObjectURL(file)
	// Open the URL on new Window
	const pdfWindow = window.open()
	if (pdfWindow) {
		pdfWindow.location.href = fileURL
	}
}
export const HeatSummaryTable = ({
	showAddAthletes = false
}: {
	showAddAthletes?: boolean
}) => {
	const selectedHeat = useSelector(getSelectedHeat)
	const { data, isLoading } = useGetOneByPrimaryKeyHeatIdGetQuery(
		{
			id: selectedHeat
		},
		{ skip: !selectedHeat }
	)

	if (data && selectedHeat && !isLoading) {
		return (
			<Paper sx={{ padding: "1em" }}>
				<Grid container spacing={1} alignItems="stretch">
					<Grid size={12}>
						<Grid
							container
							justifyContent="space-between"
							alignItems="center"
						>
							<Grid>
								<Typography variant="h6">{`Heat: ${
									data.name || ""
								}`}</Typography>
							</Grid>
							<Grid sx={{ padding: "0.5em" }}>
								<Stack spacing={2} direction="row">
									<Button
										variant="contained"
										color="info"
										// eslint-disable-next-line @typescript-eslint/no-misused-promises
										onClick={() =>
											downloadHeatResultsPDF(selectedHeat)
										}
									>
										Heat Results PDF
									</Button>

									<Button
										variant="contained"
										color="info"
										// eslint-disable-next-line @typescript-eslint/no-misused-promises
										onClick={() =>
											downloadHeatSummaryPDF([
												selectedHeat
											])
										}
									>
										Heat Summary PDF
									</Button>
								</Stack>
							</Grid>
							<Grid size={12}>
								<HeatAthleteTable showAdmin={showAddAthletes} />
							</Grid>
						</Grid>
					</Grid>
					{showAddAthletes && (
						<>
							<Grid size={12}>
								<Typography variant="h6">
									Add Athlete to Current Heat
								</Typography>
							</Grid>

							<Grid size={12}>
								<AddAthletesToHeat />
							</Grid>
						</>
					)}
				</Grid>
			</Paper>
		)
	} else if (isLoading) {
		return <Skeleton variant="rectangular" data-testid="skeleton" />
	}

	return <h4>Something went wrong</h4>
}

// eslint-disable-next-line complexity
export const HeatAthleteTable = ({
	showAdmin = false
}: {
	showAdmin?: boolean
}) => {
	const selectedHeat = useSelector(getSelectedHeat)
	const [open, setOpen] = useState<boolean>(false)
	const handleClose = () => setOpen(false)
	const [rowData, setRowData] = useState<{
		id?: string
		athlete_heat_id?: string
		first_name?: string
		last_name?: string
		bib?: number
		phase_id?: string
		athlete_id?: string
		event_name?: string
	}>({})
	const editCol = showAdmin
		? [
				{
					field: "action",
					headerName: "Admin",
					sortable: false,
					renderCell: (
						params: GridRenderCellParams<
							any,
							any,
							any,
							GridTreeNodeWithRender
						>
					) => {
						const onClick = () => {
							setRowData(params.api.getRow(params.id) ?? {})
							setOpen(true)
						}

						return (
							<Button
								onClick={onClick}
								data-testid="edit-athlete-button"
							>
								Edit
							</Button>
						)
					}
				}
		  ]
		: []
	const columns: GridColDef[] = [
		// { field: "id", headerName: "ID"},
		{ field: "first_name", headerName: "First Name" },
		{ field: "last_name", headerName: "Last Name" },
		{ field: "bib", headerName: "Bib Number" },
		{ field: "event_name", headerName: "Event Name", width: 200 },
		...editCol
	]
	const athletes = useGetHeatInfoGetHeatInfoHeatIdGetQuery(
		{
			heatId: selectedHeat
		},
		{ skip: !selectedHeat }
	)

	const rows: GridRowsProp = athletes?.data
		? athletes.data.map((a) => ({ id: v4(), ...a }))
		: []

	if (athletes.isLoading) {
		return <Skeleton variant="rectangular" />
	} else if (rows) {
		return (
			<>
				<EditAthletDialog
					open={open}
					handleClose={handleClose}
					athlete_id={rowData.athlete_id ?? ""}
					first_name={rowData.first_name ?? ""}
					last_name={rowData.last_name ?? ""}
					bib={rowData.bib ?? 1}
					phase_id={rowData.phase_id ?? ""}
					athlete_heat_id={rowData.athlete_heat_id ?? ""}
				/>
				<DataGrid
					sx={{ height: "50vh" }}
					rows={rows}
					columns={columns}
					disableRowSelectionOnClick
				/>
			</>
		)
	}

	return (
		<div>
			<h4>No athletes in heat</h4>
		</div>
	)
}

export const EditAthletDialog = ({
	open,
	handleClose,
	athlete_id,
	first_name,
	last_name,
	bib,
	phase_id,
	athlete_heat_id
}: {
	open: boolean
	handleClose: () => void
	athlete_id?: string
	first_name?: string
	last_name?: string
	bib?: number
	phase_id?: string
	athlete_heat_id?: string
}) => (
	<Dialog onClose={handleClose} open={open}>
		<div
			style={{
				padding: "1em"
			}}
		>
			<Typography variant="h5">Edit Athlete</Typography>
			<Divider sx={{ margin: "1em" }} />
			<AddAthletesToHeat
				showHeat={true}
				last_name={last_name}
				first_name={first_name}
				athlete_heat_id={athlete_heat_id}
				athlete_id={athlete_id}
				bib={bib}
				phase_id={phase_id}
				handleClose={handleClose}
			/>
		</div>
	</Dialog>
)

// eslint-disable-next-line complexity
export const AddAthletesToHeat = (props: {
	athlete_id?: string
	first_name?: string
	last_name?: string
	bib?: number
	phase_id?: string
	athlete_heat_id?: string
	showHeat?: boolean
	handleClose?: () => void
}) => {
	const allowSetLastPhaseRank =
		process.env.NEXT_PUBLIC_ALLOW_SET_LAST_PHASE_RANK === "true"
	const selectedHeat = useSelector(getSelectedHeat)
	const selectedCompetition = useSelector(getSelectedCompetition)
	const [athleteFirstName, setAthleteFirstName] = useState<string>(
		props.first_name ?? ""
	)
	const [selectedPhase, setSelectedPhase] = useState<string>(
		props.phase_id ?? ""
	)
	const [newHeat, setNewHeat] = useState<string>(selectedHeat ?? "")
	useEffect(() => {
		setNewHeat(selectedHeat)
	}, [selectedHeat])
	const athletes = useGetHeatInfoGetHeatInfoHeatIdGetQuery(
		{
			heatId: selectedHeat
		},
		{ skip: !selectedHeat }
	)
	const [athleteLastName, setAthleteLastName] = useState<string>(
		props.last_name ?? ""
	)
	const [bibNumber, setBibNumber] = useState<number>(Number(props.bib ?? 1))

	const [lastPhaseRank, setLastPhaseRank] = useState<number | undefined>(
		undefined
	)
	const { data, isSuccess } = useGetManyEventGetQuery({
		competitionIdList: [selectedCompetition],
		competitionIdListComparisonOperator: "Equal",
		joinForeignTable: ["phase"]
	})
	const { data: heatData, isSuccess: heatIsSuccess } = useGetManyHeatGetQuery(
		{
			competitionIdList: [selectedCompetition],
			competitionIdListComparisonOperator: "Equal"
		}
	)
	const onSelectPhase = (event: SelectChangeEvent<string>) => {
		setSelectedPhase(event.target.value)
	}
	const onSelectHeat = (event: SelectChangeEvent<string>) => {
		setNewHeat(event.target.value)
	}

	const [makeAthlete] = useInsertManyAthletePostMutation()
	const [makeAthleteHeat] = useInsertManyAthleteheatPostMutation()
	const [updateAthlete] =
		usePartialUpdateOneByPrimaryKeyAthleteIdPatchMutation()
	const [updateAthleteHeat] =
		usePartialUpdateOneByPrimaryKeyAthleteheatIdPatchMutation()
	const [deleteOldMoves] = useDeleteManyByQueryScoredmovesDeleteMutation()
	// eslint-disable-next-line complexity
	const handleNewPaddlerSubmit = async () => {
		if (athleteFirstName && athleteLastName && bibNumber) {
			const athleteHeatId = props.athlete_heat_id ?? v4()
			const athleteId = props.athlete_id ?? v4()
			if (props.athlete_id && props.athlete_heat_id) {
				HandlePostResponse(
					await updateAthlete({
						id: athleteId,
						bodyPartialUpdateOneByPrimaryKeyAthleteIdPatch: {
							first_name: athleteFirstName,
							last_name: athleteLastName,
							bib: bibNumber.toString()
						}
					}),
					"Updated Athlete"
				)

				HandlePostResponse(
					await updateAthleteHeat({
						id: athleteHeatId,
						bodyPartialUpdateOneByPrimaryKeyAthleteheatIdPatch: {
							heat_id: newHeat,
							athlete_id: athleteId,
							phase_id: selectedPhase,
							last_phase_rank: Number(lastPhaseRank ?? undefined)
						}
					}),
					"Updated Athlete Competition Information"
				)
				if (
					selectedHeat !== newHeat ||
					selectedPhase !== props.phase_id
				) {
					HandlePostResponse(
						await deleteOldMoves({
							heatIdList: [selectedHeat],
							heatIdListComparisonOperator: "Equal",
							athleteIdList: [athleteId],
							athleteIdListComparisonOperator: "Equal"
						})
					)
				}
			} else {
				HandlePostResponse(
					await makeAthlete({
						body: [
							{
								id: athleteId,
								first_name: athleteFirstName,
								last_name: athleteLastName,
								bib: bibNumber.toString()
							}
						]
					}),
					"Created Athlete"
				)
				HandlePostResponse(
					await makeAthleteHeat({
						body: [
							{
								id: props.athlete_heat_id ?? v4(),
								heat_id: newHeat,
								athlete_id: athleteId,
								phase_id: selectedPhase,
								last_phase_rank: Number(
									lastPhaseRank ?? undefined
								)
							}
						]
					}),
					"Added Athlete to Heat"
				)
			}
			await athletes.refetch()
			if (props.handleClose) {
				props.handleClose()
			}
			setAthleteFirstName("")
			setAthleteLastName("")
			setBibNumber(Number(bibNumber ?? 0) + 1)
		} else {
			toast.error("Please fill in all the fields")
		}
	}
	if (!isSuccess || !heatIsSuccess) {
		return (
			<h4 data-testid="server-error">
				Failed to get data from server
				{!isSuccess && " (events)"}
				{!heatIsSuccess && " (heats)"}
			</h4>
		)
	}
	const colWidth = props.athlete_id && props.athlete_heat_id ? 12 : 2
	const phases = data
		? data
				.map(
					(e) =>
						e.phase_foreign?.map((p) => ({
							...p,
							eventName: e.name
						})) || []
				)
				.flat()
		: []

	return (
		<Grid container spacing={1} alignItems="stretch">
			{props.athlete_id && props.athlete_heat_id && (
				<Grid size={colWidth}>
					{" "}
					<Alert severity="info">
						Warning: Moving an athlete between heats or phases will
						delete any previously scored moves for that athlete in
						that heat/phase{" "}
					</Alert>
				</Grid>
			)}
			<Grid size={colWidth}>
				<TextField
					label="First Name"
					fullWidth
					value={athleteFirstName}
					onChange={(e) => setAthleteFirstName(e.target.value)}
				/>
			</Grid>
			<Grid size={colWidth}>
				<TextField
					label="Last Name"
					fullWidth
					value={athleteLastName}
					onChange={(e) => setAthleteLastName(e.target.value)}
				/>
			</Grid>
			<Grid size={colWidth}>
				<FormControl fullWidth={true}>
					<InputLabel>Select Phase</InputLabel>
					<Select
						value={selectedPhase}
						fullWidth
						onChange={onSelectPhase}
						variant="outlined"
					>
						{phases.map((phase) => (
							<MenuItem key={phase.id} value={phase.id}>
								{(phase.eventName ?? "") +
									" - " +
									(phase.name ?? "")}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
			{props.showHeat && (
				<Grid size={colWidth}>
					<FormControl fullWidth={true}>
						<InputLabel id="heat-select-label">
							Select Heat
						</InputLabel>
						<Select
							labelId="heat-select-label"
							id="heat-select"
							value={newHeat}
							onChange={onSelectHeat}
							variant="outlined"
							fullWidth
							autoWidth
							data-testid="heat-select"
						>
							{heatData
								? heatData.map((heat) => (
										<MenuItem key={heat.id} value={heat.id}>
											{heat.name}
										</MenuItem>
								  ))
								: null}
						</Select>
					</FormControl>
				</Grid>
			)}
			<Grid size={colWidth}>
				<TextField
					label="Bib Number"
					variant="outlined"
					fullWidth
					type="number"
					onChange={(
						event: React.ChangeEvent<HTMLInputElement>
					): void =>
						setBibNumber(event.target.value as unknown as number)
					}
					value={bibNumber}
				/>
			</Grid>
			{allowSetLastPhaseRank && (
				<Grid size={colWidth}>
					<TextField
						label="Last Phase Rank"
						variant="outlined"
						fullWidth
						type="number"
						onChange={(
							event: React.ChangeEvent<HTMLInputElement>
						): void =>
							setLastPhaseRank(
								event.target.value
									? (event.target.value as unknown as number)
									: undefined
							)
						}
						value={lastPhaseRank}
					/>
				</Grid>
			)}
			<Grid size={colWidth}>
				<Button
					onClick={() => void handleNewPaddlerSubmit()}
					variant="contained"
					fullWidth
					sx={{ height: "100%" }}
				>
					{props.athlete_id && props.athlete_heat_id
						? "Edit Athlete"
						: "Add Athlete"}
				</Button>
			</Grid>
		</Grid>
	)
}

interface PhaseListType {
	value: string
	name: string
}
