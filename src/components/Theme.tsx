import { useMediaQuery, CssBaseline } from "@material-ui/core"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { useLayoutEffect, useMemo } from "react"
import { useRecoilState } from "recoil"
import { preferDarkState } from "../atoms"
import { orange, cyan } from "@material-ui/core/colors"

function Theme({ children }: { children: React.ReactNode }) {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
	const [preferDark, setPreferDark] = useRecoilState(preferDarkState)

	useLayoutEffect(() => {
		setPreferDark(prefersDarkMode)
	}, [prefersDarkMode])

	const theme = useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: preferDark ? "dark" : "light",
					primary: {
						main: orange[800],
						light: orange[500],
						dark: orange[900]
					},
					secondary: {
						main: cyan[500],
						light: cyan[300],
						dark: cyan[700]
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
