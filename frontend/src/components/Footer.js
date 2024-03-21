import React from "react";

import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import GithubIcon from "@mui/icons-material/GitHub";

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
        {", webpage deployed via "}
        <Link color="inherit" href="https://pages.github.com/">
          GitHub Pages
        </Link>
        {", server hosted on "}
        <Link color="inherit" href="https://azure.microsoft.com/en-us/">
          Azure Functions
        </Link>
        {", AI provided by "}
        <Link color="inherit" href="https://gemini.google.com/">
          Gemini
        </Link>
        {", and database provided by "}
        <Link color="inherit" href="https://www.mongodb.com/">
          MongoDB
        </Link>
        .
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ marginLeft: "auto" }}
      >
        {"Source code available on GitHub:"}
      </Typography>
      <Tooltip
        aria-label="open GitHub.com/Lujia-cheng"
        title="GitHub.com/Lujia-cheng"
      >
        <IconButton
          onClick={() =>
            window.open("https://github.com/Lujia-Cheng/lujia-cheng.github.io")
          }
        >
          <GithubIcon color="inherit" />
        </IconButton>
      </Tooltip>
    </footer>
  );
}
