import { createTheme } from "@mui/material/styles"
import "@mui/x-data-grid/themeAugmentation"
import "./themeAugmentation"
export const pwOrange = "#FF5A00"
export const pwBlack = "#000000"
export const pwWhite = "#FFFFFF"
export const pwBrightBlue = "#00DCFF"
// Shared by the table and its card so they stay registered with the same
// width of background artwork.
const scoreboardCardMaxWidth = 1150

export const lightTheme = createTheme({
	palette: {
		mode: "dark", // Aero Glass had a translucent dark aesthetic
		primary: {
			main: pwOrange
		},
		secondary: {
			main: pwBrightBlue
		},

		background: {
			default: "rgba(20, 20, 20, 0.6)", // Semi-transparent dark background
			paper: "transparent"
		},

		text: {
			// Card headings sit on dark artwork; body copy and table rows sit
			// on the light scoreboard panels.
			primary: "white",
			secondary: pwBlack
		}
	},
	typography: {
		fontFamily: "'Roboto', sans-serif",
		allVariants: {
			color: pwBlack
		},
		h1: {
			fontSize: "3.5rem", // Largest for TV
			fontWeight: 700,
			letterSpacing: "0.1rem",
			textTransform: "uppercase"
		},
		h2: {
			fontSize: "3rem",
			fontWeight: 700,
			letterSpacing: "0.08rem",
			textTransform: "uppercase"
		},
		h3: {
			fontSize: "2.5rem",
			fontWeight: 600,
			letterSpacing: "0.06rem",
			textTransform: "uppercase"
		},
		h4: {
			fontSize: "2.25rem",
			fontWeight: 600,
			letterSpacing: "0.05rem",
			textTransform: "uppercase"
		},
		h5: {
			fontSize: "2.25rem",
			fontWeight: 500,
			letterSpacing: "0.04rem",
			textTransform: "uppercase"
		},
		h6: {
			fontSize: "2rem",
			fontWeight: 600,
			letterSpacing: "0.03rem",
			textTransform: "uppercase"
		},
		body1: {
			fontSize: "1.5rem", // Larger body text
			fontWeight: 500,
			lineHeight: 1.6
		},
		body2: {
			fontSize: "1.25rem",
			fontWeight: 400,
			lineHeight: 1.5
		}
	},
	components: {
		// Geometry the overlay Cards used to hardcode inline. It lives here so
		// the same components can be dropped into the arena's theme instead.
		AemsBasicTable: {
			defaultProps: {
				pageLimit: 8,
				padEmptyRows: true
			}
		},
		AemsHeatSummary: {
			defaultProps: {
				titleAlign: "flex-end",
				spacerHeight: 85
			}
		},
		AemsPhaseResults: {
			defaultProps: {
				titleAlign: "flex-end",
				spacerHeight: 23,
				detailRows: "split"
			}
		},
		MuiStack: {
			styleOverrides: {
				root: {
					// The two phase-detail lines are pinned to the bands of the
					// background frame they sit in.
					"&.AemsPhaseDetails-names": { height: 54, minHeight: 54 },
					"&.AemsPhaseDetails-runs": { height: 60, minHeight: 60 }
				}
			}
		},
		AemsEventTitle: {
			defaultProps: {
				titleVariant: "h2",
				detailVariant: "h5",
				// Both groups are positioned absolutely against the frame, so the
				// Stack must add no spacing — otherwise its sibling margin nudges
				// the run-count group down off its band.
				stackSpacing: 0,
				headingSx: {
					position: "absolute",
					left: "27%",
					top: "53%",
					maxWidth: "72%",
					gap: "0.35rem"
				},
				runsSx: {
					position: "absolute",
					left: "43%",
					top: "76%",
					maxWidth: "60%"
				}
			}
		},
		// Graphics pinned to fixed spots in the 1920x1080 frame. The competition
		// overview sits left of the event title's indent so eight long event
		// names fit on one rail.
		AemsCompetitionOverview: {
			defaultProps: {
				rootSx: { position: "absolute", left: 120, top: "56%" }
			}
		},
		AemsAthleteOverview: {
			defaultProps: {
				rootSx: { position: "absolute", left: 96, bottom: 84 }
			}
		},
		AemsRunCorner: {
			defaultProps: {
				rootSx: { position: "absolute", right: 72, bottom: 72 }
			}
		},
		MuiTable: {
			styleOverrides: {
				root: {
					borderCollapse: "separate",
					maxWidth: scoreboardCardMaxWidth,
					minWidth: 500,
					margin: "0 auto",
					borderRadius: 12,
					"& .MuiTableRow-root": {
						borderBottom: "none"
					}
				}
			}
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					// The rule under each row is part of the overlay's
					// scoreboard artwork; head and footer opt out below.
					borderBottom: "1px solid #BFBFBF",
					height: 61,
					padding: 0,
					margin: 0,
					fontSize: 20,
					// Body rows previously took their weight from the body1
					// Typography they were wrapped in; keep it now the wrapper is
					// gone. Head and footer raise this to bold below.
					fontWeight: 500,
					lineHeight: "61px",
					color: pwBlack
				}
			}
		},
		MuiTableRow: {
			styleOverrides: {
				root: {
					borderBottom: "none",
					height: 61
				}
			}
		},
		MuiTableHead: {
			styleOverrides: {
				root: {
					"& .MuiTableCell-root": {
						fontWeight: "bold",
						borderBottom: "none"
					}
				}
			}
		},
		MuiTableFooter: {
			styleOverrides: {
				root: {
					// rowHeight 61 + 30px clearance for the frame's bottom bar.
					"& .MuiTableRow-root": { height: 91 },
					"& .MuiTableCell-root": {
						color: "white",
						textAlign: "right",
						fontWeight: "bold",
						letterSpacing: 1,
						borderBottom: "none"
					}
				}
			}
		},
		MuiGrid: {
			styleOverrides: {
				root: {
					height: "100%", // Make Grid items fill the height
					width: "100%", // Make Grid items fill the width
					boxShadow: "none" // Remove drop shadow from the modal
				}
			}
		},

		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundColor: "transparent",
					position: "relative",
					padding: "1em", // Add some margin for spacing

					overflow: "hidden", // Ensures the blur effect stays contained

					// The scoreboard cards are capped to the width of their
					// background frame; the event title fills the screen so its
					// absolutely-positioned groups resolve against the viewport.
					"&.AemsTableCard-root": {
						maxWidth: scoreboardCardMaxWidth
					},
					"&.AemsEventTitle-root": {
						width: "100%",
						height: "100%",
						maxWidth: "none",
						padding: 0,
						pointerEvents: "none",
						// The old root was a plain Box; a Paper would otherwise
						// clip the absolutely-positioned title groups at the
						// frame edge.
						overflow: "visible"
					},

					backgroundImage: "none",
					boxShadow: "none",
					border: "none",
					borderImage: "none"
				}
			}
		},

		MuiModal: {
			styleOverrides: {
				root: {
					backgroundColor: "transparent",
					boxShadow: "none",
					border: "none",
					outline: "none",
					"&:focus-visible": {
						outline: "none"
					}
				}
			}
		},
		MuiBackdrop: {
			styleOverrides: {
				root: {
					backgroundColor: "transparent", // Remove the shadow and background
					boxShadow: "none" // No shadow// Remove drop shadow from the modal
				}
			}
		},

		MuiDivider: {
			styleOverrides: {
				root: {
					border: "none",
					height: 0,
					background: "transparent",
					opacity: 0,
					boxShadow: "none"
				}
			}
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					color: pwBlack,
					// The heat name sits inside the frame's top-right title box.
					"&.AemsHeatSummary-title": {
						fontWeight: 700,
						paddingRight: 32,
						paddingTop: 8,
						textShadow: "0 2px 8px rgba(0,0,0,0.4)"
					}
				}
			}
		}
	}
})
