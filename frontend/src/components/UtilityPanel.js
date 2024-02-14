import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LightMode from "@mui/icons-material/LightMode";
import DarkMode from "@mui/icons-material/DarkMode";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GithubIcon from "@mui/icons-material/GitHub";
import { useThemeContext } from "../contexts/ThemeContext";
import { useTheme } from "@mui/material/styles";

import { ServerStatusContext } from "../contexts/ServerStatusContext";
import { useContext } from "react";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import "../styles/ServerIndicator.css";

export default function UtilityPanel() {
  const theme = useTheme();
  const { toggleTheme } = useThemeContext();

  const { serverStatus } = useContext(ServerStatusContext);

  return (
    <div>
      <Tooltip title={"Server Status: " + serverStatus}>
        <span>
          <IconButton size="large" disabled={true}>
            <DnsOutlinedIcon className={serverStatus} />
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
    </div>
  );
}
