const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Import the rate-limiting middleware.
const rateLimit = require('express-rate-limit')


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

//
const app = express();
app.use(limiter)
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("hello world!");
});

app.post("/api/chat", async (req, res) => {
  if (!req.body || !req.body.message) {
    return res.status(400).json({ message: "No message provided" });
  }
  const { message, history = [] } = req.body;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  console.log(JSON.stringify(history));
  const chat = model.startChat({
    history: history.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text || "" }],
    })),
  });

  //   console.log(msg);
  const result = await chat.sendMessage(message);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  res.json({ message: text });
});

// Handle 404
app.use(function (request, response) {
  response.status(404).json({ message: "Undefined API routes" });
});

const listener = app.listen(8080, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
