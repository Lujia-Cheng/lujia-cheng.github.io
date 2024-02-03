import React from "react";
import ArticleIcon from "@mui/icons-material/Article";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import GithubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InfoIcon from "@mui/icons-material/Info";
import ChatIcon from "@mui/icons-material/Chat";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

function NavBar({ value, onChange }) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="0 4em"
    >
      <Tabs value={value} onChange={onChange} scrollButtons>
        <Tab label="CV" icon={<InfoIcon />} iconPosition="start" />
        <Tab label="Chat" icon={<ChatIcon />} iconPosition="start" />
        <Tab
          label="Projects"
          icon={<DriveFileRenameOutlineIcon />}
          iconPosition="start"
        />
        <Tab label="Blog" icon={<ArticleIcon />} iconPosition="start" />
      </Tabs>

      <Box margin-right="0">
        <Button
          label="Github"
          onClick={() => window.open("https://github.com/Lujia-Cheng")}
        >
          <GithubIcon />
        </Button>
        <Button
          label="LinkedIn"
          onClick={() => window.open("https://www.linkedin.com/in/luke-cheng/")}
        >
          <LinkedInIcon />
        </Button>
      </Box>
    </Box>
  );
}

export default NavBar;
