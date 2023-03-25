import { Grid, Paper, Skeleton, TextField } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid/DataGrid"
import { GridColDef } from "@mui/x-data-grid/models"
import _ from "lodash"
import { useState } from "react"
import toast from "react-hot-toast"
import { v4 } from "uuid"
import {
	useGetManyAvailablebonusesGetQuery,
	useGetManyAvailablemovesGetQuery,
	useGetManyScoresheetGetQuery,
	useInsertManyScoresheetPostMutation
} from "../../../redux/services/aemsApi"
import { SelectScoresheet } from "../ScoresheetSelector"

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
						<ScoresheetMoves
							selectedScoresheet={selectedScoresheet}
						/>
					</Grid>
					<Grid item xs={12}></Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}

const AddScoresheet = ({
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

const ScoresheetMoves = ({
	selectedScoresheet
}: {
	selectedScoresheet: string
}) => {
	const moves = useGetManyAvailablemovesGetQuery({
		sheetIdListComparisonOperator: "Equal",
		sheetIdList: [selectedScoresheet]
	})
	const moveIds = moves.data?.map((m) => m.id!)

	const bonusInfo = useGetManyAvailablebonusesGetQuery({
		idListComparisonOperator: "In",
		idList: moveIds
	})

	const columns: GridColDef[] = [
		{ field: "moveName", headerName: "Name", width: 90 },
		{ field: "baseScore", headerName: "Base Score", width: 90 }
	]
	const uniqueBonusNames = _.uniqBy(bonusInfo.data, "name")
	const uniqueBonusNameList: string[] = []
	uniqueBonusNames.map((b) => {
		if (b && b.name) {
			columns.push({ field: b.name, headerName: b.name?.toUpperCase() })
			uniqueBonusNameList.push(b.name)
		}
	})

	// const uniqueBonuses = _.uniq
	const rows = moves.data?.map((m) => {
		const rowData = {
			moveName: m.name,
			baseScore: m.fl_score,
			brBaseScore: m.rb_score,
			bonuses: []
		}

		const relatedBonuses = bonusInfo.data?.filter((b) => b.move_id === m.id)
		relatedBonuses?.map((b) => {
			if (b && b.name) {
				if (!columns.find((c) => c.field === b.name)) {
					columns.push({
						field: b.name,
						headerName: b.name.toUpperCase()
					})
				}
				// @ts-ignore
				rowData.bonuses.push({
					name: b.name,
					score: b.score,
					id: b.id,
					sheet_id: b.sheet_id,
					move_id: b.move_id
				})
			}
		})

		return rowData
	})

	if (moves.isLoading || bonusInfo.isLoading) {
		return <Skeleton variant="rectangular" />
	} else if (rows) {
		return (
			<>
				<DataGrid
					rows={rows}
					columns={columns}
					checkboxSelection
					disableRowSelectionOnClick
				/>
				{/* <AddNewMove  bonuses={uniqueBonusNameLi?t} /> */}
			</>
		)
	} else if (!selectedScoresheet) {
		return <></>
	}

	return (
		<div>
			<h4>No Moves in Scoresheet</h4>
			{/* <AddNewMove bonuses={uniqueBonusNameList} /> */}
		</div>
	)
}

const AddNewMove = ({ bonuses }: { bonuses: string[] }) => {
	const baseMoveData = {
		id: v4(),
		name: "",
		lbScore: 0,
		frScore: 0,
		bonuses: bonuses.map((b) => ({ name: b, id: v4(), score: 0 }))
	}
	const [moveData, setMoveData] = useState(baseMoveData)
	const [newBonusName, setNewBonusName] = useState<string>("")

	return (
		<Grid container spacing="2">
			<Grid item>
				<TextField
					error={!moveData.name}
					label="Name"
					variant="outlined"
					fullWidth
					onChange={(
						event: React.ChangeEvent<HTMLInputElement>
					): void =>
						setMoveData({ ...moveData, name: event.target.value })
					}
					value={moveData.name}
				/>
			</Grid>
			<Grid item>
				<TextField
					error={!moveData.frScore}
					label="F/R Score"
					variant="outlined"
					fullWidth
					onChange={(
						event: React.ChangeEvent<HTMLInputElement>
					): void =>
						setMoveData({
							...moveData,
							frScore: event.target.value as unknown as number
						})
					}
					value={moveData.frScore}
				/>
			</Grid>
			<Grid item>
				<TextField
					error={!moveData.lbScore}
					label="L/B Score"
					variant="outlined"
					fullWidth
					onChange={(
						event: React.ChangeEvent<HTMLInputElement>
					): void =>
						setMoveData({
							...moveData,
							lbScore: event.target.value as unknown as number
						})
					}
					value={moveData.lbScore}
				/>
			</Grid>
			{bonuses.map((b, i) => (
				<Grid item>
					<TextField
						error={!moveData.bonuses[i]}
						label={`${b} Score`}
						variant="outlined"
						fullWidth
						onChange={(
							event: React.ChangeEvent<HTMLInputElement>
						): void => {
							const newMoveData = { ...moveData }
							newMoveData.bonuses[i].score = event.target
								.value as unknown as number

							setMoveData(newMoveData)
						}}
						value={moveData.bonuses[i]}
					/>
				</Grid>
			))}
			<Grid item>
				<TextField
					error={!newBonusName}
					label="New Bonus"
					variant="outlined"
					fullWidth
					onChange={(
						event: React.ChangeEvent<HTMLInputElement>
					): void => setNewBonusName(event.target.value)}
					value={newBonusName}
				/>
			</Grid>
		</Grid>
	)
}
