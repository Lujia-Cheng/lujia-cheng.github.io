import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Todo() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Typography variant="h3" align="center">
        🚧🚧 Under Construction 🚧🚧
      </Typography>
      <Typography variant="h5" align="center">
        Check back in a week or two!
      </Typography>
    </Box>
  );
}

export default Todo;
