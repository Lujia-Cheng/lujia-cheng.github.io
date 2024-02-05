import React from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import GithubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InfoIcon from "@mui/icons-material/Info";
import ChatIcon from "@mui/icons-material/Chat";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

import CreateIcon from "@mui/icons-material/Create";
import CodeIcon from "@mui/icons-material/Code";

function NavBar({ value, onChange }) {
  return (
    <Grid display="flex" justifyContent="space-between">
      <Tabs value={value} onChange={onChange} variant="scrollable">
        <Tab label="About" icon={<InfoIcon />} iconPosition="start" />
        <Tab label="CV" icon={<AssignmentIndIcon />} iconPosition="start" />
        <Tab label="Chat" icon={<ChatIcon />} iconPosition="start" />
        <Tab label="Blog" icon={<CreateIcon />} iconPosition="start" />
        <Tab label="Projects" icon={<CodeIcon />} iconPosition="start" />
      </Tabs>

      <Grid margin-left="auto" display="flex" justifyContent="space-between">
        <Divider flexItem orientation="vertical" variant="middle" />
        <Button
          label="LinkedIn"
          onClick={() => window.open("https://www.linkedin.com/in/luke-cheng/")}
        >
          <LinkedInIcon />
        </Button>
        <Divider flexItem orientation="vertical" variant="middle" />
        <Button
          label="Github"
          onClick={() => window.open("https://github.com/Lujia-Cheng")}
        >
          <GithubIcon />
        </Button>
      </Grid>
    </Grid>
  );
}

export default NavBar;
