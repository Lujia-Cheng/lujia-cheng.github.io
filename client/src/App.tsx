import { useEffect, useRef, useState } from "react";

import Header from "./components/header/index";
import Footer from "./components/footer/index";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import WelcomePage from "./components/header/WelcomePage";

import Content from "./components/content/index";
import ThemeProvider from "./contexts/ThemeContext";
import CssBaseline from "@mui/material/CssBaseline";

export default function App() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showGreeting, setShowGreeting] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null); // Ref for the greeting element

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const greetingElement = greetingRef.current; // Get the greeting element using useRef

    function handleScroll() {
      if (!greetingElement || !scrollContainer) return;
      const greetingBottom = greetingElement.getBoundingClientRect().bottom;
      const containerHeight = scrollContainer.clientHeight;

      let opacityFactor = greetingBottom / containerHeight;
      if (greetingBottom <= 0) {
        opacityFactor = 0;
        setShowGreeting(false);
        scrollContainer.removeEventListener("scroll", handleScroll);
      }

      greetingElement.style.opacity = opacityFactor.toString();
    }

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <ThemeProvider>
      <CssBaseline />
      <Box
        ref={scrollContainerRef}
        sx={{
          overflowY: "scroll",
          height: "100dvh",
          width: "100dvw",
          scrollSnapType: "y proximity",
        }}
      >
        <AppBar
          sx={{
            height: showGreeting ? "100dvh" : "auto",
            position: showGreeting ? "relative" : "sticky",
            scrollSnapAlign: showGreeting ? "start" : "none",
          }}
        >
          <Box
            ref={greetingRef}
            sx={{
              display: showGreeting ? "flex" : "none", 
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              opacity: 1,
              transition: "0.2 s ease-out",
            }}
          >
            <WelcomePage />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              scrollSnapAlign: showGreeting ? "start" : "none",
            }}
          >
            <Header
              showSocialLinks={!showGreeting}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </Box>
        </AppBar>
        <Box
          sx={{
            height: showGreeting ? "100dvh" : "auto",
          }}
        >
          <Content index={selectedTab} />
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
