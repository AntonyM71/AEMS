import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import { useSelector } from "react-redux"
import { Link as RouterLink } from "react-router-dom"
import {
	getSelectedCompetition,
	getSelectedEvent,
	getSelectedHeat,
	getSelectedPhase
} from "../../redux/atoms/competitions"

import CompetitionSelector from "../competition/CompetitionSelector"
import EventSelector from "../competition/EventSelector"
import { HeatsSelector } from "../competition/HeatSelector"
import PhaseSelector from "../competition/PhaseSelector"
// eslint-disable-next-line complexity

// const competitionsThing = getCompetitionsFromServer()

// const CompetitionSelector = React.lazy(
// 	() => import("../competition/CompetitionSelector")
// )
const Judging = () => {
	// eslint-disable-next-line @typescript-eslint/explicit-member-accessibility

	const selectedCompetition = useSelector(getSelectedCompetition)
	const selectedEvent = useSelector(getSelectedEvent)
	const selectedPhase = useSelector(getSelectedPhase)
	const selectedHeat = useSelector(getSelectedHeat)

	// eslint-disable-next-line complexity
	const competition = selectedCompetition
	const event = selectedEvent
	const phase = selectedPhase
	const heat = selectedHeat
	if (competition && event && phase && heat) {
		if (competition) {
			if (event) {
				return (
					<Paper>
						<Grid container spacing={2} alignItems={"stretch"}>
							<Grid item xs={12}>
								<h1>Scribes</h1>
							</Grid>
							<Grid item xs>
								<Link
									component={RouterLink}
									to="/scribe/1"
									color="inherit"
								>
									<Button variant="contained" fullWidth>
										Scribe 1
									</Button>
								</Link>
							</Grid>
							<Grid item xs>
								<Link
									component={RouterLink}
									to="/scribe/2"
									color="inherit"
								>
									<Button variant="contained" fullWidth>
										Scribe 2
									</Button>
								</Link>
							</Grid>
							<Grid item xs>
								<Link
									component={RouterLink}
									to="/scribe/3"
									color="inherit"
								>
									<Button variant="contained" fullWidth>
										Scribe 3
									</Button>
								</Link>
							</Grid>
						</Grid>
					</Paper>
				)
			}
		}
	}

	return (
		<Paper>
			<h1>No Competition Selected</h1>

			<p>Please select a competition and event to get started</p>

			<SelectorDisplay />
		</Paper>
	)
}

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
export default Judging
