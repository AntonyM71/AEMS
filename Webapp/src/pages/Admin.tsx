import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import { HeatSummaryTable } from "../components/competition/HeatSummaryTable"
import { SelectorDisplay } from "../components/competition/MainSelector"

export default function Score() {
	return (
		<Grid
			container
			alignItems="stretch"
			spacing={1}
			sx={{ paddingTop: "0.5em" }}
		>
			<Grid item xs={12}>
				<SelectorDisplay showDetailed={true} />
			</Grid>
			<Grid item xs={12}>
				<Divider />
			</Grid>
			<Grid item xs={3}>
				<SelectorDisplay
					showCompetition={false}
					showPhase={false}
					showEvent={false}
				/>
			</Grid>
			<Grid item xs={9}>
				<HeatSummaryTable showAddAthletes={true} />
			</Grid>
			<Grid item xs={12}>
				<Divider />
			</Grid>
		</Grid>
	)
}
