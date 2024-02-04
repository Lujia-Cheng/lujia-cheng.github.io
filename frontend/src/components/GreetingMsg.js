import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function GreetingMsg() {
  return (
    <Grid>
      <Typography variant="h1">Hi, I'm Luke.</Typography>
      <Typography variant="h2" maxWidth="90vw">
        Welcome to my website.
      </Typography>
    </Grid>
  );
}
export default GreetingMsg;
