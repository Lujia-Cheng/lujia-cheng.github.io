
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Markdown from "react-markdown";

import { ChatMessage } from "./index";

export default function ChatMessages({
  chatHistory,
}: {
  chatHistory: ChatMessage[];
}) {
  return (
    <>
      <Divider />
      {chatHistory.map((msg, index) => (
        <Box
          key={index}
          sx={{
            textAlign: msg.role === "user" ? "right" : "left",
            margin: "10px",
          }}
        >
          <Typography
            variant="body1"
            component="div"
            sx={{
              display: "inline-block",
              padding: "0 20px",
              borderRadius: "10px",
              backgroundColor: msg.role === "user" ? "pink" : "paleturquoise",
              color: "black",
              maxWidth: "85%",
            }}
          >
            <Markdown>{msg.text}</Markdown>
          </Typography>
        </Box>
      ))}
    </>
  );
}
