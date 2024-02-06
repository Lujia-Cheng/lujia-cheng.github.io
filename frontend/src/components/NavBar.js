import React from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import ServerStatus from "./ServerStatus";
import InfoIcon from "@mui/icons-material/Info";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ChatIcon from "@mui/icons-material/Chat";
import CreateIcon from "@mui/icons-material/Create";
import CodeIcon from "@mui/icons-material/Code";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GithubIcon from "@mui/icons-material/GitHub";
import "../styles/NavBar.css";

export default function NavBar({ value, onChange }) {
  return (
    <div className="section-container">
      <Tabs
        selectionFollowsFocus
        value={value}
        onChange={onChange}
        variant="scrollable"
      >
        {/* todo change to dropdown if screen size small see https://mui.com/material-ui/customization/breakpoints/ */}
        <Tab label="About" icon={<InfoIcon />} iconPosition="start" />
        <Tab label="CV" icon={<AssignmentIndIcon />} iconPosition="start" />
        <Tab label="Chat" icon={<ChatIcon />} iconPosition="start" />
        <Tab label="Blog" icon={<CreateIcon />} iconPosition="start" />
        <Tab label="Projects" icon={<CodeIcon />} iconPosition="start" />
      </Tabs>

      <div className="external-links-container">
        <Button disabled>
          <ServerStatus />
        </Button>
        <Divider flexItem orientation="vertical" variant="middle" />
        <Button
          onClick={() => window.open("https://www.linkedin.com/in/luke-cheng/")}
        >
          <LinkedInIcon />
        </Button>
        <Divider flexItem orientation="vertical" variant="middle" />
        <Button onClick={() => window.open("https://github.com/Lujia-Cheng")}>
          <GithubIcon />
        </Button>
      </div>
    </div>
  );
}
