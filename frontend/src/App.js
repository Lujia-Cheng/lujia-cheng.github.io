import React, {useEffect, useState} from "react";
import "./App.css";
import GreetingMsg from "./components/GreetingMsg";
import NavigationPanel from "./components/NavigationPanel";
import {AppBar, Box} from "@mui/material";
import UtilityPanel from "./components/UtilityPanel";
import {PAGE_CONTENT} from "./contexts/PageContext";

function App() {
  const [showGreeting, setGreetingVisibility] = useState(true);
  const [page, setPage] = useState(0);

  // todo use PageContext to control switching tab
  const updatePage = (event, newValue) => {
    setPage(newValue);
  };

  // use Observer API to detect when the greeting message is no longer visible
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) {
        setGreetingVisibility(false);
      }
    }, {
      threshold: 0,
    });

    const greetingElement = document.getElementById("greeting");
    console.log("greetingElement", greetingElement);
    if (greetingElement) observer.observe(greetingElement);

    return () => observer.disconnect();
  }, [showGreeting]);


  return (
    // fixme it's barely working, the main issue is that i'm trying to make the initial screen showing only the greeting message & the navigation panel. The greeting message will be hidden as it scrolls down. But html just really don't like out of view point content.
    <Box className="scroll-container">
      <Box
        className="snap-item"
        display={showGreeting ? "flex" : "none"}
        minHeight="100vh"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box
          id="greeting"
          flexGrow={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <GreetingMsg/>
        </Box>


        <Box position="sticky" display="flex" flexDirection="row" justifyContent="space-between">
          <NavigationPanel value={page} onChange={updatePage}/>
          <UtilityPanel/>
        </Box>

      </Box>
      <Box className={showGreeting ? "snap-item" : ""} height="100vh">
        {!showGreeting && (
          <AppBar position="sticky" display="flex" flexDirection="row" justifyContent="space-between">
            <Box position="sticky" display="flex" flexDirection="row" justifyContent="space-between">
              <NavigationPanel value={page} onChange={updatePage}/>
              <UtilityPanel/>
            </Box>
          </AppBar>
        )}
        <div style={{height: "100vh"}}>
          {PAGE_CONTENT[page].content}
        </div>
      </Box>
    </Box>
  );
}

export default App;
