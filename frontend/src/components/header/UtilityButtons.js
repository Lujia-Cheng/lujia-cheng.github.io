import { useThemeContext } from "../../contexts/ThemeContext";

import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import LightMode from "@mui/icons-material/LightMode";
import DarkMode from "@mui/icons-material/DarkMode";

import "../../styles/ServerIndicator.css";

export default function UtilityButtons() {
  const theme = useTheme();
  const { toggleTheme } = useThemeContext();

  return (
    <Tooltip
      aria-label="Toggle Light/Dark Mode"
      title={theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"}
    >
      <IconButton size="large" onClick={toggleTheme}>
        {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  );
}
