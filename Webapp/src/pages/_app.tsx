import { setupListeners } from "@reduxjs/toolkit/query"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { AppProps } from "next/dist/shared/lib/router/router"
import { useEffect, useMemo } from "react"
import { Toaster } from "react-hot-toast"
import { Provider, useDispatch, useSelector } from "react-redux"
import { pwBrightBlue, pwOrange } from "../components/broadcast/overlayTheme"
import { brandFontFamily } from "../fonts"
import Header from "../components/header/Header"
import { getPreferDark, updatePreferDark } from "../redux/atoms/utilities"
import { setupStore } from "../redux/store"
import "./_app.css"
const store = setupStore()
setupListeners(store.dispatch)
const App = ({ children, noLayout }: { children: any; noLayout?: boolean }) => {
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
				typography: { fontFamily: brandFontFamily },
				palette: {
					mode: preferDark ? "dark" : "light",
					primary: {
						main: pwOrange,
						// MUI's contrast threshold would pick white, which is only
						// 3.1:1 on this orange.
						contrastText: "#000"
					},
					secondary: {
						main: preferDark ? pwBrightBlue : "#00145A"
					},
					error: {
						main: preferDark ? "#ff4ab3" : "#fc0085"
					},
					info: {
						main: preferDark ? "#a565fd" : "#8842ee"
					},
					background: preferDark
						? {}
						: {
								default: "rgba(250, 250, 250, 0.9)",
								paper: "#fff"
						  }
				}
			}),
		[preferDark]
	)

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className="container">
				{!noLayout && (
					<>
						<div className="header">
							<Header />
						</div>
						<Toaster position="top-right" />
					</>
				)}
				<div className="content">
					<Container maxWidth={false}>{children}</Container>
				</div>
			</div>
		</ThemeProvider>
	)
}

const WrappedApp = ({ Component, pageProps }: AppProps) => {
	const ComponentWithLayout = Component as typeof Component & {
		noLayout?: boolean
	}

	return (
		<Provider store={store}>
			<App noLayout={ComponentWithLayout.noLayout}>
				<ComponentWithLayout {...pageProps} />
			</App>
		</Provider>
	)
}

export default WrappedApp
