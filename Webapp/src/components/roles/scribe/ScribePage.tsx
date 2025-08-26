import Grid from "@mui/material/Grid2"
import { useDispatch, useSelector } from "react-redux"

import { useEffect } from "react"
import { getSelectedHeat } from "../../../redux/atoms/competitions"

import { updateUserRole } from "../../../redux/atoms/scoring"
import { SelectorDisplay } from "../../competition/MainSelector"
import Float from "./Scribe"

const Scribe = ({ scribeNumber }: { scribeNumber: string }) => {
	const dispatch = useDispatch()

	const selectedHeat = useSelector(getSelectedHeat)
	useEffect(() => {
		dispatch(updateUserRole(`Scribe ${scribeNumber}`))
	})

	if (selectedHeat) {
		return (
			<Grid
				container
				spacing={1}
				alignContent="stretch"
				sx={{ paddingTop: "0.5em" }}
				data-testid="scribe-grid"
			>
				<Grid size={12}>
					<Float scribeNumber={scribeNumber} />
				</Grid>
			</Grid>
		)
	} else {
		return (
			<SelectorDisplay
				showCompetition={true}
				showEvent={false}
				showPhase={false}
				showHeat={true}
			/>
		)
	}
}

export default Scribe
