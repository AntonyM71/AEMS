import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { Variant } from "@mui/material/styles/createTypography"
import { makeLockedScoreStyle } from "../../competition/HeatScoreTable"
const calculateAverage = (numbers: number[]): number =>
	numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length

export const FinalScoreLogic = ({
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
	<Typography
		variant={textSize}
		data-testid="final-score-value"
		color={locked ? "success" : "textPrimary"}
		sx={makeLockedScoreStyle(locked)}
	>
		{did_not_start ? "DNS" : calculateAverage(allJudgeScores).toFixed(2)}
	</Typography>
)

export const FinalScore = ({
	allJudgeScores,
	locked,
	did_not_start,
	textSize = "h5",
	direction = "column"
}: {
	allJudgeScores: number[]
	locked: boolean
	did_not_start: boolean
	textSize?: Variant
	direction?: "row" | "column"
}) => (
	<Paper
		data-testid="final-score"
		sx={{
			padding: "0.5em",
			height: "100%"
		}}
	>
		<Stack
			direction={direction}
			spacing={1}
			alignItems="center"
			sx={{ height: "100%" }}
		>
			<Typography variant={textSize}>Score:</Typography>
			<div style={{ textAlign: "center" }}>
				<FinalScoreLogic
					allJudgeScores={allJudgeScores}
					locked={locked}
					did_not_start={did_not_start}
					textSize={textSize}
				/>
			</div>
		</Stack>
	</Paper>
)
