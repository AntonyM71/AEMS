import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"

import {
	competitionsType,
	eventType,
	getCompetitions,
	phaseType
} from "../../../competitiondata/Competitions"
import {
	getSelectedCompetition,
	getSelectedEvent,
	getSelectedHeat,
	getSelectedPhase
} from "../../../redux/atoms/competitions"

import { SelectorDisplay } from "../Judging"
import Float from "../sheets/Float/Float"
import Squirt from "../sheets/Squirt/Squirt"

// import Squirt from "../sheets/Squirt";

// eslint-disable-next-line complexity

// eslint-disable-next-line complexity
const Scribe = () => {
	const competitions = getCompetitions()
	const competition = useSelector(getSelectedCompetition)
	const event = useSelector(getSelectedEvent)
	const phase = useSelector(getSelectedPhase)
	const selectedHeat = useSelector(getSelectedHeat)
	const getCompetitionObject = (): competitionsType =>
		competitions.filter((c) => c.id === competition)[0]

	const getEventObject = (competitionObject: competitionsType): eventType =>
		competitionObject.events.filter((e) => e.id === event)[0]

	const getPhaseObject = (eventObject: eventType): phaseType =>
		eventObject.phases.filter((p) => p.id === phase)[0]

	if (competition && event && phase && selectedHeat) {
		const competitionObject = getCompetitionObject()
		if (competitionObject) {
			const eventObject = getEventObject(competitionObject)
			if (eventObject) {
				const phaseObject = getPhaseObject(eventObject)
				if (phaseObject) {
					return (
						<Grid container spacing={2} alignContent="stretch">
							<Grid item xs={12}>
								<Paper>
									<SelectorDisplay />
								</Paper>
							</Grid>
							<Grid item xs={12}>
								{eventObject.format === "FLOAT" ? (
									<Float />
								) : (
									<Squirt />
								)}
							</Grid>
						</Grid>
					)
				}
			}
		}
	}

	// if we lose the selection into (refresh), return to the judging page
	return <Redirect to="/judging" />
}

export default Scribe
