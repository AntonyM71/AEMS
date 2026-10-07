import Box from "@mui/material/Box"
import { RunScores } from "../../../redux/services/aemsApi"
import { OverlayControlState } from "../../Interfaces"
import { AffiliationPill } from "./AffiliationPill"
import { usePhaseLeaderboard } from "./PhaseResultsTable"
import { countingRunNumbers, runFormatText } from "./runFormat"
import { useRotatingPage } from "./useRotatingPage"

const ROWS_PER_PAGE = 8
const PAGE_CHANGE_SECONDS = 5
const HEADER_PANELS = 4

const runLabel = (run?: RunScores) => {
	if (!run) {
		return "-"
	}

	return run.did_not_start ? "DNS" : run.mean_run_score.toFixed(2)
}

const centred = { display: "grid", placeItems: "center" }

/** The phase results' backup layout: a leaderboard with each athlete's rank,
 * runs and total, the runs that count toward the total in bold. */
export const PhaseLeaderboard = ({
	overlayControlState
}: {
	overlayControlState: OverlayControlState
}) => {
	const { phase, eventName, scores } =
		usePhaseLeaderboard(overlayControlState)
	const { pageItems, currentPage, totalPages } = useRotatingPage(
		scores ?? [],
		ROWS_PER_PAGE,
		PAGE_CHANGE_SECONDS
	)
	if (!phase || !scores) {
		return null
	}
	// run_number is 0-based; the cells are labelled from Run 1.
	const runNumbers = Array.from(
		{ length: phase.number_of_runs },
		(_, runNumber) => runNumber
	)
	const columns = `96px minmax(0, 1fr) repeat(${phase.number_of_runs}, 170px) 240px`

	return (
		<Box
			className="AemsLeaderboard-root"
			sx={{
				position: "absolute",
				left: "50%",
				top: 110,
				transform: "translateX(-50%)",
				width: 1580,
				display: "grid",
				gap: "6px"
			}}
		>
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: "auto auto 1fr",
					height: 104,
					marginBottom: "8px"
				}}
			>
				<Box
					className="AemsLeaderboard-event"
					sx={{
						"--i": 0,
						display: "flex",
						alignItems: "center",
						padding: "0 48px 0 30px",
						fontSize: 64,
						fontWeight: 900,
						whiteSpace: "nowrap"
					}}
				>
					<span>{eventName}</span>
				</Box>
				<Box
					className="AemsLeaderboard-phase"
					sx={{
						"--i": 1,
						display: "flex",
						alignItems: "center",
						padding: "0 40px",
						fontSize: 40,
						fontWeight: 900,
						whiteSpace: "nowrap"
					}}
				>
					<span>{phase.name}</span>
				</Box>
				<Box
					className="AemsLeaderboard-format"
					sx={{
						"--i": 2,
						display: "flex",
						alignItems: "center",
						padding: "0 30px",
						fontSize: 26
					}}
				>
					<span>
						{runFormatText(
							phase.number_of_runs,
							phase.number_of_runs_for_score
						)}
					</span>
				</Box>
			</Box>
			<Box
				className="AemsLeaderboard-columns"
				sx={{
					"--i": 3,
					display: "grid",
					gridTemplateColumns: columns,
					alignItems: "center",
					height: 40,
					fontSize: 15,
					fontWeight: 700,
					letterSpacing: "0.08em"
				}}
			>
				<span />
				<span />
				{runNumbers.map((runNumber) => (
					<Box
						component="span"
						key={runNumber}
						sx={{ textAlign: "center" }}
					>
						{`Run ${runNumber + 1}`}
					</Box>
				))}
				<Box component="span" sx={{ textAlign: "right", pr: "30px" }}>
					Total
				</Box>
			</Box>
			{pageItems.map((athlete, index) => {
				const counting = countingRunNumbers(
					athlete.run_scores,
					phase.number_of_runs_for_score
				)

				return (
					<Box
						key={athlete.athlete_id}
						className="AemsLeaderboard-row"
						sx={{
							"--i": index + HEADER_PANELS,
							display: "grid",
							gridTemplateColumns: columns,
							height: 70
						}}
					>
						<Box
							className="AemsLeaderboard-rank"
							sx={{ ...centred, fontSize: 36, fontWeight: 900 }}
						>
							<span>{athlete.ranking ?? "-"}</span>
						</Box>
						<Box
							className="AemsLeaderboard-athlete"
							sx={{
								display: "flex",
								alignItems: "center",
								gap: "16px",
								padding: "0 24px",
								minWidth: 0
							}}
						>
							<Box
								component="span"
								sx={{
									fontSize: 32,
									fontWeight: 700,
									whiteSpace: "nowrap",
									overflow: "hidden",
									textOverflow: "ellipsis"
								}}
							>
								{`${
									athlete.first_name
								} ${athlete.last_name.toUpperCase()}`}
							</Box>
							<Box component="span" sx={{ fontSize: 18 }}>
								<AffiliationPill
									affiliation={athlete.affiliation}
								/>
							</Box>
						</Box>
						{runNumbers.map((runNumber) => {
							const counts = counting.has(runNumber)

							return (
								<Box
									key={runNumber}
									className={`AemsLeaderboard-run ${
										counts
											? "AemsLeaderboard-counts"
											: "AemsLeaderboard-dropped"
									}`}
									sx={{
										...centred,
										fontSize: 30,
										fontWeight: counts ? 700 : 400
									}}
								>
									<span>
										{runLabel(
											athlete.run_scores.find(
												(run) =>
													run.run_number === runNumber
											)
										)}
									</span>
								</Box>
							)
						})}
						<Box
							className="AemsLeaderboard-total"
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "flex-end",
								padding: "0 30px",
								fontSize: 40,
								fontWeight: 900
							}}
						>
							<span>
								{athlete.total_score?.toFixed(2) ?? "-"}
							</span>
						</Box>
					</Box>
				)
			})}
			{totalPages > 1 && (
				<Box
					className="AemsLeaderboard-page"
					sx={{
						"--i": pageItems.length + HEADER_PANELS,
						justifySelf: "end",
						padding: "10px 24px",
						fontSize: 22,
						fontWeight: 700
					}}
				>
					<span>{`Page ${currentPage + 1}/${totalPages}`}</span>
				</Box>
			)}
		</Box>
	)
}
