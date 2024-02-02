import React from "react";
import { BottomNavigationAction, BottomNavigation } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ChatIcon from "@mui/icons-material/Chat";
import ArticleIcon from "@mui/icons-material/Article";
import Box from "@mui/material/Box";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Welcome from "./Welcome";
import { useState } from "react";

function NavBar() {
  // hide welcome message after scrolling
  const [showGreetingMsg, setShowGreetingMsg] = useState(true);

  function onScroll() {
    const welcomeMsg = document.getElementById("welcome");
    if (welcomeMsg?.getBoundingClientRect().bottom <= 0) {
      // remove greeting if off the screen
      setShowGreetingMsg(false);
      window.removeEventListener("scroll", onScroll);
    }
  }

  window.addEventListener("scroll", onScroll);

  // nav bar
  const [highlight, setHighlight] = React.useState("about");
  function changeHighlight(event, newHighlight) {
    // change highlight on click
    // remove greeting message on click
    // scroll to section on click
    setHighlight(newHighlight);
  
    setShowGreetingMsg(false); // todo smooth this & fade out see https://stackoverflow.com/questions/42733986/how-to-wait-and-fade-an-element-out
  }

  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        minHeight={showGreetingMsg && "100vh"}
      >
        {showGreetingMsg && <Welcome />}
        <nav>
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
    </div>
  );
}

export default NavBar;
