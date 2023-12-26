import Grid from "@mui/material/Grid"
import CompetitionSelector from "./CompetitionSelector"
import EventSelector from "./EventSelector"
import HeatsSelector from "./HeatSelector"
import PhaseSelector from "./PhaseSelector"

export const SelectorDisplay = ({
	showDetailed = false,
	showCompetition = true,
	showEvent = true,
	showPhase = true,
	showHeat = true
}: {
	showDetailed?: boolean
	showCompetition?: boolean
	showEvent?: boolean
	showPhase?: boolean
	showHeat?: boolean
}) => (
	<Grid container spacing={3} alignItems={"stretch"}>
		{showCompetition && (
			<Grid item xs>
				<CompetitionSelector showDetailed={showDetailed} />
			</Grid>
		)}
		{showEvent && (
			<Grid item xs>
				<EventSelector showDetailed={showDetailed} />
			</Grid>
		)}
		{showPhase && (
			<Grid item xs>
				<PhaseSelector showDetailed={showDetailed} />
			</Grid>
		)}
		{showHeat && (
			<Grid item xs>
				<HeatsSelector showDetailed={showDetailed} />
			</Grid>
		)}
	</Grid>
)
