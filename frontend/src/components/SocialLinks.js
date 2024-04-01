import { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import GithubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Info from "@mui/icons-material/Info";

export default function SocialLinks({ size = "medium", compact = false }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const socialMedias = [
    {
      name: "LinkedIn",
      icon: LinkedInIcon,
      url: "https://www.linkedin.com/in/luke-cheng",
    },
    {
      name: "GitHub",
      icon: GithubIcon,
      url: "https://github.com/lujia-cheng",
    },
    {
      name: "Email",
      icon: EmailIcon,
      url: "mailto:lukecheng@pitt.edu",
    },
  ];

  return (
    <>
      {compact ? (
        <>
          <IconButton onClick={handleClick}>
            <Info size={size} aria-label="social media links" />
          </IconButton>
          <Menu
            aria-label="social media links"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            {socialMedias.map((socialMedia) => (
              <MenuItem
                key={socialMedia.name}
                aria-label={`open ${socialMedia.name}`}
                onClick={() => {
                  window.open(socialMedia.url);
                  handleClose();
                }}
              >
                <socialMedia.icon size={size} sx={{ marginRight: "0.5em" }} />
                {socialMedia.name}
              </MenuItem>
            ))}
          </Menu>
        </>
      ) : (
        socialMedias.map((socialMedia) => (
          <Tooltip
            key={socialMedia.name}
            aria-label={`open ${socialMedia.name}`}
            title={socialMedia.name}
          >
            <IconButton onClick={() => window.open(socialMedia.url)}>
              <socialMedia.icon size={size} />
            </IconButton>
          </Tooltip>
        ))
      )}
    </>
  );
}
