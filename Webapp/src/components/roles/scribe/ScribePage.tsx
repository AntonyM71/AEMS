import Grid from "@mui/material/Grid"
import { useDispatch, useSelector } from "react-redux"

import { useEffect } from "react"
import { getSelectedHeat } from "../../../redux/atoms/competitions"

import { updateUserRole } from "../../../redux/atoms/scoring"
import { SelectorDisplay } from "../../competition/MainSelector"
import Float from "./Scribe"

// eslint-disable-next-line complexity
const Scribe = ({ scribeNumber }: { scribeNumber: string }) => {
	const dispatch = useDispatch()

	const selectedHeat = useSelector(getSelectedHeat)
	useEffect(() => {
		dispatch(updateUserRole(`Scribe ${scribeNumber}`))
	})

	if (selectedHeat) {
		return (
			<Grid container spacing={2} alignContent="stretch">
				<Grid item xs={12}>
					<SelectorDisplay showDetailed={false} />
				</Grid>
				<Grid item xs={12}>
					<Float scribeNumber={scribeNumber} />
				</Grid>
			</Grid>
		)
	}
}

export default Scribe
