import { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import GithubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";

export default function SocialLinks({ size = "medium" }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
      {isSmallScreen ? (
        <>
          <IconButton onClick={handleClick}>
            <ArrowDropDownCircleIcon
              variant="outlined"
              size="large"
              aria-label="social media links"
            />
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
                <Tooltip title={socialMedia.name} placement="left">
                  <socialMedia.icon size={size} />
                </Tooltip>
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
