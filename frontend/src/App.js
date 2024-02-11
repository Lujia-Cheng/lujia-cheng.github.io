import { useEffect, useState } from "react";
import { usePage } from "./contexts/PageContext";
import Header from "./components/Header";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";

function App() {
  const [showGreeting, setGreetingVisibility] = useState(true);
  const { getPageContent } = usePage();
  const [greetingOpacity, setGreetingOpacity] = useState(1);

  useEffect(() => {
    // todo fade out the greeting message as the user scrolls down
    function handleScroll() {
      // Calculate the current opacity based on scroll position.
      // Adjust these values as needed.
      const maxScroll = 200; // Maximum scroll value at which the component is fully transparent
      const scrollY = window.scrollY;
      const newOpacity = Math.max(1 - scrollY / maxScroll, 0);

      setGreetingOpacity(newOpacity);
    }

    // Attach the event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // use Observer API to detect when the greeting message is no longer visible
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) {
        setGreetingVisibility(false);
      }
    });

    const greetingElement = document.getElementById("greeting");
    console.log("greetingElement", greetingElement);
    if (greetingElement) observer.observe(greetingElement);

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y proximity",
      }}
    >
      <Box
        sx={{
          height: "100vh",
          scrollSnapAlign: "start",
          display: showGreeting ? "flex" : "none",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "100vh",
        }}
      >
        <Box
          id="greeting"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              opacity: greetingOpacity,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <Typography variant="h1">Hi, I'm Luke.</Typography>
            <Typography variant="h2">Welcome to my website.</Typography>
          </Box>
        </Box>

        {/* temporary navigation when the greeting message is visible */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            position: "sticky",
          }}
        >
          <Header />
        </Box>
      </Box>
      <Box
        sx={{
          height: showGreeting ? "100vh" : "auto",
          scrollSnapAlign: "start",
        }}
      >
        <AppBar
          sx={{
            display: showGreeting ? "none" : "flex",
            position: "sticky",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Header />
        </AppBar>
        <Box>{getPageContent()}</Box>
      </Box>
    </Box>
  );
}

export default App;
