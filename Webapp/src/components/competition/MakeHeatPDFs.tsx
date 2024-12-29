import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getSelectedCompetition } from "../../redux/atoms/competitions"
import { useGetManyHeatGetQuery } from "../../redux/services/aemsApi"
import { downloadHeatSummaryPDF } from "./HeatSummaryTable"
import { SelectorDisplay } from "./MainSelector"

export const MakeHeatPDFs = () => (
	<Grid container spacing={1}>
		<Grid item xs={4}>
			<SelectorDisplay
				showEvent={false}
				showHeat={false}
				showPhase={false}
				showDetailed={false}
			/>
		</Grid>
		<Grid item xs={8}>
			<HeatCheckBoxes />
		</Grid>
	</Grid>
)

const HeatCheckBoxes = () => {
	const [selectedHeats, setSelectedHeats] = useState<string[]>([])
	const selectedCompetition = useSelector(getSelectedCompetition)

	const { data } = useGetManyHeatGetQuery(
		{
			competitionIdList: [selectedCompetition],
			competitionIdListComparisonOperator: "Equal"
		},
		{ skip: !selectedCompetition }
	)
	useEffect(() => {
		setSelectedHeats([])
	}, [selectedCompetition])

	return (
		<Paper sx={{ padding: "1em", height: "100%" }}>
			<Grid container spacing={5}>
				{data?.map((h) => {
					if (h?.id && h?.name) {
						return (
							<Grid item key={h.id}>
								<Stack
									alignItems="center"
									justifyContent="center"
									direction="row"
								>
									<Typography> {h.name}</Typography>
									<Checkbox
										checked={selectedHeats.includes(h.id)}
										onChange={() =>
											h?.id &&
											(selectedHeats.includes(h.id)
												? setSelectedHeats(
														selectedHeats.filter(
															(i) => i !== h.id
														)
												  )
												: setSelectedHeats([
														...selectedHeats,
														h.id
												  ]))
										}
									/>
								</Stack>
							</Grid>
						)
					}
				})}

				<Grid item xs={12}>
					<Stack
						spacing={1}
						direction="row"
						alignItems="center"
						justifyContent="space-between"
					>
						<Button
							variant="contained"
							disabled={selectedHeats.length === 0}
							// eslint-disable-next-line @typescript-eslint/no-misused-promises
							onClick={() =>
								downloadHeatSummaryPDF(selectedHeats)
							}
						>
							Create Summary PDF for selected Heats
						</Button>

						{selectedHeats.length === 0 && (
							<Alert severity="info">
								{!selectedCompetition
									? "Please Select a Competition to see available Heats."
									: "Please select at least one Heat to make a PDF for."}
							</Alert>
						)}
					</Stack>
				</Grid>
			</Grid>
		</Paper>
	)
}
