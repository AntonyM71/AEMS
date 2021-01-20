import React, { Fragment } from "react"
import { useRecoilState } from "recoil"
import { selectedCompetitionState } from "../../atoms"
import { competitionsType } from "../../Competitions"

interface propsType {
	competitions: competitionsType[]
}

const CompetitionSelector = ({ competitions }: propsType) => {
	const [selectedCompetition, setSelectedCompetition] = useRecoilState(
		selectedCompetitionState
	)
	const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCompetition(event.target.value)
	}

	return (
		<Fragment>
			<select value={selectedCompetition} onChange={onSelect}>
				<option value="">Select Competition</option>
				{competitions.map((competition) => (
					<option key={competition.id} value={competition.id}>
						{competition.name}
					</option>
				))}
			</select>
		</Fragment>
	)
}

export default CompetitionSelector
