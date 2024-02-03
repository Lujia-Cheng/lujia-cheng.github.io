import React from "react";
import Typography from "@mui/material/Typography";

function GreetingMsg() {
  return (
    <p>
      <Typography variant="h1">Hi, I'm Luke.</Typography>
      <Typography variant="h2" maxWidth="90vw">
        Welcome to my website.
      </Typography>
    </p>
  );
}
export default GreetingMsg;
