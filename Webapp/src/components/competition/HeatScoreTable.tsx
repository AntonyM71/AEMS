/* eslint-disable camelcase */

import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import Grid from "@mui/material/Grid"
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
	const [showJudgeScores, setShowJudgeScores] = useState<boolean>(false)
	if (data && scoreData && selectedHeat && !isLoading && !isScoreLoading) {
		return (
			<Grid
				container
				spacing={1}
				alignItems="center"
				justifyContent="space-between"
			>
				<Grid item xs={6}>
					<h3>{`Heat: ${data.name || ""}`}</h3>
				</Grid>
				<Grid item xs={6} alignContent="right">
					<FormGroup sx={{ alignContent: "end" }}>
						<FormControlLabel
							control={
								<Switch
									value={showJudgeScores}
									onClick={() =>
										setShowJudgeScores(!showJudgeScores)
									}
								/>
							}
							label="Show Judge Scores"
						/>
					</FormGroup>
				</Grid>
				<Grid item xs={12}>
					<HeatAthleteScoreTable
						athletes={scoreData}
						showIndividualJudgeScores={showJudgeScores}
					/>
				</Grid>
			</Grid>
		)
	} else if (isLoading) {
		return <Skeleton variant="rectangular" />
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
			renderCell: (params: GridRenderCellParams<any, DetailScores>) => (
				<Grid
					container
					direction="column"
					justifyContent={
						showIndividualJudgeScores ? "flex-end" : "center"
					}
					alignItems="center"
					sx={{ height: "80%" }}
				>
					{showIndividualJudgeScores ? (
						params.value?.judgeScores.map((s, j) => (
							<Grid item key={j}>
								<Typography variant={"body2"}>
									{`J${s.judgeId}: ${
										s.score.toFixed(2) || "0"
									}`}
								</Typography>
							</Grid>
						))
					) : (
						<></>
					)}
					<Typography
						variant="body1"
						sx={
							showIndividualJudgeScores
								? { textDecoration: "underline" }
								: {}
						}
					>
						{params.value?.meanScore.toFixed(2) ?? 0}
					</Typography>
				</Grid>
			)
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
				getRowHeight={({ id, densityFactor }: GridRowHeightParams) => {
					if (!showIndividualJudgeScores) {
						return 52
					}
					if ((id as number) % 2 === 0) {
						return 100 * densityFactor
					}

					return null
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

interface DetailScores {
	judgeScores: { score: number; judgeId: string }[]
	meanScore: number
}
