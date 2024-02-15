import React from "react";

import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import GithubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "1rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {"Built with "}
        <Link color="inherit" href="https://reactjs.org/">
          React
        </Link>
        {", backend hosted by "}
        <Link color="inherit" href="https://www.glitch.com/">
          Glitch
        </Link>
        {", and database provided by "}
        <Link color="inherit" href="https://www.mongodb.com/">
          MongoDB
        </Link>
        {"."}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ marginLeft: "auto" }}
      >
        Report website issues to:
      </Typography>
      <Tooltip
        aria-label="open GitHub.com/Lujia-cheng"
        title="GitHub.com/Lujia-cheng"
      >
        <IconButton
          size="large"
          onClick={() => window.open("https://github.com/Lujia-Cheng")}
        >
          <GithubIcon color="inherit" />
        </IconButton>
      </Tooltip>
      <Typography variant="body2" color="text.secondary">
        Connect me on:
      </Typography>
      <Tooltip aria-label="open LinkedIn.com/in/Luke-Cheng"
      title="in/Luke-Cheng">
        <IconButton
          onClick={() => window.open("https://www.linkedin.com/in/luke-cheng")}
        >
          <LinkedInIcon />
        </IconButton>
      </Tooltip>
    </footer>
  );
}
