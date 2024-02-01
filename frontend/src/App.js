import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ChatIcon from "@mui/icons-material/Chat";
import ArticleIcon from "@mui/icons-material/Article";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Resume from "./components/Resume";
import NotFound from "./pages/NotFound";

function App() {
  // hide welcome message after scrolling
  const [hideWelcome, setHideWelcome] = useState(false);

  window.addEventListener("scroll", onScroll);
  function onScroll() {
    const welcomeMsg = document.getElementById("welcome");
    if (welcomeMsg?.getBoundingClientRect().bottom <= 0) {
      // remove welcome message if off the screen
      setHideWelcome(true);
      window.removeEventListener("scroll", onScroll);
    }
  }

  // set deafult theme
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

  // nav bar
  const [highlight, setHighlight] = React.useState("about");
  const changeHighlight = (event, newHighlight) => {
    // todo fix math
    window.scroll({ top:0, scrollBehavior: "smooth" });
    setHighlight(newHighlight);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        minHeight={!hideWelcome && "100vh"}
      >
        {!hideWelcome && (
          <Box
            id="welcome"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            flexGrow={6}
          >
            <Typography variant="h1" maxWidth="90vw">
              Hi, I'm Luke.
            </Typography>
            <Typography variant="h2" maxWidth="90vw">
              Welcome to my website.
            </Typography>
          </Box>
        )}
        <nav> 

          {/* move this to component */}
          <BottomNavigation
            id="bottomNav"
            showLabels
            value={highlight}
            onChange={changeHighlight}
          >
            <BottomNavigationAction label="about" icon={<InfoIcon />}>
              About
            </BottomNavigationAction>
            <BottomNavigationAction label="cv" icon={<ArticleIcon />}>
              CV
            </BottomNavigationAction>
            <BottomNavigationAction
              label="blog"
              icon={<DriveFileRenameOutlineIcon />}
            >
              Blog
            </BottomNavigationAction>
            <BottomNavigationAction label="chat-bot" icon={<ChatIcon />}>
              Chat
            </BottomNavigationAction>
          </BottomNavigation>
        </nav>
      </Box>
      <Box padding="50px">{highlight === 1 ? <Resume /> : <NotFound />}</Box>
    </ThemeProvider>
  );
}

export default App;
