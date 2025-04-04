import { createTheme } from "@mui/material"

const icfLightBlue = "rgb(28, 154, 215)"
const icfDarkBlue = "rgb(12, 40, 80)"
const icfWhite = "#f8f9fc"
// Define two sample themes
export const lightTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#d88225"
		},
		secondary: {
			main: "#008a73"
		},
		background: {
			default: "rgb(29, 130, 197)", // #1d82c5

			paper: icfDarkBlue
		},
		text: {
			primary: icfWhite
		}
	},
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: 0
				}
			}
		}
	}
})
