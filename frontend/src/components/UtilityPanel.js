import { useThemeContext } from "../contexts/ThemeContext";

import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import LightMode from "@mui/icons-material/LightMode";
import DarkMode from "@mui/icons-material/DarkMode";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GithubIcon from "@mui/icons-material/GitHub";

import "../styles/ServerIndicator.css";

export default function UtilityPanel() {
  const theme = useTheme();
  const { toggleTheme } = useThemeContext();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Tooltip
        aria-label="open LinkedIn.com/in/Luke-Cheng"
        title="in/Luke-Cheng"
      >
        <IconButton
          onClick={() => window.open("https://www.linkedin.com/in/luke-cheng")}
        >
          <LinkedInIcon />
        </IconButton>
      </Tooltip>
      <Tooltip
        aria-label="open GitHub.com/Lujia-cheng"
        title="GitHub.com/Lujia-cheng"
      >
        <IconButton
          onClick={() => window.open("https://github.com/Lujia-Cheng")}
        >
          <GithubIcon color="inherit" />
        </IconButton>
      </Tooltip>
      <Tooltip
        aria-label="Toggle Light/Dark Mode"
        title={theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"}
      >
        <IconButton size="large" onClick={toggleTheme}>
          {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
