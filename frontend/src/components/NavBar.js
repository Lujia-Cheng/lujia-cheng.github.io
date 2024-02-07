import { useMediaQuery, useTheme } from "@mui/material";
import { useThemeContext } from "../contexts/ThemeContext";

import ServerIndicator from "./ServerIndicator";
import { useServerStatus } from "../contexts/ServerStatusContext";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";

import InfoIcon from "@mui/icons-material/Info";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ChatIcon from "@mui/icons-material/Chat";
import CreateIcon from "@mui/icons-material/Create";
import CodeIcon from "@mui/icons-material/Code";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GithubIcon from "@mui/icons-material/GitHub";
import LightMode from "@mui/icons-material/LightMode";
import DarkMode from "@mui/icons-material/DarkMode";

import "../styles/NavBar.css";

export default function NavBar({ value, onChange }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { toggleTheme } = useThemeContext();
  const { status } = useServerStatus(); // do not change variable name

  // Function to handle dropdown change
  function handleDropdownChange(event) {
    onChange(event, event.target.value);
  }

  const navItems = [
    { label: "About", value: 0, icon: <InfoIcon /> },
    { label: "CV", value: 1, icon: <AssignmentIndIcon /> },
    { label: "Chat", value: 2, icon: <ChatIcon />, disabled: true },
    { label: "Blogs", value: 3, icon: <CreateIcon /> },
    { label: "Projects", value: 4, icon: <CodeIcon /> },
  ];

  return (
    <nav className="navbar">
      {isSmallScreen ? (
        <Select
          class="from-select"
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

      <Tooltip className="push-right" title={"Server: " + status}>
        <span // prevent disabled button blocking tooltip
          style={{ display: "flex" }}
        >
          <IconButton size="large" disabled="true">
            <ServerIndicator />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip
        title={theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"}
      >
        <IconButton size="large" onClick={toggleTheme}>
          {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Tooltip>
      <Tooltip title="My LinkedIn">
        <IconButton
          size="large"
          onClick={() => window.open("https://www.linkedin.com/in/luke-cheng")}
        >
          <LinkedInIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="My GitHub">
        <IconButton
          size="large"
          onClick={() => window.open("https://github.com/Lujia-Cheng")}
        >
          <GithubIcon size="large" color="inherit" />
        </IconButton>
      </Tooltip>
    </nav>
  );
}
