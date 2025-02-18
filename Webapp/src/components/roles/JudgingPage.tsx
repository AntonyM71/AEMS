import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid2"
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import RouterLink from "next/link"
import { useSelector } from "react-redux"
import { getSelectedHeat } from "../../redux/atoms/competitions"

import {
	useGetHeatInfoGetHeatInfoHeatIdGetQuery,
	useGetHeatPhasesGetHeatInfoHeatIdPhaseGetQuery
} from "../../redux/services/aemsApi"
import { HeatSummaryTable } from "../competition/HeatSummaryTable"
import { SelectorDisplay } from "../competition/MainSelector"

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
				data-testid="judging-page-content"
			>
				<Grid size={12}>
					<Paper sx={{ padding: "1em" }}>
						<Grid container spacing={1} alignItems={"stretch"}>
							<Grid size={6}>
								<SelectorDisplay
									showPhase={false}
									showEvent={false}
								/>
							</Grid>
							<Grid size={6}>
								{!heatHasPaddlers && (
									<Alert
										severity="warning"
										data-testid="no-paddlers-warning"
									>
										Cannot Judge a heat with no paddlers.
									</Alert>
								)}
							</Grid>
							{judgeNumberArray.map((j: number) => (
								<Grid key={j} size="grow">
									<ScribeButton
										n={j}
										disabled={!heatHasPaddlers}
									/>
								</Grid>
							))}
							<Grid size="grow">
								<HeadJudgeButton disabled={!heatHasPaddlers} />
							</Grid>{" "}
							<Grid size="grow">
								<CommentatorButton
									disabled={!heatHasPaddlers}
								/>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				<Grid size={12}>
					<HeatSummaryTable />
				</Grid>
			</Grid>
		)
	}

	return (
		<Grid container alignItems="stretch" sx={{ paddingTop: "0.5em" }}>
			<Grid size={12}>
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
		<Button
			variant="contained"
			fullWidth
			disabled={disabled}
			data-testid={`scribe-button-${n}`}
		>
			Scribe {n}
		</Button>
	</Link>
)

const HeadJudgeButton = ({ disabled = false }: { disabled?: boolean }) => (
	<Link component={RouterLink} href={"HeadJudge"} color="inherit">
		<Button
			variant="contained"
			fullWidth
			disabled={disabled}
			data-testid="head-judge-button"
		>
			Head Judge
		</Button>
	</Link>
)

const CommentatorButton = ({ disabled = false }: { disabled?: boolean }) => (
	<Link component={RouterLink} href={"Commentator"} color="inherit">
		<Button
			variant="contained"
			fullWidth
			disabled={disabled}
			data-testid="commentator-button"
		>
			Commentator
		</Button>
	</Link>
)
export default Judging
