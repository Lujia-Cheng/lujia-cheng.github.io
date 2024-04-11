import { useEffect, useState } from "react";
import ServerIndicator from "./ServerIndicator";
import { ServerStatus } from "../../../constants/ServerStatus";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import StopIcon from "@mui/icons-material/Stop";
import SendIcon from "@mui/icons-material/Send";

import ChatSettingDropdown from "./ChatSettingDropdown";
import ChatMessages from "./ChatMessages";

export interface ChatMessage {
  text: string;
  role: "user" | "bot";
}
export default function ChatAssistant() {
  const welcomeMessage = `Hello, I'm Luke's virtual assistant. How can I help you today? I've equipped with a few basic knowledge about Luke. Here's are a sample questions you can ask, like "When will Luke graduated?"\n\nPlease be aware that I might sound informative but I'm still only a large language model. 😅 And for transparency, our conversation will pass through a multiple channels and services. So please don't tell me sensitive information.`;
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      text: welcomeMessage,
      role: "bot",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [serverStatus, updateServerStatus] = useState<ServerStatus>(
    ServerStatus.STANDBY
  );

  const [waitingForServer, setWaitingForServer] = useState<boolean>(false);
  const [controller, setController] = useState<null | AbortController>();

  const resetCookies = () => {
    localStorage.clear();
    sessionStorage.clear();
    setChatHistory([
      {
        text: welcomeMessage,
        role: "bot",
      },
    ]);
  };

  // fixme Load chat messages from localStorage
  useEffect(() => {
    const savedChatHistory = localStorage.getItem("chatHistory");
    if (savedChatHistory) {
      setChatHistory(JSON.parse(savedChatHistory));
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  // handle cancel button
  function handleCancel() {
    controller?.abort();
    setController(null);
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    // prevent user from sending empty message or sending message while waiting for server response
    if (!userInput || waitingForServer) {
      return;
    }

    const userMessage: ChatMessage = { text: userInput, role: "user" };
    setChatHistory((prevHistory) => [...prevHistory, userMessage]); // save user message to chat history
    const botResponse: ChatMessage = { role: "bot", text: "" };
    const reportToGithubMsg = `If this happens consistently, please report this issue in the link in the bottom right.`;

    // set server status to "connecting" only initial connection
    setWaitingForServer(true);
    if (serverStatus === ServerStatus.STANDBY) {
      updateServerStatus(ServerStatus.CONNECTING);
    }

    // Reset userInput after submission
    setUserInput("");

    // init new AbortController for user cancel request
    const newController = new AbortController();
    setController(newController);

    // todo move all api calls to separate file
    await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userInput,
        history: chatHistory,
      }),
      signal: newController.signal,
    })
      .then((res) => {
        updateServerStatus(ServerStatus.CONNECTED);
        return res.json();
      })
      .then((data: { message: string }) => {
        botResponse.text = data.message;
      })
      .catch((err: Error) => {
        switch (err.name) {
          case "AbortError":
            botResponse.text = `Your message was not sent by request.`;
            break;
          case "TimeoutError":
            // fixme it does not return this error according to https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static#return_value
            botResponse.text = `Sorry, the server took way too long to respond. It could happen if this is the first time you're using the chat assistant. Would you like to try again?
             ${reportToGithubMsg}`;
            updateServerStatus(ServerStatus.TIMEOUT);
            break;
          case "TypeError":
            botResponse.text = `Sorry, the server is not responding. It could be due to server maintenance or server is down. Would you like to try again?
             ${reportToGithubMsg}`;
            updateServerStatus(ServerStatus.ERROR);
            break;
          default:
            botResponse.text = `Sorry, We ran into some problem. ${reportToGithubMsg}`;

            updateServerStatus(ServerStatus.ERROR);
        }
        console.log(`Error: type: ${err.name}, message: ${err.message}`);
      })
      .finally(() => {
        setWaitingForServer(false);

        // save bot message to chat history
        setChatHistory((prevHistory) => [...prevHistory, botResponse]);
      });
  }

  return (
    <Box
      sx={{
        padding: "20px",
      }}
    >
      <Paper elevation={3} sx={{ overflow: "auto", padding: "10px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Chat Assistant
          </Typography>
          <ServerIndicator serverStatus={serverStatus} />
          <ChatSettingDropdown resetCookies={resetCookies} />
        </Box>
        <Divider />
        <ChatMessages chatHistory={chatHistory} />
        {waitingForServer && <LinearProgress />}
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, display: "flex", gap: "10px" }}
        >
          <TextField
            fullWidth
            placeholder="Type a message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          {waitingForServer ? (
            <Button variant="contained" type="reset" onClick={handleCancel}>
              <StopIcon />
            </Button>
          ) : (
            <Button
              disabled={!userInput || waitingForServer}
              variant="contained"
              type="submit"
            >
              <SendIcon />
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
