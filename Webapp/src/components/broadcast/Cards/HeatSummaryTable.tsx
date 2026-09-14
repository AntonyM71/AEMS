import Divider from "@mui/material/Divider"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useThemeProps } from "@mui/material/styles"
import { useSelector } from "react-redux"
import { getSelectedHeat } from "../../../redux/atoms/competitions"
import {
	HeatInfoResponse,
	useGetHeatInfoGetHeatInfoHeatIdGetQuery,
	useGetOneByPrimaryKeyHeatIdGetQuery
} from "../../../redux/services/aemsApi"
import { AemsCardHeaderThemeProps } from "../themeAugmentation"

import { BasicTable } from "./BasicBroadcastTable"

interface HeatSummaryTableProps extends AemsCardHeaderThemeProps {
	isVisible?: boolean
}

export const HeatSummaryTable = (inProps: HeatSummaryTableProps = {}) => {
	const {
		isVisible = true,
		titleAlign = "space-between",
		spacerHeight
	} = useThemeProps({ props: inProps, name: "AemsHeatSummary" })

	const selectedHeat = useSelector(getSelectedHeat)
	const athletes = useGetHeatInfoGetHeatInfoHeatIdGetQuery(
		{
			heatId: selectedHeat
		},
		{ refetchOnMountOrArgChange: true, skip: !selectedHeat }
	)

	if (!isVisible) {
		return null
	}

	return (
		<Paper
			className="AemsTableCard-root"
			sx={{ margin: "16px auto", position: "relative" }}
		>
			<Stack spacing={2}>
				<HeatDetails titleAlign={titleAlign} />
				{/* A rule on the arena; invisible artwork clearance on the
				    overlay, where the theme zeroes dividers and the height
				    comes from AemsHeatSummary.spacerHeight. */}
				<Divider sx={{ height: spacerHeight }} />
				<BasicTable
					data={processAthleteData(athletes?.data ?? []) ?? []}
					pageChangeTime={5}
				/>
			</Stack>
		</Paper>
	)
}
const HeatDetails = ({
	titleAlign
}: Required<Pick<AemsCardHeaderThemeProps, "titleAlign">>) => {
	const selectedHeat = useSelector(getSelectedHeat)
	const { data: heatData } = useGetOneByPrimaryKeyHeatIdGetQuery(
		{ id: selectedHeat },
		{ refetchOnMountOrArgChange: true, skip: !selectedHeat }
	)

	return (
		<Stack
			direction="row"
			justifyContent={titleAlign}
			alignItems="flex-start"
			sx={{ position: "relative", width: "100%" }}
		>
			<Typography
				variant="h4"
				className="AemsHeatSummary-title"
				sx={{ color: "text.primary" }}
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
