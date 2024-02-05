import React from "react";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

function About() {
  return (
    <div
      style={{
        padding: "4em",
      }}
    >
      <Paper display="flex" padding="4em">
        <Typography variant="h5" height="100%" padding="2em">
          I'm a Master's student at the University of Pittsburgh. I'll be
          graduating May 2024. I'm interested in I'll add more content to this
          website as it goes. At the moment, I'm working on a chat assistant
          Feel free to poke around and see what I'm up to.
        </Typography>
      </Paper>
    </div>
  );
}

export default About;
