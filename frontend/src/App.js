import React, {useEffect} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import GreetingMsg from "./components/GreetingMsg";
import NavBar from "./components/NavBar";
import Grid from "@mui/material/Grid";
import Content from "./components/Content";
import Footer from "./components/Footer";
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If greeting message is not intersecting (visible) in the viewport, hide it
          if (!entry.isIntersecting) {
            setShowGreetingMsg(false);
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: 0.1, // Adjust threshold to control when the callback is executed
      }
    );

    const greetingMsgElement = document.getElementById("greeting-msg");
    if (greetingMsgElement) {
      observer.observe(greetingMsgElement);
    }

    return () => {
      scrollDown();
      if (greetingMsgElement) {
        observer.unobserve(greetingMsgElement);
      }
    };
  }, []);

  // navbar & content sync
  const [section, setSection] = React.useState(1);

  function scrollDown() {
    // scroll sown until the greeting message out of the view
    const topNavBar = document
      .getElementById("nav")
      ?.getBoundingClientRect().top;
    window.scroll({top: topNavBar + window.scrollY, behavior: "smooth"});
  }

  function changeSection(event, newSection) {
    scrollDown();
    setSection(newSection);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {showGreetingMsg ? (
        <Grid display="flex" flexDirection="column" height="100vh">
          <Grid
            id="greeting-msg"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexGrow="1"
          >
            <GreetingMsg />
          </Grid>
          <AppBar id="nav" position="relative">
            <NavBar value={section} onChange={changeSection}/>
          </AppBar>
        </Grid>
      ) : (
        <AppBar id="nav" position="sticky">
          <NavBar value={section} onChange={changeSection}/>
        </AppBar>
      )}
      <Content value={section}/>
      <Footer/>
    </ThemeProvider>
  );
}

export default App;
