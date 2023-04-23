import Grid from "@mui/material/Grid"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"

import {
	getSelectedCompetition,
	getSelectedEvent,
	getSelectedHeat,
	getSelectedPhase
} from "../../../redux/atoms/competitions"

import { SelectorDisplay } from "../../competition/MainSelector"
import Float from "../sheets/Float/Float"

// eslint-disable-next-line complexity
const Scribe = () => {
	const competition = useSelector(getSelectedCompetition)
	const event = useSelector(getSelectedEvent)
	const phase = useSelector(getSelectedPhase)
	const selectedHeat = useSelector(getSelectedHeat)
	const isFloat = () => true
	if (competition && event && phase && selectedHeat) {
		return (
			<Grid container spacing={2} alignContent="stretch">
				<Grid item xs={12}>
					<SelectorDisplay showDetailed={false} />
				</Grid>
				<Grid item xs={12}>
					<Float />
				</Grid>
			</Grid>
		)
	}

	// if we lose the selection into (refresh), return to the judging page
	return <Redirect to="/judging" />
}

export default Scribe
