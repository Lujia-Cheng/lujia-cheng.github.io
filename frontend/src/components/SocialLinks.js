import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GithubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

export default function SocialLinks() {
  const socialMedias = [
    {
      name: "LinkedIn",
      icon: LinkedInIcon,
      url: "https://www.linkedin.com/in/luke-cheng",
    },
    {
      name: "GitHub",
      icon: GithubIcon,
      url: "https://github.com/Lujia-Cheng",
    },
    {
      name: "Email",
      icon: EmailIcon,
      url: "mailto:lukecheng@pitt.edu",
    },
  ];

  return (
    <div>
      {socialMedias.map((socialMedia) => (
        <Tooltip
          aria-label={`open ${socialMedia.name}`}
          title={socialMedia.name}
        >
          <IconButton onClick={() => window.open(socialMedia.url)}>
            <socialMedia.icon />
          </IconButton>
        </Tooltip>
      ))}
    </div>
  );
}
