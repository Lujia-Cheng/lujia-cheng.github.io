import { useThemeContext } from "../../contexts/ThemeContext";

import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";

import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";

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
