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
        {/* todo if sx body1, else h5 */}
        <Typography variant="h6" padding="2em">
          Hi, glad to see you here! I&apos;m a Master of Information Science
          student at the University of Pittsburgh, set to graduate in May 2024.
          I actually majored in Chemistry and Philosophy during my undergrad at
          Virginia Tech and have worked as a chemist for a brief period.
          <br />
          <br />
          However, I&apos;m now transitioning into a career in software
          development. I&apos;ve discovered a passion for programming, finding
          it more rewarding than lab work. The immediate feedback of a compiler
          is certainly preferable to a failed three-day experiment!
          <br />
          <br />
          Interestingly, my interest in programming stemmed from one of my
          chemistry graduation requirements: intro to Java. Yep, even chemists
          at Virginia Tech require programming skills. Later, I discovered the
          MMO game <Link href="https://screeps.com/">Screeps</Link>. In this
          game, you code your own AI bot (non-generative, of course) in
          JavaScript to establish a base, mine resources, and build an army to
          fight against other players. I found it fascinating, which is how I
          got into programming.
          <br />
          <br />
          I&apos;ve spent quite a bit of time refining my AI chatbot. Feel free
          to check it out in another tab! You can also connect with me on
          LinkedIn using the icon in the top right.
        </Typography>
      </Paper>
    </div>
  );
}

export default About;
