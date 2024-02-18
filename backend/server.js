const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// const bcrypt = require("bcrypt");
// const validator = require("validator");
// const jwt = require("jsonwebtoken");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const helmet = require("helmet");

const app = express();

// connect to DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("hello world!");
});

app.post("/api/chat", async (req, res) => {
  if (!req.body.message) {
    return res.status(400).json({ message: "No message provided" });
  }

  // node --version # Should be >= 18
  // npm install @google/generative-ai
  const MODEL_NAME = "gemini-1.0-pro";
  const AI_API_KEY =
    process.env.GEMINI_API_KEY ||
    res.status(400).json({ message: "[backend] No API key provided" });

  async function runChat() {
    const genAI = new GoogleGenerativeAI(AI_API_KEY);
    console.log(AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      // history: JSON.parse(req.body.history).map((msg) => msg.text),
      /* todo map to
        history: [
      {
        role: "user",
        parts: [{ text: "hi"}],
      },
      {
        role: "model",
        parts: [{ text: "Hello! How can I help you today?"}],
      },
    ],*/
    });

    const result = await chat.sendMessage(req.body.message); // todo cancel if ai not responding.

    const response = result.response; // todo log the response to db
    res.status(400).json({ message: response });
  }

  // todo api request via node @link https://platform.openai.com/docs/quickstart?context=node
});

// Handle 404
app.use(function (request, response) {
  response.status(404).json({ message: "Undefined API routes" });
});

const listener = app.listen(
  process.env.PORT || 4000, // DO NOT CHANGE: undocumented env var in glitch.com
  function () {
    console.log("Your app is listening on port " + listener.address().port);
  }
);
