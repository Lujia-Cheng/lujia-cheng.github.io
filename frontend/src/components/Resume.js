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
    <div style={{ padding: "5%" }}>
      <Paper elevation={3}>
        <div style={{ padding: "4em" }}>
          <Markdown children={markdown} />
        </div>
      </Paper>
    </div>
  );
}

export default Resume;
