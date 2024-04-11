import { useMemo, useState, createContext } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = useMemo(
    () =>
      createTheme(
        mode === "dark"
          ? {
              palette: {
                mode: "dark",
                primary: {
                  main: "#87ceeb",
                },
                secondary: {
                  main: "#4682b4",
                },
              },
            }
          : {
              palette: {
                mode: "light",
                primary: {
                  main: "#87ceeb",
                },
                secondary: {
                  main: '#4682b4',
                },
                background: {
                  default: '#fffafa',
                  paper: '#f9fbff',
                },
              },
            }
      ),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
}
