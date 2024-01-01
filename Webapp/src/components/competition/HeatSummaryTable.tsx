/* eslint-disable camelcase */

import { Dialog, Divider, Typography } from "@mui/material"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Paper from "@mui/material/Paper"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Skeleton from "@mui/material/Skeleton"
import TextField from "@mui/material/TextField"
import {
	DataGrid,
	GridColDef,
	GridRenderCellParams,
	GridRowsProp,
	GridTreeNodeWithRender
} from "@mui/x-data-grid"
import { flatten } from "lodash"
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
	useGetManyAthleteheatGetQuery,
	useGetManyEventGetQuery,
	useGetManyHeatGetQuery,
	useGetOneByPrimaryKeyHeatIdGetQuery,
	useInsertManyAthletePostMutation,
	useInsertManyAthleteheatPostMutation,
	usePartialUpdateOneByPrimaryKeyAthleteIdPatchMutation,
	usePartialUpdateOneByPrimaryKeyAthleteheatIdPatchMutation
} from "../../redux/services/aemsApi"
import { HandlePostResponse } from "../../utils/rtkQueryHelper"

export const HeatSummaryTable = ({
	showAddAthletes = false
}: {
	showAddAthletes?: boolean
}) => {
	const selectedHeat = useSelector(getSelectedHeat)
	const { data, isLoading } = useGetOneByPrimaryKeyHeatIdGetQuery({
		id: selectedHeat
	})
	if (data && selectedHeat && !isLoading) {
		return (
			<Paper sx={{ padding: "1em" }}>
				<Grid container spacing={1} alignItems="stretch">
					<Grid item xs={12}>
						<Typography variant="h6">{`Heat: ${
							data.name || ""
						}`}</Typography>
						<HeatAthleteTable showAdmin={showAddAthletes} />
					</Grid>
					{showAddAthletes && (
						<>
							<Grid item xs={12}>
								<Typography variant="h6">
									Add Athlete to Current Heat
								</Typography>
							</Grid>

							<Grid item xs={12}>
								<AddAthletesToHeat />
							</Grid>
						</>
					)}
				</Grid>
			</Paper>
		)
	} else if (isLoading) {
		return <Skeleton variant="rectangular" />
	}

	return <h4>Something went wrong</h4>
}

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
		first_name?: string
		last_name?: string
		bib?: number
		phase_id?: string
		athlete_heat_id?: string
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

						return <Button onClick={onClick}>Edit</Button>
					}
				}
		  ]
		: []
	const columns: GridColDef[] = [
		// { field: "id", headerName: "ID"},
		{ field: "first_name", headerName: "First Name" },
		{ field: "last_name", headerName: "Last Name" },
		{ field: "bib", headerName: "Bib Number" },
		...editCol
	]
	const athletes = useGetManyAthleteheatGetQuery({
		heatIdListComparisonOperator: "Equal",
		heatIdList: [selectedHeat],
		joinForeignTable: ["athlete"]
	})

	const rows: GridRowsProp = flatten(
		athletes.data?.map((a) => ({
			phase_id: a.phase_id,
			heat_id: a.heat_id,
			athlete_heat_id: a.id,
			...a.athlete_foreign?.[0]
		}))
	)

	if (athletes.isLoading) {
		return <Skeleton variant="rectangular" />
	} else if (rows) {
		return (
			<>
				<EditAthletDialog
					open={open}
					handleClose={handleClose}
					id={rowData.id ?? ""}
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

const EditAthletDialog = ({
	open,
	handleClose,
	id,
	first_name,
	last_name,
	bib,
	phase_id,
	athlete_heat_id
}: {
	open: boolean
	handleClose: () => void
	id?: string
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
				id={id}
				bib={bib}
				phase_id={phase_id}
			/>
		</div>
	</Dialog>
)

// eslint-disable-next-line complexity
const AddAthletesToHeat = (props: {
	id?: string
	first_name?: string
	last_name?: string
	bib?: number
	phase_id?: string
	athlete_heat_id?: string
	showHeat?: boolean
}) => {
	const selectedHeat = useSelector(getSelectedHeat)
	const selectedCompetition = useSelector(getSelectedCompetition)
	const [athleteFirstName, setAthleteFirstName] = useState<string>(
		props.first_name ?? ""
	)
	const [selectedPhase, setSelectedPhase] = useState<string>(
		props.phase_id ?? ""
	)
	const [newHeat, setSelectedHeat] = useState<string>(selectedHeat ?? "")
	useEffect(() => {
		setSelectedHeat(selectedHeat)
	}, [selectedHeat])
	const athletes = useGetManyAthleteheatGetQuery({
		heatIdListComparisonOperator: "Equal",
		heatIdList: [selectedHeat],
		joinForeignTable: ["athlete"]
	})
	const [athleteLastName, setAthleteLastName] = useState<string>(
		props.last_name ?? ""
	)
	const [bibNumber, setBibNumber] = useState<number>(props.bib ?? 1)
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
		setSelectedHeat(event.target.value)
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
			const athleteId = props.id ?? v4()
			if (props.id && props.athlete_heat_id) {
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
						id: props.athlete_heat_id ?? v4(),
						bodyPartialUpdateOneByPrimaryKeyAthleteheatIdPatch: {
							heat_id: newHeat,
							athlete_id: athleteId,
							phase_id: selectedPhase
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
								phase_id: selectedPhase
							}
						]
					}),
					"Added Athlete to Heat"
				)
			}
			await athletes.refetch()
			setAthleteFirstName("")
			setAthleteLastName("")
		} else {
			toast.error("Please fill in all the fields")
		}
	}
	if (!isSuccess || !heatIsSuccess) {
		return <h4>Failed to get data from server</h4>
	}
	const colWidth = props.id && props.athlete_heat_id ? 12 : 2

	return (
		<Grid container spacing={1} alignItems="stretch">
			<Grid item xs={colWidth}>
				<TextField
					label="First Name"
					fullWidth
					value={athleteFirstName}
					onChange={(e) => setAthleteFirstName(e.target.value)}
				/>
			</Grid>
			<Grid item xs={colWidth}>
				<TextField
					label="Last Name"
					fullWidth
					value={athleteLastName}
					onChange={(e) => setAthleteLastName(e.target.value)}
				/>
			</Grid>
			<Grid item xs={colWidth}>
				<FormControl fullWidth={true}>
					<InputLabel>Select Phase</InputLabel>
					<Select
						value={selectedPhase}
						fullWidth
						onChange={onSelectPhase}
						variant="outlined"
					>
						{data[0].phase_foreign.map((phase) => (
							<MenuItem key={phase.id} value={phase.id}>
								{phase.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
			{props.showHeat && (
				<Grid item xs={colWidth}>
					<FormControl fullWidth={true}>
						<InputLabel>Select Heat</InputLabel>
						<Select
							value={newHeat}
							onChange={onSelectHeat}
							variant="outlined"
							fullWidth
							autoWidth
						>
							{heatData.map((heat) => (
								<MenuItem key={heat.id} value={heat.id}>
									{heat.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
			)}
			<Grid item xs={colWidth}>
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
			<Grid item xs={colWidth}>
				<Button
					onClick={() => void handleNewPaddlerSubmit()}
					variant="contained"
					fullWidth
					sx={{ height: "100%" }}
				>
					{props.id && props.athlete_heat_id
						? "Edit Athlete"
						: "Add Athlete"}
				</Button>
			</Grid>
			{props.id && props.athlete_heat_id && (
				<Grid item xs={colWidth}>
					{" "}
					<Typography variant="h6">
						Warning: Moving an athlete between heats or phases will
						delete any previously scored moves for that athlete in
						that heat/phase{" "}
					</Typography>
				</Grid>
			)}
		</Grid>
	)
}

interface PhaseListType {
	value: string
	name: string
}
