import React, {useEffect, useState} from "react";
import "./App.css";
import GreetingMsg from "./components/GreetingMsg";
import NavigationPanel from "./components/NavigationPanel";
import {AppBar, Box} from "@mui/material";
import UtilityPanel from "./components/UtilityPanel";
import {usePage} from "./contexts/PageContext";

function App() {
  const [showGreeting, setGreetingVisibility] = useState(true);
  const {getPageContent} = usePage();

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
    <div className="scroll-container">
      <Box
        className="snap-item initial-page"
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
          <NavigationPanel/>
          <UtilityPanel/>
        </Box>

      </Box>
      <div className={showGreeting ? "snap-item" : "full-height"}>
        {!showGreeting && (
          <AppBar
            sx={{
              position: "sticky", flexDirection: "row", justifyContent: "space-between"
            }}>
            <NavigationPanel/>
            <UtilityPanel/>
          </AppBar>
        )}

        <Box >
          {getPageContent()}
        </Box>

      </div>
    </div>
  );
}

export default App;
