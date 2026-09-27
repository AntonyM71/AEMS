import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid2"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Paper from "@mui/material/Paper"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"
import { ReactNode } from "react"
import { RefreshButton } from "./RefreshIconButton"

export interface SelectorOption {
	id: string
	name: string
}

export const SelectorPanel = ({
	entityLabel,
	items,
	selectedValue,
	onSelect,
	isLoading,
	isError,
	refetch,
	showDetailed,
	emptyMessage,
	addForm,
	endAdornment,
	loadingTestId = "skeleton",
	selectTestId,
	sectionHeading
}: {
	entityLabel: string
	items: SelectorOption[]
	selectedValue: string
	onSelect: (value: string) => void
	isLoading: boolean
	isError: boolean
	refetch: () => Promise<any>
	showDetailed: boolean
	emptyMessage: string
	addForm: ReactNode
	endAdornment?: ReactNode
	loadingTestId?: string
	selectTestId?: string
	sectionHeading?: string
}) => {
	if (isLoading) {
		return <Skeleton variant="rectangular" data-testid={loadingTestId} />
	}
	if (isError) {
		return <h4>Failed to get data from the server</h4>
	}
	if (items.length === 0) {
		return (
			<Paper sx={{ padding: "1em", height: "100%" }}>
				<Stack direction="row" sx={{ alignItems: "center" }}>
					<RefreshButton refetch={refetch} />
					<h4>{emptyMessage}</h4>
				</Stack>
				{addForm}
			</Paper>
		)
	}
	const labelId = `${entityLabel}-select-label`

	return (
		<Paper sx={{ padding: "1em", height: "100%" }}>
			<Grid container spacing={2}>
				{showDetailed && (
					<Grid size={12}>
						<h4>{sectionHeading ?? `Select a ${entityLabel}`}</h4>
					</Grid>
				)}
				<Grid size={12}>
					<FormControl fullWidth={true}>
						<InputLabel id={labelId}>
							Select {entityLabel}
						</InputLabel>
						<Select
							labelId={labelId}
							data-testid={selectTestId}
							value={selectedValue}
							onChange={(event: SelectChangeEvent<string>) =>
								onSelect(event.target.value)
							}
							variant="outlined"
							fullWidth={true}
							startAdornment={<RefreshButton refetch={refetch} />}
							endAdornment={endAdornment}
						>
							{items.map((item) => (
								<MenuItem key={item.id} value={item.id}>
									{item.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				{showDetailed && <Grid>{addForm}</Grid>}
			</Grid>
		</Paper>
	)
}
