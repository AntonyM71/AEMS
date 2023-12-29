import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import RouterLink from "next/link"
import { useSelector } from "react-redux"
import {
	getSelectedCompetition,
	getSelectedEvent,
	getSelectedHeat,
	getSelectedPhase
} from "../../redux/atoms/competitions"

import { HeatSummaryTable } from "../../components/competition/HeatSummaryTable"
import { SelectorDisplay } from "../../components/competition/MainSelector"

const Judging = () => {
	const selectedCompetition = useSelector(getSelectedCompetition)
	const selectedEvent = useSelector(getSelectedEvent)
	const selectedPhase = useSelector(getSelectedPhase)
	const selectedHeat = useSelector(getSelectedHeat)

	const competition = selectedCompetition
	const event = selectedEvent
	const phase = selectedPhase
	const heat = selectedHeat
	if (heat) {
		return (
			<Grid
				container
				spacing={1}
				alignItems="flex-start"
				sx={{ paddingTop: "0.5em" }}
			>
				<Grid item xs={12}>
					<Paper sx={{ padding: "1em" }}>
						<Grid container spacing={1} alignItems={"stretch"}>
							<Grid item xs>
								<Link
									component={RouterLink}
									href="/scribe/1"
									color="inherit"
								>
									<Button variant="contained" fullWidth>
										Scribe 1
									</Button>
								</Link>
							</Grid>
							<Grid item xs>
								<Link
									component={RouterLink}
									href="/scribe/2"
									color="inherit"
								>
									<Button variant="contained" fullWidth>
										Scribe 2
									</Button>
								</Link>
							</Grid>
							<Grid item xs>
								<Link
									component={RouterLink}
									href="/scribe/3"
									color="inherit"
								>
									<Button variant="contained" fullWidth>
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

	return (
		<Grid container alignItems="stretch" sx={{ paddingTop: "0.5em" }}>
			<Grid item xs={12}>
				<SelectorDisplay
					showDetailed={false}
					showEvent={false}
					showPhase={false}
				/>
			</Grid>
		</Grid>
	)
}

export default Judging
