import { useSelector } from "react-redux"
import { competitionsType } from "../../competitiondata/Competitions"
import {
	getSelectedCompetition,
	getSelectedEvent,
	getSelectedPhase
} from "../../recoil/atoms/competitions"

const CompetitionStatus = (competition: competitionsType) => {
	const selectedCompetition = useSelector(getSelectedCompetition)
	const selectedEvent = useSelector(getSelectedEvent)
	const selectedPhase = useSelector(getSelectedPhase)

	return (
		<div className="mainContentContainerItem flexGrowLeast">
			<h2>
				{competition.name}
				<CurrentIndicator
					rendering={competition.id}
					current={selectedCompetition}
				/>
			</h2>
			<ul>
				{competition.events.map((event) => (
					<li key={event.id}>
						{event.name}
						<CurrentIndicator
							rendering={event.id}
							current={selectedEvent}
						/>
						<ul>
							{event.phases.map((phase) => (
								<li key={phase.id}>
									{phase.name}
									<CurrentIndicator
										rendering={phase.id}
										current={selectedPhase}
									/>
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>
		</div>
	)
}

export default CompetitionStatus

interface currentIndicatorPropsType {
	rendering: string
	current: string
}

const CurrentIndicator = (props: currentIndicatorPropsType) => {
	if (props.rendering === props.current) {
		return <span className="currentIndicator1">&nbsp;</span>
	} else {
		return <span className="currentIndicator0">&nbsp;</span>
	}
}
