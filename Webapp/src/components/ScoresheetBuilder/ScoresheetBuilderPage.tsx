import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { useState } from "react"
import { SelectScoresheet } from "../judging/ScoresheetSelector"
import { AddScoresheet } from "./AddScoresheet"
import { ScoresheetMoves } from "./ScoresheetBuilder"

export const ScoresheetBuilder = () => {
	const [selectedScoresheet, setSelectedScoresheet] = useState<string>("")

	return (
		<Grid container spacing={2}>
			<Grid item xs={2}>
				<Paper sx={{ padding: "1em" }}>
					<SelectScoresheet
						setSelectedScoresheet={setSelectedScoresheet}
						selectedScoresheet={selectedScoresheet}
					/>
					<AddScoresheet
						setSelectedScoresheet={setSelectedScoresheet}
					/>
				</Paper>
			</Grid>
			<Grid item xs={10}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						{selectedScoresheet ? (
							<ScoresheetMoves
								selectedScoresheet={selectedScoresheet}
							/>
						) : (
							<h4>
								Select an existing scoresheet or make a new one
								to start building!
							</h4>
						)}
					</Grid>
					<Grid item xs={12}></Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default ScoresheetBuilder
