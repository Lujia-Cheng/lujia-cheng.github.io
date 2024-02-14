const express = require("express");
const cors = require("cors");
const { set } = require("mongoose");
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const validator = require("validator");
// const jwt = require("jsonwebtoken");

const app = express();

// connect to DB
// const mongoDB =
//   "mongodb+srv://" +
//   process.env.USERNAME +
//   ":" +
//   process.env.PASSWORD +
//   "@" +
//   process.env.HOST +
//   "/" +
//   process.env.DATABASE;
// mongoose.connect(mongoDB);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("hello world!");
});

app.post("/api/chat", async (req, res) => {
  if (!req.body.message) {
    return res.status(400).json({ message: "No message provided" });
  }
  // add a delay for testing
  await new Promise((resolve) => setTimeout(resolve, 10000));

  res.status(200).json({
    message: `[backend] under construction. You sent: ${req.body.message}`,
  });
  // todo api request via node @link https://platform.openai.com/docs/quickstart?context=node
});

// Handle 404
app.use(function (request, response) {
  response.status(404).json({ message: "Undefined API routes" });
});

const listener = app.listen(process.env.PORT || 4000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
