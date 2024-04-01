import { useEffect, useRef, useState } from "react";

import Header from "./components/header/index";
import Footer from "./components/footer/index";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import WelcomePage from "./components/header/WelcomePage";

import Content, { IndexContextProvider } from "./components/body/index";

export default function App() {
  const [showGreeting, setShowGreeting] = useState(true);
  const scrollContainerRef = useRef(null);
  const greetingRef = useRef(null); // Ref for the greeting element

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const greetingElement = greetingRef.current; // Get the greeting element using useRef

    function handleScroll() {
      if (!greetingElement || !scrollContainer) return;
      const greetingBottom = greetingElement.getBoundingClientRect().bottom;
      const containerHeight = scrollContainer.clientHeight;

      let opacityFactor = greetingBottom / containerHeight;
      if (opacityFactor <= 0) {
        opacityFactor = 0;
        setShowGreeting(false);
        scrollContainer.removeEventListener("scroll", handleScroll);
      }

      greetingElement.style.opacity = opacityFactor;
    }

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <IndexContextProvider>
      <Box
        ref={scrollContainerRef}
        sx={{
          overflowY: "scroll",
          height: "100vh",
          scrollSnapType: "y proximity",
        }}
      >
        <AppBar
          sx={{
            height: showGreeting ? "100vh" : "auto",
            flexDirection: "column",
            justifyContent: "space-between",
            position: showGreeting ? "relative" : "sticky",
            scrollSnapAlign: showGreeting ? "start" : "none",
          }}
        >
          <Box
            ref={greetingRef}
            sx={{
              display: showGreeting ? "flex" : "none", // Hide the greeting when opacity is 0
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
            <Header showSocialLinks={!showGreeting} />
          </Box>
        </AppBar>
        <Box
          sx={{
            height: showGreeting ? "100vh" : "auto",
          }}
        >
          <article>
            <Content />
          </article>
          <Footer />
        </Box>
      </Box>
    </IndexContextProvider>
  );
}
