import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"

import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid2"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import {
	getSelectedCompetition,
	getSelectedEvent,
	getSelectedPhase
} from "../../redux/atoms/competitions"
import {
	useGetManyByPkFromPhaseEventEventPkIdPhaseGetQuery,
	useGetManyHeatGetQuery,
	usePromotePhaseCompetitionManagementPromotePhasePostMutation
} from "../../redux/services/aemsApi"
import { SelectorDisplay } from "./MainSelector"
export const PromotePhase = () => {
	const [numberOfRuns, setNumberOfRuns] = useState<number>(3)
	const [numberOfJudges, setNumberOfJudges] = useState<number>(3)
	const [numberOfScoringRuns, setNumberOfScoringRuns] = useState<number>(2)
	const [numberOfAthletes, setNumberOfAthletes] = useState<number>(3)
	const [phaseName, setPhaseName] = useState<string>("")
	const [postPromotedPhase] =
		usePromotePhaseCompetitionManagementPromotePhasePostMutation()
	const [newHeatNames, setNewHeatNames] = useState<string[]>([])
	const [newHeatName, setNewHeatName] = useState<string>("")
	const phaseId = useSelector(getSelectedPhase)
	const selectedCompetition = useSelector(getSelectedCompetition)
	const submitForm = async () => {
		if (newHeatNames.length === 0) {
			toast.error("Please set at least one heat name")
		}
		await postPromotedPhase({
			newPhaseInfo: {
				new_heat_names: newHeatNames,
				phase_id: phaseId,
				new_phase_name: phaseName,
				number_of_paddlers: numberOfAthletes,
				number_of_runs: numberOfRuns,
				number_of_runs_for_score: numberOfScoringRuns,
				number_of_judges: numberOfJudges
			}
		})
		await refetchHeats()
		await refetchPhases()
		toast.success(`Created New Phase ${phaseName} and associated heat`)
	}
	const { refetch: refetchHeats } = useGetManyHeatGetQuery(
		{
			competitionIdList: [selectedCompetition]
		},
		{ skip: !selectedCompetition }
	)
	const selectedEvent = useSelector(getSelectedEvent)
	const { refetch: refetchPhases } =
		useGetManyByPkFromPhaseEventEventPkIdPhaseGetQuery(
			{
				eventPkId: selectedEvent,
				joinForeignTable: ["event"]
			},
			{ skip: !selectedEvent }
		)

	const handleAddNewHeat = () => {
		if (!newHeatName) {
			toast.error("Please add a name to the new heat")
		} else {
			setNewHeatNames([...newHeatNames, newHeatName])
			setNewHeatName("")
		}
	}

	return (
		<Grid
			container
			spacing="1em"
			width="100%"
			alignSelf="center"
			sx={{ padding: "1em", height: "100%" }}
		>
			<Grid size={10}>
				<Alert severity="info">
					If the cuttoff rank is tied between multiple athletes, all
					athletes involved in the tie will progress to the next
					round, unless their score is zero.
				</Alert>
			</Grid>
			<Grid size={5}>
				<SelectorDisplay showHeat={false} vertical />
			</Grid>
			<Grid size={5}>
				<Grid container spacing="1em">
					<Grid size={12}>
						<TextField
							error={!phaseName}
							helperText={!phaseName && "Please name the Phase."}
							label="New Phase Name"
							variant="outlined"
							fullWidth
							onChange={(
								event: React.ChangeEvent<HTMLInputElement>
							): void => setPhaseName(event.target.value)}
							value={phaseName}
						/>
					</Grid>
					<Grid size={12}>
						<TextField
							label="Number of Athletes to Promote"
							variant="outlined"
							fullWidth
							type="number"
							error={!numberOfAthletes}
							helperText={
								!numberOfAthletes &&
								"Plese select a non-zero number of athletes."
							}
							onChange={(
								event: React.ChangeEvent<HTMLInputElement>
							): void =>
								setNumberOfAthletes(
									event.target.value as unknown as number
								)
							}
							value={numberOfAthletes}
						/>
					</Grid>
					<Grid size={12}>
						<TextField
							label="Number of Runs"
							variant="outlined"
							fullWidth
							type="number"
							onChange={(
								event: React.ChangeEvent<HTMLInputElement>
							): void =>
								setNumberOfRuns(
									event.target.value as unknown as number
								)
							}
							value={numberOfRuns}
						/>
					</Grid>
					<Grid size={12}>
						<TextField
							label="Number of Scoring Runs"
							variant="outlined"
							fullWidth
							type="number"
							onChange={(
								event: React.ChangeEvent<HTMLInputElement>
							): void =>
								setNumberOfScoringRuns(
									event.target.value as unknown as number
								)
							}
							value={numberOfScoringRuns}
						/>
					</Grid>
					<Grid size={12}>
						<TextField
							label="Number of Judges"
							variant="outlined"
							fullWidth
							type="number"
							onChange={(
								event: React.ChangeEvent<HTMLInputElement>
							): void =>
								setNumberOfJudges(
									event.target.value as unknown as number
								)
							}
							value={numberOfJudges}
						/>
					</Grid>
					<Grid size={12}>
						<Paper sx={{ padding: "0.5em" }}>
							<Grid container spacing={2}>
								{newHeatNames.map((h: string, i) => (
									<Grid key={i} size={12}>
										<TextField
											label={`New Heat: ${i + 1}`}
											variant="outlined"
											fullWidth
											error={
												!h ||
												newHeatNames.filter(
													(j) => j === h
												).length !== 1
											}
											helperText={
												!h
													? "Please give the Heat a name."
													: newHeatNames.filter(
															(j) => j === h
													  ).length !== 1 &&
													  "Multiple heats cannot have the same name."
											}
											onChange={(
												event: React.ChangeEvent<HTMLInputElement>
											): void => {
												const updatedNewHeatNames = [
													...newHeatNames
												]
												updatedNewHeatNames[i] =
													event.target.value
												setNewHeatNames(
													updatedNewHeatNames
												)
											}}
											value={h}
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<IconButton
															aria-label="toggle password visibility"
															onClick={() => {
																const updatedNewHeatNames =
																	newHeatNames.filter(
																		(
																			item
																		) =>
																			item !==
																			h
																	)
																setNewHeatNames(
																	updatedNewHeatNames
																)
															}}
															edge="end"
														>
															<DeleteIcon />
														</IconButton>
													</InputAdornment>
												)
											}}
										/>
									</Grid>
								))}
								<Grid size={12}>
									{" "}
									<TextField
										label="New Heat Name"
										variant="outlined"
										fullWidth
										value={newHeatName}
										helperText={
											newHeatNames.length === 0 &&
											"Please add at least one heat"
										}
										onChange={(
											event: React.ChangeEvent<HTMLInputElement>
										): void => {
											setNewHeatName(event.target.value)
										}}
										onKeyUp={(event) => {
											if (event.key === "Enter") {
												handleAddNewHeat()
											}
										}}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle password visibility"
														onClick={() => {
															handleAddNewHeat()
														}}
														edge="end"
													>
														<AddIcon />
													</IconButton>
												</InputAdornment>
											)
										}}
									/>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid size={12}>
						<Button
							variant="contained"
							fullWidth
							disabled={
								!phaseName ||
								!numberOfAthletes ||
								newHeatNames.length === 0 ||
								!phaseId
							}
							onClick={() => void submitForm()}
						>
							Create Phase
						</Button>
					</Grid>{" "}
				</Grid>
			</Grid>
		</Grid>
	)
}
