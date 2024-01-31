const path = require("path");
const express = require("express");
const cors = require("cors");
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

// Handle 404
app.use(function (request, response) {
  response.status(404).json({ message: "Undefined API routes" });
});

const listener = app.listen(process.env.PORT || 4000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
