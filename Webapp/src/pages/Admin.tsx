import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import Alert from "@mui/material/Alert"
import Grid from "@mui/material/Grid2"
import Typography from "@mui/material/Typography"
import { useSelector } from "react-redux"
import { HeatSummaryTable } from "../components/competition/HeatSummaryTable"
import { SelectorDisplay } from "../components/competition/MainSelector"
import { MakeHeatPDFs } from "../components/competition/MakeHeatPDFs"
import { PhaseScoreTable } from "../components/competition/PhaseScoretable"
import { PromotePhase } from "../components/competition/PromotePhase"
import UploadCsv from "../components/competition/UploadCsv"
import { getSelectedHeat } from "../redux/atoms/competitions"

export default function Admin() {
	const selectedHeat = useSelector(getSelectedHeat)

	return (
		<>
			<Accordion sx={{ marginTop: "0.5em" }}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1-content"
					id="panel1-header"
				>
					Manage Competition Structure
				</AccordionSummary>
				<AccordionDetails>
					<Alert severity="info">
						We recommend only making the first phases of
						competitions (e.g. "Preliminaries"), then using the
						"Promote Phase" option below to automatically select the
						top athletes and assign them randomly to heats.
					</Alert>
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
						<Grid size={3}>
							<SelectorDisplay
								showCompetition={true}
								showPhase={false}
								showEvent={false}
								vertical={true}
							/>
						</Grid>
						<Grid size={9}>
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
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1-content"
					id="panel1-header"
				>
					Promote top Athletes to next Phase
				</AccordionSummary>
				<AccordionDetails>
					<PromotePhase />
				</AccordionDetails>{" "}
			</Accordion>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1-content"
					id="panel1-header"
				>
					Create Many Heat PDFs
				</AccordionSummary>
				<AccordionDetails>
					<MakeHeatPDFs />
				</AccordionDetails>{" "}
			</Accordion>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1-content"
					id="panel1-header"
				>
					Create Phase Result PDFs
				</AccordionSummary>
				<AccordionDetails>
					<PhaseScoreTable />
				</AccordionDetails>{" "}
			</Accordion>
			{process.env.NEXT_PUBLIC_SHOW_CSV_UPLOAD === "true" && (
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1-content"
						id="panel1-header"
					>
						Upload Paddlers from CSV
					</AccordionSummary>
					<AccordionDetails>
						<UploadCsv />
					</AccordionDetails>{" "}
				</Accordion>
			)}
		</>
	)
}
