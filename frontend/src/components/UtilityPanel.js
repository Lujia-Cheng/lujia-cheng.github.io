import { useContext } from "react";

import { ServerStatusContext } from "../contexts/ServerStatusContext";
import { useThemeContext } from "../contexts/ThemeContext";

import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import LightMode from "@mui/icons-material/LightMode";
import DarkMode from "@mui/icons-material/DarkMode";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";

import "../styles/ServerIndicator.css";

export default function UtilityPanel() {
  const theme = useTheme();
  const { toggleTheme } = useThemeContext();

  const { serverStatus } = useContext(ServerStatusContext);

  return (
    <div>
      <Tooltip
        aria-label="Toggle Light/Dark Mode"
        title={theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"}
      >
        <IconButton size="large" onClick={toggleTheme}>
          {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Tooltip>
      <Tooltip
        aria-label={"Server Status" + serverStatus}
        title={"Server Status: " + serverStatus}
      >
        <span>
          <IconButton size="large" disabled={true}>
            <DnsOutlinedIcon className={serverStatus} />
          </IconButton>
        </span>
      </Tooltip>
    </div>
  );
}
