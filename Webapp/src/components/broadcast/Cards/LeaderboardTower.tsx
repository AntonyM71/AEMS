import Box from "@mui/material/Box"
import Fade from "@mui/material/Fade"
import Slide from "@mui/material/Slide"
import useMediaQuery from "@mui/material/useMediaQuery"
import { ReactNode } from "react"
import { useGetOneByPrimaryKeyEventIdGetQuery } from "../../../redux/services/aemsApi"
import {
	defaultOverlayControllerState,
	OverlayControlState
} from "../../Interfaces"
import { TowerClimb, useClimbQueue } from "./TowerClimb"
import {
	CutLine,
	TOWER_RIGHT,
	TOWER_ROW_HEIGHT,
	TOWER_TOP,
	TOWER_WIDTH,
	TowerRow,
	towerSx
} from "./towerParts"
import { towerLayout } from "./towerLayout"
import { useRotatingPage } from "./useRotatingPage"
import { TowerStanding, useTowerStandings } from "./useTowerStandings"

const PAGE_SECONDS = 5

const RotatingWindow = ({
	places,
	rows,
	renderRow
}: {
	places: number[]
	rows: number
	renderRow: (index: number) => ReactNode
}) => {
	const { pageItems } = useRotatingPage(places, rows, PAGE_SECONDS)

	// A fixed height, so a short last page doesn't change the tower's height.
	return (
		<Box
			className="AemsTower-window"
			sx={{ height: rows * TOWER_ROW_HEIGHT, overflow: "hidden" }}
		>
			{pageItems.map(renderRow)}
		</Box>
	)
}

/** The pinned and rotating rows laid out by towerLayout, with the cut line. */
const Standings = ({
	standings,
	placesThrough,
	qualifierRows,
	justClimbedId
}: {
	standings: TowerStanding[]
	placesThrough: number | null
	qualifierRows: number | null
	justClimbedId: string | null
}) => {
	const sections = towerLayout(standings.length, {
		placesThrough,
		qualifierRows
	})
	const renderRow = (index: number) => [
		index === placesThrough && index > 0 ? (
			<CutLine key="cut" placesThrough={placesThrough} />
		) : null,
		<TowerRow
			key={standings[index].athleteId}
			standing={standings[index]}
			place={index + 1}
			placesThrough={placesThrough}
			className={
				standings[index].athleteId === justClimbedId
					? "AemsTower-justClimbed"
					: ""
			}
		/>
	]
	const rotates = (k: number) => sections[k].rows < sections[k].places.length
	const everyoneThrough =
		placesThrough !== null &&
		standings.length > 0 &&
		placesThrough >= standings.length

	return (
		<Box className="AemsTower-standings">
			{sections.map((section, k) => (
				<Box key={k} className="AemsTower-section">
					{k > 0 && (rotates(k) || rotates(k - 1)) && (
						<Box className="AemsTower-break" aria-hidden />
					)}
					{rotates(k) ? (
						<RotatingWindow
							places={section.places}
							rows={section.rows}
							renderRow={renderRow}
						/>
					) : (
						section.places.map(renderRow)
					)}
				</Box>
			))}
			{everyoneThrough && <CutLine placesThrough={placesThrough} />}
		</Box>
	)
}

/** The selected phase's standings, F1 timing-tower style. */
export const LeaderboardTower = ({
	overlayControlState
}: {
	overlayControlState: OverlayControlState
}) => {
	// A controller from before the tower existed relays none of its settings.
	const {
		selectedPhase,
		towerStyle,
		towerPlacesThrough,
		towerQualifierRows,
		towerClimb
	} = { ...defaultOverlayControllerState, ...overlayControlState }
	const { phase, standings, enteredCount, landedLock } =
		useTowerStandings(selectedPhase)
	const { currentData: event } = useGetOneByPrimaryKeyEventIdGetQuery(
		{ id: phase?.event_id ?? "" },
		{ skip: !phase }
	)
	const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", {
		noSsr: true
	})
	const { climb, justClimbedId, finishClimb } = useClimbQueue({
		landedLock,
		standings,
		placesThrough: towerPlacesThrough,
		enabled: towerClimb && !reducedMotion
	})

	return (
		<Box
			className={`AemsTower-root AemsTower-${towerStyle}`}
			sx={towerSx(towerStyle)}
		>
			<Box className="AemsTower-head">
				<span className="AemsTower-event">{event?.name}</span>
				<span className="AemsTower-sub">
					<span>{phase?.name}</span>
					<span className="AemsTower-count">
						{standings.length}/{enteredCount}
					</span>
				</span>
			</Box>
			{climb ? (
				<TowerClimb
					key={climb.id}
					climb={climb}
					placesThrough={towerPlacesThrough}
					onFinished={finishClimb}
				/>
			) : (
				<Standings
					standings={standings}
					placesThrough={towerPlacesThrough}
					qualifierRows={towerQualifierRows}
					justClimbedId={justClimbedId}
				/>
			)}
		</Box>
	)
}

/** Slides the tower in from the right edge while it is on air. */
export const LeaderboardTowerModal = ({
	overlayControlState
}: {
	overlayControlState: OverlayControlState
}) => {
	const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", {
		noSsr: true
	})
	const isVisible = Boolean(
		overlayControlState.showLeaderboardTower &&
			overlayControlState.selectedPhase
	)
	const tower = (
		<Box
			className="AemsTower-position"
			sx={{
				position: "fixed",
				top: TOWER_TOP,
				right: TOWER_RIGHT,
				width: TOWER_WIDTH,
				zIndex: 1400
			}}
		>
			{/* Keyed by phase, so a phase change starts the tower afresh: no
			    pending reload, queued climb or rotation carries over. */}
			<LeaderboardTower
				key={overlayControlState.selectedPhase}
				overlayControlState={overlayControlState}
			/>
		</Box>
	)

	return reducedMotion ? (
		<Fade in={isVisible} mountOnEnter unmountOnExit>
			{tower}
		</Fade>
	) : (
		<Slide in={isVisible} direction="left" mountOnEnter unmountOnExit>
			{tower}
		</Slide>
	)
}
