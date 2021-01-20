import React from "react"
import { useRecoilState } from "recoil"
import {
	selectedCompetitionState,
	selectedEventState,
	selectedPhaseState
} from "../../../atoms"
import {
	competitionsType,
	eventType,
	getCompetitions,
	phaseType
} from "../../../Competitions"
import CompetitionSelector from "../../competition/competitionSelector"
import EventSelector from "../../competition/EventSelector"
import PhaseSelector from "../../competition/PhaseSelector"
import Float from "../sheets/Float/Float"
import Squirt from "../sheets/Squirt/Squirt"
// import Squirt from "../sheets/Squirt";

// eslint-disable-next-line complexity
interface scribePropsType {
	competitions: competitionsType[]
}
// eslint-disable-next-line complexity
const Scribe = () => {
	const competitions = getCompetitions()
	const [competition] = useRecoilState(selectedCompetitionState)
	const [event] = useRecoilState(selectedEventState)
	const [phase] = useRecoilState(selectedPhaseState)

	const getCompetitionObject = (): competitionsType =>
		competitions.filter((c) => c.id === competition)[0]

	const getEventObject = (competitionObject: competitionsType): eventType =>
		competitionObject.events.filter((e) => e.id === event)[0]

	const getPhaseObject = (eventObject: eventType): phaseType =>
		eventObject.phases.filter((p) => p.id === phase)[0]

	let result

	if (competition && event && phase) {
		const competitionObject = getCompetitionObject()
		if (competitionObject) {
			const eventObject = getEventObject(competitionObject)
			if (eventObject) {
				const phaseObject = getPhaseObject(eventObject)
				if (phaseObject) {
					result = (
						<div className="mainContentPage">
							<h1>
								{competitionObject.name},{eventObject.name},
								{phaseObject.name}, Heat X, Athlete Y, Run Z
							</h1>
							{eventObject.format === "FLOAT" ? (
								<Float />
							) : (
								<Squirt />
							)}
						</div>
					)
				}
			}
		}
	}

	if (!result) {
		result = (
			<div className="mainContentPage">
				<h1>Leaderboard</h1>
				<p>
					Please select a competition, event and phase to get started
					<CompetitionSelector competitions={competitions} />
					<EventSelector competitions={competitions} />
					<PhaseSelector competitions={competitions} />
				</p>
			</div>
		)
	}

	return result
}

export default Scribe
