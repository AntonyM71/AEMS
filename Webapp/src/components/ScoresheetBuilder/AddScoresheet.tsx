import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import toast from "react-hot-toast"
import { v4 } from "uuid"
import {
	useGetManyScoresheetGetQuery,
	useInsertManyScoresheetPostMutation
} from "../../redux/services/aemsApi"

export const AddScoresheet = ({
	setSelectedScoresheet
}: {
	setSelectedScoresheet: React.Dispatch<React.SetStateAction<string>>
}) => {
	const [postNewScoresheet] = useInsertManyScoresheetPostMutation()
	const [scoresheetName, setScoresheetName] = useState<string>("")
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setScoresheetName(event.target.value)
	}
	const { refetch } = useGetManyScoresheetGetQuery({})
	const submitScoresheet = async (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter") {
			if (scoresheetName) {
				const newScoresheetId = v4()
				await postNewScoresheet({
					body: [{ name: scoresheetName, id: newScoresheetId }]
				})
				await refetch()
				toast.success("Successfully added Scoresheet")
				setSelectedScoresheet(newScoresheetId)
				setScoresheetName("")
			} else {
				toast.error(
					"Please add a name before submitting a new Scoresheet"
				)
			}
		}
	}

	return (
		<Grid container spacing={1}>
			<Grid item xs={12}>
				<hr></hr>
			</Grid>
			<Grid item xs={12}>
				<h4>Add New Scoresheet</h4>
			</Grid>
			<Grid item xs={12}>
				<TextField
					label="New Scoresheet"
					variant="outlined"
					fullWidth
					onChange={handleChange}
					value={scoresheetName}
					onKeyUp={submitScoresheet}
				/>
			</Grid>
		</Grid>
	)
}
