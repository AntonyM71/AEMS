import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import Grid from "@mui/material/Grid2"
import Skeleton from "@mui/material/Skeleton"
import Switch from "@mui/material/Switch"
import Typography from "@mui/material/Typography"
import {
	DataGrid,
	GridColDef,
	GridRenderCellParams,
	GridRowHeightParams,
	GridRowsProp
} from "@mui/x-data-grid"
import { flatten } from "lodash"
import { useState } from "react"
import { useSelector } from "react-redux"
import { getSelectedHeat } from "../../redux/atoms/competitions"
import {
	HeatScoresResponse,
	useGetHeatScoresGetHeatScoresHeatIdGetQuery,
	useGetOneByPrimaryKeyHeatIdGetQuery
} from "../../redux/services/aemsApi"

export const HeatScoreTable = ({
	defaultShowJudgeScores = false
}: {
	defaultShowJudgeScores?: boolean
}) => {
	const selectedHeat = useSelector(getSelectedHeat)
	const { data, isLoading } = useGetOneByPrimaryKeyHeatIdGetQuery(
		{
			id: selectedHeat
		},
		{ skip: !selectedHeat }
	)
	const { data: scoreData, isLoading: isScoreLoading } =
		useGetHeatScoresGetHeatScoresHeatIdGetQuery(
			{
				heatId: selectedHeat
			},
			{ refetchOnMountOrArgChange: true }
		)
	const [showJudgeScores, setShowJudgeScores] = useState<boolean>(
		defaultShowJudgeScores
	)
	if (data && scoreData && selectedHeat && !isLoading && !isScoreLoading) {
		return (
			<Grid
				container
				spacing={1}
				alignItems="center"
				justifyContent="space-between"
			>
				<Grid size={6}>
					<h3>{`Heat: ${data.name || ""}`}</h3>
				</Grid>
				<Grid alignContent="right" size={6}>
					<FormGroup sx={{ alignContent: "end" }}>
						<FormControlLabel
							control={
								<Switch
									checked={showJudgeScores}
									onClick={() =>
										setShowJudgeScores(!showJudgeScores)
									}
								/>
							}
							label="Show Judge Scores"
						/>
					</FormGroup>
				</Grid>
				<Grid size={12}>
					<HeatAthleteScoreTable
						athletes={scoreData}
						showIndividualJudgeScores={showJudgeScores}
					/>
				</Grid>
			</Grid>
		)
	} else if (isLoading) {
		return <Skeleton variant="rectangular" data-testid="skeleton" />
	}

	return <h4>Something went wrong</h4>
}

export const HeatAthleteScoreTable = ({
	athletes,
	showIndividualJudgeScores = false
}: {
	athletes: HeatScoresResponse
	showIndividualJudgeScores?: boolean
}) => {
	const maxRuns = Math.max(...athletes.scores.map((a) => a.run_scores.length))
	const runCols: GridColDef[] = []
	for (let i = 0; i < maxRuns; i++) {
		runCols.push({
			field: `run_${i + 1}`,
			headerName: `Run ${i + 1}`,
			renderCell: DetailScoreView(showIndividualJudgeScores)
		})
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

			return {
				id: i,
				bib: a.bib_number,
				first_name: a.first_name,
				last_name: a.last_name,
				...runScores
			}
		})
	)

	if (rows) {
		return (
			<DataGrid
				sx={{ height: "50vh" }}
				rows={rows}
				columns={columns}
				disableRowSelectionOnClick
				getRowHeight={({ densityFactor }: GridRowHeightParams) => {
					if (!showIndividualJudgeScores) {
						return 52
					}

					return 110 * densityFactor
				}}
			/>
		)
	}

	return (
		<div>
			<h4>No athletes in heat</h4>
		</div>
	)
}

export interface DetailScores {
	judgeScores: { score: number; judgeId: string }[]
	meanScore: number
	didNotStart: boolean
	locked: boolean
}

export const DetailScoreView =
	(showIndividualJudgeScores: boolean) =>
	(params: GridRenderCellParams<any, DetailScores>) =>
		(
			<Grid
				container
				justifyContent={
					showIndividualJudgeScores ? "flex-end" : "center"
				}
				alignItems="center"
				sx={{ height: "80%" }}
			>
				<IndividualJudgeScores
					showIndividualJudgeScores={showIndividualJudgeScores}
					params={params}
				/>
				<Grid size={12}>
					<Typography
						variant="body1"
						sx={{
							textDecoration: "underline",

							...makeLockedScoreStyle(params.value?.locked)
						}}
					>
						{params.value?.didNotStart
							? "DNS"
							: params.value?.meanScore?.toFixed(2) ?? 0}
					</Typography>
				</Grid>
			</Grid>
		)

const IndividualJudgeScores = ({
	params,
	showIndividualJudgeScores
}: {
	params: GridRenderCellParams<any, DetailScores>
	showIndividualJudgeScores: boolean
}) => {
	if (showIndividualJudgeScores) {
		return (
			<>
				{params.value?.judgeScores?.map((s, j) => (
					<Grid key={j} size={12}>
						<Typography
							variant={"body2"}
							sx={{
								fontStyle: params.value?.locked
									? "bold"
									: "italic"
							}}
						>
							{`J${s.judgeId}: ${
								params.value?.didNotStart
									? "DNS"
									: s.score?.toFixed(2) ?? 0
							}`}
						</Typography>
					</Grid>
				))}
			</>
		)
	} else {
		return <></>
	}
}

export const makeLockedScoreStyle = (locked = false) => ({
	fontStyle: locked ? "bold" : "italic",
	fontWeight: locked ? 700 : 500
})
