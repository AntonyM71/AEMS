import Grid from "@mui/material/Grid"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import { AvailableMoveDirections } from "../roles/scribe/Interfaces"

export const EditMove = ({
	moveData,
	setMoveData
}: {
	moveData: MoveData
	setMoveData: (m: MoveData) => void
}) => (
	<>
		<Grid item xs={2}>
			<TextField
				error={!moveData.name}
				label="Name"
				variant="outlined"
				fullWidth
				data-testid="name-field"
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
					const newMoveData = {
						...moveData,
						direction: event.target.value as AvailableMoveDirections
					}
					if (event.target.value === "S") {
						newMoveData.rbScore = 0
					}
					setMoveData(newMoveData)
				}}
				value={moveData.direction}
			>
				<MenuItem value="LR">L/R</MenuItem>
				<MenuItem value="FB">F/B</MenuItem>
				<MenuItem value="S">Single</MenuItem>
			</Select>
		</Grid>
		<Grid item xs={1}>
			<TextField
				error={!moveData.flScore.toString()}
				label="F/L"
				variant="outlined"
				fullWidth
				data-testid="fl-field"
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
				label="B/R"
				variant="outlined"
				fullWidth
				disabled={moveData.direction === "S"}
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
			<Grid item xs={1} key={b.id}>
				<TextField
					error={!moveData.bonuses[i].score.toString()}
					label={`${b.name}`}
					variant="outlined"
					fullWidth
					data-testid={`${b.name.toLowerCase()}-field`}
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
	direction: AvailableMoveDirections
}

export const checkMoveisValid = (moveData: MoveData): boolean =>
	[
		!!moveData.name,
		!!moveData.direction,
		moveData.flScore.toString(),
		moveData.rbScore.toString(),
		...moveData.bonuses.map((b) => b.score.toString())
	].every((v) => v)
