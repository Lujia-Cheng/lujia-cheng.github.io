import React from "react";

import { useMediaQuery, useTheme } from "@mui/material";

import ServerIndicator from "./ServerIndicator";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import InfoIcon from "@mui/icons-material/Info";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ChatIcon from "@mui/icons-material/Chat";
import CreateIcon from "@mui/icons-material/Create";
import CodeIcon from "@mui/icons-material/Code";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GithubIcon from "@mui/icons-material/GitHub";

import "../styles/NavBar.css";

export default function NavBar({ value, onChange }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Example function to handle dropdown change
  const handleDropdownChange = (event) => {
    onChange(event, event.target.value);
  };

  const navItems = [
    { label: "About", value: 0, icon: <InfoIcon />},
    { label: "CV", value: 1, icon: <AssignmentIndIcon />},
    { label: "Chat", value: 2, icon: <ChatIcon />, disabled:true },
    { label: "Blogs", value: 3, icon: <CreateIcon />,},
    { label: "Projects", value: 4, icon: <CodeIcon />, },
  ];

  return (
    <nav className="navbar">
      {isSmallScreen ? (
        <Select class="from-select"
          value={value}
          onChange={handleDropdownChange}
          displayEmpty
          inputProps={{ "aria-label": "Navigation" }}
        >
          {navItems.map((item) => (
            <MenuItem
              key={item.value}
              value={item.value}
              disabled={item.disabled}
            >
              {item.label}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <Tabs
          selectionFollowsFocus
          value={value}
          onChange={onChange}
          variant="scrollable"
          scrollButtons
        >
          {navItems.map((item) => (
            <Tab
              key={item.value}
              label={item.label}
              icon={item.icon}
              iconPosition="start"
              disabled={item.disabled}
            />
          ))}
        </Tabs>
      )}

      <div className="external-links-container">
        <Button disabled>
          <ServerIndicator />
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
    </nav>
  );
}
