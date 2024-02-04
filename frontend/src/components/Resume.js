import React from "react";
import Markdown from "react-markdown";
import resume from "../assets/CV.md";
import Paper from "@mui/material/Paper";


function Resume() {
  const [markdown, setMarkdown] = React.useState("");

  React.useEffect(() => {
    fetch(resume)
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <Paper variant="outlined" square={false} padding="2em">
      <Markdown children={markdown} />
    </Paper>
  );
}

export default Resume;
