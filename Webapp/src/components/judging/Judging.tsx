import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import { useSelector } from "react-redux"
import { Link as RouterLink } from "react-router-dom"
import {
	getSelectedCompetition,
	getSelectedEvent,
	getSelectedHeat,
	getSelectedPhase
} from "../../redux/atoms/competitions"

import { HeatSummaryTable } from "../competition/HeatSummaryTable"
import { SelectorDisplay } from "../competition/MainSelector"
// eslint-disable-next-line complexity

// const competitionsThing = getCompetitionsFromServer()

// const CompetitionSelector = React.lazy(
// 	() => import("../competition/CompetitionSelector")
// )
const Judging = () => {
	// eslint-disable-next-line @typescript-eslint/explicit-member-accessibility

	const selectedCompetition = useSelector(getSelectedCompetition)
	const selectedEvent = useSelector(getSelectedEvent)
	const selectedPhase = useSelector(getSelectedPhase)
	const selectedHeat = useSelector(getSelectedHeat)

	// eslint-disable-next-line complexity
	const competition = selectedCompetition
	const event = selectedEvent
	const phase = selectedPhase
	const heat = selectedHeat
	if (competition && event && phase && heat) {
		if (competition) {
			if (event) {
				return (
					<Grid container spacing={2} alignItems="flex-start">
						<Grid item xs={12}>
							<Paper sx={{ padding: "1em" }}>
								<Grid
									container
									spacing={2}
									alignItems={"stretch"}
								>
									<Grid item xs={12}>
										<h1>Scribes</h1>
									</Grid>
									<Grid item xs>
										<Link
											component={RouterLink}
											to="/scribe/1"
											color="inherit"
										>
											<Button
												variant="contained"
												fullWidth
											>
												Scribe 1
											</Button>
										</Link>
									</Grid>
									<Grid item xs>
										<Link
											component={RouterLink}
											to="/scribe/2"
											color="inherit"
										>
											<Button
												variant="contained"
												fullWidth
											>
												Scribe 2
											</Button>
										</Link>
									</Grid>
									<Grid item xs>
										<Link
											component={RouterLink}
											to="/scribe/3"
											color="inherit"
										>
											<Button
												variant="contained"
												fullWidth
											>
												Scribe 3
											</Button>
										</Link>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
						<Grid item xs={12}>
							<HeatSummaryTable />
						</Grid>
					</Grid>
				)
			}
		}
	}

	return (
		<Grid container alignItems="stretch">
			<Grid item xs={12}>
				<SelectorDisplay />
			</Grid>
		</Grid>
	)
}

export default Judging
