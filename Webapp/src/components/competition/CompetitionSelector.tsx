import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid2"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuid4 } from "uuid"
import {
	getSelectedCompetition,
	updateSelectedCompetition,
	updateSelectedEvent,
	updateSelectedHeat,
	updateSelectedPhase
} from "../../redux/atoms/competitions"
import {
	useGetManyCompetitionGetQuery,
	useInsertManyCompetitionPostMutation
} from "../../redux/services/aemsApi"
import { HandlePostResponse } from "../../utils/rtkQueryHelper"
import { SelectorPanel } from "./SelectorPanel"
export const CompetitionSelector = ({
	showDetailed = false
}: {
	showDetailed?: boolean
}) => {
	const dispatch = useDispatch()

	const { data, isLoading, error, refetch } = useGetManyCompetitionGetQuery(
		{},
		{ refetchOnMountOrArgChange: true }
	)
	const selectedCompetition = useSelector(getSelectedCompetition)

	const handleSelect = (newComp: string) => {
		dispatch(updateSelectedHeat(""))
		dispatch(updateSelectedEvent(""))
		dispatch(updateSelectedPhase(""))
		dispatch(updateSelectedCompetition(newComp))
	}

	return (
		<SelectorPanel
			entityLabel="Competition"
			items={(data ?? [])
				.filter((c) => !!c.id)
				.map((c) => ({ id: c.id ?? "", name: c.name ?? "" }))}
			selectedValue={selectedCompetition}
			onSelect={handleSelect}
			isLoading={isLoading}
			isError={!!error}
			refetch={refetch}
			showDetailed={showDetailed}
			emptyMessage="No Competitions"
			loadingTestId="loading-skeleton"
			addForm={<AddCompetition />}
			addFormGridSize={12}
		/>
	)
}

const AddCompetition = () => {
	const [postNewCompetition] = useInsertManyCompetitionPostMutation()
	const [competitionName, setCompetitionName] = useState<string>("")
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCompetitionName(event.target.value)
	}
	const { refetch } = useGetManyCompetitionGetQuery({})
	const submitCompetition = async (
		e: React.KeyboardEvent<HTMLDivElement>
	): Promise<void> => {
		if (e.key === "Enter") {
			if (competitionName) {
				HandlePostResponse(
					await postNewCompetition({
						competitions: [{ name: competitionName, id: uuid4() }]
					})
				)
				setCompetitionName("") // Clear input after successful submission
				await refetch()
			} else {
				toast.error(
					"Please add a name before submitting a new competition"
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
				<h4>Add New Competition</h4>
			</Grid>
			<Grid size={12}>
				<TextField
					label="New Competition"
					variant="outlined"
					fullWidth
					onChange={handleChange}
					value={competitionName}
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onKeyUp={submitCompetition}
				/>
			</Grid>
		</Grid>
	)
}

export default CompetitionSelector
