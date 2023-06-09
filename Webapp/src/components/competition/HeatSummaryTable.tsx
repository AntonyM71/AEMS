/* eslint-disable camelcase */

import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Skeleton from "@mui/material/Skeleton"
import TextField from "@mui/material/TextField"
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid"
import { flatten } from "lodash"
import { useState } from "react"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { v4 } from "uuid"
import { getSelectedHeat } from "../../redux/atoms/competitions"
import {
	useGetManyAthleteheatGetQuery,
	useGetOneByPrimaryKeyHeatIdGetQuery,
	useInsertManyAthletePostMutation,
	useInsertManyAthleteheatPostMutation
} from "../../redux/services/aemsApi"
import { SelectScoresheet } from "../judging/ScoresheetSelector"

export const HeatSummaryTable = () => {
	const selectedHeat = useSelector(getSelectedHeat)
	const { data, isLoading } = useGetOneByPrimaryKeyHeatIdGetQuery({
		id: selectedHeat
	})
	if (data && selectedHeat && !isLoading) {
		return (
			<Paper sx={{ padding: "1em" }}>
				<Grid container spacing={2} alignItems="stretch">
					<Grid item xs={12}>
						<h3>{`Heat: ${data.name || ""}`}</h3>
						<HeatAthleteTable />
					</Grid>
					<Grid item xs={12}>
						<AddAthletesToHeat />
					</Grid>
				</Grid>
			</Paper>
		)
	} else if (isLoading) {
		return <Skeleton variant="rectangular" />
	}

	return <h4>Something went wrong</h4>
}

export const HeatAthleteTable = () => {
	const selectedHeat = useSelector(getSelectedHeat)
	const columns: GridColDef[] = [
		// { field: "id", headerName: "ID"},
		{ field: "first_name", headerName: "First Name" },
		{ field: "last_name", headerName: "Last Name" },
		{ field: "bib", headerName: "Bib Number" },
		{ field: "scoresheetId", headerName: "Scoresheet ID" }
	]
	const athletes = useGetManyAthleteheatGetQuery({
		heatIdListComparisonOperator: "Equal",
		heatIdList: [selectedHeat],
		joinForeignTable: ["athlete"]
	})

	const rows: GridRowsProp = flatten(
		athletes.data?.map(
			(a) =>
				({ ...a.athlete_foreign![0], scoresheetId: a.scoresheet } || [])
		)
	)

	if (athletes.isLoading) {
		return <Skeleton variant="rectangular" />
	} else if (rows) {
		return (
			<DataGrid
				sx={{ height: "50vh" }}
				rows={rows}
				columns={columns}
				disableRowSelectionOnClick
			/>
		)
	}

	return (
		<div>
			<h4>No athletes in heat</h4>
		</div>
	)
}

const AddAthletesToHeat = () => {
	const selectedHeat = useSelector(getSelectedHeat)
	const [athleteFirstName, setAthleteFirstName] = useState<string>("")
	const athletes = useGetManyAthleteheatGetQuery({
		heatIdListComparisonOperator: "Equal",
		heatIdList: [selectedHeat],
		joinForeignTable: ["athlete"]
	})
	const [athleteLastName, setAthleteLastName] = useState<string>("")
	const [bibNumber, setBibNumber] = useState<number>(1)
	const [selectedScoresheet, setSelectedScoresheet] = useState<string>("")

	const [makeAthlete] = useInsertManyAthletePostMutation()
	const [makeAthleteHeat] = useInsertManyAthleteheatPostMutation()
	const handleNewPaddlerSubmit = async () => {
		if (
			athleteFirstName &&
			athleteLastName &&
			selectedScoresheet &&
			bibNumber
		) {
			const athleteId = v4()
			await makeAthlete({
				body: [
					{
						id: athleteId,
						first_name: athleteFirstName,
						last_name: athleteLastName,
						bib: bibNumber.toString()
					}
				]
			})
			await makeAthleteHeat({
				body: [
					{
						id: v4(),
						heat_id: selectedHeat,
						athlete_id: athleteId,
						scoresheet: selectedScoresheet
					}
				]
			})
			await athletes.refetch()
			setAthleteFirstName("")
			setAthleteLastName("")
		} else {
			toast.error("Please fill in all the fields")
		}
	}

	return (
		<Grid container spacing={2} alignItems="stretch">
			<Grid item xs>
				<TextField label="Heat" value={selectedHeat} disabled />
			</Grid>
			<Grid item xs>
				<TextField
					label="First Name"
					value={athleteFirstName}
					onChange={(e) => setAthleteFirstName(e.target.value)}
				/>
			</Grid>
			<Grid item xs>
				<TextField
					label="Last Name"
					value={athleteLastName}
					onChange={(e) => setAthleteLastName(e.target.value)}
				/>
			</Grid>
			<Grid item xs>
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
			<Grid item xs>
				<SelectScoresheet
					selectedScoresheet={selectedScoresheet}
					setSelectedScoresheet={setSelectedScoresheet}
				/>
			</Grid>
			<Grid item xs>
				<Button
					onClick={() => void handleNewPaddlerSubmit()}
					variant="contained"
					fullWidth
					sx={{ height: "100%" }}
				>
					Add to Heat
				</Button>
			</Grid>
		</Grid>
	)
}

const parsePhasesInHeats = (heats: apiHeatsListType[]): PhaseListType[] => {
	const phaseList: PhaseListType[] = []
	if (heats) {
		const phases = heats.map((h) => {
			const phasesInHeat = h.phase_foreign
			phasesInHeat?.map((p) => {
				if (p.name && p.id) {
					phaseList.push({ name: p.name, value: p.id })
				}
			})
		})
	}

	return phaseList
}

interface apiHeatsListType {
	phase_foreign: {
		name: string
		id: string
	}[]
}

interface PhaseListType {
	value: string
	name: string
}
