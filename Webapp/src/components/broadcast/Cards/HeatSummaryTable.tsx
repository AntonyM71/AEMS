import Box from "@mui/material/Box"
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

import { BasicTable } from "./BasicBroadcastTable"

export const HeatSummaryTable = ({
	maxWidth = 1150,
	pageLimit = 8, // Set max rows to 8
	rowHeight = 61
}: {
	maxWidth?: number | string
	pageLimit?: number
	rowHeight?: number
} = {}) => {
	const selectedHeat = useSelector(getSelectedHeat)
	const athletes = useGetHeatInfoGetHeatInfoHeatIdGetQuery(
		{
			heatId: selectedHeat
		},
		{ refetchOnMountOrArgChange: true, skip: !selectedHeat }
	)

	return (
		<Paper
			elevation={6}
			sx={{
				maxWidth,
				margin: "16px auto",
				background: "transparent",
				boxShadow: "none",
				position: "relative"
			}}
		>
			<Stack spacing={2}>
				<HeatDetails />
				<Box sx={{ height: 85 }} />
				<BasicTable
					data={processAthleteData(athletes?.data ?? []) ?? []}
					pageLimit={pageLimit}
					pageChangeTime={5}
					maxWidth={maxWidth}
					rowHeight={rowHeight}
					footerPadding={30}
				/>
			</Stack>
		</Paper>
	)
}
const HeatDetails = () => {
	const selectedHeat = useSelector(getSelectedHeat)
	const { data: heatData } = useGetOneByPrimaryKeyHeatIdGetQuery(
		{ id: selectedHeat },
		{ refetchOnMountOrArgChange: true, skip: !selectedHeat }
	)

	// Position the title in the top-right blue box overlay (assumes background image is set in parent)
	return (
		<Stack
			direction="row"
			justifyContent="flex-end"
			alignItems="flex-start"
			sx={{ position: "relative", width: "100%" }}
		>
			<Typography
				color="white"
				variant="h4"
				sx={{
					fontWeight: 700,
					pr: 4,
					pt: 1,
					textShadow: "0 2px 8px rgba(0,0,0,0.4)"
				}}
			>
				{heatData?.name}
			</Typography>
		</Stack>
	)
}
const processAthleteData = (data: HeatInfoResponse[]) =>
	data.map((d) => ({
		Name: `${d.first_name} ${d.last_name.toUpperCase()}`,
		Number: d.bib,
		Affiliation: d.affiliation
	}))
