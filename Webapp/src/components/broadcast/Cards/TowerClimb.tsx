import Box from "@mui/material/Box"
import { useEffect, useMemo, useRef, useState } from "react"
import { dataFontFamily } from "../../../fonts"
import { pwBlack, pwBrightBlue, pwOrange, pwWhite } from "../overlayTheme"
import { climbPlan, ClimbPlan } from "./climbPlan"
import { TOWER_MAX_ROWS } from "./towerLayout"
import { CutLine, TOWER_ROW_HEIGHT, TowerRow } from "./towerParts"
import { LandedLock, TowerStanding } from "./useTowerStandings"

// How far the climbing row is pulled into the frame, out of the column.
const PULL_PX = 22
const BEFORE_PULL_MS = 700
const PULL_MS = 380
const AFTER_PULL_MS = 900
const BEFORE_RETURN_MS = 500
const HOLD_MS = 3600
// How long the climber's row stays marked once the normal layout is back.
const JUST_CLIMBED_MS = 3000
// Climbs waiting behind the one on screen; older ones redraw in place.
const MAX_WAITING_CLIMBS = 3

export interface ClimbScene {
	/** Unique per queued climb, so each one mounts its own TowerClimb. */
	id: number
	plan: ClimbPlan
	before: TowerStanding[]
	after: TowerStanding[]
	runNumber: number
}

/** Slower for the last few places, to build to where the athlete lands. */
const stepMs = (placesLeft: number) => {
	if (placesLeft === 0) {
		return 900
	}
	if (placesLeft <= 2) {
		return 620
	}

	return placesLeft <= 5 ? 340 : 230
}

interface ClimbFrame {
	/** Milliseconds after the previous frame. */
	delay: number
	index: number
	pulled: boolean
	transitionMs: number
	crossedCut: boolean
}

/** Every state the climb passes through, from the old place to the new. */
export const climbTimeline = (
	plan: ClimbPlan,
	placesThrough: number | null
) => {
	const frames: ClimbFrame[] = [
		{
			delay: 0,
			index: plan.from,
			pulled: false,
			transitionMs: 0,
			crossedCut: false
		},
		{
			delay: BEFORE_PULL_MS,
			index: plan.from,
			pulled: true,
			transitionMs: PULL_MS,
			crossedCut: false
		}
	]
	let delay = AFTER_PULL_MS
	let crossedCut = false
	for (let index = plan.from - 1; index >= plan.to; index--) {
		const ms = stepMs(index - plan.to)
		crossedCut ||= index === (placesThrough ?? 0) - 1
		frames.push({
			delay,
			index,
			pulled: true,
			transitionMs: ms * 0.85,
			crossedCut
		})
		delay = ms
	}
	frames.push({
		delay: delay + BEFORE_RETURN_MS,
		index: plan.to,
		pulled: false,
		transitionMs: PULL_MS,
		crossedCut
	})

	return { frames, holdMs: HOLD_MS }
}

/** Climbs earned by landed locks, played one at a time. */
export const useClimbQueue = ({
	landedLock,
	standings,
	placesThrough,
	enabled
}: {
	landedLock: LandedLock | null
	standings: TowerStanding[]
	placesThrough: number | null
	enabled: boolean
}) => {
	const [queue, setQueue] = useState<ClimbScene[]>([])
	const scenesQueued = useRef(0)

	useEffect(() => {
		if (!landedLock || !enabled) {
			return
		}
		const ids = (list: TowerStanding[]) => list.map((s) => s.athleteId)
		const plan = climbPlan(
			ids(landedLock.before),
			ids(standings),
			landedLock.lock.athlete_id,
			placesThrough
		)
		if (plan) {
			scenesQueued.current += 1
			const scene = {
				id: scenesQueued.current,
				plan,
				before: landedLock.before,
				after: standings,
				runNumber: landedLock.lock.run_number
			}
			setQueue((current) =>
				current.length > MAX_WAITING_CLIMBS
					? [
							current[0],
							...current.slice(-MAX_WAITING_CLIMBS + 1),
							scene
					  ]
					: [...current, scene]
			)
		}
		// Only a newly landed lock starts a climb, not a later redraw.
	}, [landedLock])

	const [justClimbedId, setJustClimbedId] = useState<string | null>(null)
	useEffect(() => {
		if (!justClimbedId) {
			return
		}
		const timer = setTimeout(() => setJustClimbedId(null), JUST_CLIMBED_MS)

		return () => clearTimeout(timer)
	}, [justClimbedId])

	return {
		climb: queue[0],
		justClimbedId,
		finishClimb: () => {
			setJustClimbedId(queue[0]?.plan.athleteId ?? null)
			setQueue((current) => current.slice(1))
		}
	}
}

/** The new standings with the climber moved to `index`, so anyone else whose
 * run landed in the same reload is already in their new place. */
const orderWithClimberAt = (scene: ClimbScene, index: number) => {
	const climber = scene.after.find(
		(s) => s.athleteId === scene.plan.athleteId
	)
	const order = scene.after.filter((s) => s !== climber)
	if (climber) {
		order.splice(index, 0, climber)
	}

	return order
}

/** One continuous run of places that follows the climbing athlete. */
export const TowerClimb = ({
	climb,
	placesThrough,
	onFinished
}: {
	climb: ClimbScene
	placesThrough: number | null
	onFinished: () => void
}) => {
	const { frames, holdMs } = useMemo(
		() => climbTimeline(climb.plan, placesThrough),
		[climb, placesThrough]
	)
	const [frame, setFrame] = useState(frames[0])

	useEffect(() => {
		const timers: ReturnType<typeof setTimeout>[] = []
		let at = 0
		frames.forEach((next) => {
			at += next.delay
			timers.push(setTimeout(() => setFrame(next), at))
		})
		timers.push(setTimeout(onFinished, at + holdMs))

		return () => timers.forEach(clearTimeout)
		// A new climb mounts a new TowerClimb, so this runs once per climb.
	}, [frames])

	const order = orderWithClimberAt(climb, frame.index)
	const climber = order[frame.index]
	const windowRows = Math.min(TOWER_MAX_ROWS, order.length)
	const windowHeight = windowRows * TOWER_ROW_HEIGHT
	const offset = Math.min(
		Math.max(0, (order.length - windowRows) * TOWER_ROW_HEIGHT),
		Math.max(
			0,
			frame.index * TOWER_ROW_HEIGHT -
				windowHeight / 2 +
				TOWER_ROW_HEIGHT / 2
		)
	)
	const leaderTotal = order[0]?.total ?? 0
	const transition = `transform ${frame.transitionMs}ms cubic-bezier(.4,0,.2,1)`

	return (
		<Box
			className="AemsTower-climb"
			sx={{
				position: "relative",
				height: windowHeight,
				// Clip above and below, but let the callout reach into the frame.
				clipPath: "inset(0 -40px 0 -700px)",
				"& .AemsTower-climbRow": {
					position: "absolute",
					left: 0,
					right: 0,
					top: 0,
					transition: `${transition}, background-color 300ms, color 300ms`
				},
				"& .AemsTower-climber": {
					zIndex: 5,
					background: pwOrange,
					color: pwBlack,
					"& .AemsTower-place, & .AemsTower-name, & .AemsTower-gap": {
						color: pwBlack
					}
				},
				"& .AemsTower-pushedOut": {
					animation: "AemsTowerPushedOut 1.4s ease-out"
				},
				"@keyframes AemsTowerPushedOut": {
					"0%, 35%": { backgroundColor: "#C8102E", color: pwWhite }
				},
				"& .AemsTower-callout": {
					position: "absolute",
					right: "calc(100% + 10px)",
					top: 0,
					height: "100%",
					display: "flex",
					alignItems: "center",
					gap: 2,
					px: 2,
					whiteSpace: "nowrap",
					background: pwBlack,
					color: pwWhite,
					opacity: frame.pulled ? 1 : 0,
					transition: "opacity 300ms"
				},
				"& .AemsTower-calloutName": { fontSize: 22, fontWeight: 700 },
				"& .AemsTower-calloutRun": {
					fontSize: 16,
					fontWeight: 600,
					color: pwBrightBlue
				},
				"& .AemsTower-calloutScore": {
					fontFamily: dataFontFamily,
					fontSize: 24
				}
			}}
		>
			<Box
				sx={{
					position: "relative",
					height: order.length * TOWER_ROW_HEIGHT,
					transform: `translateY(${-offset}px)`,
					transition
				}}
			>
				{order.map((standing, i) => {
					const isClimber = standing === climber
					const pushedOut =
						frame.crossedCut &&
						standing.athleteId === climb.plan.pushedOutId
					const x = isClimber && frame.pulled ? -PULL_PX : 0

					return (
						<TowerRow
							key={standing.athleteId}
							standing={{
								...standing,
								gapToLeader: standing.total - leaderTotal
							}}
							place={i + 1}
							placesThrough={placesThrough}
							className={[
								"AemsTower-climbRow",
								isClimber ? "AemsTower-climber" : "",
								pushedOut ? "AemsTower-pushedOut" : ""
							].join(" ")}
							sx={{
								transform: `translate(${x}px, ${
									i * TOWER_ROW_HEIGHT
								}px)`
							}}
						>
							{isClimber && (
								<span className="AemsTower-callout">
									<span className="AemsTower-calloutName">
										{standing.firstName} {standing.lastName}
									</span>
									<span className="AemsTower-calloutRun">
										Run {climb.runNumber + 1}
									</span>
									<span className="AemsTower-calloutScore">
										{standing.runScores[
											climb.runNumber
										]?.toFixed(2)}
									</span>
								</span>
							)}
						</TowerRow>
					)
				})}
				{placesThrough !== null && placesThrough < order.length && (
					<CutLine
						placesThrough={placesThrough}
						sx={{
							position: "absolute",
							left: 0,
							right: 0,
							top: placesThrough * TOWER_ROW_HEIGHT
						}}
					/>
				)}
			</Box>
		</Box>
	)
}
