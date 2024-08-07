import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import RouterLink from "next/link"
import { useSelector } from "react-redux"
import { getSelectedHeat } from "../../redux/atoms/competitions"

import { HeatSummaryTable } from "../../components/competition/HeatSummaryTable"
import { SelectorDisplay } from "../../components/competition/MainSelector"
import { useGetHeatPhasesGetHeatInfoHeatIdPhaseGetQuery } from "../../redux/services/aemsApi"

const Judging = () => {
	const selectedHeat = useSelector(getSelectedHeat)
	const { data: phaseData, isLoading: isPhaseDataLoading } =
		useGetHeatPhasesGetHeatInfoHeatIdPhaseGetQuery(
			{ heatId: selectedHeat },
			{ skip: !selectedHeat }
		)
	const maxJudges =
		phaseData && Math.max(...phaseData.map((p) => p.number_of_judges), 1)

	const judgeNumberArray = new Array(maxJudges || 1)
		.fill(null)
		.map((_, i) => i + 1)

	const heat = selectedHeat

	if (heat && !isPhaseDataLoading) {
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
							{judgeNumberArray.map((j: number) => (
								<Grid item xs key={j}>
									<ScribeButton n={j} />
								</Grid>
							))}
							<Grid item xs>
								<HeadJudgeButton />
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

const ScribeButton = ({ n }: { n: number }) => (
	<Link component={RouterLink} href={`scribe/${n}`} color="inherit">
		<Button variant="contained" fullWidth>
			Scribe {n}
		</Button>
	</Link>
)

const HeadJudgeButton = () => (
	<Link component={RouterLink} href={"HeadJudge"} color="inherit">
		<Button variant="contained" fullWidth>
			Head Judge
		</Button>
	</Link>
)
export default Judging
