import React, { useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import GreetingMsg from "./components/GreetingMsg";
import NavBar from "./components/NavBar";
import Grid from "@mui/material/Grid";
import Content from "./components/Content";
import AppBar from "@mui/material/AppBar";

function App() {
  // set theme based on user's system preference
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  // hide a greeting message when it's scrolled out of the view
  const [showGreetingMsg, setShowGreetingMsg] = React.useState(true);

  useEffect(() => {
    function handleScroll() {
      const nav = document.getElementById("navbar");

      if (nav?.getBoundingClientRect().top <= 0) {
        setShowGreetingMsg(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // navbar & content sync
  const [section, setSection] = React.useState(0);

  function changeSection(event, newSection) {
    // scroll thus the top the nav bar line up with the top of the screen
    const navbar = document.getElementById("navbar");
    window.scrollTo({
      top: navbar.getBoundingClientRect().top + window.scrollY,
      behavior: "smooth",
    });

    // change section on click
    setSection(newSection);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid display="flex" flexDirection="column">
        {showGreetingMsg && (
          <Grid
            flexGrow={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="95vh"
          >
            <GreetingMsg />
          </Grid>
        )}
        {/* todo evaluate the bar when scrolling https://mui.com/material-ui/react-app-bar/#back-to-top*/}

        <AppBar
          id="navbar"
          height="10vh"
          position={showGreetingMsg ? "relative" : "sticky"}
        >
          <NavBar value={section} onChange={changeSection} />
        </AppBar>

        <Content value={section} />
      </Grid>
    </ThemeProvider>
  );
}

export default App;
