import { useEffect, useState, useRef } from "react";
import { usePage } from "./contexts/PageContext";

import Header from "./components/Header";
import Footer from "./components/Footer";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GithubIcon from "@mui/icons-material/GitHub";

export default function App() {
  const [greetingOpacity, setGreetingOpacity] = useState(1);
  const { getPageContent } = usePage();

  const scrollContainerRef = useRef(null); // Ref for the scrollable container

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current; // Direct reference to the scroll container
    if (!scrollContainer) return;

    function handleScroll() {
      const greetingElement = document.getElementById("greeting");
      if (!greetingElement) return;

      const greetingBottom = greetingElement.getBoundingClientRect().bottom;
      const containerHeight = scrollContainer.clientHeight;

      // Calculate the new opacity based on the position of the greeting element
      let newOpacity = greetingBottom / containerHeight;
      if (greetingBottom <= 0) {
        newOpacity = 0;
        scrollContainer.removeEventListener("scroll", handleScroll);
      }

      setGreetingOpacity(newOpacity);
    }

    // Attach the event listener to the scroll container
    scrollContainer.addEventListener("scroll", handleScroll);

    // Clean up
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      ref={scrollContainerRef}
      sx={{
        overflowY: "scroll",
        height: "100vh",
        scrollSnapType: "y mandatory",
      }}
    >
      <AppBar
        sx={{
          height: greetingOpacity > 0 ? "100vh" : "auto",
          flexDirection: "column",
          justifyContent: "space-between",
          position: greetingOpacity > 0 ? "relative" : "sticky",
          scrollSnapAlign: greetingOpacity > 0 ? "start" : "none",
        }}
      >
        <Box
          id="greeting"
          sx={{
            display: greetingOpacity > 0 ? "flex" : "none", // Hide the greeting when opacity is 0
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            opacity: greetingOpacity,
          }}
        >
          <div>
            <Typography variant="h1">Hi, I'm Luke.</Typography>
            <Typography variant="h2">Welcome to my website.</Typography>
            <br />
            <div>
              <Tooltip
                aria-label="open LinkedIn.com/in/Luke-Cheng"
                title="in/Luke-Cheng"
              >
                <IconButton
                  onClick={() =>
                    window.open("https://www.linkedin.com/in/luke-cheng")
                  }
                >
                  <LinkedInIcon />
                </IconButton>
              </Tooltip>
              <Tooltip
                aria-label="open GitHub.com/Lujia-cheng"
                title="GitHub.com/Lujia-cheng"
              >
                <IconButton
                  onClick={() => window.open("https://github.com/Lujia-Cheng")}
                >
                  <GithubIcon color="inherit" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            scrollSnapAlign: greetingOpacity > 0 ? "start" : "none",
          }}
        >
          <Header />
        </Box>
      </AppBar>
      <Box
        sx={{
          height: greetingOpacity > 0 ? "100vh" : "auto",
        }}
      >
        <article>{getPageContent()}</article>
        <Footer />
      </Box>
    </Box>
  );
}
