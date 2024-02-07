import { useEffect, useState } from "react";
import GreetingMsg from "./components/GreetingMsg";
import NavBar from "./components/NavBar";
import Content from "./components/Content";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import "./App.css";

function App() {
  const [showGreeting, setGreetingVisibility] = useState(true);
  const [page, setPage] = useState(0);

  // sync the page state with the NavBar
  const updatePage = (event, newValue) => {
    setPage(newValue);
  };

  // use Observer API to detect when the greeting message is no longer visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) {
          setGreetingVisibility(false);
        }
      },
      {
        threshold: 0,
      }
    );

    const greetingElement = document.getElementById("greeting");
    console.log("greetingElement", greetingElement);
    if (greetingElement) observer.observe(greetingElement);

    return () => observer.disconnect();
  }, []);

  return (
    <Box className="scroll-container" minHeight="100vh" overflowY="scroll">
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
          <GreetingMsg />
        </Box>

        <Divider />

        <Box position="sticky">
          <NavBar value={page} onChange={updatePage} />
        </Box>

        <Divider />
      </Box>
      <Box className="snap-item" height="100vh">
        {!showGreeting && (
          <AppBar position="sticky">
            <NavBar color="secondary"
            value={page} onChange={updatePage} />
          </AppBar>
        )}

        <Content value={page} />
      </Box>
    </Box>
  );
}

export default App;
