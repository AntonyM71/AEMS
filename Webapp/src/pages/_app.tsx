import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import { cyan, orange, red } from "@mui/material/colors"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useEffect, useMemo } from "react"
import { Toaster } from "react-hot-toast"
import { Provider, useDispatch, useSelector } from "react-redux"
import Header from "../components/header/Header"
import { getPreferDark, updatePreferDark } from "../redux/atoms/utilities"
import { setupStore } from "../redux/store"
const store = setupStore()
const App = ({ children }) => {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
	const dispatch = useDispatch()
	const setPreferDark = (newPreferDark: boolean) =>
		dispatch(updatePreferDark(newPreferDark))
	const preferDark = useSelector(getPreferDark)
	useEffect(() => {
		setPreferDark(prefersDarkMode)
	}, [prefersDarkMode])

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: preferDark ? "dark" : "light",
					primary: {
						main: orange[500],
						light: orange[300],
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
			<Header />
			<Toaster />
			<Container maxWidth={false}>{...children}</Container>
		</ThemeProvider>
	)
}

const WrappedApp = ({ Component, pageProps }) => (
	<Provider store={store}>
		<App>
			{" "}
			<Component {...pageProps} />{" "}
		</App>
	</Provider>
)

export default WrappedApp
