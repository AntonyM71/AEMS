import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useThemeProps } from "@mui/material/styles"
import { OverlayControlState } from "../../Interfaces"
import FullscreenPixiOverlay from "../FullscreenPixiOverlay"
import { AemsPositionedThemeProps } from "../themeAugmentation"
import { useCompetitionOverview } from "./useCompetitionOverview"

const stepClassName = (isCurrent: boolean, isPast: boolean): string => {
	if (isCurrent) {
		return "AemsCompetitionOverview-step AemsCompetitionOverview-current"
	}

	return isPast
		? "AemsCompetitionOverview-step AemsCompetitionOverview-past"
		: "AemsCompetitionOverview-step"
}

/** The competition's name over a rail of its events or heats, with the
 * current one marked. */
export const CompetitionOverview = ({
	overlayControlState
}: {
	overlayControlState: OverlayControlState
}) => {
	const { rootSx } = useThemeProps({
		props: {} as AemsPositionedThemeProps,
		name: "AemsCompetitionOverview"
	})
	const { competitionName, heading, steps, windowNote } =
		useCompetitionOverview(overlayControlState)
	if (!competitionName) {
		return null
	}

	return (
		<Box className="AemsCompetitionOverview-position" sx={rootSx}>
			<Box
				className="AemsCompetitionOverview-root"
				sx={{ display: "grid", justifyItems: "start", gap: "14px" }}
			>
				<Box
					className="AemsCompetitionOverview-heading"
					sx={{ display: "grid", gap: "0.35rem" }}
				>
					<Typography variant="h2" sx={{ color: "text.primary" }}>
						{competitionName}
					</Typography>
					<Typography variant="h5" sx={{ color: "text.primary" }}>
						{heading}
					</Typography>
				</Box>
				<Box
					className="AemsCompetitionOverview-rail"
					sx={{ display: "flex", alignItems: "stretch" }}
				>
					{steps.map((step) => (
						<Box
							key={step.id}
							className={stepClassName(
								step.isCurrent,
								step.isPast
							)}
							sx={{
								display: "grid",
								alignContent: "center",
								padding: "22px",
								fontSize: 24,
								fontWeight: step.isCurrent ? 900 : 400,
								whiteSpace: "nowrap",
								color: "text.secondary"
							}}
						>
							{step.name}
						</Box>
					))}
					{windowNote && (
						<Box
							className="AemsCompetitionOverview-window"
							sx={{
								display: "grid",
								alignContent: "center",
								padding: "0 26px",
								fontSize: 18,
								fontWeight: 500,
								whiteSpace: "nowrap",
								color: "text.secondary"
							}}
						>
							{windowNote}
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	)
}

export const CompetitionOverviewModal = ({
	overlayControlState
}: {
	overlayControlState: OverlayControlState
}) => (
	<FullscreenPixiOverlay
		configName="competitionOverview"
		isVisible={overlayControlState.showCompetitionOverview}
	>
		<CompetitionOverview overlayControlState={overlayControlState} />
	</FullscreenPixiOverlay>
)
