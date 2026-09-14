import { createTheme } from "@mui/material/styles"
import type {} from "@mui/x-data-grid/themeAugmentation"
import "../broadcast/themeAugmentation"

export const darkTheme = createTheme({
	palette: {
		mode: "dark",
		background: {
			default: "#181818",
			paper: "#222"
		},
		text: {
			// The arena is a single dark surface, so headings and body copy are
			// both plain white — unlike the overlay, which reserves the
			// secondary tone for text sitting on its light scoreboard panels.
			primary: "#fff",
			secondary: "#fff"
		}
	},
	typography: {
		fontFamily: "'Roboto', 'Arial', sans-serif",
		h1: {
			fontSize: "8rem",
			fontWeight: 900,
			letterSpacing: "0.08em",
			textTransform: "uppercase"
		},
		h2: {
			fontSize: "3rem",
			fontWeight: 700,
			letterSpacing: "0.05em",
			textTransform: "uppercase"
		},
		h4: {
			fontSize: "4rem",
			fontWeight: 700,
			letterSpacing: "0.05em",
			textTransform: "uppercase"
		},
		h5: {
			fontSize: "4rem",
			fontWeight: 700,
			letterSpacing: "0.05em",
			textTransform: "uppercase"
		},
		body1: {
			fontSize: "2rem",
			fontWeight: 600
		}
	},
	components: {
		// Geometry for the shared broadcast Cards. The arena has no background
		// artwork, so it wants no clearance spacers, left/right-spread titles,
		// a table that fills its modal, and the venue-scale type ramp.
		AemsBasicTable: {
			defaultProps: {
				pageLimit: 10,
				padEmptyRows: false
			}
		},
		AemsHeatSummary: {
			defaultProps: {
				titleAlign: "space-between"
			}
		},
		AemsPhaseResults: {
			defaultProps: {
				titleAlign: "space-between",
				detailRows: "single"
			}
		},
		AemsEventTitle: {
			defaultProps: {
				titleVariant: "h1",
				detailVariant: "h4"
			}
		},
		MuiTable: {
			styleOverrides: {
				root: {
					height: "100%", // Fill the modal rather than a frame
					minWidth: 650,
					boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18)"
				}
			}
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					// Venue-scale cell text, matching the theme's body1 ramp.
					fontSize: "2rem",
					fontWeight: 600,
					textShadow:
						"0 1px 6px rgba(0,0,0,0.85), 0 0px 12px rgba(0,0,0,0.55), 0 2px 4px rgba(0,0,0,0.65)"
				}
			}
		},
		MuiTableHead: {
			styleOverrides: {
				root: {
					"& .MuiTableRow-root": {
						backgroundImage:
							"linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(40, 40, 40, 0.5) 100%)",
						borderBottom: "2px solid rgba(255, 255, 255, 0.2)"
					}
				}
			}
		},
		MuiTableBody: {
			styleOverrides: {
				root: {
					"& .MuiTableRow-root:nth-of-type(odd)": {
						background: "rgba(255, 255, 255, 0.1)"
					}
				}
			}
		},
		MuiTableFooter: {
			styleOverrides: {
				root: {
					"& .MuiTableRow-root": {
						background: "rgba(40, 40, 40, 0.6)",
						borderTop: "2px solid rgba(255, 255, 255, 0.2)"
					},
					"& .MuiTableCell-root": {
						fontWeight: "bold",
						textAlign: "right"
					}
				}
			}
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					textShadow: "0 2px 8px #000"
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
					backgroundColor: "#222",
					borderRadius: "8px",
					boxShadow: "none",
					padding: "1em", // Add some margin for spacing
					// The event title card is mostly type, so it gets more room.
					"&.AemsEventTitle-root": { padding: "2em" }
				}
			}
		},
		MuiModal: {
			styleOverrides: {
				root: {
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
					backgroundColor: "#181818", // Remove the shadow and background
					boxShadow: "none" // No shadow// Remove drop shadow from the modal
				}
			}
		}
	}
})
