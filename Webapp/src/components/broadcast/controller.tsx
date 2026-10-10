import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import ButtonBase from "@mui/material/ButtonBase"
import Grid from "@mui/material/Grid2"
import Stack from "@mui/material/Stack"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import Typography from "@mui/material/Typography"
import { alpha, darken, lighten } from "@mui/material/styles"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import {
	getSelectedCompetition,
	getSelectedEvent,
	getSelectedHeat,
	getSelectedPhase
} from "../../redux/atoms/competitions"
import {
	getCurrentPaddlerIndex,
	getSelectedRun
} from "../../redux/atoms/scoring"
import { useGetHeatInfoGetHeatInfoHeatIdGetQuery } from "../../redux/services/aemsApi"
import {
	useBroadcastControlRequestStreamQuery,
	useBroadcastControlStreamQuery,
	useEmitBroadcastControlMutation,
	useHeadJudgePositionStreamQuery
} from "../../redux/services/streamingApi"
import CompetitionSelector from "../competition/CompetitionSelector"
import EventSelector from "../competition/EventSelector"
import HeatsSelector from "../competition/HeatSelector"
import PhaseSelector from "../competition/PhaseSelector"
import {
	defaultOverlayControllerState,
	HeadJudgePosition,
	OverlayControlState
} from "../Interfaces"
import { AthleteInfo } from "../roles/scribe/InfoBar"
import { PaddlerSelector } from "../roles/scribe/InfoBar/PaddlerSelector"
import { RunSelector } from "../roles/scribe/InfoBar/Runselector"
import { TowerSettings } from "./TowerSettings"

const describeFollowedPosition = (position?: HeadJudgePosition | null) => {
	if (!position) {
		return "Waiting for head judge."
	}
	const { first_name, last_name } = position.athlete

	return `Currently on ${first_name} ${last_name}, run ${
		position.runNumber + 1
	}.`
}

const AthletePickers = ({
	athlete,
	heatHasNoAthletes
}: {
	athlete?: AthleteInfo
	heatHasNoAthletes: boolean
}) => {
	if (athlete) {
		return (
			<Grid container spacing={2}>
				<Grid size={{ xs: 12, md: 6 }}>
					<PaddlerSelector paddlerInfo={athlete} />
				</Grid>
				<Grid size={{ xs: 12, md: 6 }}>
					<RunSelector />
				</Grid>
			</Grid>
		)
	}

	return (
		<Typography color="text.secondary">
			{heatHasNoAthletes
				? "Add athletes to this heat to choose a paddler."
				: "Select a heat to choose the paddler and run."}
		</Typography>
	)
}

const OverlayController: React.FC = () => {
	const [overlayControlState, setOverlayControlState] = React.useState(
		defaultOverlayControllerState
	)
	const selectedCompetition = useSelector(getSelectedCompetition)

	const selectedEvent = useSelector(getSelectedEvent)
	const currentPaddlerIndex = useSelector(getCurrentPaddlerIndex)

	const selectedHeat = useSelector(getSelectedHeat)
	const selectedRun = useSelector(getSelectedRun)
	const selectedPhase = useSelector(getSelectedPhase)
	const { data: athleteData } = useGetHeatInfoGetHeatInfoHeatIdGetQuery(
		{
			heatId: selectedHeat
		},
		{ skip: !selectedHeat }
	)
	const [selectedAthlete, setSelectedAthlete] = useState<
		AthleteInfo | undefined
	>(undefined)
	useEffect(() => {
		const athlete = athleteData?.[currentPaddlerIndex]
		if (athlete) {
			setSelectedAthlete({
				id: athlete.athlete_id,
				first_name: athlete.first_name,
				last_name: athlete.last_name,
				bib: athlete.bib,
				scoresheet: athlete.scoresheet,
				affiliation: athlete.affiliation
			})
		} else {
			setSelectedAthlete(undefined)
		}
	}, [currentPaddlerIndex, athleteData, selectedHeat])
	// Keep the overlay-control state in sync with the operator's selections.
	// One effect with a functional update — six separate non-functional setState
	// calls clobbered each other whenever a selector cascade changed more than
	// one value in a commit (picking a competition resets event/phase/heat too).
	useEffect(() => {
		setOverlayControlState((prev) => ({
			...prev,
			selectedCompetition,
			selectedEvent,
			selectedPhase,
			selectedHeat,
			selectedAthlete,
			selectedRun
		}))
	}, [
		selectedCompetition,
		selectedEvent,
		selectedPhase,
		selectedHeat,
		selectedAthlete,
		selectedRun
	])
	const [emitBroadcastControl, { isError: emitFailed }] =
		useEmitBroadcastControlMutation()
	// Subscribe to the broadcast control stream to maintain a persistent socket
	// connection. The emitBroadcastControl mutation reuses this socket.
	useBroadcastControlStreamQuery()
	const { data: stateRequestCount } = useBroadcastControlRequestStreamQuery()
	const { followHeadJudge } = overlayControlState
	const { data: headJudgePosition } = useHeadJudgePositionStreamQuery(
		undefined,
		{ skip: !followHeadJudge }
	)
	const heatHasNoAthletes = athleteData?.length === 0
	const displayedHeat =
		followHeadJudge && headJudgePosition
			? headJudgePosition.heatId
			: overlayControlState.selectedHeat
	const toggleKey = (key: keyof OverlayControlState) => {
		setOverlayControlState((prevState) => ({
			...prevState,
			[key]: !prevState[key]
		}))
	}

	const toggleIfAthleteSelected = (key: keyof OverlayControlState) => {
		if (overlayControlState[key] || overlayControlState.selectedAthlete) {
			toggleKey(key)
		} else {
			toast.error("Please select an athlete to use this feature")
		}
	}

	useEffect(() => {
		void emitBroadcastControl(overlayControlState)
	}, [overlayControlState, stateRequestCount, emitBroadcastControl])

	const followed = followHeadJudge
		? {
				inert: true,
				"data-testid": "followed-picker",
				sx: { opacity: 0.5 }
		  }
		: {}

	return (
		<Stack
			component="section"
			aria-label="Overlay controller"
			spacing={3}
			sx={{ py: 3 }}
		>
			{emitFailed && (
				<Alert severity="error">
					Not connected to the server: the displays may not be showing
					these graphics.
				</Alert>
			)}
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					alignItems: "center",
					justifyContent: "space-between",
					gap: 2
				}}
			>
				{followHeadJudge && (
					<Alert severity="info" sx={{ flex: "1 1 400px" }}>
						Competition, heat, paddler and run are disabled: the
						displays are following the head judge.{" "}
						{describeFollowedPosition(headJudgePosition)}
					</Alert>
				)}
				<ToggleButtonGroup
					exclusive
					color="primary"
					sx={{ ml: "auto" }}
					value={followHeadJudge ? "follow" : "manual"}
					onChange={(_, mode: string | null) => {
						if (mode) {
							setOverlayControlState((prevState) => ({
								...prevState,
								followHeadJudge: mode === "follow"
							}))
						}
					}}
				>
					<ToggleButton value="manual">Manual</ToggleButton>
					<ToggleButton value="follow">
						Follow head judge
					</ToggleButton>
				</ToggleButtonGroup>
			</Box>
			<Stack spacing={2}>
				<Grid container spacing={1}>
					<Grid size="grow" {...followed}>
						<CompetitionSelector />
					</Grid>
					<Grid size="grow">
						<EventSelector />
					</Grid>
					<Grid size="grow">
						<PhaseSelector />
					</Grid>
					<Grid size="grow" {...followed}>
						<HeatsSelector />
					</Grid>
				</Grid>
				{!followHeadJudge && heatHasNoAthletes && (
					<Alert severity="warning">
						This heat has no athletes. Add athletes to the heat or
						select a different heat to use athlete overlays.
					</Alert>
				)}
				<Box {...followed}>
					<AthletePickers
						athlete={selectedAthlete}
						heatHasNoAthletes={heatHasNoAthletes}
					/>
				</Box>
			</Stack>
			<Box
				aria-label="Broadcast screen"
				role="group"
				sx={{
					display: "grid",
					gap: 1.5,
					p: 1.5,
					border: "2px solid",
					borderColor: "divider",
					borderRadius: 2,
					bgcolor: "action.hover",
					gridTemplateColumns: {
						xs: "minmax(0, 1fr)",
						md: "repeat(4, minmax(0, 1fr))"
					},
					gridTemplateAreas: {
						xs: `"logo" "overview" "title" "heat" "phase" "tower" "athlete" "run"`,
						md: `"logo . . ." "overview . heat phase" "title . . tower" ". . . tower" "athlete . . run"`
					},
					gridTemplateRows: { md: "auto auto auto 1fr auto" },
					alignItems: "start",
					// Tiles sit where their graphic appears on the programme
					// output, in a frame much squatter than 16:9 to save height.
					aspectRatio: { md: "4 / 1" }
				}}
			>
				<Box sx={{ gridArea: "logo" }}>
					<GraphicTile
						label="ICF logo"
						onAir={overlayControlState.showImageCard}
						onClick={() => toggleKey("showImageCard")}
					/>
				</Box>
				<Stack spacing={1} sx={{ gridArea: "overview" }}>
					<GraphicTile
						label="Competition overview"
						onAir={overlayControlState.showCompetitionOverview}
						onClick={() => {
							if (overlayControlState.selectedCompetition) {
								toggleKey("showCompetitionOverview")
							} else {
								toast.error(
									"Please select a competition to use this feature"
								)
							}
						}}
					/>
					<ToggleButtonGroup
						exclusive
						fullWidth
						size="small"
						aria-label="Competition overview lists"
						value={overlayControlState.competitionOverviewList}
						onChange={(_, list: "events" | "heats" | null) => {
							// Clicking the selected option again would clear it.
							if (list) {
								setOverlayControlState((prevState) => ({
									...prevState,
									competitionOverviewList: list
								}))
							}
						}}
						sx={{ bgcolor: "background.paper" }}
					>
						<ToggleButton value="events">Events</ToggleButton>
						<ToggleButton value="heats">Heats</ToggleButton>
					</ToggleButtonGroup>
				</Stack>
				<Box sx={{ gridArea: "title" }}>
					<GraphicTile
						label="Event title"
						onAir={overlayControlState.showEventTitle}
						onClick={() => {
							if (overlayControlState.selectedEvent) {
								toggleKey("showEventTitle")
							} else {
								toast.error(
									"Please select an event to use this feature"
								)
							}
						}}
					/>
				</Box>
				<Box sx={{ gridArea: "heat" }}>
					<GraphicTile
						label="Heat summary"
						onAir={overlayControlState.showHeatSummary}
						onClick={() => {
							if (displayedHeat) {
								toggleKey("showHeatSummary")
							} else {
								toast.error(
									"Please select a competition and heat to use this feature"
								)
							}
						}}
					/>
				</Box>
				<Box sx={{ gridArea: "phase" }}>
					<GraphicTile
						label="Phase results"
						onAir={overlayControlState.showPhaseResults}
						onClick={() => {
							if (overlayControlState.selectedPhase) {
								toggleKey("showPhaseResults")
							} else {
								toast.error(
									"Please select a phase to use this feature"
								)
							}
						}}
					/>
				</Box>
				<Stack spacing={1} sx={{ gridArea: "tower" }}>
					<GraphicTile
						label="Leaderboard tower"
						onAir={overlayControlState.showLeaderboardTower}
						onClick={() => {
							if (
								overlayControlState.showLeaderboardTower ||
								overlayControlState.selectedPhase
							) {
								toggleKey("showLeaderboardTower")
							} else {
								toast.error(
									"Please select a phase to use this feature"
								)
							}
						}}
					/>
					<TowerSettings
						settings={overlayControlState}
						onChange={(change) =>
							setOverlayControlState((prevState) => ({
								...prevState,
								...change
							}))
						}
					/>
				</Stack>
				<Box sx={{ gridArea: "athlete", alignSelf: "end" }}>
					<GraphicTile
						label="Athlete overview"
						onAir={overlayControlState.showAthleteOverview}
						onClick={() =>
							toggleIfAthleteSelected("showAthleteOverview")
						}
					/>
				</Box>
				<Box sx={{ gridArea: "run", alignSelf: "end" }}>
					<GraphicTile
						label="Live run score"
						onAir={overlayControlState.showLiveRunScore}
						onClick={() =>
							toggleIfAthleteSelected("showLiveRunScore")
						}
					/>
				</Box>
			</Box>
		</Stack>
	)
}

// The red of a camera's on-air tally lamp, not the theme's error colour: an
// on-air graphic is the normal working state, not a fault.
const tallyRed = "#e5231b"

const readableTallyRed = (mode: "light" | "dark") =>
	mode === "dark" ? lighten(tallyRed, 0.35) : darken(tallyRed, 0.2)

/** A toggle for one overlay graphic, lit like a tally lamp while on air. */
const GraphicTile = ({
	label,
	onAir,
	onClick
}: {
	label: string
	onAir: boolean
	onClick: () => void
}) => (
	<ButtonBase
		aria-pressed={onAir}
		onClick={onClick}
		sx={(theme) => ({
			display: "grid",
			gridTemplateColumns: "8px 1fr",
			alignItems: "stretch",
			width: "100%",
			minHeight: 64,
			textAlign: "left",
			borderRadius: 2,
			overflow: "hidden",
			border: "1px solid",
			borderColor: onAir ? tallyRed : theme.palette.divider,
			bgcolor: onAir
				? alpha(tallyRed, 0.08)
				: theme.palette.background.paper,
			transition: "background-color 150ms, border-color 150ms",
			"@media (prefers-reduced-motion: reduce)": { transition: "none" },
			"&:hover": {
				bgcolor: onAir
					? alpha(tallyRed, 0.14)
					: theme.palette.action.hover
			},
			"&.Mui-focusVisible": {
				outline: `3px solid ${theme.palette.primary.main}`,
				outlineOffset: 2
			}
		})}
	>
		<Box
			aria-hidden
			sx={{
				bgcolor: onAir ? tallyRed : "action.disabledBackground",
				boxShadow: onAir ? `0 0 12px ${alpha(tallyRed, 0.7)}` : "none"
			}}
		/>
		<Box sx={{ display: "grid", alignContent: "center", px: 1.5, py: 1 }}>
			<Typography sx={{ fontWeight: 600 }}>{label}</Typography>
			<Typography
				aria-hidden
				variant="body2"
				sx={(theme) => ({
					fontWeight: onAir ? 700 : 400,
					// Pure tally red is under 4.5:1 against either theme's tile.
					color: onAir
						? readableTallyRed(theme.palette.mode)
						: "text.secondary"
				})}
			>
				{onAir ? "On air" : "Off"}
			</Typography>
		</Box>
	</ButtonBase>
)

export default OverlayController
