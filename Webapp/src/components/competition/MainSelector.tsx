import Grid from "@mui/material/Grid2"
import CompetitionSelector from "./CompetitionSelector"
import EventSelector from "./EventSelector"
import HeatsSelector from "./HeatSelector"
import PhaseSelector from "./PhaseSelector"

interface SelectorDisplayProps {
	showDetailed?: boolean
	showCompetition?: boolean
	showEvent?: boolean
	showPhase?: boolean
	showHeat?: boolean
	vertical?: boolean
}

const DEFAULT_PROPS: SelectorDisplayProps = {
	showDetailed: false,
	showCompetition: true,
	showEvent: true,
	showPhase: true,
	showHeat: true,
	vertical: false
}

export const SelectorDisplay = (props: SelectorDisplayProps) => {
	const {
		showDetailed,
		showCompetition,
		showEvent,
		showPhase,
		showHeat,
		vertical
	} = { ...DEFAULT_PROPS, ...props }
	const selectors = [
		{
			key: "competition",
			show: showCompetition,
			Selector: CompetitionSelector
		},
		{ key: "event", show: showEvent, Selector: EventSelector },
		{ key: "phase", show: showPhase, Selector: PhaseSelector },
		{ key: "heat", show: showHeat, Selector: HeatsSelector }
	]

	return (
		<Grid
			container
			spacing={1}
			alignItems="stretch"
			direction={vertical ? "column" : "row"}
		>
			{selectors
				.filter(({ show }) => show)
				.map(({ key, Selector }) => (
					<Grid size="grow" key={key}>
						<Selector showDetailed={showDetailed} />
					</Grid>
				))}
		</Grid>
	)
}
