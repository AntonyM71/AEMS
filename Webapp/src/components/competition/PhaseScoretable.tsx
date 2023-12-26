/* eslint-disable camelcase */

import { Paper, Typography } from "@mui/material"
import Grid from "@mui/material/Grid"
import Skeleton from "@mui/material/Skeleton"
import {
	DataGrid,
	GridColDef,
	GridRowsProp,
	GridValidRowModel
} from "@mui/x-data-grid"
import { flatten } from "lodash"
import { useSelector } from "react-redux"
import { getSelectedPhase } from "../../redux/atoms/competitions"
import {
	AthleteScoresWithAthleteInfo,
	PhaseScoresResponse,
	useGetOneByPrimaryKeyPhaseIdGetQuery,
	useGetPhaseScoresGetPhaseScoresPhaseIdGetQuery
} from "../../redux/services/aemsApi"
import { SelectorDisplay } from "./MainSelector"

export const PhaseScoreTable = () => {
	const selectedPhase = useSelector(getSelectedPhase)
	const { data, isLoading } = useGetOneByPrimaryKeyPhaseIdGetQuery({
		id: selectedPhase
	})
	const { data: scoreData, isLoading: isScoreLoading } =
		useGetPhaseScoresGetPhaseScoresPhaseIdGetQuery(
			{
				phaseId: selectedPhase
			},
			{ refetchOnMountOrArgChange: true }
		)
	if (data && !isLoading) {
		return (
			<Grid
				container
				spacing={1}
				alignItems="stretch"
				sx={{ paddingTop: "1em" }}
			>
				<Grid item xs={12}>
					<SelectorDisplay />
				</Grid>
				{selectedPhase && scoreData && !isScoreLoading ? (
					<Grid item xs={12}>
						<Paper>
							<Typography
								variant="h5"
								sx={{ padding: "0.5em" }}
							>{`Phase: ${data.name || ""}`}</Typography>
							<PhaseAthleteScoreTable
								athletes={scoreData}
								numberOfRuns={data.number_of_runs || 3}
								numberOfScoringRuns={
									data.number_of_runs_for_score || 3
								}
							/>
						</Paper>
					</Grid>
				) : (
					<Skeleton variant="rectangular" />
				)}
			</Grid>
		)
	} else if (isLoading) {
		return <Skeleton variant="rectangular" />
	}

	return <h4>Something went wrong</h4>
}

export const PhaseAthleteScoreTable = ({
	athletes,
	numberOfRuns,
	numberOfScoringRuns
}: {
	athletes: PhaseScoresResponse
	numberOfRuns: number
	numberOfScoringRuns: number
}) => {
	const maxRuns = numberOfRuns
	const runCols: GridColDef[] = []
	for (let i = 0; i < maxRuns; i++) {
		runCols.push({ field: `run_${i + 1}`, headerName: `Run ${i + 1}` })
	}

	const columns: GridColDef[] = [
		// { field: "id", headerName: "ID"},
		{ field: "ranking", headerName: "Rank" },
		{ field: "first_name", headerName: "First Name" },
		{ field: "last_name", headerName: "Last Name" },
		{ field: "bib", headerName: "Bib Number" },
		...runCols,
		{ field: "total_score", headerName: "Total" },
		{ field: "reason", headerName: "Notes" }
	]

	const rows: GridRowsProp =
		flatten(
			athletes.scores.map((a: AthleteScoresWithAthleteInfo, i) => {
				const runScores: Record<string, number> = {}
				runCols.forEach(
					(r, j) =>
						(runScores[r.field] =
							a.run_scores[j]?.mean_run_score || 0)
				)

				const formattedRow: GridValidRowModel = {
					ranking: a.ranking ?? 0,
					id: i,
					bib: a.bib_number,
					first_name: a.first_name,
					last_name: a.last_name,
					reason: a.reason ?? "",
					total_score: a.total_score ?? 0,
					...runScores
				}

				return formattedRow
			})
		) || []

	if (rows) {
		return (
			<DataGrid
				sx={{ height: "70vh", margin: "0.5em" }}
				rows={rows}
				columns={columns}
				disableRowSelectionOnClick
			/>
		)
	}

	return (
		<div>
			<h4>No athletes in phase</h4>
		</div>
	)
}
