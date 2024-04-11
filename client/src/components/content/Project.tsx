import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

export default function Project() {
  const projects = [
    {
      name: "Morse code IME",
      description:
        "Android keyboard that vibrates in Morse code as the user types in plain English.",
      status: "archived",
      link: "https://github.com/Lujia-Cheng/MorseCodeIME",
    },
    {
      name: "Screeps-docs zh-CN",
      description: `Chinese translation of the official Screeps.com documentation/API for the MMO programming game.`,
      status: "actively maintained",
      link: "https://github.com/screeps-cn/docs",
    },

    {
      name: "Bouncing DVD logo",
      description: `Remember the infamous bouncing DVD logo screensaver? Now on a web page using CSS only.`,
      status: "archived",
      link: "https://github.com/Lujia-Cheng/bouncingDVD",
    },
    {
      name: "Bon Voyage",
      description: `Inspired by the game jam theme "age", we played with the word, crafting a unique "voy-age" filled with encounters of mir-ages, the discovery of pass-ages, explorations of vill-ages, and more.`,
      status: "First Penguin Award - 2023 Pitt Games4SocialImpact",
      link: "https://itch.io/jam/pitt-games-4-social-impact-2023/rate/2303857",
    },
    {
      name: "Mock e-commerce platform",
      description: `A full-stack MERN e-commerce website. Feel free to explore, but please don't try to buy anything—it's not real.`,
      status: "class project",
      link: "https://github.com/Lujia-Cheng/web-final-project",
    },

    {
      name: "Crypto Playground",
      description:
        "Mostly implemented Twofish encryption algorithm along with a collection of cryptography-related scripts.",
      status: "archived",
      link: "https://github.com/Lujia-Cheng/CryptoPlayground",
    },

    {
      name: "Screeps AI",
      description: `My control script for the MMO programming game Screeps. It's a work in progress, but it's already capable of autonomous mining, energy management, and defense.`,
      link: "https://github.com/Lujia-Cheng/ScreepsAS",
    },
  ];

  return (
    <Grid container spacing={4} padding={4}>
      {projects.map((project) => (
        <Grid item key={project.name} xs={12} sm={6} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardHeader
              avatar={
                <Tooltip title={project.link.replace("https://", "")}>
                  <Avatar
                    src={`https://favicone.com/${
                      new URL(project.link)?.hostname
                    }?s=256`}
                    onClick={() => window.open(project.link)}
                  ></Avatar>
                </Tooltip>
              }
              action={<IconButton aria-label="settings"></IconButton>}
              title={project.name}
              subheader={project.status}
            />
            <CardContent>{project.description}</CardContent>
            {/* push to bottom */}{" "}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
