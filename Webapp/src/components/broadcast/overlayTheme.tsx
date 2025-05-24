import { createTheme } from "@mui/material/styles"
import type {} from "@mui/x-data-grid/themeAugmentation"
const icfLightBlue = "rgb(28, 154, 215)"
const icfDarkBlue = "rgb(12, 40, 80)"
const icfWhite = "#f8f9fc"

export const lightTheme = createTheme({
	palette: {
		mode: "dark", // Aero Glass had a translucent dark aesthetic
		primary: {
			main: "#d88225" // Soft glowing blue from Windows Vista's highlights
		},
		secondary: {
			main: "#008a73" // A lighter cyan for accents
		},

		background: {
			default: "rgba(20, 20, 20, 0.6)", // Semi-transparent dark background
			paper: "rgba(30, 30, 30, 0.5)" // Slightly lighter for elevation
		},

		text: {
			primary: icfWhite,
			secondary: "rgba(255, 255, 255, 0.7)" // Slightly muted secondary text
		}
	},
	typography: {
		fontFamily: "'Roboto', sans-serif",
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
					backgroundColor: "rgba(30, 30, 30, 0.7)", // Transparent glassy effect
					position: "relative",
					padding: "1em", // Add some margin for spacing

					overflow: "hidden", // Ensures the blur effect stays contained

					backgroundImage: `
					  radial-gradient(circle, rgba(255, 255, 255, 0.05) 10%, transparent 80%),
					  linear-gradient(180deg, rgba(30, 30, 30, 0.4) 0%, rgba(30, 30, 30, 0.6) 100%)
					`,

					boxShadow:
						"inset 0px 0px 8px rgba(255, 255, 255, 0.1), 4px 4px 20px rgba(0, 0, 0, 0.6)", // Inner glow

					borderRadius: "9px", // Smooth rounded corners
					borderImage:
						"linear-gradient(transparent, rgba(255,255,255,0.2)) 2" // Light reflection
				}
			}
		},

		MuiModal: {
			styleOverrides: {
				root: {
					backgroundColor: "rgba(0, 0, 0, 0)", // Fully transparent
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
					borderImage:
						"linear-gradient(90deg, " +
						"rgba(255, 255, 255, 0.1), " +
						"rgba(255, 255, 255, 0.3), " +
						"rgba(255, 255, 255, 0.1)) 1",
					borderWidth: "2px"
				}
			}
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					textShadow: "none"
				}
			}
		}
	}
})
