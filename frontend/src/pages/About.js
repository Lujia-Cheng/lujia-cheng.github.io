import React from "react";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

function About() {
  return (
    <div
      style={{
        padding: "5%",
      }}
    >
      <Paper display="flex">
        {/* //if sx body1, else h5 */}
        <Typography variant="h6" padding="2em">
          I'm a Master of Information Science student at the University of
          Pittsburgh, set to graduate in May 2024. I actually majored in
          Chemistry and Philosophy during my undergrad and have worked as a
          chemist for a brief period.
          <br />
          <br />
          But now I'm here, coding algorithms,building websites, and fighting
          bugs (features). I blame it on the "Intro to Java" class; who knew
          that one of my requirements course (for chemistry!) would turn out to
          be my gateway to programming.
          <br />
          <br />
          Right now, I'm working to buff this tiny website up. I'm planning to
          put on a chat assistant to keep visitors to this tiny website
          entertained. It will hand you all sorts of cool stuff in the future.
          Heck, I might even put a mini CTF (capture the flag) game in it. But
          for now, you'll need to use the good-old navigation bar.
        </Typography>
      </Paper>
    </div>
  );
}

export default About;
