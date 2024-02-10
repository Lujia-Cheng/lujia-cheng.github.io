import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ServerIndicator from "./ServerIndicator";
import LightMode from "@mui/icons-material/LightMode";
import DarkMode from "@mui/icons-material/DarkMode";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GithubIcon from "@mui/icons-material/GitHub";
import "../styles/UtilityPanel.css";
import {useServerStatus} from "../contexts/ServerStatusContext";
import {useThemeContext} from "../contexts/ThemeContext";
import {Divider, useTheme} from "@mui/material";

export default function UtilityPanel() {
  const theme = useTheme();
  const {toggleTheme} = useThemeContext();
  const {status} = useServerStatus(); // do not change variable name
  return (<div className="utility-panel">
    <Divider orientation="vertical" flexItem
             variant="middle"/>
    <Tooltip title={"Server: " + status}>
        <span // prevent disabled button blocking tooltip
          style={{display: "flex"}}
        >
          <IconButton size="large" disabled="true">
            <ServerIndicator/>
          </IconButton>
        </span>
    </Tooltip>
    <Tooltip
      title={theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"}
    >
      <IconButton size="large" onClick={toggleTheme}>
        {theme.palette.mode === "dark" ? <LightMode/> : <DarkMode/>}
      </IconButton>
    </Tooltip>
    <Tooltip title="My LinkedIn">
      <IconButton
        size="large"
        onClick={() => window.open("https://www.linkedin.com/in/luke-cheng")}
      >
        <LinkedInIcon/>
      </IconButton>
    </Tooltip>

    <Tooltip title="My GitHub">
      <IconButton
        size="large"
        onClick={() => window.open("https://github.com/Lujia-Cheng")}
      >
        <GithubIcon size="large" color="inherit"/>
      </IconButton>
    </Tooltip></div>)
}