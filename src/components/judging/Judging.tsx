import { Link } from "@material-ui/core"
import { Link as RouterLink } from "react-router-dom"
import { useRecoilState } from "recoil"
import {
	selectedCompetitionState,
	selectedEventState,
	selectedPhaseState
} from "../../atoms"
import {
	competitionsType,
	eventType,
	getCompetitions,
	phaseType
} from "../../Competitions"
import CompetitionSelector from "../competition/competitionSelector"
import EventSelector from "../competition/EventSelector"
import PhaseSelector from "../competition/PhaseSelector"

// eslint-disable-next-line complexity
const Judging = () => {
	// eslint-disable-next-line @typescript-eslint/explicit-member-accessibility

	const [selectedCompetition] = useRecoilState(selectedCompetitionState)
	const [selectedEvent] = useRecoilState(selectedEventState)
	const [selectedPhase] = useRecoilState(selectedPhaseState)

	const competitions = getCompetitions()
	const getCompetitionObject = () =>
		competitions.filter((c) => c.id === selectedCompetition)[0]

	// eslint-disable-next-line complexity
	let result
	const competition = selectedCompetition || selectedCompetition
	const event = selectedEvent || selectedEvent
	const phase = selectedPhase || selectedPhase
	if (competition && event && phase) {
		const competitionObject: competitionsType = getCompetitionObject()
		if (competitionObject) {
			const eventObject: eventType = getEventObject(
				competitionObject,
				event
			)
			if (eventObject) {
				const phaseObject = getPhaseObject(eventObject, phase)
				if (phaseObject) {
					result = (
						<div className="mainContentPage">
							<h1>Judging</h1>
							<div className="mainContentContainer">
								<div className="mainContentContainerItem flexGrowMost">
									<h2>
										{competitionObject.name},{" "}
										{eventObject.name}
									</h2>

									<Link
										component={RouterLink}
										to="/scribe/1"
										color="inherit"
									>
										{" "}
										Judge 1
									</Link>
									<Link
										component={RouterLink}
										to="/scribe/2"
										color="inherit"
									>
										Judge 2
									</Link>
									<Link
										component={RouterLink}
										to="/scribe/3"
										color="inherit"
									>
										{" "}
										Judge 3
									</Link>
								</div>
							</div>
						</div>
					)
				}
			}
		}
	}

	if (!result) {
		result = (
			<div className="mainContentPage">
				<h1>No Competition Selected</h1>
				<p>Please select a competition and event to get started</p>
				<CompetitionSelector competitions={competitions} />
				<EventSelector competitions={competitions} />
				<PhaseSelector competitions={competitions} />
			</div>
		)
	}

	return result
}

const getEventObject = (competition: competitionsType, event: string) =>
	competition.events.filter((e) => e.id === event)[0]

const getPhaseObject = (event: eventType, phase: string): phaseType[] =>
	event.phases.filter((p: phaseType) => p.id === phase)

export default Judging
