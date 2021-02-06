import { Grid, Paper } from "@material-ui/core"
import React from "react"
import { Redirect } from "react-router-dom"
import { useRecoilState } from "recoil"
import {
	selectedCompetitionState,
	selectedEventState,
	selectedHeatState,
	selectedPhaseState
} from "../../../atoms"
import {
	competitionsType,
	eventType,
	getCompetitions,
	phaseType
} from "../../../Competitions"
import { SelectorDisplay } from "../Judging"
import Float from "../sheets/Float/Float"
import { useFloatStyles } from "../sheets/Float/FloatStyles"
import Squirt from "../sheets/Squirt/Squirt"

// import Squirt from "../sheets/Squirt";

// eslint-disable-next-line complexity

// eslint-disable-next-line complexity
const Scribe = () => {
	const classes = useFloatStyles()
	const competitions = getCompetitions()
	const [competition] = useRecoilState(selectedCompetitionState)
	const [event] = useRecoilState(selectedEventState)
	const [phase] = useRecoilState(selectedPhaseState)
	const [selectedHeat] = useRecoilState(selectedHeatState)
	const getCompetitionObject = (): competitionsType =>
		competitions.filter((c) => c.id === competition)[0]

	const getEventObject = (competitionObject: competitionsType): eventType =>
		competitionObject.events.filter((e) => e.id === event)[0]

	const getPhaseObject = (eventObject: eventType): phaseType =>
		eventObject.phases.filter((p) => p.id === phase)[0]

	if (competition && event && phase && selectedHeat.id) {
		const competitionObject = getCompetitionObject()
		if (competitionObject) {
			const eventObject = getEventObject(competitionObject)
			if (eventObject) {
				const phaseObject = getPhaseObject(eventObject)
				if (phaseObject) {
					return (
						<Grid
							container
							spacing={2}
							className={classes.main}
							alignContent="stretch"
						>
							<Grid item xs={12}>
								<Paper className={classes.headerPaper}>
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
