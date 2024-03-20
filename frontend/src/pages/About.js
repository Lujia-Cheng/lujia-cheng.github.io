import React from "react";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";

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
          Hi, glad to see you here! I'm a Master of Information Science student
          at the University of Pittsburgh, set to graduate in May 2024. I
          actually majored in Chemistry and Philosophy during my undergrad and
          have worked as a chemist for a brief period.
          <br />
          <br />
          But now, I'm transitioning into a career in data science and software
          development. I discovered that I enjoy programming and data analysis
          more than lab work, and compilers definitely provide faster feedback
          than a failed three-day experiment! Interestingly, one of my chemistry
          requirements courses introduced me to programming. Then I discovered
          the game <Link href="https://screeps.com/">Screeps</Link>, an MMO that
          uses JavaScript, which you code your own AI to play the game.
          <br />
          <br />
          Right now, I'm working to buff this tiny website up. The chat
          assistant on top should be running. I just haven't train it with my
          custom data using my own resume, story, and interview questions, yet.
          <br />
          <br />
          Right now, I'm working on improving this website. The chat assistant
          at the top is functional, but I still need to train it with my custom
          data, including my resume, stories, and interview questions I
          gathered.
          <br />
          <br />
          Feel free to reach out to me on linkedin or github. It's in the footer
        </Typography>
      </Paper>
    </div>
  );
}

export default About;
