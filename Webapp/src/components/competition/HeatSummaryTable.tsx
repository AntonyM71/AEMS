import Paper from "@mui/material/Paper"
import Skeleton from "@mui/material/Skeleton"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { map } from "lodash"
import { useSelector } from "react-redux"
import { getSelectedHeat } from "../../redux/atoms/competitions"
import {
	useGetManyAthleteGetQuery,
	useGetManyAthleteheatGetQuery,
	useGetOneByPrimaryKeyHeatIdGetQuery
} from "../../redux/services/aemsApi"

export const HeatSummaryTable = () => {
	const selectedHeat = useSelector(getSelectedHeat)
	const { data, isLoading } = useGetOneByPrimaryKeyHeatIdGetQuery({
		id: selectedHeat
	})
	if (data && selectedHeat && !isLoading) {
		return (
			<Paper sx={{ padding: "1em" }}>
				<h3>{`Heat: ${data.name || ""}`}</h3>
				<HeatAthleteTable />
			</Paper>
		)
	} else if (isLoading) {
		return <Skeleton variant="rectangular" />
	}

	return <h4>Something went wrong</h4>
}

export const HeatAthleteTable = () => {
	const selectedHeat = useSelector(getSelectedHeat)
	const athletes = useGetManyAthleteheatGetQuery({
		heatIdListComparisonOperator: "Equal",
		heatIdList: [selectedHeat]
	})
	const athleteList = map(athletes.data, "athlete_ids")

	const athleteInfo = useGetManyAthleteGetQuery({
		athleteIdListComparisonOperator: "Equal",
		athleteIdList: athleteList
	})
	const columns: GridColDef[] = [{ field: "id", headerName: "ID", width: 90 }]
	const rows = [{ id: "1" }]
	if (athletes.isLoading) {
		return <Skeleton variant="rectangular" />
	} else if (rows) {
		return (
			<DataGrid
				rows={rows}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 5
						}
					}
				}}
				pageSizeOptions={[5]}
				checkboxSelection
				disableRowSelectionOnClick
			/>
		)
	}

	return <h4>No athletes in heat</h4>
}
