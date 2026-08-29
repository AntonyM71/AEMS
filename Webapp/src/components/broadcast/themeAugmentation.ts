import { SxProps, Theme } from "@mui/material/styles"

// The broadcast Cards are shared by two surfaces with very different geometry:
// the /Broadcast overlay, where each card is positioned to line up with the Pixi
// background artwork, and the /Arena venue screen, which has no artwork at all.
//
// Rather than branching inside the components, each surface's theme supplies the
// geometry through MUI's own defaultProps mechanism. The components read it with
// `useThemeProps({ props, name })`, so a card can be dropped into either
// ThemeProvider and lay itself out correctly.
//
// Colour, borders and shadows are NOT here — those belong in the themes'
// `styleOverrides` for MuiPaper / MuiTable* / MuiDivider.

export interface AemsBasicTableThemeProps {
	/** Rows shown per page before the table rotates to the next one. */
	pageLimit?: number
	/**
	 * Pad short pages with blank rows so the table is always `pageLimit` tall.
	 * The overlay needs this to stay registered with its background frame; the
	 * arena wants the table to shrink to its content.
	 */
	padEmptyRows?: boolean
}

export interface AemsCardHeaderThemeProps {
	/** `justifyContent` for the card's title row. */
	titleAlign?: "flex-start" | "flex-end" | "space-between"
	/**
	 * Height of the separator between the title and the table. The overlay uses
	 * it as invisible clearance for its artwork; the arena leaves it unset and
	 * gets an ordinary divider rule.
	 */
	spacerHeight?: number
	/**
	 * Whether the phase details sit on one line ("single", the arena's
	 * space-between row) or are split across two fixed-height lines to land in
	 * separate bands of the overlay's background frame ("split").
	 */
	detailRows?: "single" | "split"
}

export interface AemsEventTitleThemeProps {
	/** Typography variant for the competition name. */
	titleVariant?: "h1" | "h2"
	/** Typography variant for the event / phase / run count lines. */
	detailVariant?: "h4" | "h5"
	/** Positioning for the competition/event/phase group. */
	headingSx?: SxProps<Theme>
	/** Positioning for the run-count group. */
	runsSx?: SxProps<Theme>
	/**
	 * `Stack` spacing between the heading group, the divider and the run-count
	 * group. The arena stacks them in normal flow and wants the gap; the overlay
	 * positions both groups absolutely, so it passes `0` to stop the `Stack`
	 * margin from nudging the absolutely-positioned run-count group.
	 */
	stackSpacing?: number
}

declare module "@mui/material/styles" {
	interface ComponentsPropsList {
		AemsBasicTable: AemsBasicTableThemeProps
		AemsHeatSummary: AemsCardHeaderThemeProps
		AemsPhaseResults: AemsCardHeaderThemeProps
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
