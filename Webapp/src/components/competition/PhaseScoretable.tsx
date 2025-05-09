import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import Skeleton from "@mui/material/Skeleton"
import Typography from "@mui/material/Typography"
import {
	DataGrid,
	GridColDef,
	GridRowsProp,
	GridValidRowModel
} from "@mui/x-data-grid"
import axios from "axios"
import { flatten } from "lodash"
import { useSelector } from "react-redux"
import { getSelectedPhase } from "../../redux/atoms/competitions"
import {
	AthleteScoresWithAthleteInfo,
	PhaseScoresResponse,
	useGetOneByPrimaryKeyPhaseIdGetQuery,
	useGetPhaseScoresGetPhaseScoresPhaseIdGetQuery
} from "../../redux/services/aemsApi"
import { DetailScores, DetailScoreView } from "./HeatScoreTable"
import { SelectorDisplay } from "./MainSelector"

export const PhaseScoreTable = () => {
	const selectedPhase = useSelector(getSelectedPhase)
	const { data, isLoading } = useGetOneByPrimaryKeyPhaseIdGetQuery(
		{
			id: selectedPhase
		},
		{ skip: !selectedPhase }
	)
	const { data: scoreData, isLoading: isScoreLoading } =
		useGetPhaseScoresGetPhaseScoresPhaseIdGetQuery(
			{
				phaseId: selectedPhase
			},
			{ refetchOnMountOrArgChange: true, skip: !selectedPhase }
		)

	const downloadFile = async () => {
		const response = await axios.get(
			`${
				process.env.NEXT_PUBLIC_API_URL_DEV || "/api/"
			}phase_pdf/${selectedPhase}`,
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

	return (
		<Grid
			container
			spacing={1}
			alignItems="stretch"
			sx={{ paddingTop: "0.5em" }}
			data-testid="phase-score-table"
		>
			<Grid size={12}>
				<SelectorDisplay showHeat={false} />
			</Grid>
			{data &&
			!isLoading &&
			selectedPhase &&
			scoreData &&
			!isScoreLoading ? (
				<Grid size={12}>
					<Paper>
						<Grid
							container
							justifyContent="space-between"
							alignItems="center"
						>
							<Grid>
								<Typography
									variant="h5"
									sx={{ padding: "0.5em" }}
									data-testid="phase-name"
								>{`Phase: ${data.name || ""}`}</Typography>
							</Grid>

							<Grid sx={{ padding: "0.5em" }}>
								<Button
									variant="contained"
									color="info"
									data-testid="download-pdf-button"
									// eslint-disable-next-line @typescript-eslint/no-misused-promises
									onClick={downloadFile}
								>
									Create PDF
								</Button>
							</Grid>
							<Grid size={12}>
								<PhaseAthleteScoreTable
									athletes={scoreData}
									numberOfRuns={data.number_of_runs ?? 3}
								/>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			) : (
				<Skeleton
					variant="rectangular"
					data-testid="loading-skeleton"
				/>
			)}
		</Grid>
	)
}

export const PhaseAthleteScoreTable = ({
	athletes,
	numberOfRuns
}: {
	athletes: PhaseScoresResponse
	numberOfRuns: number
}) => {
	const maxRuns = numberOfRuns
	const runCols: GridColDef[] = []
	for (let i = 0; i < maxRuns; i++) {
		runCols.push({
			field: `run_${i + 1}`,
			headerName: `Run ${i + 1}`,
			renderCell: DetailScoreView(false)
		})
	}

	const columns: GridColDef[] = [
		// { field: "id", headerName: "ID"},
		{ field: "ranking", headerName: "Rank" },
		{ field: "first_name", headerName: "First Name", width: 200 },
		{ field: "last_name", headerName: "Last Name", width: 200 },
		{ field: "bib", headerName: "Bib Number" },
		{ field: "affiliation", headerName: "Affiliation" },
		...runCols,
		{
			field: "total_score",
			headerName: "Total"
		},
		{ field: "reason", headerName: "Notes", width: 200 }
	]

	const rows: GridRowsProp =
		flatten(
			athletes.scores.map((a: AthleteScoresWithAthleteInfo, i) => {
				const runScores: Record<string, DetailScores> = {}
				runCols.forEach((r, j) => {
					const detailScores: DetailScores = {
						locked: a.run_scores[j]?.locked,
						didNotStart: a.run_scores[j]?.did_not_start,
						meanScore: a.run_scores[j]?.mean_run_score || 0,
						judgeScores:
							a.run_scores[j]?.judge_scores.map((js) => ({
								score: js.score_info.score,
								judgeId: js.judge_id
							})) ?? []
					}
					runScores[r.field] = detailScores
				})

				const formattedRow: GridValidRowModel = {
					ranking: a.ranking ?? 0,
					id: i,
					bib: a.bib_number,
					first_name: a.first_name,
					last_name: a.last_name,
					affiliation: a.affiliation ?? "",
					reason: a.reason ?? "",
					total_score: a.total_score?.toFixed(2) ?? 0,
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
				data-testid="athlete-score-grid"
			/>
		)
	}

	return (
		<div data-testid="no-athletes-message">
			<h4>No athletes in phase</h4>
		</div>
	)
}
