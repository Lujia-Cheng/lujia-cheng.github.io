import { useEffect, useRef, useState } from "react";

import Header from "./components/header/index";
import Footer from "./components/footer/index";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import WelcomePage from "./components/header/WelcomePage";

import Content, { IndexContextProvider } from "./components/body/index";

export default function App() {
  const [greetingOpacity, setGreetingOpacity] = useState(1);
  const scrollContainerRef = useRef(null);
  const greetingRef = useRef(null); // Ref for the greeting element

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const greetingElement = greetingRef.current; // Get the greeting element using useRef

    function handleScroll() {
      if (!greetingElement || !scrollContainer) return;

      const greetingBottom = greetingElement.getBoundingClientRect().bottom;
      const containerHeight = scrollContainer.clientHeight;

      let newOpacity = greetingBottom / containerHeight;
      if (newOpacity <= 0) {
        newOpacity = 0;
        scrollContainer.removeEventListener("scroll", handleScroll);
      }

      setGreetingOpacity(newOpacity);
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
            ref={greetingRef}
            sx={{
              display: greetingOpacity > 0 ? "flex" : "none", // Hide the greeting when opacity is 0
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              opacity: greetingOpacity,
              transition: "opacity 0.3s ease-out",
            }}
          >
            <WelcomePage />
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
          <article>
            <Content />
          </article>
          <Footer />
        </Box>
      </Box>
    </IndexContextProvider>
  );
}
