import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { Variant } from "@mui/material/styles/createTypography"
import { makeLockedScoreStyle } from "../../competition/HeatScoreTable"
const calculateAverage = (numbers: number[]): number =>
	numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length

export const FinalScore = ({
	allJudgeScores,
	locked,
	did_not_start,
	textSize = "h5"
}: {
	allJudgeScores: number[]
	locked: boolean
	did_not_start: boolean
	textSize?: Variant
}) => (
	<Paper
		data-testid="final-score"
		sx={{
			padding: "0.5em",
			height: "100%"
		}}
	>
		<Stack direction="row" spacing={2}>
			<Typography variant={textSize}>Score:</Typography>
			<div style={{ textAlign: "center" }}>
				<Typography
					variant={textSize}
					data-testid="final-score-value"
					color={locked ? "success" : "textPrimary"}
					sx={makeLockedScoreStyle(locked)}
				>
					{did_not_start
						? "DNS"
						: calculateAverage(allJudgeScores).toFixed(2)}
				</Typography>
			</div>
		</Stack>
	</Paper>
)
