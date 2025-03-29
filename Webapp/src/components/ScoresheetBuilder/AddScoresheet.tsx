import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid2"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import toast from "react-hot-toast"
import { v4 } from "uuid"
import {
	useGetManyScoresheetGetQuery,
	useInsertManyScoresheetPostMutation
} from "../../redux/services/aemsApi"
import { HandlePostResponse } from "../../utils/rtkQueryHelper"

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
				HandlePostResponse(
					await postNewScoresheet({
						insert: [{ name: scoresheetName, id: newScoresheetId }]
					})
				)
				await refetch()
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
			<Grid size={12}>
				<Divider sx={{ margin: "0.5em" }} />
			</Grid>
			<Grid size={12}>
				<h4>Add New Scoresheet</h4>
			</Grid>
			<Grid size={12}>
				<TextField
					label="New Scoresheet"
					variant="outlined"
					fullWidth
					onChange={handleChange}
					value={scoresheetName}
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onKeyUp={submitScoresheet}
				/>
			</Grid>
		</Grid>
	)
}
