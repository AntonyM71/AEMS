import Grid from "@mui/material/Grid"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import TextField from "@mui/material/TextField"

export const EditMove = ({
	moveData,
	setMoveData
}: {
	moveData: MoveData,
	setMoveData: (m: MoveData) => void
}) => (
	<>
		<Grid item xs={2}>
			<TextField
				error={!moveData.name}
				label="Name"
				variant="outlined"
				fullWidth
				onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
					setMoveData({
						...moveData,
						name: event.target.value
					})
				}
				value={moveData.name}
			/>
		</Grid>
		<Grid item xs={1}>
			<Select
				label="Direction"
				variant="outlined"
				fullWidth
				onChange={(event: SelectChangeEvent<string>): void => {
					console.log(event.target.value)

					setMoveData({
						...moveData,
						direction: event.target.value as MoveDirections
					})
				}}
				value={moveData.direction}
			>
				<MenuItem value="LR">L/R</MenuItem>
				<MenuItem value="FB">F/B</MenuItem>
				<MenuItem value="LRFB">LR/FB</MenuItem>
			</Select>
		</Grid>
		<Grid item xs={1}>
			<TextField
				error={!moveData.flScore.toString()}
				label="F/R"
				variant="outlined"
				fullWidth
				onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
					setMoveData({
						...moveData,
						flScore: event.target.value as unknown as number
					})
				}
				value={moveData.flScore}
			/>
		</Grid>
		<Grid item xs={1}>
			<TextField
				error={!moveData.rbScore.toString()}
				label="L/B"
				variant="outlined"
				fullWidth
				onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
					setMoveData({
						...moveData,
						rbScore: event.target.value as unknown as number
					})
				}
				value={moveData.rbScore}
			/>
		</Grid>
		{moveData.bonuses.map((b, i) => (
			<Grid item xs={1} key={i}>
				<TextField
					error={!moveData.bonuses[i].score.toString()}
					label={`${b.name}`}
					variant="outlined"
					fullWidth
					onChange={(
						event: React.ChangeEvent<HTMLInputElement>
					): void => {
						const newMoveData = { ...moveData }
						newMoveData.bonuses[i].score = event.target
							.value as unknown as number

						setMoveData(newMoveData)
					}}
					value={moveData.bonuses[i].score}
				/>
			</Grid>
		))}
	</>
)

export interface MoveData {
	id: string
	name: string
	rbScore: number
	flScore: number
	bonuses: { name: string; id: string; score: number }[]
	direction: MoveDirections
}

export type MoveDirections = "LR" | "FB" | "LRFB"

export const checkMoveisValid = (moveData: MoveData): boolean =>
	[
		!!moveData.name,
		!!moveData.direction,
		moveData.flScore.toString(),
		moveData.rbScore.toString(),
		...moveData.bonuses.map((b) => b.score.toString())
	].every((v) => v)
