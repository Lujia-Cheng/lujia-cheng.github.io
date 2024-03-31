import EmailIcon from "@mui/icons-material/Email";
import GithubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

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
          key={socialMedia.name}
          aria-label={`open ${socialMedia.name}`}
          title={socialMedia.name}
        >
          <IconButton size="large" onClick={() => window.open(socialMedia.url)}>
            <socialMedia.icon />
          </IconButton>
        </Tooltip>
      ))}
    </div>
  );
}
