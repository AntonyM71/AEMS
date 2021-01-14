import { useMediaQuery } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { useMemo, useState } from 'react';

function Theme({ children }: { children: React.ReactNode }) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = useMemo(() => createMuiTheme({
        // TODO: Hugh: This is where the theme settings go
        // Check https://material-ui.com/customization/theming/
        palette: {
            type: prefersDarkMode ? "dark" : "light",
        }
    }), [prefersDarkMode])

    return (
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
    )
}

export default Theme