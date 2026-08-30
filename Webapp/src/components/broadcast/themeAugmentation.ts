import { SxProps, Theme } from "@mui/material/styles"

// The broadcast Cards render on two surfaces with different geometry: the
// /Broadcast overlay (positioned against Pixi background artwork) and the /Arena
// venue screen (no artwork). Instead of branching inside the components, each
// surface's theme supplies the geometry as `defaultProps` on the slots below,
// read via `useThemeProps`. Colour/borders/shadows stay in the themes'
// `styleOverrides` (MuiPaper / MuiTable* / MuiDivider), not here.

export interface AemsBasicTableThemeProps {
	pageLimit?: number
	/** Pad short pages to `pageLimit` rows. Overlay keeps the table registered
	 *  with its frame; arena lets it shrink to content. */
	padEmptyRows?: boolean
}

export interface AemsCardHeaderThemeProps {
	titleAlign?: "flex-start" | "flex-end" | "space-between"
	/** Separator height between title and table. Overlay uses it as invisible
	 *  artwork clearance; arena leaves it unset for an ordinary rule. */
	spacerHeight?: number
}

export interface AemsPhaseResultsThemeProps extends AemsCardHeaderThemeProps {
	/** "single" one-line row (arena) or "split" two fixed-height lines landing
	 *  in separate bands of the overlay frame. */
	detailRows?: "single" | "split"
}

export interface AemsEventTitleThemeProps {
	titleVariant?: "h1" | "h2"
	detailVariant?: "h4" | "h5"
	/** Positioning for the competition/event/phase group. */
	headingSx?: SxProps<Theme>
	/** Positioning for the run-count group. */
	runsSx?: SxProps<Theme>
	/** `Stack` spacing between the groups. Arena wants the gap; overlay passes 0
	 *  so the sibling margin doesn't nudge its absolutely-positioned groups. */
	stackSpacing?: number
}

declare module "@mui/material/styles" {
	interface ComponentsPropsList {
		AemsBasicTable: AemsBasicTableThemeProps
		AemsHeatSummary: AemsCardHeaderThemeProps
		AemsPhaseResults: AemsPhaseResultsThemeProps
		AemsEventTitle: AemsEventTitleThemeProps
	}

	interface Components {
		AemsBasicTable?: {
			defaultProps?: ComponentsPropsList["AemsBasicTable"]
		}
		AemsHeatSummary?: {
			defaultProps?: ComponentsPropsList["AemsHeatSummary"]
		}
		AemsPhaseResults?: {
			defaultProps?: ComponentsPropsList["AemsPhaseResults"]
		}
		AemsEventTitle?: {
			defaultProps?: ComponentsPropsList["AemsEventTitle"]
		}
	}
}
