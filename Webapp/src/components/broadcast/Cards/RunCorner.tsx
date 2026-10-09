import Box from "@mui/material/Box"
import { useThemeProps } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import {
	useGetOneByPrimaryKeyEventIdGetQuery,
	useGetOneByPrimaryKeyHeatIdGetQuery
} from "../../../redux/services/aemsApi"
import { OverlayControlState } from "../../Interfaces"
import { FinalScoreLogic } from "../../roles/headJudge/FinalScore"
import FullscreenPixiOverlay from "../FullscreenPixiOverlay"
import { dataFontFamily } from "../../../fonts"
import { runCornerRight } from "../overlayTheme"
import { AemsPositionedThemeProps } from "../themeAugmentation"
import { AffiliationPill } from "./AffiliationPill"
import { useLiveRunScore } from "./LiveRunScore"
import { useRunCount } from "./RunCard"
import { TOWER_RIGHT, TOWER_WIDTH } from "./towerParts"
import { useRideClock } from "./useRideClock"

const RideClock = () => {
	const { secondsRemaining, isCancelled, fractionRemaining, isFinalWarning } =
		useRideClock()
	const clockColor = isFinalWarning ? "primary.main" : "text.secondary"

	return (
		<Box
			className={
				isFinalWarning
					? "AemsRunCorner-time AemsRunCorner-warning"
					: "AemsRunCorner-time"
			}
			sx={{
				position: "relative",
				display: "flex",
				alignItems: "baseline",
				gap: "6px",
				padding: "10px 26px 0",
				fontSize: 58,
				lineHeight: 1,
				fontWeight: 900,
				fontFamily: dataFontFamily,
				color: clockColor
			}}
		>
			<span>{isCancelled ? "Cancelled" : secondsRemaining}</span>
			{!isCancelled && (
				<Box component="small" sx={{ fontSize: 22, fontWeight: 700 }}>
					s
				</Box>
			)}
			<Box
				aria-hidden
				sx={{
					position: "absolute",
					left: 26,
					right: 26,
					bottom: 12,
					height: 8,
					borderRadius: 4,
					overflow: "hidden",
					bgcolor: "rgba(0, 0, 0, 0.15)"
				}}
			>
				<Box
					className="AemsRunCorner-bar"
					data-fraction={fractionRemaining}
					sx={{
						height: "100%",
						bgcolor: clockColor,
						transformOrigin: "left",
						transform: `scaleX(${fractionRemaining})`,
						transition:
							"transform 1s linear, background-color 300ms"
					}}
				/>
			</Box>
		</Box>
	)
}

/** Lower-right corner: who is on the water, the ride clock, the live score,
 * and which event, heat and run it is. */
export const RunCorner = ({
	overlayControlState
}: {
	overlayControlState: OverlayControlState
}) => {
	const { rootSx } = useThemeProps({
		props: {} as AemsPositionedThemeProps,
		name: "AemsRunCorner"
	})
	const { allJudgeScores, locked, didNotStart } =
		useLiveRunScore(overlayControlState)
	const numberOfRuns = useRunCount(overlayControlState)
	const { selectedEvent, selectedHeat, selectedAthlete, selectedRun } =
		overlayControlState
	const { currentData: event } = useGetOneByPrimaryKeyEventIdGetQuery(
		{ id: selectedEvent },
		{ skip: !selectedEvent }
	)
	const { currentData: heat } = useGetOneByPrimaryKeyHeatIdGetQuery(
		{ id: selectedHeat },
		{ skip: !selectedHeat }
	)
	if (!selectedAthlete) {
		return null
	}

	return (
		<Box sx={rootSx}>
			<Box
				className="AemsRunCorner-root"
				sx={{
					display: "grid",
					width: 620,
					gridTemplateRows: "58px 96px 48px",
					fontVariantNumeric: "tabular-nums"
				}}
			>
				<Box
					className="AemsRunCorner-name"
					sx={{
						display: "flex",
						alignItems: "center",
						gap: "14px",
						padding: "0 26px",
						fontSize: 30,
						fontWeight: 700,
						color: "text.primary",
						whiteSpace: "nowrap"
					}}
				>
					<Box component="span" sx={{ fontSize: 17 }}>
						<AffiliationPill
							affiliation={selectedAthlete.affiliation}
						/>
					</Box>
					<Box
						component="span"
						sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
					>
						{`${
							selectedAthlete.first_name
						} ${selectedAthlete.last_name.toUpperCase()}`}
					</Box>
				</Box>
				<Box
					className="AemsRunCorner-clock"
					sx={{ display: "grid", gridTemplateColumns: "1fr 250px" }}
				>
					<RideClock />
					<Box
						className="AemsRunCorner-score"
						sx={{
							display: "grid",
							alignContent: "center",
							justifyItems: "end",
							padding: "0 28px",
							color: "text.secondary"
						}}
					>
						<Box
							sx={{
								fontSize: 15,
								fontWeight: 700,
								letterSpacing: "0.08em"
							}}
						>
							Live
						</Box>
						<FinalScoreLogic
							allJudgeScores={allJudgeScores}
							locked={locked}
							did_not_start={didNotStart}
							textSize="h3"
						/>
					</Box>
				</Box>
				<Box
					className="AemsRunCorner-event"
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						gap: "16px",
						padding: "0 26px",
						fontSize: 21,
						fontWeight: 500,
						color: "text.primary",
						whiteSpace: "nowrap"
					}}
				>
					<span>{event?.name}</span>
					<span>
						<b>{heat?.name}</b>
						{` · Run ${selectedRun + 1}/${numberOfRuns}`}
					</span>
				</Box>
			</Box>
		</Box>
	)
}

const TOWER_CLEARANCE_PX = 24
// Far enough left that the run corner's right edge clears the tower.
const SHIFT_FOR_TOWER_PX =
	TOWER_RIGHT + TOWER_WIDTH + TOWER_CLEARANCE_PX - runCornerRight

/** Moves inwards, artwork and all, while the leaderboard tower is on air. */
export const RunCornerModal = ({
	overlayControlState
}: {
	overlayControlState: OverlayControlState
}) => {
	const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", {
		noSsr: true
	})

	// Fixed and full-viewport itself: a transformed ancestor becomes the
	// containing block of the fixed Pixi canvas inside.
	return (
		<Box
			className="AemsRunCorner-layer"
			sx={{
				position: "fixed",
				inset: 0,
				zIndex: 1400,
				transform: overlayControlState.showLeaderboardTower
					? `translateX(-${SHIFT_FOR_TOWER_PX}px)`
					: "none",
				transition: reducedMotion
					? "none"
					: "transform 500ms cubic-bezier(.4,0,.2,1)"
			}}
		>
			<FullscreenPixiOverlay
				configName="runCorner"
				isVisible={overlayControlState.showLiveRunScore}
			>
				<RunCorner overlayControlState={overlayControlState} />
			</FullscreenPixiOverlay>
		</Box>
	)
}
