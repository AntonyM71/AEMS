import Box from "@mui/material/Box"
import { useThemeProps } from "@mui/material/styles"
import { OverlayControlState } from "../../Interfaces"
import { AemsPositionedThemeProps } from "../themeAugmentation"
import FullscreenPixiOverlay from "../FullscreenPixiOverlay"
import { AffiliationPill } from "./AffiliationPill"
import { useAthleteRunScores } from "./useAthleteRunScores"

const smallLabelSx = { fontSize: 15, fontWeight: 700, letterSpacing: "0.08em" }

/** Lower third: bib tile, name and affiliation, a cell per run, and the
 * total. */
export const AthleteOverview = ({
	overlayControlState
}: {
	overlayControlState: OverlayControlState
}) => {
	const { rootSx } = useThemeProps({
		props: {} as AemsPositionedThemeProps,
		name: "AemsAthleteOverview"
	})
	const athlete = overlayControlState.selectedAthlete
	const { runs, total } = useAthleteRunScores(
		overlayControlState.selectedHeat,
		athlete?.id
	)
	if (!athlete) {
		return null
	}

	return (
		<Box sx={rootSx}>
			<Box
				className="AemsAthleteOverview-root"
				sx={{
					display: "grid",
					gridTemplateColumns: "134px auto auto",
					gridTemplateRows: "70px 62px",
					fontVariantNumeric: "tabular-nums"
				}}
			>
				<Box
					className="AemsAthleteOverview-bib"
					sx={{
						gridRow: "1 / 3",
						display: "grid",
						placeItems: "center",
						alignContent: "center",
						gap: "2px",
						color: "text.secondary"
					}}
				>
					<Box sx={{ fontSize: 64, fontWeight: 900, lineHeight: 1 }}>
						{athlete.bib}
					</Box>
					<Box sx={smallLabelSx}>Bib</Box>
				</Box>
				<Box
					className="AemsAthleteOverview-name"
					sx={{
						gridColumn: "2 / 4",
						display: "flex",
						alignItems: "center",
						gap: "18px",
						padding: "0 40px 0 30px",
						fontSize: 42,
						fontWeight: 700,
						color: "text.primary",
						whiteSpace: "nowrap",
						maxWidth: 900
					}}
				>
					<Box
						component="span"
						sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
					>
						{`${
							athlete.first_name
						} ${athlete.last_name.toUpperCase()}`}
					</Box>
					<Box component="span" sx={{ fontSize: 20 }}>
						<AffiliationPill affiliation={athlete.affiliation} />
					</Box>
				</Box>
				<Box
					className="AemsAthleteOverview-runs"
					sx={{ display: "flex", color: "text.secondary" }}
				>
					{runs.map((run) => (
						<Box
							key={run.runNumber}
							className={
								run.label === "DNS" || run.label === "-"
									? "AemsAthleteOverview-muted"
									: undefined
							}
							sx={{
								display: "grid",
								alignContent: "center",
								width: 168,
								padding: "0 26px",
								boxSizing: "border-box"
							}}
						>
							<Box
								sx={smallLabelSx}
							>{`Run ${run.runNumber}`}</Box>
							<Box sx={{ fontSize: 28, fontWeight: 700 }}>
								{run.label}
							</Box>
						</Box>
					))}
				</Box>
				<Box
					className="AemsAthleteOverview-total"
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-end",
						width: 300,
						boxSizing: "border-box",
						gap: "16px",
						padding: "0 34px",
						color: "text.secondary"
					}}
				>
					<Box sx={{ ...smallLabelSx, fontSize: 16 }}>Total</Box>
					<Box sx={{ fontSize: 42, fontWeight: 900 }}>
						{total ?? "-"}
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export const AthleteOverviewModal = ({
	overlayControlState
}: {
	overlayControlState: OverlayControlState
}) => (
	<FullscreenPixiOverlay
		configName="athleteOverview"
		isVisible={overlayControlState.showAthleteOverview}
	>
		<AthleteOverview overlayControlState={overlayControlState} />
	</FullscreenPixiOverlay>
)
