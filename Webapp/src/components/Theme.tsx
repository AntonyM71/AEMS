import { cyan, orange, red } from "@mui/material/colors"
import CssBaseline from "@mui/material/CssBaseline"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useLayoutEffect, useMemo } from "react"
import { useRecoilState } from "recoil"
import { preferDarkState } from "../recoil/atoms/utilities"

function Theme({ children }: { children: React.ReactNode }) {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
	const [preferDark, setPreferDark] = useRecoilState(preferDarkState)

	useLayoutEffect(() => {
		setPreferDark(prefersDarkMode)
	}, [prefersDarkMode])

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: preferDark ? "dark" : "light",
					primary: {
						main: orange[800],
						light: orange[500],
						dark: orange[900]
					},
					secondary: {
						main: cyan[500],
						light: cyan[300],
						dark: cyan[700]
					},
					error: {
						main: red[500],
						light: red[300],
						dark: red[700]
					}
				}
			}),
		[preferDark]
	)

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	)
}

export default Theme
