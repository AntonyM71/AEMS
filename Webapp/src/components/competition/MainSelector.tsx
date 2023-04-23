import Grid from "@mui/material/Grid"
import CompetitionSelector from "./CompetitionSelector"
import EventSelector from "./EventSelector"
import HeatsSelector from "./HeatSelector"
import PhaseSelector from "./PhaseSelector"

export const SelectorDisplay = ({
	showDetailed = false
}: {
	showDetailed?: boolean
}) => (
	<Grid container spacing={3} alignItems={"stretch"}>
		<Grid item xs>
			<CompetitionSelector showDetailed={showDetailed} />
		</Grid>
		<Grid item xs>
			<EventSelector showDetailed={showDetailed} />
		</Grid>
		<Grid item xs>
			<PhaseSelector showDetailed={showDetailed} />
		</Grid>
		<Grid item xs>
			<HeatsSelector showDetailed={showDetailed} />
		</Grid>
	</Grid>
)
