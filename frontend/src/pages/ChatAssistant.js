import React, {useState, useEffect} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);

  const [userInput, setUserInput] = useState("");

  // Load chat history
  useEffect(() => {
    const storedMessages = sessionStorage.getItem("chatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // Save chat messages
  useEffect(() => {
    sessionStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);


  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = {text: userInput, isUser: true};
    const updatedMessages = [...messages, userMessage];

    // fetch AI response
    const response = await fetch(process.env.REACT_APP_API_URL + "/api/chat", {
      method: "POST", headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify({message: userInput})
    });

    if (response.ok) {
      const message = await response.json();
      updatedMessages.push({text: message, isUser: false});
    } else {
      // simulate response with wait 500 ms
      await new Promise(resolve => setTimeout(resolve, 500));
      updatedMessages.push({text: "🚧 Backend under construction 🚧 This is a simulated response.", isUser: false});
    }

    setMessages(updatedMessages);
    setUserInput(""); // Reset userInput after submission
  };

  return (<Box sx={{
    height: "100%", maxWidth: "600px", margin: "0 auto", padding: "20px"
  }}>
    <Paper elevation={3} sx={{maxHeight: "800px", overflow: "auto", padding: "10px"}}>
      {messages.map((msg, index) => (
        <Box key={index} sx={{textAlign: msg.isUser ? "right" : "left", margin: "10px 0"}}>
          <Box
            sx={{
              display: "inline-block",
              padding: "10px",
              borderRadius: "10px",
              backgroundColor: msg.isUser ? "chartreuse" : "deepskyblue",
              color: "black",
              maxWidth: "80%"
            }}
          > <Typography variant="body1" component="p" sx={{display: "inline-block",}}>
            {msg.text}
          </Typography>
          </Box>
        </Box>))}
    </Paper>
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1, display: "flex", gap: "10px"}}>
      <TextField fullWidth variant="outlined" placeholder="Type your message here..." value={userInput}
                 onChange={handleInputChange}/>
      <Button variant="contained" color="primary" type="submit">Send</Button>
    </Box>
  </Box>);
};

export default ChatComponent;
