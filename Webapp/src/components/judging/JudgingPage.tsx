import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import RouterLink from "next/link"
import { useSelector } from "react-redux"
import { getSelectedHeat } from "../../redux/atoms/competitions"

import { HeatSummaryTable } from "../../components/competition/HeatSummaryTable"
import { SelectorDisplay } from "../../components/competition/MainSelector"
import {
	useGetHeatInfoGetHeatInfoHeatIdGetQuery,
	useGetHeatPhasesGetHeatInfoHeatIdPhaseGetQuery
} from "../../redux/services/aemsApi"

const Judging = () => {
	const selectedHeat = useSelector(getSelectedHeat)
	const { data: phaseData, isLoading: isPhaseDataLoading } =
		useGetHeatPhasesGetHeatInfoHeatIdPhaseGetQuery(
			{ heatId: selectedHeat },
			{ skip: !selectedHeat }
		)
	const { data: athleteHeatData, isLoading: isAthleteHeatDataLoading } =
		useGetHeatInfoGetHeatInfoHeatIdGetQuery(
			{
				heatId: selectedHeat
			},
			{ skip: !selectedHeat }
		)
	const heatHasPaddlers = (athleteHeatData?.length || 0) > 0
	const maxJudges =
		phaseData && Math.max(...phaseData.map((p) => p.number_of_judges), 1)

	const judgeNumberArray = new Array(maxJudges || 1)
		.fill(null)
		.map((_, i) => i + 1)

	if (selectedHeat && !isPhaseDataLoading && !isAthleteHeatDataLoading) {
		return (
			<Grid
				container
				spacing={1}
				alignItems="flex-start"
				sx={{ paddingTop: "0.5em" }}
			>
				<Grid item xs={12}>
					<Paper sx={{ padding: "1em" }}>
						<Grid container spacing={1} alignItems={"stretch"}>
							<Grid item xs={6}>
								<SelectorDisplay
									showPhase={false}
									showEvent={false}
								/>
							</Grid>

							<Grid item xs={6}>
								{!heatHasPaddlers && (
									<Alert severity="warning">
										Cannot Judge a heat with no paddlers.
									</Alert>
								)}
							</Grid>

							{judgeNumberArray.map((j: number) => (
								<Grid item xs key={j}>
									<ScribeButton
										n={j}
										disabled={!heatHasPaddlers}
									/>
								</Grid>
							))}
							<Grid item xs>
								<HeadJudgeButton disabled={!heatHasPaddlers} />
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<HeatSummaryTable />
				</Grid>
			</Grid>
		)
	}

	return (
		<Grid container alignItems="stretch" sx={{ paddingTop: "0.5em" }}>
			<Grid item xs={12}>
				<SelectorDisplay
					showDetailed={false}
					showEvent={false}
					showPhase={false}
				/>
			</Grid>
		</Grid>
	)
}

const ScribeButton = ({
	n,
	disabled = false
}: {
	n: number
	disabled?: boolean
}) => (
	<Link component={RouterLink} href={`scribe/${n}`} color="inherit">
		<Button variant="contained" fullWidth disabled={disabled}>
			Scribe {n}
		</Button>
	</Link>
)

const HeadJudgeButton = ({ disabled = false }: { disabled?: boolean }) => (
	<Link component={RouterLink} href={"HeadJudge"} color="inherit">
		<Button variant="contained" fullWidth disabled={disabled}>
			Head Judge
		</Button>
	</Link>
)
export default Judging
