import Grid from "@mui/material/Grid"
import CompetitionSelector from "./CompetitionSelector"
import EventSelector from "./EventSelector"
import HeatsSelector from "./HeatSelector"
import PhaseSelector from "./PhaseSelector"

export const SelectorDisplay = () => (
	<Grid container spacing={3} alignItems={"stretch"}>
		<Grid item xs>
			<CompetitionSelector />
		</Grid>
		<Grid item xs>
			<EventSelector />
		</Grid>
		<Grid item xs>
			<PhaseSelector />
		</Grid>
		<Grid item xs>
			<HeatsSelector />
		</Grid>
	</Grid>
)
