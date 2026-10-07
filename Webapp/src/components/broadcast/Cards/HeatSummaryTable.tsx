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
	useGetHeatPhasesGetHeatInfoHeatIdPhaseGetQuery,
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
	const { athletes, heatName } = useHeatStartList(selectedHeat)

	if (!isVisible) {
		return null
	}

	return (
		<Paper
			className="AemsTableCard-root"
			sx={{ margin: "16px auto", position: "relative" }}
		>
			<Stack spacing={2}>
				<HeatDetails titleAlign={titleAlign} heatName={heatName} />
				{/* A rule on the arena; invisible artwork clearance on the
				    overlay, where the theme zeroes dividers and the height
				    comes from AemsHeatSummary.spacerHeight. */}
				<Divider sx={{ height: spacerHeight }} />
				<BasicTable
					data={processAthleteData(athletes)}
					pageChangeTime={5}
				/>
			</Stack>
		</Paper>
	)
}
const HeatDetails = ({
	titleAlign,
	heatName
}: Required<Pick<AemsCardHeaderThemeProps, "titleAlign">> & {
	heatName?: string
}) => (
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
			{heatName}
		</Typography>
	</Stack>
)

/** The heat's athletes in bib order, with the heat's name and the event and
 * phase it belongs to. */
export const useHeatStartList = (heatId: string) => {
	// currentData, not data: a skipped query still reports the last heat's data.
	const { currentData: athletes = [] } =
		useGetHeatInfoGetHeatInfoHeatIdGetQuery(
			{ heatId },
			{ refetchOnMountOrArgChange: true, skip: !heatId }
		)
	const { currentData: heatData } = useGetOneByPrimaryKeyHeatIdGetQuery(
		{ id: heatId },
		{ refetchOnMountOrArgChange: true, skip: !heatId }
	)
	const { currentData: phases } =
		useGetHeatPhasesGetHeatInfoHeatIdPhaseGetQuery(
			{ heatId },
			{ skip: !heatId }
		)
	const phase =
		phases?.find((p) => p.id === athletes[0]?.phase_id) ?? phases?.[0]

	return {
		athletes,
		heatName: heatData?.name,
		eventName: athletes[0]?.event_name,
		phaseName: phase?.name
	}
}
const processAthleteData = (data: HeatInfoResponse[]) =>
	data.map((d) => ({
		Name: `${d.first_name} ${d.last_name.toUpperCase()}`,
		Number: d.bib,
		Affiliation: d.affiliation
	}))
