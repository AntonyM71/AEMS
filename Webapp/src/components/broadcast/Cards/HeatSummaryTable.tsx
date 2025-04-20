import Divider from "@mui/material/Divider"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useSelector } from "react-redux"
import { getSelectedHeat } from "../../../redux/atoms/competitions"
import {
	HeatInfoResponse,
	useGetHeatInfoGetHeatInfoHeatIdGetQuery,
	useGetOneByPrimaryKeyHeatIdGetQuery
} from "../../../redux/services/aemsApi"
import { OverlayControlState } from "../../Interfaces"
import SlidingModal from "../SlidingModal"
import { BasicTable } from "./BasicBroadcastTable"

export const HeatSummaryTable = ({
	overlayControlState
}: {
	overlayControlState: OverlayControlState
}) => {
	const selectedHeat = useSelector(getSelectedHeat)

	const athletes = useGetHeatInfoGetHeatInfoHeatIdGetQuery(
		{
			heatId: selectedHeat
		},
		{ refetchOnMountOrArgChange: true, skip: !selectedHeat }
	)

	const { data: heatData, isLoading: heatIsLoading } =
		useGetOneByPrimaryKeyHeatIdGetQuery(
			{
				id: selectedHeat
			},
			{ refetchOnMountOrArgChange: true, skip: !selectedHeat }
		)

	return (
		<SlidingModal
			direction="down"
			show={overlayControlState.showHeatSummary}
		>
			{athletes && (
				<Paper>
					<Stack spacing={2}>
						<HeatDetails />
						<Divider />
						<BasicTable
							data={
								processAthleteData(athletes?.data ?? []) ?? []
							}
							pageLimit={10}
							pageChangeTime={5}
						/>
					</Stack>
				</Paper>
			)}
		</SlidingModal>
	)
}
const HeatDetails = () => {
	const selectedHeat = useSelector(getSelectedHeat)

	const { data: heatData, isLoading: heatIsLoading } =
		useGetOneByPrimaryKeyHeatIdGetQuery(
			{
				id: selectedHeat
			},
			{ refetchOnMountOrArgChange: true, skip: !selectedHeat }
		)

	return (
		<Stack spacing={2} direction="row" justifyContent="space-between">
			<Typography variant="h5">{heatData?.name}</Typography>
		</Stack>
	)
}
const processAthleteData = (data: HeatInfoResponse[]) =>
	data.map((d) => ({
		Name: `${d.first_name} ${d.last_name.toUpperCase()}`,
		Number: d.bib,
		Affiliation: d.affiliation
	}))
