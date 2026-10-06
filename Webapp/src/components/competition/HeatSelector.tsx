import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid2"
import IconButton from "@mui/material/IconButton"
import Skeleton from "@mui/material/Skeleton"
import TextField from "@mui/material/TextField"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import EditNoteIcon from "@mui/icons-material/EditNote"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuid4 } from "uuid"
import {
	getSelectedCompetition,
	getSelectedHeat,
	updateSelectedHeat
} from "../../redux/atoms/competitions"
import { updatePaddler, updateRun } from "../../redux/atoms/scoring"
import {
	useGetManyCompetitionGetQuery,
	useGetManyHeatGetQuery,
	useGetOneByPrimaryKeyHeatIdGetQuery,
	useInsertManyHeatPostMutation,
	usePartialUpdateOneByPrimaryKeyHeatIdPatchMutation
} from "../../redux/services/aemsApi"
import { HandlePostResponse } from "../../utils/rtkQueryHelper"
import { IdNameAutocomplete } from "./IdNameAutocomplete"
import { SelectorPanel } from "./SelectorPanel"

const HeatSelector = ({ showDetailed = false }: { showDetailed?: boolean }) => {
	const [open, setOpen] = useState<boolean>(false)
	const handleClose = () => setOpen(false)
	const dispatch = useDispatch()
	const selectedCompetition = useSelector(getSelectedCompetition)
	const selectedHeat = useSelector(getSelectedHeat)

	const { data, isLoading, isError, refetch } = useGetManyHeatGetQuery(
		{
			competitionIdList: [selectedCompetition]
		},
		{
			skip: !selectedCompetition,
			refetchOnMountOrArgChange: true
		}
	)

	const onSelect = (newHeat: string) => {
		dispatch(updateSelectedHeat(newHeat))
		dispatch(updatePaddler(0))
		dispatch(updateRun(0))
	}

	if (!selectedCompetition) {
		return <></>
	}

	return (
		<>
			<EditHeatDialog
				refetch={refetch}
				open={open}
				handleClose={handleClose}
				selectedHeat={selectedHeat}
			/>
			<SelectorPanel
				entityLabel="Heat"
				items={(data ?? [])
					.filter((heat) => !!heat.name)
					.map((heat) => ({
						id: heat.id ?? "",
						name: heat.name ?? ""
					}))}
				selectedValue={selectedHeat}
				onSelect={onSelect}
				isLoading={isLoading}
				isError={isError}
				refetch={refetch}
				showDetailed={showDetailed}
				emptyMessage="No Heats in Competition"
				selectTestId="heat-select"
				addForm={<AddHeat refetch={refetch} />}
				endAdornment={
					showDetailed && selectedHeat ? (
						<IconButton
							aria-label="edit heat"
							onClick={() => setOpen(true)}
						>
							<Tooltip title="Edit Selected Heat">
								<EditNoteIcon />
							</Tooltip>
						</IconButton>
					) : undefined
				}
			/>
		</>
	)
}

const EditHeatDialog = ({
	open,
	handleClose,
	refetch,
	selectedHeat
}: {
	open: boolean
	handleClose: () => void
	refetch: () => Promise<any>
	selectedHeat: string
}) => {
	const {
		data,
		isSuccess,
		refetch: refetchHeatInfo
	} = useGetOneByPrimaryKeyHeatIdGetQuery(
		{
			id: selectedHeat
		},
		{ skip: !selectedHeat }
	)
	const refetchHeatListAndHeatInfo = async () => {
		await refetch()
		await refetchHeatInfo()
	}

	return (
		<Dialog onClose={handleClose} open={open}>
			{isSuccess ? (
				<div
					style={{
						padding: "1em"
					}}
				>
					<Typography
						variant="h5"
						data-testid="edit-heat-dialog-title"
					>
						Edit Heat
					</Typography>

					<AddHeat
						refetch={refetchHeatListAndHeatInfo}
						existingHeatData={data}
					/>
				</div>
			) : (
				<Skeleton />
			)}
		</Dialog>
	)
}

const AddHeat = ({
	refetch,
	existingHeatData
}: {
	refetch: () => Promise<any>
	existingHeatData?: ExistingHeatData
}) => {
	const [heatName, setHeatName] = useState<string>(
		existingHeatData?.name ?? ""
	)
	const selectedCompetition = useSelector(getSelectedCompetition)
	const [competitionId, setCompetitionId] = useState<string>(
		existingHeatData?.competition_id ?? selectedCompetition
	)
	const { data: competitions } = useGetManyCompetitionGetQuery({})
	const [postNewHeat] = useInsertManyHeatPostMutation()
	const [updateExistingHeat] =
		usePartialUpdateOneByPrimaryKeyHeatIdPatchMutation()

	const submitNewHeat = async () => {
		if (!existingHeatData) {
			try {
				const response = await postNewHeat({
					heats: [
						{
							name: heatName,
							id: uuid4(),
							competition_id: competitionId
						}
					]
				})

				if ("error" in response) {
					throw new Error("Failed to add heat")
				}

				HandlePostResponse(response)
				setHeatName("")
				await refetch()
			} catch (error) {
				console.error("Error adding heat:", error)
			}
		} else {
			try {
				HandlePostResponse(
					await updateExistingHeat({
						id: existingHeatData.id,
						heatUpdate: {
							name: heatName,
							competition_id: competitionId
						}
					})
				)
				await refetch()
			} catch (error) {
				console.error("Error updating heat:", error)
			}
		}
	}

	return (
		<Grid container spacing={2}>
			<Grid size={12}>
				<Divider sx={{ margin: "0.5em" }} />
			</Grid>
			{!existingHeatData && (
				<Grid size={12}>
					<h4>Add New Heat</h4>
				</Grid>
			)}
			<Grid size={12}>
				<TextField
					error={!heatName}
					label="New Heat"
					variant="outlined"
					fullWidth
					data-testid="new-heat-input"
					onChange={(
						event: React.ChangeEvent<HTMLInputElement>
					): void => setHeatName(event.target.value)}
					value={heatName}
				/>
			</Grid>
			<Grid size={12}>
				<IdNameAutocomplete
					items={competitions}
					value={competitionId}
					onChange={setCompetitionId}
					label="Competition"
					testId="competition-input"
				/>
			</Grid>
			<Grid size={12}>
				<Button
					variant="contained"
					fullWidth
					onClick={() => void submitNewHeat()}
					disabled={!heatName}
					data-testid="add-heat-button"
				>
					{existingHeatData ? "Update Heat" : "Add Heat"}
				</Button>
			</Grid>
		</Grid>
	)
}

export default HeatSelector

interface ExistingHeatData {
	id: string
	competition_id: string
	name: string
}
