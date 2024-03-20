const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: "",
});

// const bcrypt = require("bcrypt");
// const validator = require("validator");
// const jwt = require("jsonwebtoken");
// const {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } = require("@google/generative-ai");
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
  if (!req.body || !req.body.message) {
    return res.status(400).json({ message: "No message provided" });
  }

  const { message, history } = req.body;
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a greeter on a personal website. Be delightful and friendly.",
      },
      ...history,
      { role: "user", content: message },
    ],
  });
  res.status(200).send(completion.choices[0]);
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
