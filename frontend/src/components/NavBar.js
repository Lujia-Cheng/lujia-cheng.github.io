import React from "react";
import { BottomNavigationAction, BottomNavigation } from "@mui/material";
import Resume from "./Resume";
import NotFound from "../pages/NotFound";
import InfoIcon from "@mui/icons-material/Info";
import ChatIcon from "@mui/icons-material/Chat";
import ArticleIcon from "@mui/icons-material/Article";
import Box from "@mui/material/Box";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
function NavBar() {
  const [highlight, setHighlight] = React.useState("about");

  const changeHighlight = (event, newHighlight) => {
    setHighlight(newHighlight);
  };

  return (
    <div>
      <nav>
        <BottomNavigation
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
        <Box padding="50px">{highlight === 1 ? <Resume /> : <NotFound />}</Box>
      </nav>
      {/* click on will server the component */}
    </div>
  );
}

export default NavBar;
