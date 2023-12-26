import Grid from "@mui/material/Grid"
import { SelectorDisplay } from "../components/competition/MainSelector"

export default function Score() {
	return (
		<Grid container alignItems="stretch" sx={{ paddingTop: "1em" }}>
			<Grid item xs={12}>
				<SelectorDisplay showDetailed={true} />
			</Grid>
		</Grid>
	)
}
