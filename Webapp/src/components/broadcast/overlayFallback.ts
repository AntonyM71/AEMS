import { SxProps, Theme } from "@mui/material/styles"
import { icfDarkBlue, icfLightBlue, icfWhite } from "./overlayTheme"

// Backdrops the fullscreen overlays draw in place of their artwork when the
// graphics server is unavailable. They style the existing card elements, so
// they follow the overlay theme's two text tones: white headings and footer on
// navy, dark-blue rows and run counts on a light panel.

const icfNavyLift = "#143f75"
const icfNavyDeep = "#071830"
const icfMist = "#e3eef7"
const icfTint = "#cfe6f5"

const WIPE_MS = 420
const WIPE_EASE = "cubic-bezier(0.22, 0.8, 0.24, 1)"
const WIPE_OUT_DELAY_MS = 140
const TEXT_IN_DELAY_MS = 260
const TEXT_IN_MS = 260
const TEXT_OUT_MS = 160
const RUNS_STAGGER_IN_MS = 90
const RUNS_STAGGER_OUT_MS = 80
const REDUCED_MOTION_FADE_MS = 200

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
const heading = ".AemsEventTitle-heading"
const runs = ".AemsEventTitle-runs"

const panels = (root: string, suffix = ""): string =>
	[card, heading, runs].map((panel) => `${root} ${panel}${suffix}`).join(", ")

const titleBand = {
	marginLeft: "-1.5rem",
	padding: "0.9rem 9rem 0.9rem 1.5rem",
	boxShadow: `inset 8px 0 0 ${icfLightBlue}`
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
		backgroundColor: icfDarkBlue,
		backgroundImage: [
			`linear-gradient(90deg, ${icfLightBlue} 0%, ${icfLightBlue} 28%, rgba(28, 154, 215, 0) 75%)`,
			`linear-gradient(160deg, ${icfNavyLift} 0%, ${icfDarkBlue} 45%, ${icfNavyDeep} 100%)`
		].join(", "),
		backgroundSize: "100% 5px, 100% 100%",
		backgroundRepeat: "no-repeat",
		boxShadow: "0 18px 48px rgba(4, 14, 30, 0.45)"
	},
	[`${fallback} .MuiDivider-root`]: { height: "4px" },
	[`${fallback} .MuiTableHead-root`]: {
		backgroundColor: icfTint,
		backgroundImage: `linear-gradient(90deg, ${icfTint} 0%, ${icfMist} 100%)`
	},
	[`${fallback} .MuiTableBody-root`]: {
		backgroundColor: icfWhite,
		backgroundImage: `linear-gradient(180deg, #ffffff 0%, ${icfWhite} 35%, ${icfMist} 100%)`
	},
	[`${fallback} .MuiTableCell-root:first-of-type`]: { paddingLeft: "20px" },

	[`${fallback} ${heading}`]: {
		...titleBand,
		backgroundColor: icfDarkBlue,
		backgroundImage: `linear-gradient(90deg, ${icfNavyLift} 0%, ${icfDarkBlue} 70%, rgba(12, 40, 80, 0) 100%)`
	},
	[`${fallback} ${runs}`]: {
		...titleBand,
		backgroundColor: icfWhite,
		backgroundImage: `linear-gradient(90deg, ${icfWhite} 0%, ${icfMist} 70%, rgba(227, 238, 247, 0) 100%)`
	},

	[panels(fallback)]: {
		clipPath: CLIP_HIDDEN,
		transition: `clip-path ${WIPE_MS}ms ${WIPE_EASE} ${WIPE_OUT_DELAY_MS}ms`
	},
	[`${fallback} .AemsEventTitle-root ${runs}`]: {
		transitionDelay: `${WIPE_OUT_DELAY_MS + RUNS_STAGGER_OUT_MS}ms`
	},
	[panels(shown)]: {
		clipPath: CLIP_SHOWN,
		transitionDelay: "0ms"
	},
	[`${shown} .AemsEventTitle-root ${runs}`]: {
		transitionDelay: `${RUNS_STAGGER_IN_MS}ms`
	},
	[panels(fallback, " > *")]: {
		opacity: 0,
		transition: `opacity ${TEXT_OUT_MS}ms ease-in`
	},
	[panels(shown, " > *")]: {
		opacity: 1,
		transition: `opacity ${TEXT_IN_MS}ms ease-out ${TEXT_IN_DELAY_MS}ms`
	},

	"@media (prefers-reduced-motion: reduce)": {
		[panels(fallback)]: {
			clipPath: "none",
			opacity: 0,
			transition: `opacity ${REDUCED_MOTION_FADE_MS}ms linear`
		},
		[panels(shown)]: { clipPath: "none", opacity: 1 }
	}
}
