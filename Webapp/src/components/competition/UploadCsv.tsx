import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Input from "@mui/material/Input"
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
export default () => (
	<Grid container spacing={1}>
		<Grid item xs={12}>
			Required File Format:{" "}
		</Grid>
		<Grid item xs={12}>
			<CSVFormatTable />
		</Grid>{" "}
		<Grid item xs={12}>
			<UploadForm />
		</Grid>
	</Grid>
)

const CSVFormatTable = () => {
	const createData = (name: string, format: string) => ({ name, format })

	const rows = [createData("First Name", "string")]

	return (
		<TableContainer component={Paper} sx={{ width: "50%" }}>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Format</TableCell>
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
	const [competitionName, setCompetitionName] = useState<string>("")
	const [file, setFile] = useState<Blob>(new Blob())

	const formData = new FormData()
	const handleFileUpload: ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = (event) => {
		// @ts-ignore
		if (event.target && event.target.files) {
			// get the selected file from the input
			// @ts-ignore
			const fileData = event.target?.files![0] as Blob
			// create a new FormData object and append the file to it
			setFile(fileData)
			formData.append("file", file)

			// make a POST request to the File Upload API with the FormData object and Rapid API headers
		}
	}
	const onSubmit = () => {
		formData.append("competition_name", competitionName)
		formData.append("file", file)

		axios
			.post(
				`http://localhost:${
					process.env.NEXT_PUBLIC_SERVER_PORT || 8000
				}/upload`,
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
	}

	// render a simple input element with an onChange event listener that calls the handleFileUpload function
	return (
		<div>
			<Input type="file" onChange={handleFileUpload} />
			<TextField
				label="Competition Name"
				onChange={(e) => setCompetitionName(e.target.value)}
			/>
			<Button onClick={onSubmit}>Submit</Button>
		</div>
	)
}
