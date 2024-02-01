import React from "react";
import Markdown from "react-markdown";
import resume from "../assets/CV.md";

function Resume() {
  const [markdown, setMarkdown] = React.useState("");

  React.useEffect(() => {
    fetch(resume)
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <div>
      <Markdown children={markdown} />
    </div>
  );
}

export default Resume;
