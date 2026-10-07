import { SxProps, Theme } from "@mui/material/styles"
import { pwBlack, pwBrightBlue, pwOrange, pwWhite } from "./overlayTheme"

// Backdrops the fullscreen overlays draw in place of their artwork when the
// graphics server is unavailable. They style the existing card elements, so
// they follow the overlay theme's two text tones: white headings and footer on
// black, black rows and run counts on a light panel.

const pwBlack75 = "#404040"
const pwBlack50 = "#808080"
const pwBlack25 = "#BFBFBF"
const pwOrange75 = "#FF8340"
const pwOrange25 = "#FFD6BF"
const pwPaleGrey = "#F2F2F2"

const WIPE_MS = 420
const WIPE_OUT_DELAY_MS = 140
const TEXT_IN_DELAY_MS = 260
const TEXT_IN_MS = 260
const RUNS_STAGGER_OUT_MS = 80

/** The event title's run-count band is the last panel to leave. */
export const OVERLAY_FALLBACK_EXIT_MS =
	WIPE_OUT_DELAY_MS + RUNS_STAGGER_OUT_MS + WIPE_MS

// Both polygons keep the same 8% slant so the leading edge stays angled the
// whole way across, and overhang the box so the drop shadow isn't clipped.
const CLIP_HIDDEN = "polygon(-8% -12%, -8% -12%, -16% 112%, -16% 112%)"
const CLIP_SHOWN = "polygon(-8% -12%, 116% -12%, 108% 112%, -8% 112%)"

const fallback = "& .AemsOverlay-fallback"
const shown = '& .AemsOverlay-fallback[data-visible="true"]'
const card = ".AemsTableCard-root"
// Title graphics: a black heading band with a light band beneath that wipes in
// just after it.
const titleHeadings = [
	".AemsEventTitle-heading",
	".AemsCompetitionOverview-heading"
]
const titleSecondBands = [
	".AemsEventTitle-runs",
	".AemsCompetitionOverview-rail"
]
// Root-prefixed so the stagger outranks the shared wipe delay.
const staggeredTitleSecondBands = [
	".AemsEventTitle-root .AemsEventTitle-runs",
	".AemsCompetitionOverview-root .AemsCompetitionOverview-rail"
]
const blackBands = [
	".AemsAthleteOverview-name",
	".AemsRunCorner-name",
	".AemsRunCorner-event",
	".AemsEventSlate-event",
	".AemsHeatGrid-heat",
	".AemsHeatGrid-onWater",
	".AemsHeatGrid-page",
	".AemsLeaderboard-event",
	".AemsLeaderboard-rank",
	".AemsLeaderboard-page"
]
const lightBands = [
	".AemsAthleteOverview-runs",
	".AemsRunCorner-clock",
	".AemsEventSlate-format",
	".AemsHeatGrid-context",
	".AemsHeatGrid-athlete",
	".AemsLeaderboard-format",
	".AemsLeaderboard-athlete",
	".AemsLeaderboard-run"
]
const scoreBoxes = [
	".AemsAthleteOverview-bib",
	".AemsAthleteOverview-total",
	".AemsEventSlate-phase",
	".AemsHeatGrid-bib",
	".AemsLeaderboard-phase",
	".AemsLeaderboard-total"
]
// Strips of small context text: the competition name and column headings.
const deepStrips = [".AemsEventSlate-competition", ".AemsLeaderboard-columns"]
const lowerThirdPanels = [
	...blackBands,
	...lightBands,
	...scoreBoxes,
	...deepStrips
]
// These panels carry an inline --i, their order on screen, and wipe in one
// after another. They all leave together, so the exit time is unchanged.
const staggeredPanels = lowerThirdPanels.filter((panel) =>
	/AemsEventSlate|AemsHeatGrid|AemsLeaderboard/.test(panel)
)
const STAGGER_MS = 70

const panels = (root: string, suffix = ""): string =>
	[card, ...titleHeadings, ...titleSecondBands, ...lowerThirdPanels]
		.map((panel) => `${root} ${panel}${suffix}`)
		.join(", ")
const each = (selectors: string[], root = fallback): string =>
	selectors.map((selector) => `${root} ${selector}`).join(", ")

const altBox = {
	backgroundColor: pwOrange,
	backgroundImage: `linear-gradient(180deg, ${pwOrange75} 0%, ${pwOrange} 100%)`,
	color: pwBlack
}

const titleBand = {
	marginLeft: "-1.5rem",
	padding: "0.9rem 9rem 0.9rem 1.5rem",
	boxShadow: `inset 8px 0 0 ${pwOrange}`
}

export const overlayFallbackSx: SxProps<Theme> = {
	[fallback]: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center"
	},

	[`${fallback} ${card}`]: {
		// Its auto margins would otherwise shrink it to fit inside the flex column.
		width: "100%",
		padding: "1.25em 1.5em 0",
		borderRadius: "4px",
		backgroundColor: pwBlack,
		backgroundImage: [
			`linear-gradient(90deg, ${pwOrange} 0%, ${pwOrange} 28%, rgba(255, 90, 0, 0) 75%)`,
			`linear-gradient(160deg, ${pwBlack75} 0%, ${pwBlack} 45%, ${pwBlack} 100%)`
		].join(", "),
		backgroundSize: "100% 5px, 100% 100%",
		backgroundRepeat: "no-repeat",
		boxShadow: "0 18px 48px rgba(0, 0, 0, 0.45)"
	},
	[`${fallback} .MuiDivider-root`]: { height: "4px" },
	[`${fallback} .MuiTableHead-root`]: {
		backgroundColor: pwOrange25,
		backgroundImage: `linear-gradient(90deg, ${pwOrange25} 0%, ${pwPaleGrey} 100%)`
	},
	[`${fallback} .MuiTableBody-root`]: {
		backgroundColor: pwWhite,
		backgroundImage: `linear-gradient(180deg, ${pwWhite} 0%, ${pwWhite} 35%, ${pwPaleGrey} 100%)`
	},
	[`${fallback} .MuiTableCell-root:first-of-type`]: { paddingLeft: "20px" },

	[each(titleHeadings)]: {
		...titleBand,
		backgroundColor: pwBlack,
		backgroundImage: `linear-gradient(90deg, ${pwBlack75} 0%, ${pwBlack} 70%, rgba(0, 0, 0, 0) 100%)`
	},
	[each(titleSecondBands)]: {
		...titleBand,
		backgroundColor: pwWhite,
		backgroundImage: `linear-gradient(90deg, ${pwWhite} 0%, ${pwPaleGrey} 70%, rgba(242, 242, 242, 0) 100%)`
	},

	[each(blackBands)]: {
		backgroundColor: pwBlack,
		backgroundImage: `linear-gradient(100deg, ${pwBlack75} 0%, ${pwBlack} 55%, ${pwBlack} 100%)`,
		color: "white"
	},
	[each(lightBands)]: {
		backgroundColor: pwWhite,
		backgroundImage: `linear-gradient(180deg, ${pwWhite} 0%, ${pwWhite} 40%, ${pwPaleGrey} 100%)`,
		color: pwBlack
	},
	[each([...scoreBoxes, ".AemsRunCorner-score"])]: altBox,
	[each(deepStrips)]: {
		backgroundColor: pwBlack,
		color: pwBlack25
	},
	[`${fallback} .AemsHeatGrid-onWaterLabel`]: { color: pwBrightBlue },
	[`${fallback} .AemsLeaderboard-run`]: {
		borderLeft: `2px solid ${pwBlack25}`
	},
	[each(blackBands.map((band) => `${band} .AemsAffiliationPill`))]: {
		color: pwBlack25
	},
	[`${fallback} .AemsAthleteOverview-runs > *`]: {
		borderRight: `2px solid ${pwBlack25}`
	},
	// The backups stack down the left edge: logo, competition overview, then
	// the event title slate below it.
	[`${fallback} .AemsCompetitionOverview-position`]: { top: 200 },
	[`${fallback} .AemsCompetitionOverview-rail`]: {
		padding: "0 4rem 0 1.5rem"
	},
	[`${fallback} .AemsCompetitionOverview-step`]: {
		borderRight: `2px solid ${pwBlack25}`
	},
	[`${fallback} .AemsCompetitionOverview-current`]: {
		...altBox,
		borderRightColor: "transparent"
	},
	[each([
		".AemsAthleteOverview-muted",
		".AemsCompetitionOverview-past",
		".AemsLeaderboard-dropped"
	])]: {
		color: pwBlack50
	},

	[panels(fallback)]: {
		clipPath: CLIP_HIDDEN,
		transition: `clip-path ${WIPE_MS}ms cubic-bezier(0.22, 0.8, 0.24, 1) ${WIPE_OUT_DELAY_MS}ms`
	},
	[each(staggeredTitleSecondBands)]: {
		transitionDelay: `${WIPE_OUT_DELAY_MS + RUNS_STAGGER_OUT_MS}ms`
	},
	[panels(shown)]: {
		clipPath: CLIP_SHOWN,
		transitionDelay: "0ms"
	},
	[each(staggeredTitleSecondBands, shown)]: {
		transitionDelay: "90ms"
	},
	[each(staggeredPanels, shown)]: {
		transitionDelay: `calc(var(--i, 0) * ${STAGGER_MS}ms)`
	},
	[panels(fallback, " > *")]: {
		opacity: 0,
		transition: "opacity 160ms ease-in"
	},
	[panels(shown, " > *")]: {
		opacity: 1,
		transition: `opacity ${TEXT_IN_MS}ms ease-out ${TEXT_IN_DELAY_MS}ms`
	},

	[each(
		staggeredPanels.map((panel) => `${panel} > *`),
		shown
	)]: {
		transitionDelay: `calc(${TEXT_IN_DELAY_MS}ms + var(--i, 0) * ${STAGGER_MS}ms)`
	},

	"@media (prefers-reduced-motion: reduce)": {
		[panels(fallback)]: {
			clipPath: "none",
			opacity: 0,
			transition: "opacity 200ms linear"
		},
		[panels(shown)]: { clipPath: "none", opacity: 1 }
	}
}
