import { createTheme } from "@mui/material/styles"
import type {} from "@mui/x-data-grid/themeAugmentation"
const icfLightBlue = "rgb(28, 154, 215)"
const icfDarkBlue = "rgb(12, 40, 80)"
const icfWhite = "#f8f9fc"

export const darkTheme = createTheme({
	palette: {
		mode: "dark",
		background: {
			default: "#181818",
			paper: "#222"
		},
		text: {
			primary: "#fff",
			secondary: "#ccc"
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
					padding: "1em" // Add some margin for spacing
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
