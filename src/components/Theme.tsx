import { useMediaQuery } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useLayoutEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { preferDarkState } from "../atoms";

const Theme = ({ children }: { children: React.ReactNode }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [preferDark, setPreferDark] = useRecoilState(preferDarkState);

  useLayoutEffect(() => {
    setPreferDark(prefersDarkMode);
  }, [prefersDarkMode]);

  const theme = useMemo(() => createMuiTheme({
    // TODO: Hugh: This is where the theme settings go
    // Check https://material-ui.com/customization/theming/
    palette: {
      type: preferDark ? "dark" : "light"
    }
  }), [preferDark]);

  return (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  );
};

export default Theme;
