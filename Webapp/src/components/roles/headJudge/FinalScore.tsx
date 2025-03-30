import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { makeLockedScoreStyle } from "../../competition/HeatScoreTable"

const calculateAverage = (numbers: number[]): number =>
	numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length

export const FinalScore = ({
	allJudgeScores,
	locked,
	did_not_start
}: {
	allJudgeScores: number[]
	locked: boolean
	did_not_start: boolean
}) => (
	<Paper
		data-testid="final-score"
		sx={{
			padding: "0.5em",
			height: "100%"
		}}
	>
		<Typography variant="h5">Score:</Typography>
		<div style={{ textAlign: "center" }}>
			<Typography
				variant="h5"
				data-testid="final-score-value"
				color={locked ? "success" : "textPrimary"}
				sx={makeLockedScoreStyle(locked)}
			>
				{did_not_start
					? "DNS"
					: calculateAverage(allJudgeScores).toFixed(2)}
			</Typography>
		</div>
	</Paper>
)
