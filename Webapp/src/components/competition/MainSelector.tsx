import Grid from "@mui/material/Grid2"
import CompetitionSelector from "./CompetitionSelector"
import EventSelector from "./EventSelector"
import HeatsSelector from "./HeatSelector"
import PhaseSelector from "./PhaseSelector"

export const SelectorDisplay = ({
	showDetailed = false,
	showCompetition = true,
	showEvent = true,
	showPhase = true,
	showHeat = true,
	vertical = false
}: {
	showDetailed?: boolean
	showCompetition?: boolean
	showEvent?: boolean
	showPhase?: boolean
	showHeat?: boolean
	vertical?: boolean
}) => (
	<Grid
		container
		spacing={1}
		alignItems="stretch"
		direction={vertical ? "column" : "row"}
	>
		{showCompetition && (
			<Grid size="grow">
				<CompetitionSelector showDetailed={showDetailed} />
			</Grid>
		)}
		{showEvent && (
			<Grid size="grow">
				<EventSelector showDetailed={showDetailed} />
			</Grid>
		)}
		{showPhase && (
			<Grid size="grow">
				<PhaseSelector showDetailed={showDetailed} />
			</Grid>
		)}
		{showHeat && (
			<Grid size="grow">
				<HeatsSelector showDetailed={showDetailed} />
			</Grid>
		)}
	</Grid>
)
