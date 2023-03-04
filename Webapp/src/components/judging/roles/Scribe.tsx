import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"

import {
	getSelectedCompetition,
	getSelectedEvent,
	getSelectedHeat,
	getSelectedPhase
} from "../../../redux/atoms/competitions"

import SelectorDisplay from "../Judging"
import Float from "../sheets/Float/Float"
import Squirt from "../sheets/Squirt/Squirt"

// import Squirt from "../sheets/Squirt";

// eslint-disable-next-line complexity

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
					<Paper>
						<SelectorDisplay />
					</Paper>
				</Grid>
				<Grid item xs={12}>
					{isFloat() ? <Float /> : <Squirt />}
				</Grid>
			</Grid>
		)
	}

	// if we lose the selection into (refresh), return to the judging page
	return <Redirect to="/judging" />
}

export default Scribe
