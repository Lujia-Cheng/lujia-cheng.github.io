import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ServerIndicator from "./ServerIndicator";
import LightMode from "@mui/icons-material/LightMode";
import DarkMode from "@mui/icons-material/DarkMode";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GithubIcon from "@mui/icons-material/GitHub";
import { useServerStatus } from "../contexts/ServerStatusContext";
import { useThemeContext } from "../contexts/ThemeContext";
import { useTheme } from "@mui/material/styles";

export default function UtilityPanel() {
  const theme = useTheme();
  const { toggleTheme } = useThemeContext();
  const { status } = useServerStatus(); // do not change variable name
  return (
    <div>
      <Tooltip title={"Server: " + status}>
        <span // prevent disabled button blocking tooltip
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
    </div>
  );
}
