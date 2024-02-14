import { useContext, useEffect, useState } from "react";
import { ServerStatusContext } from "../contexts/ServerStatusContext";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";

import packageInfo from "../../package.json";
import { ServerStatus } from "../enums/ServerStatus";
import SendIcon from "@mui/icons-material/Send";
import StopIcon from "@mui/icons-material/Stop";

export default function ChatAssistant() {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const { serverStatus, updateServerStatus } = useContext(ServerStatusContext);
  const [waitingForServer, setWaitingForServer] = useState(false);

  // fixme Load chat messages from sessionStorage
  useEffect(() => {
    const savedChatHistory = sessionStorage.getItem("chatMessages");
    if (savedChatHistory) {
      setChatHistory(JSON.parse(savedChatHistory));
    }
  }, []);

  // Save chat history to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("chatMessages", JSON.stringify(chatHistory));
  }, [chatHistory]);

  // handle cancel button
  let controller = new AbortController();
  const handleCancel = () => {
    if (controller) {
      controller.abort();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput) return; // Do nothing if userInput is empty

    const userMessage = { text: userInput, isUser: true };
    const timeout = 20000;
    setChatHistory((prevHistory) => [...prevHistory, userMessage]);
    setUserInput(""); // Reset userInput after submission
    if (serverStatus === ServerStatus.Standby) {
      // set server status to connecting only initially connection
      updateServerStatus(ServerStatus.Connecting);
    }

    const botMessage = { isUser: false };

    setWaitingForServer(true);
    await fetch(
      `${process.env.REACT_APP_API_URL || "http://localhost:4000"}/api/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
        signal: AbortSignal.any([
          // https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/any_static#examples
          controller.signal,
          AbortSignal.timeout(timeout),
        ]),
      }
    )
      .then((res) => {
        updateServerStatus(ServerStatus.Connected);
        return res.json();
      })
      .then((data) => {
        botMessage.text = data.message;
      })
      .catch((err) => {
        switch (err.name) {
          case "AbortError":
            botMessage.text = "Request aborted";
            break;
          case "TimeoutError":
            // fixme it does not return this error according to https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static#return_value
            botMessage.text = `Sorry, the server took way too long to respond. If this happens consistently, please report it to ${
              packageInfo?.repository?.url?.slice(0, -4) + "/issues" ||
              "my github issues page"
            }`;
            updateServerStatus(ServerStatus.Timeout);
            break;
          case "TypeError":
            botMessage.text = "Failed to connect to the server";
            break;
          default:
            updateServerStatus(ServerStatus.Error);
        }
        console.log(`Error: type: ${err.name}, message: ${err.message}`);
      })
      .finally(() => {
        setWaitingForServer(false);
        setChatHistory((prevHistory) => [...prevHistory, botMessage]); // save bot message to chat history
      });
  };

  return (
    <Box
      sx={{
        height: "100%",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <Paper
        elevation={3}
        sx={{ maxHeight: "800px", overflow: "auto", padding: "10px" }}
      >
        {chatHistory.map((msg, index) => (
          <Box
            key={index}
            sx={{ textAlign: msg.isUser ? "right" : "left", margin: "10px 0" }}
          >
            <Typography
              variant="body1"
              component="div"
              sx={{
                display: "inline-block",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: msg.isUser ? "chartreuse" : "deepskyblue",
                color: "black",
                maxWidth: "80%",
              }}
            >
              {msg.text}
            </Typography>
          </Box>
        ))}
      </Paper>

      {waitingForServer && <LinearProgress />}
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1, display: "flex", gap: "10px" }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        {waitingForServer ? (
          <Button
            variant="contained"
            color="secondary"
            type="cancel"
            onClick={handleCancel}
          >
            <StopIcon />
          </Button>
        ) : (
          <Button variant="contained" color="primary" type="submit">
            <SendIcon />
          </Button>
        )}
      </Box>
    </Box>
  );
}
