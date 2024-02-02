import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Welcome() {
  return (
    <Box
      id="welcome"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      flexGrow={6}
    >
      <Typography variant="h1" maxWidth="90vw">
        Hi, I'm Luke.
      </Typography>
      <Typography variant="h2" maxWidth="90vw">
        Welcome to my website.
      </Typography>
    </Box>
  );
}
export default Welcome;
