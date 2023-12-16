/* eslint-disable camelcase */

import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Skeleton from "@mui/material/Skeleton"
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid"
import { flatten } from "lodash"
import { useSelector } from "react-redux"
import { getSelectedHeat } from "../../redux/atoms/competitions"
import {
	HeatScoresResponse,
	useGetHeatScoresGetHeatScoresHeatIdGetQuery,
	useGetOneByPrimaryKeyHeatIdGetQuery
} from "../../redux/services/aemsApi"

export const HeatScoreTable = () => {
	const selectedHeat = useSelector(getSelectedHeat)
	const { data, isLoading } = useGetOneByPrimaryKeyHeatIdGetQuery({
		id: selectedHeat
	})
	const { data: scoreData, isLoading: isScoreLoading } =
		useGetHeatScoresGetHeatScoresHeatIdGetQuery(
			{
				heatId: selectedHeat
			},
			{ refetchOnMountOrArgChange: true }
		)
	if (data && scoreData && selectedHeat && !isLoading && !isScoreLoading) {
		return (
			<Paper sx={{ padding: "1em" }}>
				<Grid container spacing={2} alignItems="stretch">
					<Grid item xs={12}>
						<h3>{`Heat: ${data.name || ""}`}</h3>
						<HeatAthleteScoreTable athletes={scoreData} />
					</Grid>
				</Grid>
			</Paper>
		)
	} else if (isLoading) {
		return <Skeleton variant="rectangular" />
	}

	return <h4>Something went wrong</h4>
}

export const HeatAthleteScoreTable = ({
	athletes
}: {
	athletes: HeatScoresResponse
}) => {
	const maxRuns = Math.max(...athletes.scores.map((a) => a.run_scores.length))
	console.log(maxRuns)
	const runCols: GridColDef[] = []
	for (let i = 0; i < maxRuns; i++) {
		runCols.push({ field: `run_${i + 1}`, headerName: `Run ${i + 1}` })
	}

	const columns: GridColDef[] = [
		// { field: "id", headerName: "ID"},
		{ field: "first_name", headerName: "First Name" },
		{ field: "last_name", headerName: "Last Name" },
		{ field: "bib", headerName: "Bib Number" },
		...runCols
	]

	const rows: GridRowsProp = flatten(
		athletes.scores.map((a, i) => {
			const runScores: Record<string, any> = {}
			runCols.forEach(
				(r, j) =>
					(runScores[r.field] = a.run_scores[j]?.mean_run_score || 0)
			)

			return (
				{
					id: i,
					bib: a.bib_number,
					first_name: a.first_name,
					last_name: a.last_name,
					...runScores
				} || []
			)
		})
	)

	if (rows) {
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
