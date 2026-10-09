import Box from "@mui/material/Box"
import { SxProps, Theme } from "@mui/material/styles"
import { brandFontFamily, dataFontFamily } from "../../../fonts"
import { OverlayControlState } from "../../Interfaces"
import { pwBlack, pwBrightBlue, pwOrange, pwWhite } from "../overlayTheme"
import { TowerStanding } from "./useTowerStandings"

// Where the tower sits in the overlay's 1920x1080 frame.
export const TOWER_TOP = 64
export const TOWER_RIGHT = 64
export const TOWER_WIDTH = 320
export const TOWER_ROW_HEIGHT = 44

const gold = "#E2B33C"
const silver = "#C3CAD3"
const bronze = "#BE7C45"
const medalColours = [gold, silver, bronze]
const submergedBlue = "rgba(0, 52, 70, 0.62)"
const submergedText = "#C9F6FF"

/** "Leader" for first place, otherwise the points behind, as "−44.33". */
export const gapLabel = (place: number, gapToLeader: number) =>
	place === 1 ? "Leader" : `−${Math.abs(gapToLeader).toFixed(2)}`

export const TowerRow = ({
	standing,
	place,
	placesThrough,
	className = "",
	sx,
	children
}: {
	standing: TowerStanding
	place: number
	placesThrough: number | null
	className?: string
	sx?: SxProps<Theme>
	children?: React.ReactNode
}) => {
	const isOut = placesThrough !== null && place > placesThrough
	const classes = [
		"AemsTower-row",
		place <= medalColours.length ? `AemsTower-medal${place}` : "",
		isOut ? "AemsTower-out" : "",
		className
	]

	return (
		<Box className={classes.filter(Boolean).join(" ")} sx={sx}>
			<span className="AemsTower-place">{place}</span>
			<span className="AemsTower-bib">{standing.bib}</span>
			<span className="AemsTower-name">
				{standing.lastName.toUpperCase()}
			</span>
			<span className="AemsTower-gap">
				{gapLabel(place, standing.gapToLeader)}
			</span>
			{children}
		</Box>
	)
}

/** The line between the last place through and the first place out. */
export const CutLine = ({
	placesThrough,
	sx
}: {
	placesThrough: number
	sx?: SxProps<Theme>
}) => (
	<Box className="AemsTower-cut" aria-label="Cut line" sx={sx}>
		<span className="AemsTower-cutTag">Top {placesThrough} through</span>
	</Box>
)

const wavePath =
	"<path d='M0 7 Q10 1 20 7 T40 7' fill='none' stroke='#00DCFF' stroke-width='3.5'/>"
const waveSvg = `url("data:image/svg+xml,${encodeURIComponent(
	`<svg xmlns='http://www.w3.org/2000/svg' width='40' height='14'>${wavePath}</svg>`
)}")`

const sharedSx = {
	fontFamily: brandFontFamily,
	color: pwWhite,
	"& .AemsTower-head": {
		display: "grid",
		gap: "2px",
		padding: "12px 14px 10px"
	},
	"& .AemsTower-event": { fontSize: 26, fontWeight: 800, lineHeight: 1.1 },
	"& .AemsTower-sub": {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "baseline",
		fontSize: 17,
		fontWeight: 600,
		color: "rgba(255, 255, 255, 0.7)"
	},
	"& .AemsTower-count": { fontFamily: dataFontFamily, color: pwWhite },
	"& .AemsTower-row": {
		position: "relative",
		boxSizing: "border-box",
		height: TOWER_ROW_HEIGHT,
		display: "grid",
		gridTemplateColumns: "38px 42px 1fr 100px",
		alignItems: "center",
		fontVariantNumeric: "tabular-nums",
		transition: "background-color 300ms, color 300ms"
	},
	"& .AemsTower-place": {
		alignSelf: "stretch",
		display: "grid",
		placeItems: "center",
		fontSize: 21,
		fontWeight: 700
	},
	"& .AemsTower-bib": {
		display: "grid",
		placeItems: "center",
		width: 34,
		height: 26,
		fontFamily: dataFontFamily,
		fontSize: 15,
		borderRadius: "3px"
	},
	"& .AemsTower-name": {
		pl: 1,
		fontSize: 21,
		fontWeight: 700,
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis"
	},
	"& .AemsTower-gap": {
		fontFamily: dataFontFamily,
		fontSize: 18,
		textAlign: "right",
		pr: 1.5,
		whiteSpace: "nowrap"
	},
	"& .AemsTower-row.AemsTower-justClimbed": {
		boxShadow: `inset -6px 0 0 ${pwOrange}`
	},
	"& .AemsTower-break": {
		height: 10,
		background:
			"radial-gradient(circle, rgba(255,255,255,.4) 1.3px, transparent 1.8px) center / 9px 10px repeat-x"
	},
	"& .AemsTower-cut": { position: "relative", height: 0, zIndex: 6 },
	"& .AemsTower-cut::before": {
		content: '""',
		position: "absolute",
		left: 0,
		right: 0,
		top: -2,
		height: 4,
		background: pwOrange
	},
	// The tower is on the right edge, so its labels reach into the frame.
	"& .AemsTower-cutTag": {
		position: "absolute",
		right: "calc(100% + 10px)",
		top: -15,
		padding: "3px 10px",
		fontSize: 17,
		fontWeight: 700,
		whiteSpace: "nowrap",
		background: pwOrange,
		color: pwBlack
	}
}

const timingSx = {
	background: "rgba(0, 0, 0, 0.86)",
	borderTop: `5px solid ${pwOrange}`,
	borderRadius: "4px 4px 12px 12px",
	pb: 1,
	"& .AemsTower-head": {
		borderBottom: "1px solid rgba(255, 255, 255, 0.14)",
		mb: 0.5
	},
	"& .AemsTower-row": {
		borderBottom: "1px solid rgba(255, 255, 255, 0.07)"
	},
	"& .AemsTower-bib": { background: pwWhite, color: pwBlack },
	"& .AemsTower-out .AemsTower-place, & .AemsTower-out .AemsTower-name, & .AemsTower-out .AemsTower-gap":
		{ color: "rgba(255, 255, 255, 0.58)" },
	...Object.fromEntries(
		medalColours.map((colour, i) => [
			`& .AemsTower-medal${i + 1}`,
			{
				boxShadow: `inset 4px 0 0 ${colour}`,
				"& .AemsTower-place": { color: colour }
			}
		])
	)
}

const waterlineSx = {
	"& .AemsTower-head": {
		background: pwBlack,
		borderBottom: `4px solid ${pwBrightBlue}`
	},
	"& .AemsTower-row": { background: pwWhite, color: pwBlack },
	"& .AemsTower-row.AemsTower-out": {
		background: submergedBlue,
		color: submergedText,
		backdropFilter: "blur(5px)"
	},
	"& .AemsTower-place": { fontWeight: 400, fontSize: 23 },
	"& .AemsTower-bib": {
		boxShadow: "inset 0 0 0 1.5px currentColor",
		opacity: 0.75
	},
	"& .AemsTower-break": { backgroundColor: "rgba(0, 0, 0, 0.35)" },
	"& .AemsTower-cut::before": {
		top: -7,
		height: 14,
		background: `${waveSvg} repeat-x`,
		animation: "AemsTowerWave 2.4s linear infinite",
		"@media (prefers-reduced-motion: reduce)": { animation: "none" }
	},
	"& .AemsTower-cutTag": { background: pwBrightBlue },
	"@keyframes AemsTowerWave": { to: { backgroundPositionX: "40px" } },
	...Object.fromEntries(
		medalColours.map((colour, i) => [
			`& .AemsTower-medal${i + 1} .AemsTower-place`,
			{
				background: `radial-gradient(circle, ${colour} 0 14px, transparent 15px)`,
				fontWeight: 700
			}
		])
	)
}

// An sx array, so each style's rules layer over the shared ones instead of
// replacing a shared selector wholesale.
export const towerSx = (
	style: OverlayControlState["towerStyle"]
): SxProps<Theme> => [sharedSx, style === "waterline" ? waterlineSx : timingSx]
