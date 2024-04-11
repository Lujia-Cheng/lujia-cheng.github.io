import { useTheme } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import { useContext } from "react";

import { ColorModeContext } from "../../contexts/ThemeContext";

export default function UtilityButtons() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Tooltip
      aria-label="Toggle Light/Dark Mode"
      title={theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"}
    >
      <IconButton
        size="large"
        color="inherit"
        onClick={colorMode.toggleColorMode}
      >
        {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  );
}
