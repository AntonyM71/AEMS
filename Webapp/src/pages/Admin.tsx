import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { useSelector } from "react-redux"
import { HeatSummaryTable } from "../components/competition/HeatSummaryTable"
import { SelectorDisplay } from "../components/competition/MainSelector"
import { getSelectedHeat } from "../redux/atoms/competitions"

export default function Admin() {
	const selectedHeat = useSelector(getSelectedHeat)

	return (
		<>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1-content"
					id="panel1-header"
				>
					Manage Competition Structure
				</AccordionSummary>
				<AccordionDetails>
					<SelectorDisplay showDetailed={true} />
				</AccordionDetails>{" "}
			</Accordion>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1-content"
					id="panel1-header"
				>
					Manage Paddlers in Heat{" "}
				</AccordionSummary>
				<AccordionDetails>
					<Grid container spacing={1}>
						<Grid item xs={3}>
							<SelectorDisplay
								showCompetition={true}
								showPhase={false}
								showEvent={false}
								vertical={true}
							/>
						</Grid>
						<Grid item xs={9}>
							{selectedHeat ? (
								<HeatSummaryTable showAddAthletes={true} />
							) : (
								<Typography>
									Please select a heat to manage
								</Typography>
							)}
						</Grid>
					</Grid>
				</AccordionDetails>
			</Accordion>
		</>
	)
}
