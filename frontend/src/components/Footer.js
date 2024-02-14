import React from "react";
import packageInfo from "../../package.json";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";
import PublicIcon from "@mui/icons-material/Public";

export default function Footer() {
  return (
    <footer style={{ width: "100%" }}>
      <Typography variant="body2" gutterBottom>
        Built with React <CodeIcon />. Backend hosted by Glitch <PublicIcon />.
      </Typography>
      <Typography variant="body2">
        <Link
          href={packageInfo.repository.url.slice(0, -4)}
          target="_blank"
          rel="noopener"
          sx={{
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          View on GitHub{" "}
          <GitHubIcon sx={{ marginRight: 1, verticalAlign: "middle" }} />
        </Link>
      </Typography>
    </footer>
  );
}
