import { Button, Grid, Link, Paper } from "@material-ui/core"
import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { useRecoilState } from "recoil"
import {
	competitionsType,
	getCompetitions
} from "../../competitiondata/Competitions"
import {
	selectedCompetitionState,
	selectedEventState,
	selectedHeatState,
	selectedPhaseState
} from "../../recoil/atoms/scoring"
import { useStyles } from "../../style/Styles"
import CompetitionSelector from "../competition/CompetitionSelector"
import EventSelector from "../competition/EventSelector"
import { HeatsSelector } from "../competition/HeatSelector"
import PhaseSelector from "../competition/PhaseSelector"
// eslint-disable-next-line complexity

const Judging = () => {
	// eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
	const classes = useStyles()

	const [selectedCompetition] = useRecoilState(selectedCompetitionState)
	const [selectedEvent] = useRecoilState(selectedEventState)
	const [selectedPhase] = useRecoilState(selectedPhaseState)
	const [selectedHeat] = useRecoilState(selectedHeatState)
	const competitions = getCompetitions()
	const getCompetitionObject = () =>
		competitions.filter((c) => c.id === selectedCompetition)[0]

	// eslint-disable-next-line complexity
	const competition = selectedCompetition
	const event = selectedEvent
	const phase = selectedPhase
	const heat = selectedHeat
	if (competition && event && phase && heat.name) {
		const competitionObject: competitionsType = getCompetitionObject()
		if (competition) {
			if (event) {
				return (
					<Paper className={classes.marginPaper}>
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
		<Paper className={classes.marginPaper}>
			<h1>No Competition Selected</h1>

			<p>Please select a competition and event to get started</p>

			<SelectorDisplay />
		</Paper>
	)
}

export const SelectorDisplay = () => {
	const competitions = getCompetitions()

	return (
		<Grid container spacing={3} alignItems={"stretch"}>
			<Grid item xs>
				<CompetitionSelector competitions={competitions} />
			</Grid>
			<Grid item xs>
				<EventSelector competitions={competitions} />
			</Grid>
			<Grid item xs>
				<PhaseSelector competitions={competitions} />
			</Grid>
			<Grid item xs>
				<HeatsSelector />
			</Grid>
		</Grid>
	)
}

export default Judging
