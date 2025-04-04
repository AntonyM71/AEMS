import { createTheme } from "@mui/material"

const icfLightBlue = "rgb(28, 154, 215)"
const icfDarkBlue = "rgb(12, 40, 80)"
const icfWhite = "#f8f9fc"

export const lightTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#d88225" // Accent color for highlights
		},
		secondary: {
			main: "#008a73" // Secondary accent
		},
		background: {
			default: "linear-gradient(90deg, #1d82c5, #0c2850)", // Subtle gradient
			paper: icfDarkBlue
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
			fontSize: "2rem",
			fontWeight: 600,
			letterSpacing: "0.05rem",
			textTransform: "uppercase"
		},
		h5: {
			fontSize: "1.75rem",
			fontWeight: 500,
			letterSpacing: "0.04rem",
			textTransform: "uppercase"
		},
		h6: {
			fontSize: "1.5rem",
			fontWeight: 500,
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
					width: "100%" // Make Grid items fill the width
				}
			}
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: 0,
					padding: "1rem", // Add padding for better spacing
					// boxShadow: "none", // Flat design,
					background: "linear-gradient(135deg, #1d82c5, #0c2850)", // Gradient background
					color: icfWhite, // Ensure text is readable
					height: "100%", // Full height for the card
					boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)" // Subtle shadow for depth
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
