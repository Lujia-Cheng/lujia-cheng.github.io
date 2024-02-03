import React from "react";
import Markdown from "react-markdown";
import resume from "../assets/CV.md";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

function Resume() {
  const [markdown, setMarkdown] = React.useState("");

  React.useEffect(() => {
    fetch(resume)
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <Paper variant="outlined" elevation={3} square={false}>
      <Box margin="2em 6em">
        <Markdown children={markdown} />
      </Box>
    </Paper>
  );
}

export default Resume;
