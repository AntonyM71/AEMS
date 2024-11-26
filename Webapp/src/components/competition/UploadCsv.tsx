import UploadIcon from "@mui/icons-material/Upload"
import { Divider, IconButton } from "@mui/material"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TextField from "@mui/material/TextField"
import axios, { AxiosError } from "axios"
import { ChangeEventHandler, useState } from "react"
import toast from "react-hot-toast"
import { SelectScoresheet } from "../judging/ScoresheetSelector"
export default () => (
	<Grid container spacing={3}>
		<Grid item xs={12}>
			Required File Format:{" "}
		</Grid>
		<Grid item xs={12}>
			<CSVFormatTable />
		</Grid>
		<Grid item xs={12}>
			{" "}
			<Divider />{" "}
		</Grid>
		<Grid item xs={12}>
			<UploadForm />
		</Grid>
	</Grid>
)

const CSVFormatTable = () => {
	const createData = (name: string, format: string) => ({ name, format })

	const rows = [
		createData("first_name", "string"),
		createData("last_name", "string"),
		createData("bib", "integer"),
		createData("Heat", "integer"),
		createData("Event", "string")
	]

	return (
		<TableContainer component={Paper} sx={{ width: "50%" }}>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Column Name</TableCell>
						<TableCell>Data Format</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow
							key={row.name}
							sx={{
								"&:last-child td, &:last-child th": {
									border: 0
								}
							}}
						>
							<TableCell component="th" scope="row">
								{row.name}
							</TableCell>
							<TableCell>{row.format}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

const UploadForm = () => {
	const [fileName, setFileName] = useState<string>("")
	const [competitionName, setCompetitionName] = useState<string>("")
	const [scoresheetName, setScoresheetName] = useState<string>("")
	const [numberOfRuns, setNumberOfRuns] = useState<number>(3)
	const [numberOfScoringRuns, setNumberOfScoringRuns] = useState<number>(2)
	const [numberOfJudges, setNumberOfJudges] = useState<number>(2)
	const [file, setFile] = useState<Blob>(new Blob())

	const formData = new FormData()
	const handleFileUpload: ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = (event) => {
		// @ts-ignore
		if (event.target && event.target.files) {
			console.log(event.target)
			// get the selected file from the input
			// @ts-ignore
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			if (event.target?.files?.[0]) {
				// @ts-ignore
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				const fileData = event.target.files[0] as Blob
				// create a new FormData object and append the file to it
				setFile(fileData)
				// @ts-ignore
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				setFileName(event.target.files[0].name as string)
				formData.append("file", file)
			}
			// make a POST request to the File Upload API with the FormData object and Rapid API headers
		}
	}
	const onSubmit = () => {
		if (
			competitionName &&
			scoresheetName &&
			numberOfJudges &&
			numberOfRuns &&
			numberOfScoringRuns &&
			file
		) {
			formData.append("competition_name", competitionName)
			formData.append("scoresheet_name", scoresheetName)
			formData.append("number_of_runs", numberOfRuns.toString())
			formData.append(
				"number_of_runs_for_score",
				numberOfScoringRuns.toString()
			)
			formData.append("number_of_judges", numberOfJudges.toString())
			formData.append("file", file)

			axios
				.post(
					`${
						process.env.NEXT_PUBLIC_API_URL_DEV ?? "/api/"
					}competition_management/upload`,
					formData,
					{}
				)

				.then((response) => {
					// handle the response
					toast(JSON.stringify(response.data))
				})
				.catch((error: AxiosError) => {
					// handle errors
					toast.error(error.message.toString())
				})
		} else {
			toast.error("Please ensure all options are selected")
		}
	}

	// render a simple input element with an onChange event listener that calls the handleFileUpload function
	return (
		<Grid container spacing={2}>
			{" "}
			<Grid item xs={12}>
				<TextField
					label="Upload CSV or XLSX file"
					required
					error={!file || !fileName}
					value={fileName}
					InputProps={{
						readOnly: true,
						endAdornment: (
							<IconButton
								aria-label="upload"
								component="label" // THIS IS THE GENIUS CHANGE
							>
								<UploadIcon />
								<input
									hidden
									type="file"
									onChange={handleFileUpload}
								/>
							</IconButton>
						)
					}}
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					label="Competition Name"
					variant="outlined"
					fullWidth
					error={!competitionName}
					onChange={(e) => setCompetitionName(e.target.value)}
				/>
			</Grid>
			<Grid item xs={12}>
				<SelectScoresheet
					setSelectedScoresheet={setScoresheetName}
					selectedScoresheet={scoresheetName}
					useName={true}
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					label="Number of Runs"
					variant="outlined"
					fullWidth
					type="number"
					error={!numberOfRuns}
					onChange={(
						event: React.ChangeEvent<HTMLInputElement>
					): void =>
						setNumberOfRuns(event.target.value as unknown as number)
					}
					value={numberOfRuns}
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					label="Number of Scoring Runs"
					variant="outlined"
					fullWidth
					type="number"
					error={!numberOfScoringRuns}
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
			<Grid item xs={12}>
				<TextField
					label="Number of Judges"
					variant="outlined"
					fullWidth
					type="number"
					error={!numberOfJudges}
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
			<Grid item xs={12}>
				<Button
					variant="contained"
					disabled={
						!competitionName ||
						!scoresheetName ||
						!numberOfJudges ||
						!numberOfRuns ||
						!numberOfScoringRuns ||
						!file
					}
					onClick={onSubmit}
				>
					Submit
				</Button>
			</Grid>
		</Grid>
	)
}
