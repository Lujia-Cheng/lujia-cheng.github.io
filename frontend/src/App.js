import React, {useEffect} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import GreetingMsg from "./components/GreetingMsg";
import NavBar from "./components/NavBar";
import Box from "@mui/material/Box";
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
    // change section on click
    setSection(newSection);

    // scroll to the top of the page
    const navbar = document.getElementById("navbar");
    window.scrollTo({
      top: navbar?.getBoundingClientRect().top,
      behavior: "smooth",
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Box
        display="flex"
        flexDirection="column"
        minHeight={showGreetingMsg ? "100vh" : "0"}
      >
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {showGreetingMsg ? <GreetingMsg/> : null}
        </Box>
        {/* todo evaluate the bar when scrolling https://mui.com/material-ui/react-app-bar/#back-to-top*/}
        <AppBar
          id="navbar"
          position={showGreetingMsg ? "relative" : "sticky"}
          top="0"
        >
          <NavBar value={section} onChange={changeSection}/>
        </AppBar>
      </Box>
      <Box padding="0 8em">
        {/* todo sticky navbar while scrolling  */}
        <Content value={section}/>
      </Box>
    </ThemeProvider>
  );
}

export default App;
