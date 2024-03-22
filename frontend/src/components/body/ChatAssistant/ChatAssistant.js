import { useContext, useEffect, useState } from "react";
import {
  SERVER_STATUS,
  ServerStatusContext,
} from "../../../contexts/ServerStatusContext";
import ServerIndicator from "./ServerIndicator";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Markdown from "react-markdown";
import SendIcon from "@mui/icons-material/Send";
import StopIcon from "@mui/icons-material/Stop";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

export default function ChatAssistant() {
  const [chatHistory, setChatHistory] = useState([
    {
      text: `Hello, I'm Luke's personal website assistant. How can I help you today?
      Please be aware that I might sound informative but I'm still only a large language model. 😅 And for transparency, our conversation will pass through a multiple channels and services. So please don't tell me sensitive information. Here's are a sample questions you can ask, like "When will Luke graduated?"`,
      role: "bot",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const { serverStatus, updateServerStatus } = useContext(ServerStatusContext);
  const [waitingForServer, setWaitingForServer] = useState(false);
  const [controller, setController] = useState();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenChatSetting = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseChatSetting = () => {
    setAnchorEl(null);
  };
  const resetCookies = () => {
    setAnchorEl(null);
    localStorage.clear();
    sessionStorage.clear();
    setChatHistory([
    {
      text: `Hello, I'm Luke's personal website assistant. How can I help you today?
      Please be aware that I might sound informative but I'm still only a large language model. 😅 And for transparency, our conversation will pass through a multiple channels and services. So please don't tell me sensitive information. Here's are a sample questions you can ask, like "When will Luke graduated?"`,
      role: "bot",
    },
  ]);
  };

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
  function handleCancel() {
    controller?.abort();
    setController(null);
  }
  async function handleSubmit(e) {
    e.preventDefault();

    // init new AbortController for user cancel request
    const newController = new AbortController();
    setController(newController);

    const userMessage = { text: userInput, role: "user" };

    setChatHistory((prevHistory) => [...prevHistory, userMessage]);
    setUserInput(""); // Reset userInput after submission
    if (serverStatus === SERVER_STATUS.Standby) {
      // set server status to "connecting" only initial connection
      updateServerStatus(SERVER_STATUS.Connecting);
    }

    const botMessage = { role: "bot" };

    setWaitingForServer(true);

    const reportToGithubMsg = `If this happens consistently, please report it via the link in the footer.`;
    // todo move all api calls to separate file
    await fetch(`${process.env.REACT_APP_API_URL}/api/chat`, {
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
        updateServerStatus(SERVER_STATUS.Connected);
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
            botMessage.text = `Sorry, the server took way too long to respond. ${reportToGithubMsg}`;
            updateServerStatus(SERVER_STATUS.Timeout);
            break;
          case "TypeError":
            botMessage.text = `Sorry, the server is not responding. ${reportToGithubMsg}`;
            updateServerStatus(SERVER_STATUS.Error);
            break;
          default:
            updateServerStatus(SERVER_STATUS.Error);
        }
        console.log(`Error: type: ${err.name}, message: ${err.message}`);
      })
      .finally(() => {
        setWaitingForServer(false);
        setChatHistory((prevHistory) => [...prevHistory, botMessage]); // save bot message to chat history
      });
  }

  return (
    <Box
      sx={{
        height: "100%",
        maxWidth: "80%",
        margin: "0 auto",
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
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Chat Assistant
          </Typography>
          <ServerIndicator />
          <Tooltip title="AI options">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenChatSetting}
              color="inherit"
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <Menu
            id="ai"
            anchorEl={anchorEl}
            keepMounted
            open={anchorEl}
            onClose={handleCloseChatSetting}
            MenuListProps={{
              "aria-labelledby": "button",
            }}
          >
            <MenuItem onClick={handleCloseChatSetting}>Gemini</MenuItem>
            <Divider />
            <MenuItem onClick={resetCookies}>Reset</MenuItem>
          </Menu>
        </Box>
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
          <Button variant="contained" type="cancel" onClick={handleCancel}>
            <StopIcon />
          </Button>
        ) : (
          <Button
            disabled={!userInput}
            variant="contained"
            color="primary"
            type="submit"
          >
            <SendIcon />
          </Button>
        )}
      </Box>
    </Box>
  );
}
